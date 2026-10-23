<!-- DESIGN_SYSTEM.md — plain-English rules for the site's look in Direction v2: the method, every token, every class, the two windows, and a do/don't list. Rewritten 2026-09-14 when v1's beige "paper" was replaced with white paper and the label method. -->
# Design system — mjzun.github.io (version 002)

Direction: **v2, "PORTFOLIO" c/o MATTHEW JAY ZUNIGA™** (`docs/design/DIRECTION_v2.md`). Version 1 read "Off-White" as a beige paper colour. Version 2 uses the method instead: start from browser defaults, edit about three percent, and label the obvious. White paper, black ink, one 1px rule, uppercase labels in straight quotes, mono for anything that reads like a receipt.

The two files that make it real:

- `src/styles/tokens.css` — every value (colour, type, spacing, the hazard stripe, the glass window) as a CSS variable. Change a number here, the whole site follows.
- `src/styles/global.css` — the reset and the reusable classes. It imports `tokens.css` on its first line, so the layout only needs to import `global.css`.

Where the ideas come from, and what must never be copied: `docs/design/virgil_off_white_codes.md` (the translation table and the do-not-copy list), `virgil_product_language.md` (section 3), `virgil_web_css_findings.md` (section 5).

---

## 1. The method in six rules

1. **Readymade + 3%.** Browser defaults and system-looking type, edited only a little: a 1px black rule, an uppercase label, straight quotes. No rounded cards, no shadows, no gradients (except the stripe and the glass tint).
2. **Label the obvious.** Every element says what it literally is, in straight quotes, all caps: `"NAVIGATION"`, `"IMAGE"`, `"CASE STUDY"`, `"FILTERS"`. The word is the thing's generic name, never a slogan.
3. **Show the construction.** Every layout region has a visible 1px rule on top. The `"SHOW GRID"` button (or the G key) outlines every region and prints its name. Every image carries its file facts. The footer receipt prints the build date and the page's JavaScript weight.
4. **Publish unfinished, honestly.** A page that still carries a `TODO(Matt)` wears a striped `"WORK IN PROGRESS"` band, and the TODO itself prints as a mono `"NOTE TO SELF"` line.
5. **Archive, not pitch.** Home is one long dated list of everything. No hero grid, no carousel, no slogans. The index is the navigation.
6. **Tourist / purist.** Every case study has a one-line caption for the tourist (the outcome) and a `"NOTES"` block the purist can open (audience, constraint, tools).

---

## 2. Colour

Seven values. That is the whole palette. Nothing else, anywhere.

| Token | Value | What it is for |
|---|---|---|
| `--paper` | `#FFFFFF` | Page background. Text on ink. |
| `--ink` | `#000000` | All text, frames, rules. |
| `--grey` | `#A5A5A5` | Provenance tags like `[2026]`, the slash between spec pairs, disabled states. **Never for text someone has to read** (it is only 2.5:1 on white). |
| `--grey-2` | `#E6E6E6` | Image wells, rules inside a list. |
| `--caution` | `#FFFF00` | Two places only: the yellow variant of the hazard stripe (`.hazard--warn`) and the focus ring on links inside the `"NAVIGATION"` window. |
| `--tab` | `#FE3E0D` | The orange `"NEW"` tag and the active filter chip. Text on it is always black. |
| `--link` | `#0019E9` | Every text link, underlined. Hover swaps flat to ink. |

`--black` and `--white` are a fixed pair that never inverts: the hazard stripes and the text on the orange tab use them.

**Dark mode** inverts paper and ink only (the system setting; add `data-theme="light"` on `<html>` to force light, `data-theme="dark"` to force dark). Two consequences are handled in `tokens.css`: the image well follows the paper (`--grey-2` goes near-black), and links become ink because blue on black fails contrast.

Hover on anything is a flat colour swap. There are no transitions.

---

## 3. Type

Three voices, all from Google Fonts, loaded with one `<link>` in `src/layouts/Base.astro` with only the weights used.

| Voice | Family | Weights | Where |
|---|---|---|---|
| Grotesk | **Inter Tight** | 800 object names and the display headline; 700 labels; 400 prose | `--font-grotesk` |
| Mono | **IBM Plex Mono** | 400, 700 | Receipts, spec lines, definitions, notes to self, the visitor line. Uppercase when it is UI (`.upper`). |
| Serif | **Bodoni Moda** italic | 400 | **One word on the whole site**: `MEET.` in the home headline (`.serif`). |

Sizes are the hierarchy. There are five:

| Token | Size | Use |
|---|---|---|
| `--fs-fine` | 12px | Fine print, receipts, provenance, the visitor line, the corner tag |
| `--fs-label` | 14px | Labels, spec lines, definitions, notes to self |
| `--fs-body` | 16–17px | Case-study prose only, sentence case, max 65 characters a line |
| `--fs-object` | 24–48px | Object names: inventory rows, case-study titles, contact rows |
| `--fs-display` | 40–120px | The one display headline on the home page, line-height 0.88 |

Display and object names tighten (`-0.03em`); small labels open slightly (`+0.02em`). Labels and names are uppercase via CSS (`text-transform`); prose is never uppercase.

**Straight quotes only.** The `.q` class adds `"` before and after with CSS (`content: "\0022"`), so every label is quoted the same way and copy-paste stays clean. Markdown smart punctuation is switched off in `astro.config.mjs` so prose never gets curly quotes either.

---

## 4. Spacing and rules

Base unit 8px: `--s-1` (4px) through `--s-9` (96px). `--gutter` is the side padding, never under 16px. `--section` is the space under every region. `--dock-clearance` keeps the last line above the floating window.

Three rules and nothing else:

- `--rule` — 1px solid ink. Region edges, image frames, window bars, inventory rows.
- `--rule-soft` — 1px solid grey-2. Rows inside a list (index, definitions).
- `--rule-dot` — 1px dotted grey. Receipt lines.

---

## 5. The parts, and the class to use

| Part | Class / component | Notes |
|---|---|---|
| A quoted word | `.q` | `<span class="q">WORK</span>` renders `"WORK"`. |
| Label | `.label`, add `.fine` for 12px | Inter Tight 700, caps. |
| Mono line | `.mono`, add `.upper` for UI | Plex Mono 14px; `.mono.fine` is 12px. |
| Object name | `.object` | Inventory rows, case-study titles. |
| Display headline | `.display` | Home page only. One per site. |
| Layout region | `.region` + `data-region="NAME"` | 1px rule on top. The name shows in grid mode. |
| Region head | `.region-head` with a mono letter, an `h2.label`, and `.count` pushed right | |
| Hazard band | `.hazard` (24px stripes); put a `.label.chip` inside for `"WORK IN PROGRESS"` | `.hazard--warn` is the one yellow state. Never a bounded stripe block. |
| Glass window | `<Glass title="FILTERS">` (`src/components/Glass.astro`) | 70% paper, 16px blur, 1px frame, a title bar naming the window. Three uses: the dock, the filter bar, image lightboxes. |
| Receipt | `ol.receipt` > `li` > two spans | One line per fact. `.total` for the bold last line. |
| Definition | `dl.definition` or `<Definition track="design">` | `"DESIGN" (n.) — … See: "PRESENTATION". [2026]` |
| Note to self | `p.note-to-self` | Made automatically from any `TODO(Matt)` paragraph by the plugin in `astro.config.mjs`. |
| Tag | `.tag` | The orange pill: `"NEW"` on featured rows. The one rounded thing. |
| Spec line | `<SpecLine items=[…]>` | `"ROLE" … / "TIMELINE" … / "TRACKS" …` |
| Track label | `.track` | `"DESIGN"` linking to `/work/?track=design`. |
| Filter chip | `.chip` inside `<TrackChips counts=…>` | `"DESIGN" 05`; the active one is orange (`aria-current="true"`). |
| Index | `ol.index` | A–F table of contents on the home page. |
| Inventory row | `<CaseRow entry=… number="01">` → `li.row` | number, `"IMAGE"` well, name, c/o, date, tracks, tag. The whole row is one link. |
| Image well | `.well` (4:3) / `.well--wide` (16:9) | Grey, framed, labeled `"IMAGE"` until a real image lands. |
| Real image | `figure.figure` + `figcaption` | Caption: `"IMAGE" 01 · JPG · 210 KB · alt text`. Size and format are read from the file at build time. |
| Labelled rows | `ul.rows` | `"EMAIL"` then the value at object size. Contact page, home page. |
| Notes | `details.notes` | The purist's block on each case study. |
| The dock | `nav.dock` (a Glass window titled `"NAVIGATION"`) | Fixed bottom-left. `← YOU ARE HERE` on the current page. |

---

## 6. The two windows and the receipt

**`"NAVIGATION"`** is the dock: a glass window fixed to the bottom-left with the five destinations. Its links get the site's only yellow focus ring, sitting between an ink fill and the glass so it stays visible.

**`"FILTERS"`** sits on `/work/`: chips written `"DESIGN" 05`. Each chip is a plain link, so filtering works without JavaScript and every filtered view is a URL you can send (`/work/?track=data`). With JavaScript, clicks filter in place and rewrite the address bar.

**The receipt** is the footer: `"PORTFOLIO"` / c/o MATTHEW JAY ZUNIGA™ / MADE IN CHAPEL HILL, NC / c. 2026 / VER. 002 / LAST BUILD (the date `npm run build` ran) / WEIGHT (HTML + CSS + the page's inline JavaScript in KB, counted at build) / TYPE c/o GOOGLE FONTS / SOURCE. The `"VISITOR"` line in the masthead is the receipt's mirror: local time, viewport, colour scheme, computed in the browser with no network call.

---

## 7. Notes to self and the work-in-progress band

Write `TODO(Matt): question` at the start of a paragraph in a case study and it renders as a mono `"NOTE TO SELF"` line. A `TODO(Matt)` in the middle of a paragraph is split off into its own note. A `TODO(Matt)` inside a frontmatter value (date, timeline, role, tools…) renders as `—`. Any of these on a page switches on the `"WORK IN PROGRESS"` band under the spec line. All of this is in `astro.config.mjs` and `src/lib/case.ts`; nothing in `src/content/work/` has to change.

---

## 8. Keyboard, screen readers, motion

- Focus ring: 2px ink, 2px outside the element, everywhere. Yellow only inside the dock.
- The slash between spec pairs is drawn by CSS from an empty `aria-hidden` span.
- Each inventory row is one link (the name); the track labels inside it stay clickable.
- The filter count is `aria-live="polite"`.
- Empty image wells carry `role="img"` and an `aria-label` naming what will go there.
- There are no transitions or animations. The reduced-motion rule zeroes everything anyway.
- Selection is inverted: ink behind, paper text.

---

## 9. Do / Don't

**Do**
- Put every number on the site through `PORTFOLIO_BRIEF.md` "Verified facts". No fact, write `TODO(Matt)` and let it render as a note.
- Name things literally, in `.q` quotes: `"IMAGE"`, `"BUTTON"`, `"FOOTER"`.
- Keep the seven colours. Hover is a flat swap.
- Keep one display headline, one serif word, one orange tag per featured row.
- Keep every region's 1px rule visible.

**Don't**
- No beige, no rust, no rounded cards, no shadows, no gradients.
- No curly quotes on anything.
- No Off-White wordmark, crossed arrows, zip-tie graphic, bounded stripe block, Nike/LV/IKEA marks, no Abloh's name in the masthead. Borrow the method, not the marks.
- No slogans; labels only.
- No phone number and no GPA anywhere on the site.
- Don't put text in `--grey`; it fails contrast.
- Don't add a fourth glass window. Dock, filters, lightboxes.

---

## 10. Open items for the xrunway pass

The glass values (`--glass-bg` 70%, `--glass-blur` 16px, the 1px frame) are placeholders to reconcile with xrunway once Matt grants access. Only `tokens.css` should change.
