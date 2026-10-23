// notebook.ts — reads a Jupyter .ipynb file at build time and turns it into plain data (markdown as safe HTML, code as text, outputs as text / tables / images / errors) for the Notebook.astro component to print.
import fs from 'node:fs';
import path from 'node:path';
// Sätteri is the Markdown processor that ships inside Astro 7 (installed with @astrojs/markdown-satteri); no new dependency.
import { markdownToHtml } from 'satteri';

/** Outputs longer than this many lines fold into a <details> labelled "OUTPUT" · nn LINES. */
export const COLLAPSE_LINES = 25;

export type NotebookOutput =
  | { kind: 'text'; text: string; lines: number }
  | { kind: 'table'; html: string; lines: number }
  | { kind: 'image'; src: string; format: string; width?: number; height?: number; kb: number; alt: string; heading?: string }
  | { kind: 'error'; text: string; lines: number };

export type NotebookCell =
  | { type: 'markdown'; number: number; html: string }
  | { type: 'code'; number: number; count: number | null; source: string; lines: number; outputs: NotebookOutput[] }
  | { type: 'raw'; number: number; source: string };

export interface Notebook {
  cells: NotebookCell[];
  /** "CELLS", "CODE", "MARKDOWN" totals for the toolbar. */
  counts: { cells: number; code: number; markdown: number };
  language: string;
  /** File name, e.g. aei_education_analysis.ipynb. */
  fileName: string;
  /** File size in KB, measured, never typed. */
  kb: number;
}

/** Jupyter stores text either as one string or as a list of lines. */
const joinText = (v: unknown): string => (Array.isArray(v) ? v.join('') : typeof v === 'string' ? v : '');

/** Remove terminal colour codes that Python tracebacks carry. */
const stripAnsi = (s: string) => s.replace(/\[[0-9;]*[A-Za-z]/g, '');

const lineCount = (s: string) => (s ? s.replace(/\n$/, '').split('\n').length : 0);

/** Markdown plugins: every heading drops one level (the notebook's # title must not compete with the page's own h1), and any raw HTML typed into a markdown cell is shown as text, never run. */
const mdPlugin = {
  name: 'notebook-markdown',
  heading(node: any, ctx: any) {
    ctx.setProperty(node, 'depth', Math.min(6, (node.depth ?? 1) + 1));
  },
  html(node: any, ctx: any) {
    ctx.replaceNode(node, { type: 'text', value: node.value ?? '' });
  },
};

const renderMarkdown = (src: string): string => {
  const html = markdownToHtml(src, { mdastPlugins: [mdPlugin], features: { smartPunctuation: false, rawHtml: false } } as any).html;
  // Belt and braces: links may only be http(s), mailto, or in-page.
  return html.replace(/href="(?!https?:|mailto:|#)[^"]*"/gi, 'href="#"');
};

/** pandas tables arrive as HTML. Keep the table, drop anything that could style the page or run: <style>, <script>, inline styles, event handlers, border attributes. */
const cleanTableHtml = (html: string): string =>
  html
    .replace(/<(script|style|iframe|object|embed)[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|style|iframe|object|embed|link|meta)[^>]*>/gi, '')
    .replace(/\s(on[a-z]+|style|border)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*("|')\s*javascript:[^"']*\2/gi, '')
    .trim();

/** Nearest markdown heading text, without Markdown punctuation, for image alt text. */
const headingOf = (src: string): string | undefined => {
  const hits = [...src.matchAll(/^#{1,6}\s+(.+?)\s*#*\s*$/gm)];
  const last = hits.at(-1)?.[1];
  return last?.replace(/\\([*_`#\[\]])/g, '$1').replace(/[*_`]/g, '').trim() || undefined;
};

/** PNG pixel size from the file header, JPEG from its start-of-frame marker. */
const imageSize = (buf: Buffer, format: string): { width?: number; height?: number } => {
  if (format === 'PNG' && buf.length >= 24) return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  if (format === 'JPG') {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const m = buf[i + 1];
      if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
      i += 2 + buf.readUInt16BE(i + 2);
    }
  }
  return {};
};

const toOutput = (o: any, count: number | null, cellNumber: number, heading: string | undefined): NotebookOutput | undefined => {
  if (o.output_type === 'stream') {
    const text = stripAnsi(joinText(o.text));
    return { kind: 'text', text, lines: lineCount(text) };
  }
  if (o.output_type === 'error') {
    const tb = Array.isArray(o.traceback) && o.traceback.length ? o.traceback.join('\n') : `${o.ename}: ${o.evalue}`;
    const text = stripAnsi(tb);
    return { kind: 'error', text, lines: lineCount(text) };
  }
  if (o.output_type === 'execute_result' || o.output_type === 'display_data') {
    const d = o.data ?? {};
    const img = d['image/png'] ? ['PNG', 'image/png'] : d['image/jpeg'] ? ['JPG', 'image/jpeg'] : undefined;
    if (img) {
      const b64 = joinText(d[img[1]]).replace(/\s/g, '');
      const buf = Buffer.from(b64, 'base64');
      const n = count ?? cellNumber;
      const alt = `Chart output from cell ${n}${heading ? `: ${heading}` : ''}`;
      return { kind: 'image', src: `data:${img[1]};base64,${b64}`, format: img[0], ...imageSize(buf, img[0]), kb: Math.round(buf.length / 1024), alt, heading };
    }
    if (d['text/html']) {
      const html = cleanTableHtml(joinText(d['text/html']));
      const rows = (html.match(/<tr[\s>]/gi) ?? []).length;
      return { kind: 'table', html, lines: rows || lineCount(html) };
    }
    if (d['text/plain']) {
      const text = stripAnsi(joinText(d['text/plain']));
      return { kind: 'text', text, lines: lineCount(text) };
    }
  }
  return undefined;
};

/** Read and parse a notebook. `file` is relative to the project root, e.g. "src/content/notebooks/x.ipynb". */
export function loadNotebook(file: string): Notebook {
  const abs = path.resolve(process.cwd(), file);
  const raw = fs.readFileSync(abs);
  const nb = JSON.parse(raw.toString('utf8'));
  const cells: NotebookCell[] = [];
  let heading: string | undefined;
  let number = 0;

  for (const c of nb.cells ?? []) {
    const source = joinText(c.source);
    const outputs = c.outputs ?? [];
    // An empty cell with nothing printed is not shown or counted.
    if (!source.trim() && !outputs.length) continue;
    number++;
    if (c.cell_type === 'markdown') {
      heading = headingOf(source) ?? heading;
      cells.push({ type: 'markdown', number, html: renderMarkdown(source) });
    } else if (c.cell_type === 'code') {
      const count = typeof c.execution_count === 'number' ? c.execution_count : null;
      cells.push({
        type: 'code',
        number,
        count,
        source: source.replace(/\n$/, ''),
        lines: lineCount(source),
        outputs: outputs.map((o: any) => toOutput(o, count, number, heading)).filter(Boolean) as NotebookOutput[],
      });
    } else {
      cells.push({ type: 'raw', number, source });
    }
  }

  return {
    cells,
    counts: {
      cells: cells.length,
      code: cells.filter((c) => c.type === 'code').length,
      markdown: cells.filter((c) => c.type === 'markdown').length,
    },
    language: nb.metadata?.language_info?.name ?? nb.metadata?.kernelspec?.language ?? 'python',
    fileName: path.basename(abs),
    kb: Math.round(raw.length / 1024),
  };
}

/** The "HIDE CODE" / "SHOW CODE" button. It ships hidden and is revealed here, so without JavaScript every cell simply stays visible. */
export const notebookJs = `(function(){document.querySelectorAll('[data-nb]').forEach(function(nb){var b=nb.querySelector('[data-nb-toggle]');if(!b||b.dataset.ready)return;b.dataset.ready='1';var q=b.querySelector('.q');b.hidden=false;b.addEventListener('click',function(){var h=nb.classList.toggle('nb--hide-code');q.textContent=h?'SHOW CODE':'HIDE CODE'})})})();`;
