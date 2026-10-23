# Design-Language Brief: "Inspired by" Virgil Abloh's FREE GAME

Target: a personal portfolio that borrows the *system* behind https://free-game.virgilabloh.com without reproducing its assets, text, or marks.
Prepared 2026-09-13 from the live site source (HTML + CSS fetched directly) plus cited secondary sources. Anything not verifiable is flagged as such.

---

## 0. What was actually fetched (and what wasn't)

| Asset | Result |
|---|---|
| `https://free-game.virgilabloh.com/` (index.html, 34.8 KB) | Fetched. Single static page, no build tooling, no inline `<style>` blocks. |
| `css/reset.css` (4.5 KB) | Fetched. A stock "HTML5 Reset" (Meyer / HTML5 Doctor / Boilerplate-derived). |
| `css/style.css` (14 KB) | Fetched. The entire design system lives here. Header comment: `Theme: Canary---yellow trojanhorse`. |
| `css/style-project-red.css` | **404** (and its `<link>` is commented out in the HTML). Not used. |
| `js/utils.js` | **404**. The only working scripts are jQuery 3.4.1 (Google CDN) and a gtag snippet; all interaction is inline `onclick` jQuery. |
| `assets/fonts/courier-prime.regular.woff` (62 KB), `assets/fonts/modern-no20-italic.woff` (24 KB) | Both return HTTP 200 (`application/font-woff`). eot/ttf/svg variants are also declared. |
| Heading images (`free-game.png`, `how-to-make-brand.png`, `num-1..12.png`) | Fetched and viewed: black hand-painted brush lettering on transparent PNG. |

There is no CSS/JS "bundle" in the modern sense; the site is a hand-written 2020 static page built on the Canary Yellow WordPress theme (`<head id="canary---yellow" data-template-set="canary---yellow">`; popup window-chrome icons are hot-linked from `canary---yellow.com/wp-content/themes/virgilabloh/images/`).

---

## 1. Typography

### 1.1 Exact families found in source

| Role | Declared family | Source of truth | Fallbacks declared? |
|---|---|---|---|
| Body / running text / video captions | `'courier-prime.regular'` (self-hosted `@font-face`, Courier Prime Regular) | `body { font-family: 'courier-prime.regular'; }` | **None.** No fallback stack at all. |
| Section titles, TOC items, "subtitle-2" | `helvetica`, `font-weight: 700` | `.helvetica`, `.intro-toc`, `.toc ol li`, `.section-title`, `#contents .sub-title` | **None.** Bare `font-family: helvetica` relies on the OS shipping Helvetica (macOS/iOS). On Windows/Android it silently falls through to the browser default. |
| Introduction sub-heading (one element) | `'modern-no20-italic'` (self-hosted Modern No. 20 Italic, a Didone/Bodoni-class serif) | `#introduction .subtitle` | **None.** |
| Page title, "HOW TO MAKE A BRAND", chapter numerals 1-12 | Not a font: hand-painted brush lettering rendered as PNG images | `.logo-wrapper img`, `.how-to-make`, `.number-wrapper img` | n/a |

Three voices, deliberately clashing: **typewriter mono** (the "document"), **bold grotesque caps** (the "label"), **italic Didone** (one editorial flourish), plus **hand-painted caps** for the masthead.

### 1.2 Sizes: viewport-relative, not rem

Everything is set in `vw`, declared as custom properties on `:root` and swapped at one breakpoint:

```css
:root {                       /* desktop (> 960px) */
  --main-fontsize: 0.78vw;    /* body: Courier Prime */
  --main-lineheight: 1.16em;
  --size-toc: 1vw;            /* TOC items, chapter sub-titles, Helvetica bold */
  --lineh-toc: 1.1em;
  --size-sectiontitle: 2.8vw; /* INTRODUCTION / HOW TO ... headings */
  --lineh-sectiontitle: 1em;
}
@media (max-width: 960px) {
  :root { --main-fontsize: 3vw; --size-toc: 4vw; --size-sectiontitle: 8vw; }
}
```

Other fixed sizes: introduction subtitle `1.5vw / 1.7vw` (mobile `5vw / 1em`); Windows-style popup title `0.75vw / 1.2vw` (mobile `13px / 16px`); popup inner title and the red pill `13px` (pill line-height `20px`). At 1440 px wide, body text is ~11 px and headings ~40 px: the body is intentionally tiny, spec-sheet-like.

Font smoothing is forced: `-webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;`.

### 1.3 Tracking, case, quotation marks

- **`letter-spacing`: not declared anywhere.** Helvetica Bold and Courier Prime run at their natural tracking.
- **`text-transform`: not declared anywhere.** All caps are typed literally into the HTML (`HOW TO NAME YOUR BRAND`, `FROM A - Z<br>(TABLE OF CONTENTS)`, `INTRODUCTION`). Body prose is sentence case.
- **Quotation marks:** the masthead image is literally `"FREE GAME"` with hand-painted straight quotes. In HTML text, curly quotes wrap concepts in prose (“community service”, “post-modern”, “Post-Modern” Scholarship) and straight quotes are used in the popup window title `"POST-MODERN"`. This is the well-documented Abloh device: quoting a word to hold it at ironic distance (Highsnobiety; TypeRoom, see Sources).
- **™** follows the name six times (`Virgil Abloh™`, `FREE-GAME™`) — a trademark-symbol-as-typography habit borrowed from Off-White. (Do not copy; see Section 7.)
- Utility: `span.no-break { display: inline-block }` prevents line breaks inside labels.

### 1.4 Free equivalents (Google Fonts, all SIL OFL)

| Found on site | Licence status | Use instead |
|---|---|---|
| Courier Prime Regular | **Already free** (SIL OFL, by Alan Dague-Greene / Quote-Unquote Apps; on Google Fonts since 2019). Use it directly. | `Courier Prime` 400 (+ 700 if needed). Fallbacks: `"Courier New", Courier, ui-monospace, monospace`. |
| Helvetica Bold (system) | Proprietary (Monotype). Do not self-host. | `Inter` 700 (closest modern grotesque), `Arimo` 700 (Arial-metric), `Work Sans` 700, or `Roboto` 700. Stack: `Inter, "Helvetica Neue", Helvetica, Arial, sans-serif`. |
| Modern No. 20 Italic (Bitstream; sold via MyFonts) | Proprietary. Do not self-host. | `Bodoni Moda` Italic, `Libre Bodoni` Italic, `Playfair Display` Italic, or `DM Serif Text` Italic. |
| Hand-painted brush lettering (PNG) | Bespoke artwork, copyrighted. | Draw your own with a brush pen and scan/vectorise it; or as a stopgap `Permanent Marker`, `Rock Salt`, `Caveat Brush` (Google Fonts). Prefer your own hand. |

---

## 2. Color

The site is stricter than the "off-white / black / orange" Off-White palette people expect. **There is no orange and no off-white on this page.** It is pure white, pure black, and two pure RGB primaries.

| Value | Where it is used (from `style.css`) |
|---|---|
| `#fff` | `body`, header (fixed, opaque), popup inner wrapper, `ins`/`mark` backgrounds, `::selection` text color |
| `#000` | Body text, all link text by default (`a`, `a:hover`), `::selection` background (inverted highlight) |
| `#00f` (pure blue) | The whole table of contents (`.toc`, `.toc ol li a`), every chapter `.content-title`, and the `3px solid #00f` frame around every preview image and YouTube iframe |
| `#f00` (pure red) | `.pill-postmodern` text + `1px` border; `#postmodern-wrapper .popup-inner-wrapper { background-color: #F00 }` (a solid red panel behind the "POST-MODERN" image) |
| `#d8d8d8` | `4px ridge` border on the two fake OS popup windows |
| `#dad7d2` | `1px outset` border on the popup's iconize/resize/close icons (Windows-95 bevel) |
| `rgb(51,78,165) → rgb(76,127,193)` | `linear-gradient(90deg, ...)` title bar of the fake windows (Windows XP blue) |
| `#a9a9a9` | Firefox placeholder color (inherited from the reset) |
| `#ccc` | `hr` in the reset (unused on page) |

Two colour quirks worth knowing:
- `a:link { color: #fff; }` appears after `a { color: #000 }`. Because `a:link` out-specifies `.pill-postmodern`, the red pill's text is technically white-on-white on first visit unless the browser treats it as `:visited`; the site gets away with it because nearly every link wraps an image or sits inside `.toc`. Don't replicate.
- Off-White's wider palette (black `#000`, ink `#111`, white, "caution yellow" ≈ `#FFCC00`, "hazard orange" ≈ `#F5A623`) comes from third-party brand write-ups (madegooddesigns.com), not an official spec — there is no published Off-White colour standard.

**Portfolio palette suggestion (inspired, not copied):** `#FFFFFF` ground, `#000000` ink, one signal primary for links/frames (pure `#0000FF` is the FREE GAME move; swapping to a safety orange `#FF6A00` or `#FFCC00` leans toward The Ten / Off-White), one "alert" accent for a single CTA pill. Keep it to four values.

---

## 3. Layout & grid

- **Float grid, Bootstrap-naming, no framework.** Percentage columns: `.col-md-2` 16.66%, `-3` 25%, `-4` 33.33%, `-5` 41.66%, `-6` 50%, `-8` 66.66%, `-9` 75%, `-12` 100%, all `float: left`; mobile `.col-sm-50` / `.col-sm-100`. Rows clear with `.clearafter::after { content:''; display:block; clear:both }`.
- **Base spacing unit: 10 px.** Header padding `10px`; `.pills-wrapper` / `.toc` / `.intro-image-wrapper` `10px`; content wrapper `0 20px`; footer `20px 10px`; image/iframe `margin-bottom: 20px`; logo `margin-bottom: 7px`. Large rhythm is in vw: chapter rows `margin: 3vw 0`, numeral column `padding-top: 3vw`, `.boxed-4` indent `padding-left: calc(100vw / 12)` (one twelfth column), intro TOC `padding-top: 3.2vw`.
- **Hero measure:** masthead image and intro video are both `width: 66vw`, centered (`margin-left/right: auto`). Introduction subtitle has `padding: 10px 10%`.
- **Fixed header offset:** `header { position: fixed; top: 0; z-index: 999; background: #fff; padding: 10px }` and `body { padding-top: 16.5vw }`. In-page anchors compensate with `a.anchor-num { position: absolute; margin-top: -16.5vw }` so `#num1` lands below the header.
- **Chapter row anatomy (desktop):** `[col-md-3: hand-painted numeral PNG] [col-md-5 .boxed-4: YouTube iframe, 3px blue border, height 18.74vw] [col-md-4: blue title + Courier paragraph]`. Rows with two videos use two `col-md-6 .quarter-iframe` (height `14.06vw`, `col-left` `padding-right:10px`, `col-right` `padding-left:10px`). Numerals are duplicated: `.desktop` in the grid, `.mobile` above the title.
- **Fake OS windows:** two `position: absolute` panels (`#canary-yellow-wrapper` `width:28vw; left:5vw; top:40vw`; `#postmodern-wrapper` `width:32vw; right:10vw; top:30vw`), `z-index: 10000`, `4px ridge #d8d8d8`, with a blue-gradient title bar containing 3 bevelled icons. They float over the intro content like desktop clutter.
- **Breakpoints:** `1600px` and `1280px` media queries are declared but **empty**. The only real breakpoint is **`max-width: 960px`**: header becomes static, body `padding-top: 0`, `.desktop` hidden / `.mobile` shown, TOC `column-count` 2 → 1, all columns 100%, popups become static full-width (`width: calc(100% - 20px); margin-left: 10px`), iframes `height: calc((100vw - 20px) / 16 * 9)`, numerals `height: 22vw`.
- Viewport meta locks zoom (`maximum-scale=1.0, user-scalable=0`) — an accessibility problem; don't copy.
- `box-sizing: border-box` globally; `html { overflow-y: scroll }` to prevent layout jump.

---

## 4. Motion & interaction

Almost none, and that is the point.

- **Only one animation:** `.blink { animation: blink 2s infinite }` / `@keyframes blink { 0% {opacity:0} 50% {opacity:1} 100% {opacity:0} }`, applied to the ✨ emoji inside the red "go to POSTMODERN" pill. It reads as a `<blink>`-tag / MySQL-era web joke.
- **No `transition` declarations anywhere.** No easing, no scroll-triggered effects, no reveal-on-scroll.
- **Hover:** `a:hover { color: #000 }` (no change), plus an opt-in utility `.underline-mouseover:hover { text-decoration: underline }`. Links are otherwise `text-decoration: none`.
- **Cursor:** `.cursor-pointer { cursor: pointer }`, `.window-icons img { cursor: pointer }`, `.popup-close-wrapper span { cursor: pointer }`; `button { cursor: pointer }` and `abbr[title] { cursor: help }` from the reset. No custom cursor images.
- **Selection:** inverted, `::selection { background:#000; color:#fff; text-shadow:none }` — a cheap, on-brand detail worth borrowing.
- **JS behaviours (inline jQuery):** window icons call `toggleClass('iconize')` (hides `.popup-inner-wrapper`, collapsing the window to its title bar), `toggleClass('resize')` (the `.resize` CSS is commented out, so it does nothing), and `.hide()` (close). Windows are **not** draggable.
- **Media:** intro `<video autoplay muted playsinline controls>`; spinning-portrait GIF as the header logo; every chapter body is a YouTube embed.
- Tap highlight suppressed: `-webkit-tap-highlight-color: #fff`.

---

## 5. Navigation pattern

There is no menu, no hamburger, no routing. Navigation *is* a table of contents.

1. **Fixed header, two halves (`col-md-6` each):**
   - Left: a Courier Prime bio paragraph (`.bio`) and the spinning-portrait GIF (`.logo`, `width:100%`) that links out to the archive site.
   - Right: `.intro-toc` — the label `FROM A - Z` / `(TABLE OF CONTENTS)` in Helvetica Bold, centered — above `.toc`, an `<ol>` of 12 in-page anchor links (`href="#num1"` … `#num12`) in `#00f`, Helvetica Bold, all caps, laid out with **CSS `column-count: 2`** (1 column on mobile). The `<ol>` numbering is native (`padding-left: calc(1.0vw + 10px)`).
2. **Targets:** each chapter starts with `<a class="anchor-num" name="numN">`, offset by `-16.5vw` to clear the fixed header. Scrolling is native anchor behaviour (no smooth-scroll declared).
3. **Secondary/promotional nav:** a single rounded red outline pill (`border-radius: 5vw; border: 1px solid #f00; padding: 0 5px; font-size: 13px; line-height: 20px`) — "go to POSTMODERN ✨" — and the two fake OS popup windows, each an image link to a sister site.
4. **Footer:** two logos (`col-md-3` each) beside a `col-md-6` closing statement in Courier; `.line-break { display:block; height:0.7em }` spacers instead of `<p>` margins.

**Pattern to borrow for a portfolio:** a persistent "spec-sheet" header whose right half is a numbered, two-column, all-caps index of everything on the page, in one signal colour, jumping to anchored sections. It doubles as sitemap and hero.

---

## 6. Voice / copy conventions

Observed on the page (do not reuse the sentences; reuse the *shapes*):

- **Imperative "HOW TO ___" chapter titles**, all caps, no punctuation: "HOW TO NAME YOUR BRAND", "HOW TO OBTAIN A TRADEMARK", "HOW TO FIND BLANKS". Portfolio analogue: "HOW I BUILT ___", "WHAT THIS IS", "HOW TO HIRE ME".
- **Index-style meta labels** in parentheses: `FROM A - Z (TABLE OF CONTENTS)`, `OVERARCHING LECTURES`, `FIGURES OF SPEECH CATALOGUE`, `FURTHER INSPIRATION`. Sections are named like a catalogue or a syllabus, not a marketing site.
- **Quoted concepts in prose:** “community service”, “post-modern”, "POST-MODERN". Quoting a word signals "this is a label I'm holding at arm's length" (Highsnobiety). Use sparingly: one or two quoted words per screen, never on every heading.
- **Trademark-symbol-as-decoration:** `Virgil Abloh™`, `FREE-GAME™`. The symbol is used ironically as a typographic mark. (Legally you may not use ™ on marks you don't claim; if you want the effect, use it only on your own name/wordmark, or drop it.)
- **Lowercase, casual UI copy next to caps headings:** "go to POSTMODERN", "go to canary---yellow Virgil Abloh™ archive website". Note the triple-hyphen "---" stylisation of names (canary---yellow, free---game) — a URL-as-brand habit; find your own separator rather than copying "---".
- **First-person, plain, generous tone in body copy**: short declarative sentences, "For free.", editorial asides ("editors note; …"). Every chapter has: a 2–4 sentence personal note, then the embedded source with its original title and a one-line credit line (source channel, year). Cite what you link.
- **Meta title carries the mark:** `<title>FREE-GAME</title>`, `<meta name="title" content="FREE-GAME™">`. A portfolio equivalent: `<title>"NAME"</title>` — quotes in the tab title is a cheap, recognisable nod.

Wider Abloh vocabulary (Off-White / Nike, cited in Sources) you can echo in *your own words*: spec-sheet captions that name the obvious ("SHOELACES" on shoelaces → "PORTFOLIO" on the portfolio, "NAV" beside the nav), `c/o` style attribution lines ("c/o Your Name"), place-and-date stamps ("MADE IN ___, 2026"), and exploded-view / "REVEALING" framing where the structure of a project is shown rather than hidden.

---

## 7. What to borrow vs. what not to copy

### Borrow (ideas, not assets)
- **The three-voice type system:** monospace body (Courier Prime is free — use the real thing) + bold grotesque all-caps labels (Inter/Arimo, not Helvetica files) + one italic Didone accent (Bodoni Moda).
- **Viewport-scaled type via CSS custom properties** with a single mobile breakpoint; tiny body, huge headings. Add a `clamp()` floor for accessibility (`clamp(12px, 0.78vw, 16px)`), which the original lacks.
- **Four-colour rule:** white, black, one signal primary for every link + every frame, one alert accent for a single pill CTA.
- **Framed media:** a `3px solid <signal>` border on every image/iframe; no shadows, no radius.
- **TOC-as-navigation** in a fixed header, numbered `<ol>`, two CSS columns, anchor offsets.
- **Inverted `::selection`**, `text-decoration: none` links with opt-in hover underline, single blinking glyph as the only animation.
- **10 px base unit** with vw-scale rhythm for section gaps.
- **The industrial/"spec sheet" mindset:** label things plainly, show structure, cite sources under each item, date-stamp entries.
- **Retro OS window as a component idea** (title bar + bevel + iconize/close) — build your own with CSS borders and `linear-gradient`; it's a generic Windows-95 idiom, not Abloh's property.

### Do not copy
- **Text:** none of Abloh's sentences, bios, chapter descriptions, or the "FREE GAME" / "FROM A - Z" / "HOW TO MAKE A BRAND" phrasings verbatim. Write your own.
- **Marks & names:** "Off-White", the Off-White logo (`off-white-logo.png`), the diagonal-stripe and crossing-arrows devices, "Virgil Abloh™", "FREE GAME", "Canary Yellow", "POST-MODERN", the "VAA" logo, the ™ on names you don't own. These are registered/claimed trademarks and estate property.
- **Artwork:** the hand-painted masthead, the twelve brush numerals, the spinning-portrait GIF, the popup photos, the intro video, and the window-chrome icons hot-linked from canary---yellow.com. Draw your own numerals/masthead.
- **Fonts you don't have a licence for:** do not copy `modern-no20-italic.woff` or rely on system Helvetica in a shipped product; substitute per Section 1.4.
- **The literal palette + literal quotes-on-everything combo.** Pure `#00f` + Courier + quoted caps title is *the* FREE GAME look; if you stack all three identically it stops being "inspired by". Change at least the signal colour or the masthead treatment.
- **Accessibility anti-patterns present in the original:** `user-scalable=0`, `0.78vw` body text with no floor, no fallback font stacks, empty `alt`s, colour-only link differentiation, `a:link { color:#fff }`.
- **Tracking:** jQuery from Google CDN and Google Analytics are the original's choices; a portfolio doesn't need either.

### Credits (for your "inspired by" note)
- FREE GAME launched October 2020 as a free mentorship resource (Hypebeast, Complex, WWD, Highsnobiety, Footwear News).
- **No studio credit appears in the FREE GAME source.** The CSS theme comment (`Canary---yellow trojanhorse`), the `data-template-set="canary---yellow"` head attribute, and icons hot-linked from the `virgilabloh` WordPress theme show it was built on the Canary Yellow archive site's theme. Hypebeast (22 Jan 2019) credits canary---yellow.com to Bergamo-based **Studio Temp**; by inference the same team likely produced FREE GAME, but this is not confirmed anywhere fetched.
- The memorial mirror at free---game.com credits its rebuild to "Wolf Team" (marketing agency); that credit applies to the mirror, not the 2020 original.
- The Nike "ICONS" book documenting The Ten was art-directed by Zak Group (Nike/TASCHEN listings) — unrelated to this website.

---

## Sources

Primary (fetched directly, 2026-09-13):
- https://free-game.virgilabloh.com/ — index.html
- https://free-game.virgilabloh.com/css/style.css, /css/reset.css
- https://free-game.virgilabloh.com/assets/fonts/courier-prime.regular.woff, modern-no20-italic.woff (HEAD 200)
- https://free-game.virgilabloh.com/assets/images/free-game.png, how-to-make-brand.png, num-1.png

Launch / context:
- Hypebeast, "Virgil Abloh Dishes Tools of the Trade With 'Free Game'" (Oct 2020): https://hypebeast.com/2020/10/virgil-abloh-free-game-mentorship-brand-startup-series
- Complex: https://www.complex.com/style/2020/10/virgil-abloh-launches-new-free-game-mentorship-series
- WWD: https://wwd.com/fashion-news/fashion-scoops/virgil-abloh-launches-free-game-mentorship-program-1234637040/
- Highsnobiety: https://www.highsnobiety.com/p/virgil-abloh-free-game-mentorship/
- Footwear News: https://footwearnews.com/2020/business/philanthropy/virgil-abloh-free-game-mentorship-program-diversity-initiative-1203067568/
- HIGHXTAR (12-chapter structure): https://highxtar.com/en/virgils-free-game-steps-for-your-clothing-brand/
- free---game.com memorial mirror (Wolf Team credit): https://free---game.com/

Studio credit for the parent theme:
- Hypebeast, "Virgil Abloh Launches New Website" (22 Jan 2019, Studio Temp credit): https://hypebeast.com/2019/1/virgil-abloh-canary-yellow-website-launch
- nss magazine on the archive site: https://www.nssmag.com/en/fashion/17436/virgil-abloh-archive-website
- Awwwards listing: https://www.awwwards.com/inspiration/virgil-ablohtm-gallery-canary-yellow

Typographic / design conventions:
- Alec Leach, "Why Is Off-White Always Using Quotation Marks?", Highsnobiety: https://www.highsnobiety.com/p/virgil-abloh-off-white-quotation-marks/
- TypeRoom tribute (Helvetica, quotes, diagonals, text-as-statement): https://www.typeroom.eu/its-the-font-that-really-matters-a-tribute-to-typophile-creative-trailblazer-virgil-abloh
- Made Good Designs, "Off-White Brand Guidelines" (third-party palette approximations, Helvetica Bold, straight quotes, Glasgow-Airport arrows): https://madegooddesigns.com/off-white-brand-guidelines/
- Design Your Way, "What Font Does Off-White Use?": https://www.designyourway.net/blog/what-font-does-off-white-use/
- Nike, "The History of Nike x Virgil Abloh's 'The Ten'" (REVEALING / GHOSTING, orange tabs, "AIR", exposed foam): https://about.nike.com/en/magazine/virgil-abloh-nike-the-ten-history
- Nike newsroom, "The10" announcement: https://about.nike.com/en/newsroom/releases/virgil-abloh-nike-the-10
- Marco Fabrega, "Virgil Abloh, you have made me a fan of 'TYPOGRAPHY'": https://medium.com/@MarcoAFabrega_44518/virgil-abloh-you-have-made-me-a-fan-of-typography-ae951ae52cd3

Fonts / licensing:
- Courier Prime (SIL OFL): https://quoteunquoteapps.com/courierprime/ and https://github.com/quoteunquoteapps/CourierPrime ; Google Fonts inclusion issue: https://github.com/google/fonts/issues/1272
- Modern No. 20 (Bitstream, commercial): https://www.myfonts.com/collections/modern-no-20-font-bitstream/
