# Direction: "Glass-first"

<!-- Rationale and token sheet for the glass-first portfolio direction; pairs with docs/design/mockups/glass-first.html. -->

Mockup: `docs/design/mockups/glass-first.html` (single file, inline CSS, Google Fonts, ~40 lines of vanilla JS for the track filter).

## The idea in one paragraph

The old Figma prototype already had a voice: a near-black ground, white grotesque type, soft-bordered rounded cards. This direction keeps that voice and makes it the whole interface. Every surface is frosted glass sitting on faint colour blooms, so the page has depth without decoration. Virgil Abloh's FREE GAME contributes only its *typographic grammar*: section titles held in quotation marks, a numbered all-caps table of contents instead of a menu, and monospace spec-sheet labels that name things plainly (ROLE, TIMELINE, GROUND, TYPE). No brush lettering, no pure blue, no borrowed sentences. The site should read as a designed object that happens to be a portfolio, not a portfolio template with a dark theme.

## Type system

Three voices, each with one job. Weights are the only ones loaded from Google Fonts.

| Voice | Family (Google Fonts, SIL OFL) | Weights | Used for |
|---|---|---|---|
| Label | `Inter` | 500, 600, 700 | Section titles, TOC, chips, card titles, the positioning line, key facts |
| Document | `Courier Prime` | 400, 700 | Body prose, outcomes, spec labels, image notes, colophon |
| Accent | `Bodoni Moda` italic | 400 (optical size 6–96) | Exactly one word on the home page (the last word of the positioning line) |

Fallback stacks: `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif` · `"Courier Prime", "Courier New", Courier, ui-monospace, monospace` · `"Bodoni Moda", Didot, "Times New Roman", serif`.

Sizes (px unless noted; `clamp()` gives a floor so nothing goes below 10px, unlike the source site):

| Role | Size | Weight | Case | Line height |
|---|---|---|---|---|
| Positioning line (h1) | `clamp(30px, 4.6vw, 62px)` | 600, accent word 400 italic | Sentence | 1.06, tracking −0.015em |
| Section title (h2) | `clamp(28px, 5vw, 56px)` | 700 | ALL CAPS, wrapped in “ ” via CSS `::before/::after` | 1.0 |
| Card title (h3) | 20 | 600 | Sentence | 1.2 |
| Contact value | 18 | 600 | as-is | 1.2 |
| Key-fact value | 14–15 | 600 | Sentence | 1.3 |
| Body / outcome | 15 desktop, 14 mobile (Courier Prime) | 400 | Sentence | 1.55 |
| Label (TOC, chips, nav) | 12 | 700 | ALL CAPS | 1.2 |
| Spec label | 12 (11 in the hero) | 400 Courier | ALL CAPS | 1.5 |
| Track tag | 10 | 700 | ALL CAPS | 1.2 |

Rules: no `letter-spacing` on labels (natural tracking, as in the source); caps come from `text-transform`, never typed in, so screen readers get normal words; the italic accent appears once per page, never on headings.

## Colour tokens

Ground and surfaces:

| Token | Hex / value | Role |
|---|---|---|
| `--ground` | `#141519` | Page ground (the old prototype's near-black) |
| `--ground-deep` | `#0E0F12` | Footer, image-note wells |
| `--glass-bg` | `rgba(255,255,255,0.06)` → reads as `#222327` over ground | Every glass panel |
| `--glass-bg-hover` | `rgba(255,255,255,0.09)` | Card and contact hover |
| `--glass-border` | `rgba(255,255,255,0.12)` | 1px panel edge, rules, dividers |
| `--glass-border-strong` | `rgba(255,255,255,0.22)` | Hover / focus edge |
| `--glass-highlight` | `rgba(255,255,255,0.10)` | 1px inner top highlight |

Text and signal:

| Token | Hex | Contrast on `#141519` | On brightest glass (`#3C414B`) |
|---|---|---|---|
| `--ink` | `#F3F3F1` | 16.4 : 1 | 8.8 : 1 |
| `--ink-2` | `#B7B9C1` | 9.3 : 1 | 5.2 : 1 |
| `--ink-3` | `#B0B3BD` | 8.7 : 1 | 4.9 : 1 |
| `--signal` | `#A8C8FF` | 10.8 : 1 | 5.8 : 1 |
| `--alert` | `#FF9A7C` | 8.8 : 1 | 5.0 : 1 |
| ground text on signal chip | `#141519` on `#A8C8FF` | 10.8 : 1 | — |
| ground text on alert CTA | `#141519` on `#FF9A7C` | 8.8 : 1 | — |

All text pairs clear WCAG AA (4.5:1) on every surface, including the worst case: the hover glass (9% white) sitting on the brightest bloom peak (14% ice-blue over ground), which renders as `#3C414B`. Ratios come from the WCAG 2.x formula; the script that produced them is a dozen lines of Python and worth keeping next to the tokens. The 1px glass borders (12% and 22% white, about 1.4:1 and 2.0:1) are decorative: no control is identified by its border alone. Chips and links are identified by their text, and every focusable element gets a 2px signal-coloured focus ring, so WCAG 1.4.11 is met by the ring, not the edge.

Four-colour rule, borrowed from the source's discipline: ink, ground, one signal (`--signal` for the TOC, links, active chip, track tags) and one alert (`--alert` for the single resume CTA). Nothing else is coloured. The signal is ice-blue instead of pure `#0000FF` deliberately (see "what was not copied").

Bloom layer (what the glass blurs; `position: fixed`, `z-index: -1`, no JS, no animation):

```css
radial-gradient(60vw 40vw at 85% -10%, rgba(168,200,255,0.14), transparent 60%),
radial-gradient(50vw 35vw at -10% 45%, rgba(255,154,124,0.10), transparent 60%),
radial-gradient(45vw 30vw at 60% 110%, rgba(127,227,198,0.08), transparent 60%),
#141519;
```

## Spacing scale

4px base, ten steps, used as CSS custom properties:

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 144

- Page gutter `clamp(16px, 4vw, 48px)`; content max-width 1280px.
- Section rhythm: `--s-9` (96px) top and bottom on desktop, `--s-8` (64px) under 640px.
- Card padding `--s-5`; grid gap `--s-5`; header padding `--s-3 --s-5`.
- Grid: 3 columns ≥ 961px · 2 columns 641–960px · 1 column ≤ 640px. Contact and about panels collapse to one column at 960px.
- Image wells are fixed `4:3` so the grid stays even before real images arrive.

## Glass recipe

```css
.glass {
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.10);   /* the "lit top edge" */
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  border-radius: 20px;                                  /* pills: 999px */
}
@supports not (backdrop-filter: blur(1px)) {
  .glass { background: rgba(34,35,39,0.94); }           /* opaque fallback, same contrast */
}
```

- One recipe, applied to the sticky header, hero spec block, chips, cards, about panels, contact tiles. No drop shadows anywhere; depth comes from the blur and the inner highlight only.
- Chips use the same recipe with `border-radius: 999px`; the active chip inverts to solid signal with ground-coloured text.
- Image wells sit inside the card with a 1px bottom rule so photography meets glass on a hard edge (no feathered overlays).
- On the image well, notes and numerals sit on `rgba(14,15,18,0.72)` with a glass border so they stay legible on any photo.
- The sticky header becomes static below 640px so it never eats a phone screen.
- Performance: blur is applied only to elements that are on screen and small; the bloom layer is plain gradients, so the page ships zero images and paints in one pass.

## Motion rules

- **No animation on load, no reveal-on-scroll, no parallax, no carousels.** Content is visible in the first paint.
- The only transitions are 150ms `ease` on `border-color`, `background-color`, and `color` for hover and focus on chips, cards, contact tiles and the resume CTA. Nothing moves; nothing scales.
- `prefers-reduced-motion: reduce` sets every transition to `none`.
- Anchor jumps are native (`scroll-behavior: auto`); no smooth scroll.
- Filtering swaps `hidden` on cards immediately; no fade.

## Accessibility notes

- All text ≥ 4.5:1 on every surface it can land on; focus rings, not borders, carry the 3:1 UI-boundary requirement.
- Focus ring: `2px solid var(--signal)` with 3px offset, visible on the dark ground.
- Filter chips are real `<button>`s with `aria-pressed`; the grid is a `<ul>`; the whole card is one link (`h3 a::after` covers the card) so there is a single tab stop per case study.
- Image wells have `role="img"` and `aria-label` describing the intended image; real images will carry `alt` text and WebP sources.
- Viewport is not zoom-locked. Type never drops below 10px.
- Inverted `::selection` (ink on ground), a cheap nod to the source that costs nothing.

## How Virgil's language was borrowed, and what was not copied

Borrowed as *grammar* (rewritten in Matt's own words):

- **Quoted section titles** — “01 SELECTED WORK”, “02 ABOUT”, “04 CONTACT”, and the kicker “INTRODUCTION”. The quotes are added by CSS, so the words themselves are plain.
- **TOC instead of a menu** — a numbered `<ol>` in the header (01 WORK · 02 ABOUT · 03 RESUME · 04 CONTACT), signal-coloured, all caps, two columns on mobile. It doubles as the sitemap.
- **Spec-sheet labelling** — Courier Prime key/value pairs everywhere: EDUCATION / TRACKS / CASE STUDIES in the hero; ROLE / TIMELINE on each card; a colophon that names the site's own parts (PORTFOLIO · TYPE · GROUND · BUILT WITH). "c/o Matt" and "Edition 2026" are the place-and-date stamp idea, in Matt's own phrasing.
- **Three-voice type** — monospace document + bold grotesque labels + one Didone italic, each with a free Google Font.
- **Four-colour discipline** and a single alert pill for the one CTA (the resume).
- **Numbered items** — "No. 01"–"No. 06" on the cards as plain set type, not painted numerals.

Deliberately not copied:

- No sentences, bios, or chapter names from the source ("FREE GAME", "FROM A - Z", "HOW TO MAKE A BRAND" do not appear).
- No hand-painted lettering or numerals; no ™ on names; no Off-White marks, stripes or arrows; no fake OS windows.
- No Helvetica or Modern No. 20 files: Inter and Bodoni Moda stand in.
- The literal FREE GAME combination (white page + pure `#0000FF` + Courier + quoted caps masthead) is broken on purpose: the ground is near-black, the signal is ice-blue `#A8C8FF`, and the masthead is set type, not artwork. The quotation-mark device is limited to section titles and the kicker (never on card titles or body copy), so it reads as a nod rather than a costume.
- None of the source's accessibility anti-patterns (zoom lock, 0.78vw body text, missing fallbacks, colour-only links).

## Open questions for Matt

1. Photos and exports will decide whether the 4:3 wells should become 3:2 for flyers; the grid holds either.
2. The Bodoni accent word ("meet.") is a taste call; dropping it leaves a two-voice system that is still coherent.
3. If EdMotion asks for the heatmap to stay private, card No. 03 can swap for the STEMPLUG relaunch (6,000+ views) without changing the layout.
4. Fifteen case studies are drafted in `src/content/work/`, eight of them flagged `featured`. The home grid shows six; the brief allows 6–8, so the STEMPLUG relaunch and the faculty AI training could join as a third row if Matt wants the grid to carry every track twice.

## Verified against the build

- Rendered in headless Chrome at 1280px and inside a 400px frame: three columns, then one; no horizontal scroll at 400px (`scrollWidth` = 400).
- Card links match the real slugs in `src/content/work/` (`raider-education`, `texas-tech-event-collateral`, `edmotion-competitor-heatmap`, `aei-replication`, `lovable-apps`, `gpsg-vice-president`).
- Every number on the page (60+, 25–30, 10 competitors, 3,514, 923, ~3×, ~4×, five apps, 110+, 11,553, ~10 trainings) comes from the brief's Verified facts section.
