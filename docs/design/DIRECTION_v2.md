# Direction v2 — "PORTFOLIO" c/o MATTHEW JAY ZUNIGA™

Written 2026-09-14 after Matt's correction: *Off-White is the label, not a paper colour.* Version 1 read "off-white" as beige and shipped a document-on-paper look. Version 2 is built on Abloh's actual method, sourced in `virgil_off_white_codes.md`, `virgil_product_language.md`, and `virgil_web_css_findings.md`. Read those three before touching CSS.

## The method (this is the design, not the palette)
1. **Readymade + 3%.** Start from browser defaults and system-looking type. Edit ~3%: a 1px black rule, an uppercase label, straight quotes. No bespoke component library, no rounded cards, no shadows, no gradients.
2. **Label the obvious.** Every element says what it literally is, in straight quotes, all caps: `"NAVIGATION"`, `"IMAGE"`, `"CASE STUDY"`, `"FOOTER"`, `"BUTTON"`. Abloh: *"If there is an airbag, then I'm going to write the word 'AIR' on it."* Straight quotes `"` only — never curly quotes (Fuller: "never smart quotes!").
3. **Show the construction.** Visible 1px rules around layout regions, a "SHOW GRID" toggle, file provenance under every image (`"IMAGE" 1600×1000 · JPG · 210KB`), the page weight in the footer, alt text visible on hover. Nothing is hidden; the site is a Rimowa case.
4. **Publish unfinished, honestly.** Every page that still carries a TODO(Matt) gets a black/white hazard-striped band reading `"WORK IN PROGRESS"`. That is on-brand (the G-Wagen "runs away from the idea of perfection") AND solves the visible-TODO problem: TODOs render as `"NOTE TO SELF"` mono lines, not as broken copy.
5. **Archive, not pitch.** Home is an inventory: one long dated list of everything, filterable by track. No hero carousel, no slogans. The "index / table of contents" is the navigation (Free Game's A–Z).
6. **Tourist / purist.** Every case study shows a one-line caption for the tourist and a `<details>` `"NOTES"` block for the purist (constraints, stack, what changed). "OPEN ALL / CLOSE ALL" toggle at the top, like the 2019 archive.

## Tokens (replace v1 entirely)
```
--paper:   #FFFFFF   (pure white; canary---yellow.com is white, Free Game is white)
--ink:     #000000
--grey:    #A5A5A5   fine print, disabled
--grey-2:  #E6E6E6   rules that are not structural, image wells
--caution: #FFFF00   Off-White's own CSS `--warning-color`; used ONLY in hazard stripes and one focus ring
--tab:     #FE3E0D   Off-White's orange; the zip-tie/NEW tag and the active filter only
--link:    #0019E9   Off-White's link blue (Free Game uses #0000FF); every text link, underlined
```
No other colours. Hover = flat colour swap or opacity .4 (canary 2026). Dark mode: invert paper/ink only; `--grey-2` is derived from paper + ink (`color-mix`) so it follows. **One documented exception:** `--link` becomes ink in dark mode, because #0019E9 on black is 2.4:1 and fails text contrast; links keep their underline, and hover thickens it to 2px (works in both schemes).

## Type (three voices, sizes are hierarchy)
- **Grotesk:** `"Inter Tight"` 800 for object names / headlines, 700 for labels; fallback `Helvetica, Arial`. All caps, `letter-spacing: -0.03em` on display, `0.02em` on small labels. Three sizes only for labels: 12px fine print, 14px labels, then display at `clamp(40px, 9vw, 120px)` with line-height 0.88.
- **Mono:** `"IBM Plex Mono"` (what off---white.com actually uses) for receipts, spec lines, definitions, notes-to-self, the visitor line. Uppercase when used as UI.
- **Serif counter-voice:** `"Bodoni Moda"` italic, for exactly one line on the whole site (the colophon or one word in the positioning line). Off-White's "Bookish" plays this role.
- Body prose (case-study text) stays readable: Inter Tight 400 at 16–17px, sentence case, max 65ch. The all-caps rule is for labels and names, not paragraphs.

## Signage
- **Hazard stripes:** `repeating-linear-gradient(45deg, #000 0 12px, #fff 12px 24px)` as a 24px band — section dividers, the `"WORK IN PROGRESS"` band, the focus ring on the dock. Black/white by default; yellow/black only for a single warning state. **Never** as a bounded rectangle logo block (registered mark).
- **Arrows:** real wayfinding glyphs from the font `→ ↗ ↩`, `"YOU ARE HERE"` on the current nav item, `"EXIT"` for the back link.
- **c/o and ™:** masthead `"PORTFOLIO" c/o MATTHEW JAY ZUNIGA™`; case-study pages `"RAIDER EDUCATION" c/o TEXAS TECH`; `MATTHEW JAY ZUNIGA™` in the footer. ™ only on his own name.
- **Tag:** an orange `"NEW" · 2026-09` pill on items built this month. A corner tag on the hero: `"PORTFOLIO" · VER. 002 · c. 2026`.
- **Receipt footer:** mono, one line per fact: `"PORTFOLIO" / MATTHEW JAY ZUNIGA™ / CHAPEL HILL, NC / c. 2026 / VER. 002 / LAST BUILD [date from build] / HTML + CSS + [n] KB JS / TYPE c/o GOOGLE FONTS`.
- **Visitor line** in the header, computed client-side, no network: `"VISITOR" · 14:03 · 1440×900 · LIGHT`.
- **Definition block** at the top of each track page and case study: `"DESIGN" (n.) — brand identity, collateral, social graphics. See: "PRESENTATION".` in mono, dictionary style, `[2026]` provenance tags like the LV glossary.

## Where the glass goes (the xrunway half of the brief)
Glassmorphism = the fake-OS window. The 2019 Canary Yellow / Free Game windows (4px ridge bevel, blue title-bar gradient) become **frosted glass windows**: `backdrop-filter: blur(16px)`, white at 70%, a 1px black frame, and a title bar that names the window in quotes (`"NAVIGATION"`, `"FILTERS"`, `"IMAGE 03"`). Three uses only: the floating dock, the filter bar on `/work/`, and image lightboxes. Reconcile the exact blur/border/tint with xrunway once Matt grants access; leave the values as tokens.

## Pages
- `/` — masthead + visitor line; positioning line as the one display headline (`"DESIGNER AND ANALYST" WORKING WHERE EDUCATION, AI, AND VISUAL COMMUNICATION MEET.`); the A–Z index (`A. "WORK" 13`, `B. "TRACKS"`, `C. "ABOUT"`, `D. "RESUME" PDF`, `E. "CONTACT"`, `F. "HOW TO"`); then the full inventory list (every case study, dated, tracked, one row each with a thumbnail well), not a 6-card featured grid. Featured items get the orange tag.
- `/work/` — same inventory, filter chips as `"DESIGN" 05` labels inside a glass `"FILTERS"` window; URL-driven as now.
- `/work/[slug]/` — `"CASE STUDY" 07 OF 13`; title as object name; `c/o` line; definition block for its first track; spec line `"ROLE" … "TIMELINE" … "TRACKS" …`; the `"WORK IN PROGRESS"` band if TODOs remain; images each with provenance caption; `"NOTES"` details for the purist; `"EXIT" ↩` link.
- `/about/` — written as an A–Z of definitions in mono (`"PORTFOLIO" — a list, not a pitch.`), with the bio paragraph in Inter Tight underneath. Resume as a receipt-style block linking the PDF.
- `/how-to/` — new: how this site is built, source linked, the Figma-to-Astro migration in steps. Free Game's gift, paid forward.
- `/contact/` — three labelled rows: `"EMAIL"`, `"LINKEDIN"`, `"GITHUB"`.

## Do not
- No beige. No rust. No rounded cards, shadows, gradients (except the hazard stripe and the glass tint). No curly quotes on labels. No Off-White wordmark, crossed arrows, zip-tie graphic, bounded stripe block, Nike/LV/IKEA marks, no Abloh's name in the masthead. No slogans; labels only.
