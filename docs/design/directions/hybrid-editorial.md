<!-- Rationale and token sheet for the hybrid-editorial portfolio direction; pairs with docs/design/mockups/hybrid-editorial.html. -->

# Direction: "Hybrid Editorial"

Mockup: `docs/design/mockups/hybrid-editorial.html` (single file, inline CSS, Google Fonts only, ~20 lines of vanilla JS that preview the chip filter; on the real site the chips are plain links to `/work/?track=…`).

## The idea in one paragraph

The page is paper. Almost everything on it is black type on an off-white ground with hairline rules, so the only colour comes from the work itself: large photographs, flyers, decks, and charts. Captions and the track filter do not sit beside the images, they float on top of them as frosted-glass panels, which lets every card be mostly picture without losing its title and outcome. Virgil Abloh's FREE GAME supplies the grammar, not the assets: every piece is held in quotation marks, numbered 01–12 like an industrial index, and followed by a monospaced spec line (ROLE / TIMELINE / TRACKS) that names things plainly. It is a magazine spread run through a spec sheet.

## Type system

Three voices, one job each. Only the weights listed are loaded.

| Voice | Family (Google Fonts, SIL OFL) | Weights | Used for |
|---|---|---|---|
| Display / UI | `Instrument Sans` | 400, 500, 600 | Positioning line, card titles, nav, chips, section labels, contact links |
| Document | `Courier Prime` | 400, 700 | Spec lines (ROLE / TIMELINE / TRACKS), index numbers, image notes, the place/date stamp, colophon |
| Flourish | `Bodoni Moda` italic | 400, optical size 96 | Once per screen: the middle clause of the positioning line, the last two words of the contact heading |

Fallback stacks: `"Instrument Sans", "Helvetica Neue", Helvetica, Arial, sans-serif` · `"Courier Prime", "Courier New", Courier, ui-monospace, monospace` · `"Bodoni Moda", Didot, "Bodoni 72", Georgia, serif`.

Instrument Sans was chosen over Inter because it is a warmer, slightly narrower grotesque; the site should read as edited, not as a dashboard. Bodoni Moda is the licensed stand-in for the Didone italic FREE GAME uses once (see the Virgil brief, section 1.4).

Sizes (rem, 16px base; `clamp()` gives every fluid size a floor and ceiling):

| Role | Size | Weight | Case | Line height / tracking |
|---|---|---|---|---|
| Positioning line (h1) | `clamp(2.125rem, 1rem + 4.6vw, 5rem)` = 34–80px | 500, flourish 400 italic at 1.04em | Sentence | 1.02 / −0.03em |
| Contact heading (h2) | `clamp(1.75rem, 1rem + 3vw, 3.5rem)` = 28–56px | 500 | Sentence | 1.05 / −0.03em |
| Card title (h3, on glass) | `clamp(1.125rem, 0.95rem + 0.9vw, 1.625rem)` = 18–26px, wrapped in “ ” | 600 | Sentence | 1.15 / −0.02em |
| Card summary (on glass) | 0.9375rem = 15px | 400 | Sentence | 1.5 |
| Body / nav / index titles | 1rem = 16px | 400–500 | Sentence | 1.5 |
| Chip | 0.875rem = 14px, count 0.75rem mono | 500 | Sentence | 1.2 |
| Section label (h2 "Selected work", "Index") | 0.75rem = 12px | 600 | ALL CAPS via `text-transform` | 1.5 / +0.08em |
| Spec line | 0.75rem = 12px, Courier Prime; keys 700 in ink | 400 | Keys ALL CAPS, values as-is | 1.6 |
| Image note (placeholder only) | 0.6875rem = 11px mono | 400 | as-is | 1.4 |

Rules: caps come only from `text-transform` or from typing the spec keys in caps, never from a display font; the italic flourish never appears on a card or a label; quoted titles use real curly quotes (“ ”) typed in the HTML so they read correctly to screen readers; the h1 has a 20ch measure and card summaries a 48ch measure.

## Colour tokens

Four ink values, one signal, plus the glass. Everything else on the page is an image.

| Token | Hex | Role | Contrast on `--paper` |
|---|---|---|---|
| `--paper` | `#F5F4F0` | Page ground | — |
| `--paper-2` | `#EAE8E2` | Hover ground, empty placeholder fill | — |
| `--rule` | `#D6D3CB` | Hairlines between index rows and contact links, spec separators | decorative |
| `--ink` | `#111111` | Text, 1px image frames, active chip fill | 17.2:1 |
| `--ink-2` | `#4A4844` | Secondary text: spec values, card summaries, index track tags | 8.3:1 |
| `--signal` | `#A83907` | The one colour: resume link, "All 12 pieces" link, index numbers, email link, hover frame, focus ring | 5.9:1 |
| `--signal-soft` | `rgba(168,57,7,0.10)` | Reserved for a selected-row tint on the Work page | — |

Why a burnt orange instead of FREE GAME's pure blue: the brief says stacking pure `#00f` + Courier + quoted caps is the literal FREE GAME look. Swapping the signal to a rust that echoes the Raider Education red keeps the "one signal colour" rule while making it Matt's.

Measured on the glass, over the darkest stop of each placeholder (worst case, glass at 82% over `#111`): ink 11.6:1, ink-2 5.6:1, both AA for normal text. The signal colour is deliberately *not* used on glass (3.98:1 in that case): card numbers on glass are set in ink, and the signal only appears on solid paper. The placeholder image notes are paper on `rgba(17,17,17,0.72)`; over the lightest gradient stop they measure 7.6:1.

Dark mode: not offered. The direction is paper; a single committed look is part of the sample.

## Spacing scale

Base unit 4px, doubling loosely; every margin, gap, and padding on the page is one of these:

`--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64 · `--s-9` 96 · `--s-10` 128

Fluid values: section gap `--section: clamp(48px, 8vw, 128px)`; side gutter `--gutter: clamp(16px, 3vw, 32px)`; content width `min(100% - 2*gutter, 1280px)`.

Grid: one column under 760px; a 12-column grid above it. The six featured cards run 7+5 / 4+4+4 / 12 so the row rhythm is wide, three-up, full-bleed, and the image ratios change with the span (3:2 for span 7, 4:5 for spans 4 and 5, 21:9 for span 12, 4:5 for everything on mobile). Images get a 1px ink frame, no radius, no shadow.

## Glass recipe

One class, `.glass`, used for exactly two things: image captions and the chip bar. Nothing else is glass, so the effect stays a device rather than a theme.

```css
.glass {
  background: rgba(245, 244, 240, 0.82);        /* paper at 82% */
  backdrop-filter: blur(14px) saturate(140%);   /* plus -webkit- prefix */
  border: 1px solid rgba(17, 17, 17, 0.14);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.55);  /* single top highlight */
  border-radius: 4px;
}
```

Placement: captions sit 12px inside the image on all sides (8px under 480px) and are laid out as a two-column grid, number then title, with the summary hanging under the title. The chip bar is pulled up 24px over the hero image's bottom edge so it straddles image and paper; the hero caption is offset 44px to clear it. If `backdrop-filter` is unsupported the 82% paper fill alone still passes contrast, which is why the alpha is that high.

## Motion rules

- No animation delays content. Nothing fades or slides in on load or on scroll.
- The only transitions are 120ms linear on chip background and image frame colour, and only inside `@media (prefers-reduced-motion: no-preference)`.
- Hover: links underline (offset 0.18em); a card's frame turns signal and its title underlines; chips shift to `--paper-2`.
- Focus: 2px signal outline, 3px offset, on every link and button.
- `::selection` is inverted (ink ground, paper text).
- Filtering swaps `hidden` on cards and updates the live-region count; no layout animation.

## What was borrowed from Virgil, and what was not

Borrowed as *ideas*, expressed in Matt's own material:

- **Quoted titles.** Every piece is titled in curly quotes (“Raider Education”, “AEI replication”). The tab title is “ZUN”, Matt's own name for his brand since 2021, not any Abloh phrase.
- **Industrial numbering.** Pieces carry 01–12 by track order and the home page ends with a two-column numbered Index that doubles as a table of contents. The numerals are Courier Prime 700, not brush lettering.
- **The spec line.** ROLE / TIMELINE / TRACKS under every card, plus PORTFOLIO / BASED / EDITION / PIECES under the h1 and MADE IN / BUILT WITH / TYPE in the footer: the "name the obvious" caption habit, written as this site's own facts.
- **Three-voice type.** Grotesque labels, monospace document, one Didone italic, but Instrument Sans instead of system Helvetica and Bodoni Moda instead of an unlicensed Modern No. 20.
- **Four-colour discipline.** Paper, ink, one signal, one soft tint; the signal is rust, not `#00f`.
- **Framed media, no motion.** 1px frames on every image; transitions limited to two properties.

Not copied: none of the FREE GAME text, chapter titles, or bios; no "FREE GAME", "FROM A – Z", "HOW TO" phrasings; no ™ on anything; no hand-painted masthead or numeral artwork; no Off-White marks, stripes, or arrows; no Helvetica or Modern No. 20 font files; no `user-scalable=0`, no unfloored vw type, no colour-only links.

## Open questions for Matt

1. Hero image: a flat-lay photo of the Raider Education print set is the plan; a Blender render would also carry the page.
2. Chip counts show featured pieces only; on the Work page they should show totals per track.
3. If EdMotion asks for anonymised competitor names, the heatmap card image needs a redacted export before launch.
