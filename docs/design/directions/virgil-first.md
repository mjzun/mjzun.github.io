<!-- Rationale for the "Virgil-first" home-page direction: type, color, spacing, glass recipe, motion rules, and what was borrowed vs. left alone. -->
# Direction: Virgil-first

Mockup: `docs/design/mockups/virgil-first.html` (single file, inline CSS, Google Fonts, ~20 lines of vanilla JS for the track filter).
Reference: `docs/design/virgil_design_brief.md`.

## The idea in one paragraph

The page is a document, not a website. Off-white paper, black grotesque type, an index instead of a menu, a spec line at the top that labels the obvious ("PORTFOLIO", "c/o Matthew Jay Zuniga", "MADE IN CHAPEL HILL, NC — 2026"), and one quoted headline held at arm's length. Every case-study card leads with a number from the brief, never an adjective. Glass appears in exactly two places: the floating dock that is the only persistent navigation, and the caption panel that sits over each photograph. Everything else is flat ink on paper.

## Type system

Two families, both SIL OFL on Google Fonts. No Helvetica files, no Modern No. 20.

| Role | Family | Weight | Size |
|---|---|---|---|
| Headline (positioning line) | Archivo | 700, letter-spacing −0.02em, line-height 0.98 | `clamp(30px, 5.2vw, 76px)` |
| Section titles, index entries, name | Archivo | 700 | H2 `clamp(22px, 2.4vw, 34px)`; index `clamp(15px, 1.15vw, 18px)` |
| Card titles | Archivo | 700, letter-spacing −0.01em | `clamp(17px, 1.3vw, 20px)` |
| Body, card outcome | Archivo | 400 | body `clamp(15px, 1.05vw, 17px)`, line-height 1.45; outcome 14px |
| Dock labels | Archivo | 500 | 13–14px |
| Spec line, meta, chips, index letters, image labels, colophon | Courier Prime | 400 | 13px (image labels 11px) |

Rules: caps are typed literally into the HTML, never via `text-transform`. Letter-spacing is only used to tighten display sizes; nothing is tracked out. The `vw`-scaled sizes always sit inside `clamp()` so body text never drops below 15px (the original site's 0.78vw body has no floor; ours does).

Fallback stacks: `"Archivo", "Helvetica Neue", Helvetica, Arial, sans-serif` and `"Courier Prime", "Courier New", Courier, ui-monospace, monospace`.

## Color tokens

Five values plus one hairline. Text uses only the first four.

| Token | Hex | Use | Contrast on ground |
|---|---|---|---|
| `--ground` | `#F2F0EA` | page background, glass tint, chip/dock text on ink | — |
| `--ink` | `#111111` | all body text, frames, active chip | 16.6:1 |
| `--signal` | `#0028CC` | every link, the index, section letters, card numbers | 8.5:1 |
| `--alert` | `#C81E1E` | the resume pill only (outline + text) | 5.0:1 |
| `--mute` | `#5C5951` | meta text (dates, notes); never inside glass | 6.1:1 |
| `--rule` | `#B9B5AB` | 1px hairlines only; never text | n/a |

All text pairs pass WCAG AA (≥ 4.5:1). Inverted `::selection` (ink background, ground text). No greys for text other than `--mute`.

The signal color is deliberately not the pure `#0000FF` of the reference site, the ground is not pure white, and image frames are ink rather than blue, so the three-part FREE GAME signature (pure blue + Courier body + quoted caps title) is not reproduced.

## Spacing scale

Base unit `--u: 10px`. Fixed steps: 4 / 8 / 10 / 20 / 30 / 40. Fluid steps: gutter `clamp(10px, 2vw, 30px)`, section gap `clamp(40px, 6vw, 100px)`. Card grid gap = 30px row / gutter column. Hairlines separate list rows; 1.5px ink rules open each section. Grid: one column under 640px, two to 1100px, three above. Masthead splits 7/5 above 960px; About and Resume split 5/7.

## Glass recipe

Used on `.dock` and `.caption` only.

```css
background: rgba(242, 240, 234, 0.88);            /* ground at 88% */
backdrop-filter: blur(18px) saturate(140%);       /* + -webkit- prefix */
border: 1px solid rgba(17, 17, 17, 0.22);
box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);   /* top edge highlight, no drop shadow */
```

Why 88%: at that opacity the panel blended over a pure-black photograph is `#D5D3CE`, which still gives ink 12:1 and signal blue 6.4:1, so captions pass AA over any image. Muted grey is banned inside glass because it would fall to 4.4:1 over black. Dock is `border-radius: 999px`; captions keep square corners to match the ink frames. If `backdrop-filter` is unsupported, the 88% tint alone still reads.

## Motion rules

- No `transition` declarations. Hover on links thickens the underline; hover on dock items inverts to ink; nothing eases.
- One animation on the whole site: the block cursor after the headline blinks (`steps(1)`, 1.4s), wrapped in `@media (prefers-reduced-motion: no-preference)`.
- No scroll-triggered reveals, no carousels, nothing that delays content. The filter hides and shows cards instantly.
- Anchor jumps are native; `scroll-padding-top` keeps section rules clear of the top edge.

## What was borrowed from the FREE GAME system, and how it was changed

| Borrowed idea | How it appears here | What was not copied |
|---|---|---|
| Table of contents as the navigation | "INDEX (A–E)", a lettered `<ol>` in signal blue beside the headline; the dock repeats the letters | The "FROM A – Z (TABLE OF CONTENTS)" wording, the two-column fixed header, the twelve chapters |
| Bold grotesque caps labels + monospace document voice | Archivo 700 for labels, Courier Prime for spec lines and meta | Helvetica system font, Courier as the body face (body is Archivo here so the page reads at phone sizes) |
| Quoted words held at a distance | Two quotes on the whole page: the positioning headline and one line of Matt's own words in About | Quotes on every heading; the "FREE GAME" masthead; any of the site's sentences |
| Spec-sheet labelling | "PORTFOLIO", "c/o", "MADE IN … — 2026", "REV. 1 / HOME", image placeholders that name the file that goes there | ™ on the name, "---" separators, Off-White marks or arrows |
| Framed media, no radius, no shadow | 1.5px ink frame on every image | 3px pure-blue frames |
| Four-color rule | Ground, ink, one signal, one alert; grey only for meta | Pure `#FFF` / `#00F` / `#F00` |
| One blinking glyph as the only animation | Block cursor after the headline, reduced-motion aware | The sparkle emoji in a red pill |
| 10px base unit with viewport-scaled rhythm | `--u: 10px`, `clamp()`-bounded vw steps | Unbounded vw type, `user-scalable=0` |
| Hand-painted numerals | Not used. Card numbers are typed `01–06` in Courier; if Matt wants a hand element later he draws his own | The brush-lettered PNGs |

Nothing from the reference site is reused: no text, no images, no font files, no marks. The debt is to a way of laying out a page, which is credited in the colophon in plain words.

## What Matt has to supply for this direction

Six 4:3 photographs or exports at 2x (WebP), one per featured card; the resume PDF at `/Zuniga_Matthew_Resume.pdf`; confirmation from EdMotion on what the heatmap image may show.

## Verification (2026-09-13)

- Rendered in headless Chrome at 1280px (three-column grid, 7/5 masthead) and in an exact 400px viewport (one column, no horizontal scroll, dock drops its letter keys). Screenshots were checked by eye.
- Measured contrast (WCAG 2.x formula): ink on ground 16.6:1, signal on ground 8.5:1, alert on ground 5.0:1, mute on ground 6.1:1; inside 88% glass over pure black, ink 12.6:1 and signal 6.5:1. Every text pair on the page is ≥ 4.5:1.
- Card links use the real case-study slugs from `src/content/work/` (`raider-education`, `texas-tech-event-collateral`, `edmotion-competitor-heatmap`, `aei-replication`, `lovable-apps`, `gpsg-vice-president`).
- No phone number, no GPA, no sentence, image, font file, or mark from the reference site.
