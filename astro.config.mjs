// astro.config.mjs — Astro settings: the live URL, a small Markdown plugin that turns every "TODO(Matt)" (paragraph or HTML comment) in a case study into a styled "NOTE TO SELF" line instead of broken or hidden copy, and a build step that measures each finished page and prints its HTML / CSS weight into the receipt footer.
// @ts-check
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'astro/config';
// Sätteri is the Markdown processor that ships inside Astro 7; this is how a plugin is handed to it.
import { satteri } from '@astrojs/markdown-satteri';

const TODO = 'TODO(Matt)';

/** Strip the leading "TODO(Matt):" from a note's text so the CSS label "NOTE TO SELF" is not doubled. */
const stripPrefix = (s) => s.replace(/^\s*TODO\(Matt\)\s*[:—-]?\s*/, '');

/** The mdast node for one visible note: <p class="note-to-self">text</p>. */
const noteNode = (text) => ({
  type: 'paragraph',
  data: { hProperties: { className: ['note-to-self'] } },
  children: [{ type: 'text', value: text }],
});

/** Markdown plugin: a paragraph that starts with TODO(Matt) becomes <p class="note-to-self">; a TODO in the middle of a paragraph is split off into its own note; an HTML comment holding a TODO becomes a note too, and every other HTML comment is dropped so no drafting note ships in the page source. */
const noteToSelf = {
  name: 'note-to-self',
  paragraph(node, ctx) {
    const text = ctx.textContent(node);
    if (!text.includes(TODO)) return;
    const children = node.children ?? [];
    const note = { type: 'data', hProperties: { className: ['note-to-self'] } };

    // Case 1: the whole paragraph is the note.
    if (text.trimStart().startsWith(TODO)) {
      const first = children[0];
      if (first && first.type === 'text') ctx.setProperty(first, 'value', stripPrefix(first.value));
      ctx.setProperty(node, 'data', { hProperties: note.hProperties });
      return;
    }

    // Case 2: normal copy, then a note. Split at the text node that holds TODO(Matt).
    const at = children.findIndex((c) => c.type === 'text' && c.value.includes(TODO));
    if (at === -1) return;
    const t = children[at];
    const cut = t.value.indexOf(TODO);
    const before = t.value.slice(0, cut).replace(/\s+$/, '');
    const head = {
      type: 'paragraph',
      children: [...children.slice(0, at), ...(before ? [{ type: 'text', value: before }] : [])],
    };
    const tail = {
      type: 'paragraph',
      data: { hProperties: note.hProperties },
      children: [{ type: 'text', value: stripPrefix(t.value.slice(cut)) }, ...children.slice(at + 1)],
    };
    ctx.replaceNode(node, head.children.length ? [head, tail] : [tail]);
  },
  // Case 3: an HTML comment. <!-- TODO(Matt): … --> becomes a visible note; any other comment is removed.
  html(node, ctx) {
    const raw = node.value ?? '';
    if (!raw.trimStart().startsWith('<!--')) return;
    const inner = raw.replace(/^\s*<!--/, '').replace(/-->\s*$/, '').replace(/\s+/g, ' ').trim();
    if (!inner.includes(TODO)) {
      ctx.removeNode(node);
      return;
    }
    // Keep only the question itself: any drafting note written before the TODO is not for the page.
    const text = stripPrefix(inner.slice(inner.indexOf(TODO)));
    const parent = ctx.parent(node);
    const inline = parent && !['root', 'blockquote', 'listItem', 'footnoteDefinition'].includes(parent.type);
    ctx.replaceNode(node, inline ? { type: 'text', value: text } : noteNode(text));
  },
};

/** Astro integration: after the build, read every dist/*.html page, weigh it and the CSS it links, and swap the receipt's placeholders (__HTML_KB__, __CSS_KB__) for the real numbers. Measures the built output, never the source. */
const pageWeight = {
  name: 'page-weight',
  hooks: {
    'astro:build:done': ({ dir }) => {
      const root = fileURLToPath(dir);
      const kb = (bytes) => (bytes / 1024).toFixed(1);
      const walk = (d) =>
        fs.readdirSync(d, { withFileTypes: true }).flatMap((f) => (f.isDirectory() ? walk(path.join(d, f.name)) : f.name.endsWith('.html') ? [path.join(d, f.name)] : []));
      for (const file of walk(root)) {
        let html = fs.readFileSync(file, 'utf8');
        if (!html.includes('__HTML_KB__')) continue;
        // CSS weight: every stylesheet the page links, read from dist.
        let css = 0;
        for (const m of html.matchAll(/<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"/g)) {
          const href = m[1];
          if (!href.startsWith('/')) continue;
          try { css += fs.statSync(path.join(root, href)).size; } catch { /* external sheet: not counted */ }
        }
        html = html.replace(/__CSS_KB__/g, kb(css));
        // HTML weight: the finished file, so the number is measured again until it stops moving.
        let out = html.replace(/__HTML_KB__/g, kb(Buffer.byteLength(html, 'utf8')));
        for (let i = 0; i < 3; i++) {
          const next = html.replace(/__HTML_KB__/g, kb(Buffer.byteLength(out, 'utf8')));
          if (next === out) break;
          out = next;
        }
        fs.writeFileSync(file, out);
      }
    },
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://mjzun.github.io',
  integrations: [pageWeight],
  markdown: {
    // smartPunctuation off: the site uses straight quotes everywhere, never curly ones.
    processor: satteri({ mdastPlugins: [noteToSelf], features: { smartPunctuation: false } }),
  },
});
