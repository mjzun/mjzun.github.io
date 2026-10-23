// case.ts — small helpers every page shares: two-digit numbers, TODO(Matt) detection, "—" for unanswered fields, the list of frontmatter questions a case study still carries (rendered as "NOTE TO SELF" lines), and the c/o organisation read from a case study's role.
import type { CollectionEntry } from 'astro:content';

export type Work = CollectionEntry<'work'>;

/** "7" → "07". */
export const pad = (n: number) => String(n).padStart(2, '0');

/** True when a string still holds a question for Matt. */
export const isTodo = (s: string) => s.includes('TODO(Matt)');

/** A frontmatter value renders as "—" while it is still a TODO(Matt) or empty. */
export const clean = (s: string) => (!s || isTodo(s) ? '—' : s);

/** "2025-07" → "2025-07"; anything unanswered → "—". */
export const dateOf = (e: Work) => clean(e.data.date);

/** True when any frontmatter value or the Markdown body still carries a TODO(Matt). Drives the "WORK IN PROGRESS" band. */
export const hasTodo = (e: Work) => isTodo(JSON.stringify(e.data)) || isTodo(e.body ?? '');

/** The question text without its "TODO(Matt):" prefix, so the "NOTE TO SELF" label is not doubled. */
export const stripTodo = (s: string) => s.replace(/^\s*TODO\(Matt\)\s*[:—-]?\s*/, '').replace(/\s+/g, ' ').trim();

/** Every frontmatter field that is still a TODO(Matt), as { key, text } pairs, e.g. { key: "DATE", text: "YYYY-MM — month the term ended" }. Rendered inside the "NOTES" block so the WORK IN PROGRESS band always has something to point at. */
export const frontmatterTodos = (e: Work): { key: string; text: string }[] => {
  const d = e.data;
  const out: { key: string; text: string }[] = [];
  const fields: [string, string][] = [
    ['DATE', d.date],
    ['TIMELINE', d.timeline],
    ['ROLE', d.role],
    ['AUDIENCE', d.audience],
    ['CONSTRAINT', d.constraint],
    ['OUTCOME', d.outcome],
  ];
  for (const [key, value] of fields) if (isTodo(value)) out.push({ key, text: todoPart(value) });
  for (const t of d.tools) if (isTodo(t)) out.push({ key: 'TOOLS', text: todoPart(t) });
  for (const img of d.images) for (const v of [img.alt, img.caption ?? '']) if (isTodo(v)) out.push({ key: 'IMAGE', text: todoPart(v) });
  return out;
};

/** From "Some copy. TODO(Matt): the question" keep only the question. */
const todoPart = (s: string) => stripTodo(s.slice(s.indexOf('TODO(Matt)')));

/** A frontmatter value with any trailing TODO(Matt) sentence removed, so a half-answered field still prints its answered half. Fully unanswered → "—". */
export const answered = (s: string) => {
  if (!s) return '—';
  const at = s.indexOf('TODO(Matt)');
  if (at === -1) return s;
  const kept = s.slice(0, at).trim();
  return kept || '—';
};

/** Organisations we know how to spot in a role or title. First match wins; nothing matched → "SELF". */
const ORGS: [RegExp, string][] = [
  [/lovable/i, 'LOVABLE'],
  [/stemplug/i, 'STEMPLUG'],
  [/edmotion/i, 'EDMOTION'],
  [/texas tech/i, 'TEXAS TECH'],
  [/\bUNC\b/, 'UNC'],
];

/** The c/o line: the organisation the work was made for, else c/o SELF. */
export const orgOf = (e: Work) => {
  const haystack = `${e.data.role} ${e.data.title}`;
  for (const [re, name] of ORGS) if (re.test(haystack)) return name;
  return 'SELF';
};

/** Every published case study, in Work-page order. */
export const sortWork = (all: Work[]) => [...all].sort((a, b) => a.data.order - b.data.order);
