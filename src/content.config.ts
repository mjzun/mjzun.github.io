// content.config.ts — declares the "work" collection: one Markdown file per case study in src/content/work, checked against the fixed frontmatter schema from docs/PLAN.md.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The five tracks every piece is tagged with (PORTFOLIO_BRIEF.md "Tracks").
export const TRACKS = ['design', 'presentation', 'data', 'ai', 'leadership'] as const;

const work = defineCollection({
  // Files whose name starts with "_" are drafts and are skipped by the loader.
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/work' }),
  // `image` is Astro's helper: an image path (relative to the Markdown file, e.g. "../../assets/work/<slug>/file.png") is checked at build time and handed to <Image> as real file data.
  schema: ({ image }) => z.object({
    title: z.string(),
    slug: z.string(),
    tracks: z.array(z.enum(TRACKS)).min(1),
    featured: z.boolean(),
    // lead: true puts this piece in the large "LEAD PROJECT" block at the top of the home page (one piece at a time).
    lead: z.boolean().optional(),
    // hero: a looping demo video shown full-width behind the top of the case study (files live in public/).
    // embed: a live interactive piece (an HTML page in public/) shown in a labelled window that loads on demand.
    embed: z.object({ src: z.string(), title: z.string(), note: z.string().optional(), height: z.number().optional() }).optional(),
    hero: z.object({ mp4: z.string(), webm: z.string().optional(), poster: z.string(), caption: z.string().optional(), width: z.number().optional(), height: z.number().optional() }).optional(),
    order: z.number(),
    date: z.string(), // "YYYY-MM" end date; may still be a TODO string while Matt fills it in
    timeline: z.string(),
    role: z.string(),
    audience: z.string(),
    constraint: z.string(),
    outcome: z.string(),
    tools: z.array(z.string()),
    images: z.array(
      z.object({
        src: image(),
        alt: z.string().min(1), // every real image must carry alt text; a blank one fails the build
        caption: z.string().optional(),
      }),
    ),
    // Labelled link rows under the outcome: "LIVE APP" · title ↗ · note.
    links: z
      .array(
        z.object({
          kind: z.string().default('LINK'), // the generic name printed in quotes, e.g. "LIVE APP"
          label: z.string(),
          url: z.string().url(),
          note: z.string().optional(),
        }),
      )
      .optional(),
    // cover: the thumbnail on the home page and Work list, when it should differ from the first gallery image (e.g. a logo).
    cover: z.object({ src: image(), alt: z.string().min(1) }).optional(),
    // reels: short vertical videos (files in public/) shown as posted, in phone-shaped frames that play when on screen.
    reels: z.array(z.object({ src: z.string(), poster: z.string(), title: z.string(), caption: z.string().optional(), width: z.number(), height: z.number() })).optional(),
    // A Jupyter notebook printed in place of the image gallery.
    notebook: z
      .object({
        path: z.string(), // relative to the project root, e.g. "src/content/notebooks/x.ipynb"
        repo: z.string().url(),
        alts: z.record(z.string(), z.string()).optional(), // alt text per chart output, keyed by execution count
      })
      .optional(),
  }),
});

export const collections = { work };
