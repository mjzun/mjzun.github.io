// image.ts — measures the WebP file Astro emits for an image at build time (encodes it once with sharp at the largest width the page ships, the same way Astro's sharp service does) so every provenance caption is measured, never typed: "IMAGE" 01 · 1440×900 · WEBP · 96 KB.
import fs from 'node:fs';
import type { ImageMetadata } from 'astro';

export interface WebpFacts {
  width: number;
  height: number;
  /** Size of the emitted WebP in KB, or null when it could not be measured. */
  kb: number | null;
  /** The caption text: 1440×900 · WEBP · 96 KB (KB omitted only when it could not be measured). */
  line: string;
}

/** The widths a case-study image is offered at, capped at the original's own width. */
export const GALLERY_WIDTHS = [480, 800, 1200];
/** The single width a gallery image opens at in its "IMAGE" lightbox (capped at the original's own width). Only downloaded when a visitor opens it. */
export const LIGHTBOX_WIDTHS = [1600];
/** WebP quality for gallery and lightbox images; the caption is measured at the same quality. */
export const GALLERY_QUALITY = 70;
/** The widths an inventory thumbnail is offered at (the well is 120px wide on desktop, the full column on phones). */
export const THUMB_WIDTHS = [240, 480, 720];

/** The widths to request for an image: every width in the list below its own width, then the largest the file can give without being enlarged. */
export const widthsFor = (img: ImageMetadata, list: number[]) => {
  const top = Math.min(img.width, list[list.length - 1]);
  return [...list.filter((w) => w < top), top];
};

const cache = new Map<string, Promise<WebpFacts>>();

/** Facts for the largest WebP Astro emits for this image at these widths. Encoding happens once per image and width. */
export const webpFacts = (img: ImageMetadata, list: number[], quality?: number): Promise<WebpFacts> => {
  const widths = widthsFor(img, list);
  const width = widths[widths.length - 1];
  const height = Math.round((img.height * width) / img.width);
  // Astro attaches the original file's path to imported images as a hidden property.
  const fsPath = (img as ImageMetadata & { fsPath?: string }).fsPath;
  const key = `${fsPath ?? img.src}@${width}q${quality ?? 'default'}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const job = (async (): Promise<WebpFacts> => {
    let kb: number | null = null;
    try {
      if (fsPath) {
        const sharp = (await import('sharp')).default;
        const out = await sharp(fs.readFileSync(fsPath), { failOn: 'none' }).rotate().resize({ width, withoutEnlargement: true }).webp(quality ? { quality } : {}).toBuffer();
        kb = Math.round(out.length / 1024);
      }
    } catch {
      kb = null;
    }
    const line = [`${width}×${height}`, 'WEBP', kb === null ? null : `${kb} KB`].filter(Boolean).join(' · ');
    return { width, height, kb, line };
  })();
  cache.set(key, job);
  return job;
};
