# Virgil Abloh web properties — CSS/HTML source findings

Fetched 2026-09-14 with `curl` (raw HTML + linked stylesheets), plus Wayback Machine for the pre-redesign versions. No site blocked fetching. Each table row is **property → value → evidence** (a literal snippet from the fetched source). Purpose: reproduce the *feel* with original, legally-clean assets.

Important context discovered while fetching:

- **canary---yellow.com was rebuilt** (now a Shopify + Tailwind v4 store, "Virgil Abloh Archive – Canary Yellow"). The version free-game forked is the **2019–2023 WordPress theme literally named `virgilabloh`** (`/wp-content/themes/virgilabloh/style.css`, "Author: Dev AM"). Both versions are documented below.
- **virgilabloh.com was also rebuilt** (now a Next.js / styled-components "V.A.A. Announcement" page on a blue ground). In 2023 it was a one-page static logo grid; the Courier-Prime/XP-window aesthetic lived in its sub-sites (`/free-game/`, `/postmodern/`) and in the old Canary Yellow theme.
- The Windows-XP title-bar icons that free-game hotlinks from `canary---yellow.com/wp-content/themes/virgilabloh/images/icon-{iconize,resize,close}.jpg` now **404** — the fake-window chrome on free-game is currently missing its buttons.

---

## 1. canary---yellow.com — current site (2026, Shopify + Tailwind v4)

Source: `https://canary---yellow.com/` and `/cdn/shop/t/8/assets/theme.css` (101 KB, `/*! tailwindcss v4.2.2 */`), `theme2.js` (Vite islands).

| Property | Value | Evidence |
|---|---|---|
| Background | `#FFFFFF` (`--color-contrast`) | `body{background-color:var(--color-contrast)…}` / `--color-contrast: #FFFFFF` |
| Text colour | `#1E1E1C` (near-black, warm) | `--color-primary: #1E1E1C; --color-accent: #1E1E1C` |
| Alt surface | `#F0F0F0`; image placeholder `#F3F3F3` | `--color-bg-alt: #f0f0f0`; `style="aspect-ratio:904/602;background:#F3F3F3"` |
| Body font | Helvetica, Arial, sans-serif — 400 / 700 | `--font-body-family: Helvetica, Arial, sans-serif; --font-body-weight: 400; --font-body-weight-bold: 700` |
| Heading font | Helvetica Bold 700 | `--font-heading-family: Helvetica, Arial, sans-serif; --font-heading-weight: 700` |
| Mono font | **Simon Mono** (self-hosted, `SimonMono-Regular.woff2/.woff`, weight 400, `font-display: swap`) | `@font-face{font-family:'Simon Mono';src:url(…/assets/SimonMono-Regular.woff2) format('woff2'), url(…SimonMono-Regular.woff) format('woff')}` ; `--font-mono: "Simon Mono", "Courier New", monospace` |
| Mono is always uppercase | yes | `.font-mono{text-transform:uppercase}` |
| Ligatures off globally | yes | `*{font-variant-ligatures:none}` |
| Base body size | **12px** | `--text-copy: 12px; body{font-size:var(--text-copy)}` |
| Type scale tokens | lead 1.125rem, heading 2rem, display 3rem; xs .75rem, sm .875rem | `--text-lead: 1.125rem; --text-heading: 2rem; --text-display: 3rem` |
| Body letter-spacing | **−0.03em** on everything | `--tracking-tight: -.03em; body{letter-spacing:var(--tracking-tight)}` |
| Product title | Helvetica 700, uppercase, 32px → 64px @md, line-height 0.88, tracking-tight | `<h2 class="font-heading mb-3 text-[32px] font-bold uppercase leading-[0.88] tracking-tight md:text-center md:text-[64px]">` |
| Policy page title | 48px / 700 / uppercase / lh .88 | `.shopify-policy__title{…font-size:48px;font-weight:700;line-height:.88;text-transform:uppercase}` |
| Links | inherit colour, **no underline**; hover = fade to 40 % opacity | `a{color:inherit;text-decoration:inherit}`; `class="transition-opacity hover:opacity-40"`; `.hover\:opacity-40:hover{opacity:.4}` |
| Hover alt | text to 50 % black | `.hover\:text-primary\/50:hover{color:#1e1e1c80}` |
| Transition | 150 ms, `cubic-bezier(.4,0,.2,1)` (opacity only) | `--default-transition-duration: .15s; --default-transition-timing-function: cubic-bezier(.4, 0, .2, 1)` |
| Header | **fixed**, 96px (mobile) / 104px (≥768) | `#shopify-section-header{position:fixed;top:0;left:0;right:0;z-index:10}`; `--header-height: 96px; @media(min-width:768px){--header-height:104px}` |
| Nav height token | 3rem → 4rem @32em → 6rem @48em | `:root{--height-nav: 3rem} @media(min-width:32em){--height-nav:4rem} @media(min-width:48em){--height-nav:6rem}` |
| Header contents | logo (SVG canary) + "Canary Yellow / Art  Store" text block (12px bold uppercase) · **live clock with blinking colon** + "Portland, OR" · "Cart 0" | `<div class="hidden text-xs font-bold uppercase leading-tight …">Canary Yellow … <span>Art</span><span>Store</span>`; `<span data-hour>09</span><span style="animation: blink-colon 2s step-end infinite">:</span><span data-minute>38</span><span data-ampm>AM</span>` |
| Blink keyframes | 2 s step-end, 1 → 0.2 opacity | `@keyframes blink-colon{0%,50%{opacity:1}50.1%,100%{opacity:.2}}` |
| Page grid | body is a 3-row grid (header / main / footer); product hero is a **3-column grid 120px-min gutters + 904px max centre**, labels in the side gutters | `<body class="font-body font-body-weight grid min-h-full grid-cols-[100%] grid-rows-[auto_1fr_auto]">`; `style="grid-template-columns:minmax(120px,1fr) minmax(0,904px) minmax(120px,1fr)"` |
| Product meta labels | Simon Mono, 12px, lh 1.3, bracketed label at 40 % opacity then value: `[PRODUCT]` / `BOOK`, `[PRICE]` / `$55.00` | `<div class="text-copy col-start-1 row-start-2 hidden self-center font-mono leading-[1.3] md:block"><span class="opacity-40">[PRODUCT]</span><br>BOOK</div>` |
| Image frames | no border; fixed aspect box with `#F3F3F3` fill; images `display:block` | `<div class="relative overflow-hidden" style="aspect-ratio:904/602;background:#F3F3F3">`; `img,svg,video{display:block}` |
| Cursor | native, but a **custom cursor-following badge** ("View Product" pill + arrow) in `mix-blend-difference`, desktop only | `<cursor-badge client:visible class="pointer-events-none fixed left-0 top-0 z-30 hidden mix-blend-difference lg:flex">…<span data-label class="whitespace-nowrap rounded-sm bg-white font-mono leading-none text-black">View Product</span>` |
| Selection colour | not overridden (browser default) | no `::selection` rule in theme.css |
| Borders / dividers | 1px, `#1e1e1c` at 10 % / 20 % | `.border-primary\/10{border-color:#1e1e1c1a}`; `.border-primary\/20{border-color:#1e1e1c33}` |
| Corner radius | 0 on inputs; `.25rem` on buttons/badges | `button,input…{border-radius:0}`; `.button{…border-radius:.25rem}` |
| Effects islands (JS) | CRT effect, pixelate filter, invert overlay, foil stamp, colour zones | `import("@theme/crt-effect")`, `import("@theme/pixelate-filter")`, `import("@theme/invert-overlay")`, `import("@theme/foil-stamp")`, `import("@theme/color-zones")` |
| Menu overlay | 25 % black scrim | `.menu-opening …:before{background-color:#00000040}` |
| Blend utilities present | difference / multiply / soft-light | `.mix-blend-difference{mix-blend-mode:difference}` |
| Prose width | 45ch narrow / 65ch | `--spacing-prose-narrow: 45ch`; `.rte{max-width:65ch}` |
| Edge gutter | 20px | `--spacing-edge: 20px` |
| Fake-OS windows | **none** in current site | — |
| Platform | Shopify (Gorgias chat, Shop Pay) | `<script src="https://config.gorgias.chat/…">` |

## 1b. canary---yellow.com — 2019–2023 WordPress theme `virgilabloh` (the one free-game forked)

Source: Wayback `https://web.archive.org/web/20230602094507/https://canary---yellow.com/` → `/wp-content/themes/virgilabloh/style.css?v=21071601` (56 KB) and `reset.css` (HTML5 Doctor reset).

| Property | Value | Evidence |
|---|---|---|
| Theme header | "Theme Name: virgilabloh … Author: Dev AM" | file header comment |
| Background | white; text `#000` | `body, select, input, textarea {color: #000; outline: none;}` (no bg set; reset = white) |
| Body font | **HelveticaNeueLT-Roman** self-hosted (eot/woff/ttf/svg) | `@font-face{font-family:'Helvetica';src:url('…/fonts/HelveticaNeueLT-Roman.woff') format('woff')…}` ; `body {font-family: 'Helvetica';}` |
| Other self-hosted fonts | **Windsor Light**, **FreeMono**, **courier-prime.regular**, **BigFatMarker** | four more `@font-face` blocks, all `src: local('☺'), url('…/fonts/<name>.woff')…` (Font Squirrel pattern) |
| Body copy / bio | Courier Prime **13px**, lh 1.3em, 75 % width | `.bio{…line-height:1.3em;width:75%;font-family:'courier-prime.regular';font-size:13px}` |
| Headings | Helvetica **700/900**, vw-sized, uppercase | `h1.main-title{position:absolute;font:700 8vw helvetica,sans-serif;color:#000}`; `.typewriter-wrapper h1{font:900 6vw helvetica,sans-serif;text-transform:uppercase}`; `h1{font-weight:700;font-family:sans-serif;font-size:3vw}` |
| Section titles | 3vw sans-serif | `.section-title{font-family:sans-serif;font-size:3vw}` |
| Links | black, **no underline**; hover border commented out | `a {color: #000; text-decoration: none;}` `/*a:hover {border-bottom: 0.2vw solid #000; }*/` |
| Window links | **blue, underlined** (system `blue`) | `.fashion-box .link-wrapper a {color: blue; text-decoration: underline;}` |
| Selection colour | **`#ccc` bg, black text** | `::selection {background: #ccc; color: #000; text-shadow: none;}` |
| Scrollbar | hidden | `::-webkit-scrollbar { display: none !important; }` |
| Pill buttons | 1px border, 16px radius, 13px Courier Prime; colour variants `red`, `blue`, black-fill, `#34c4fa` | `#toggleAll{border:1px solid red;color:red;border-radius:16px;font-size:13px;font-family:'courier-prime.regular'}`; `.more-images{border:1px solid blue;color:blue;border-radius:16px}`; `.archive-link-wrapper .col-link a{border:1px solid #000;background-color:#000;color:#fff;border-radius:16px}` |
| Category pills | fills `#00FFFF`, `#ADFF2F`, `#FF1493` | `.cat-button.green{background-color:#00FFFF}` `.greenyellow{#ADFF2F}` `.deeppink{#FF1493}` |
| Layout | 3 CSS columns on home, middle column ruled `#9a9a9a` | `.home #all-projects-wrapper{padding:0 10px;column-count:3}`; `#all-projects-wrapper .column-2{border-left:1px solid #9a9a9a;border-right:1px solid #9a9a9a}` |
| Rules | thin `#808080`, thick 4px black | `hr.proj-separator{border-top:1px solid #808080}`; `hr.big-separator{border-top:4px solid #000000}` |
| Weather / clock widget | absolute top-right, 1.4vw | `#weather{position:absolute;top:0;right:0;padding:10px;font-size:1.4vw}`; HTML: `Current Local Time <span id="live-clock">` |
| Spinning logo | 50 % width, `mix-blend-mode: multiply`; 3-D rotateY wobble 5 s | `#spinning-logo{width:50%;mix-blend-mode:multiply}`; `@keyframes wobble{0%{transform:rotateY(0deg)}100%{transform:rotateY(360deg)}}` |
| Stacked-title 3-D effect | 35 absolutely-positioned h1 copies offset 1px in Z | `h1.main-title:nth-child(2){transform:translateZ(1px)}` … `(35){translateZ(34px)}` |
| Blink | 2 s opacity 0-1-0 | `@keyframes blink{0%{opacity:0}50%{opacity:1}100%{opacity:0}}` `.blink{animation:blink 2s infinite}` |
| **Fake OS windows** — chrome | 4px **ridge** border `#d8d8d8`, white body, absolute positioned in vw/vh, z-index 10000+ | `.show-box{width:30vw;border:4px ridge #d8d8d8;position:absolute!important;top:14vh;left:15vw;z-index:11000;background-color:#fff}`; `.fashion-box{…border:4px ridge;z-index:10010;font-size:13px}` |
| — title bar | XP-blue **gradient 90°, rgb(51,78,165) → rgb(76,127,193)**, 2px padding, white title 0.75vw | `.windows-header-wrapper{padding:2px;background:linear-gradient(90deg,rgba(51,78,165,1) 0%,rgba(76,127,193,1) 100%)}`; `.window-title{font-size:0.75vw;line-height:1.2vw;color:#fff;float:left}` |
| — title font | Courier Prime | `.show-box .windows-header-wrapper .window-title{font-family:'courier-prime.regular'}` |
| — buttons | three JPG icons (iconize / resize / close), 0.8vw high, **1px outset `#dad7d2`** border | `.window-icons img{height:0.8vw;margin-left:3px;border:1px outset #dad7d2;cursor:pointer}` |
| — states | `.iconize` collapses body; `.resize` = 50vw × 100vh at top-left | `.fashion-box.resize{height:100vh;width:50vw;top:0;left:0;overflow:hidden}`; `.fashion-box.iconize{height:inherit}` |
| — window content | scrolling image column | `.show-box .look-content{height:90vh;overflow:scroll}` |
| — red "POST-MODERN" window | body fill `#F00` | `#postmodern-wrapper{…border:4px ridge #d8d8d8}` `.postmodern-inner-wrapper{background-color:#F00}` |
| Transitions | **none** anywhere (only keyframe animations) | no `transition:` in style.css |
| Units | almost everything in **vw / vh** | e.g. `figure{width:49.5vw}`, `#psw-form input{height:1.5vw}`, `.location-flag{width:2.5vw}` |

## 2. www.off---white.com (Salesforce Commerce Cloud + Mobify PWA)

Source: `https://www.off---white.com/en-us/` (1.27 MB HTML), `/mobify/bundle/5607/main.css` (1.78 MB), `clp.css`. No Google Fonts, no Typekit — **all fonts self-hosted** in `/mobify/bundle/5607/`.

| Property | Value | Evidence |
|---|---|---|
| Fonts loaded | **IBM Plex Mono** Regular 400 + Medium 500 (primary UI); **Bookish-Book** and **Bookish-Off-White** (serif, 400); **Helvetica** + **Helvetica-Bold** (tertiary; both cuts point at the *same* woff2) | `@font-face{font-family:IBMPlexMono-Medium;src:url(562c3ed503b9ad12f324.woff) format("woff"),url(e44b6da17070f5fecd5b.ttf)…font-weight:500}`; `@font-face{font-family:Bookish-Off-White;src:url(6515930591595cbb59ad.ttf)…}`; `@font-face{font-family:Helvetica-Bold;src:url(b5344d7310b650080c9d.woff2) format("woff2")…}` |
| Font roles | `--font-regular`/`--font-medium` = Plex Mono (475 + 465 uses); `--font-secondary-brand` = Bookish-Off-White (299); `--font-secondary` = Bookish-Book (190); `--font-tertiary(-bold)` = Helvetica (39 + 38) | `--font-medium:'IBMPlexMono-Medium';--font-regular:'IBMPlexMono-Regular';--font-secondary:'Bookish-Book';--font-secondary-brand:'Bookish-Off-White';--font-tertiary:'Helvetica';--font-tertiary-bold:'Helvetica-Bold'` |
| Root type tokens | h1 3.125rem / lh 2.9375rem / ls −0.125rem; h2 1.875rem / 1.75rem / −1.5px; h3 1.3125rem / 1.4375rem / −0.5px; small .8125rem; base 1rem; large 1.25rem | `--text-h1:3.125rem;--text-h2:1.875rem;--text-h3:1.3125rem;--letter-spacing--h1:-0.125rem;--letter-spacing--h2:-1.5px;--letter-spacing--h3:-0.5px;--line-height:0.9375rem` |
| Mono scale (`Typography__text-medium-*` / `regular-*`) | 32/39, 24/28, 18/22 (ls .36px), 16/20, 14/21, 12/16, 10/16 — **letter-spacing 0** | `.Typography__text-medium-18--GzKUV{font-size:1.125rem;line-height:1.375rem;letter-spacing:0.36px;font-weight:var(--t-medium-font-weight);font-family:var(--font-medium)}`; `.Typography__text-regular-14--qHP8w{font-size:0.875rem;line-height:1.3125rem;letter-spacing:0;font-weight:400}` |
| Serif scale (`secondary(-brand)-*`) | 32 (ls .96px), 24 (.72px), 20 (.6px), 18 (.54px), 16 (.48px), 14 (.42px), 12 (0) — i.e. **3 % tracking** on the serif | `.Typography__text-secondary-brand-16--JvUOm{font-size:1rem;line-height:1.375rem;letter-spacing:0.48px;font-weight:400;font-family:var(--font-secondary-brand)}` |
| Helvetica scale | 14px only, 400 and 700 | `.Typography__text-tertiary-bold-14--oSP4g{font-size:0.875rem;line-height:1.125rem;letter-spacing:0;font-weight:700;font-family:var(--font-tertiary-bold)}` |
| Text-transform | 231 `uppercase` rules vs 443 `none`; uppercase is used for nav/labels/marquee, not body | counts from `grep -oE "text-transform:[^;}]*"` |
| Most common sizes | .875rem (549), .75rem (294), 1rem (177), 1.125rem (140), 1.5rem (120), 2rem (104) | size histogram of main.css |
| Palette tokens | black `#000000`, off-black `#000000`, white `#FFFFFF`, **blue `#0019E9`** (= hover-blue), **orange `#FE3E0D`**, sand `#E2DBC8`, grey `#A5A5A5`, mid-grey `#E6E6E6`, light-grey `#F4F2F2`, dark-grey `#757575`, brown `#897F7B`, error `#F21515`, validation `#52F125`, underline `#000` | `--color-blue: #0019E9; --color-hover-blue: #0019E9; --color-orange: #FE3E0D; --color-sand: #E2DBC8; --color-light-grey: #F4F2F2; --color-underline: #000` |
| Inline HTML hex census | #ffffff 92, #000000 60, **#0019e9 20**, #0a20e8 14, #171717 12, #1d1d1b 11, #e2dbc8 10 | `grep -oiE "#[0-9a-f]{6}"` on HTML |
| Hover rule (product tile) | name, price, arrows turn **blue #0019E9** | `.ProductTile__product-tile--o9Xp8:hover .product-price,…:hover .product-hit__name,…{color:var(--color-blue)}` |
| Link hover | underline **draws in from the left** (scaleX 0→1, 600 ms) | `.Button__btn--link--s94E8:not(:disabled,:has(svg,img))::after{content:"";position:absolute;height:1px;width:100%;inset-block-end:0;background-color:var(--link-text-color);transform:scaleX(0);transform-origin:left;transition:transform .6s cubic-bezier(0, 0.7, 0.3, 1)}` `…:hover::after{transform:scaleX(1)}` |
| Transitions | `transform .6s cubic-bezier(0,.7,.3,1)`, `all .5s ease-in-out`, `opacity .2–.3s ease-in-out`, `transform .85s cubic-bezier(.19,1,.22,1)` | transition histogram |
| Buttons | 700 weight, radius .25rem, padding `.6563rem 1rem .5938rem`, width 10.75rem; secondary hover = orange | `--button-font-weight:700;--button-border-radius:0.25rem;--button-padding:0.6563rem 1rem 0.5938rem;--secondary-bg-hover:var(--color-orange)` |
| Product name typeset | Plex Mono Regular **16px / lh 20px**, no transform | `<div class="Typography__text-regular-16--UGzlE ProductName__product-name__content--LGtKq product-name__content">` |
| Nav links | 116 × `class="nav-link"`; mega-menu image captions Plex Medium 14px **uppercase**, bottom-left 1.25rem inset | `.NavigationItemLinkImage__…__title--guI6c{font-size:0.875rem;line-height:1.3125rem;text-transform:uppercase;letter-spacing:0;font-family:var(--font-medium);position:absolute;inset-block-end:1.25rem;inset-inline-start:1.25rem}` |
| Nav structure | promo bar → logo → **NEW IN / MEN / WOMEN / SNEAKERS / ACCESSORIES / KIDS / BRAND** (mega-menus with Clothing/Shoes/Accessories/Bags/ICONS: "Out Of Office", "Be Right Back", "Signature Varsity", "Off-White™ c/o AC Milan") → footer HELP / SERVICES / LEGAL AREA | header text extraction |
| Product grid | 2 cols mobile (1px gap) → **4 cols ≥768 (.25rem gap)**; variants 2–7 cols | `.ProductsGrid__products-grid--sZ1f2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));column-gap:1px;row-gap:0}@media(min-width:768px){…column-gap:0.25rem;grid-template-columns:repeat(4,minmax(0,1fr))}` |
| Breakpoints | 0 / 576 / 768 / 992 / 1200 / 1400 / 1600 / 1920 (Bootstrap-style, `-from-*` / `-above-*` classes) | `@media(min-width:577px)`, `769px`, `993px`, `1201px`, `1401px`, `1601px`, `1921px` |
| Marquee / "stripe banner" | `ScrollingStripeBanner` = **black band with scrolling uppercase Plex Medium 18px text** (react-fast-marquee); it is a *text* stripe, not diagonal hazard stripes | `.ScrollingStripeBanner__…{font-size:1.125rem;line-height:1.375rem;text-transform:uppercase;letter-spacing:0.36px;font-family:var(--font-medium);padding:1rem 0px;background-color:var(--color-black)}`; `.rfm-marquee-container{…background-color:var(--color-black)}` |
| Diagonal stripe / arrow motif in CSS/SVG | **none** — no `repeating-linear-gradient`, no 45° rotated stripe element; only swiper/plyr `rotate(45deg)` chevrons and `icon-arrow-left/right` (UI chevrons). The brand stripes/arrows appear only inside product photography and logo SVG | grep for `repeating-linear-gradient|rotate\(45deg\)|stripe` returned only `ScrollingStripeBanner` (text marquee) and plyr loading-bar gradient |
| Quotation-mark labels | not typeset by CSS; quotes are literal characters in product names / imagery | no `::before{content:"\201C"}` rules found |
| Corner radius | .25rem buttons; `--border-radius-lab` on "lab" tiles | `--primary-border-radius:0.25rem` |
| Selection colour | not overridden | — |
| Cursor | native | — |

## 3a. virgilabloh.com — current (2025–26, Next.js + styled-components, "V.A.A. Announcement")

Source: `https://www.virgilabloh.com/`, `/_next/static/css/adf173413be0c2eb.css`, inline styled-components (110 KB).

| Property | Value | Evidence |
|---|---|---|
| Background | **`#1c4a96` blue** (default) / `#ffffff` under Nike theme; text white / `#1e1e1e` | `html:not([data-nike-theme]),html:not([data-nike-theme]) body{background-color:#1c4a96}` `html:not([data-nike-theme]) body{color:#ffffff}`; `html[data-nike-theme]{background-color:#ffffff;color:#1e1e1e}` |
| Accent | `#B9E7FE` (ice blue) on buttons | `.iDikbK{background:#1C4A96;border:1px dashed #1C4A96;color:#B9E7FE;…text-transform:uppercase}` |
| Fonts | **Simon Mono** (`/fonts/SimonMono-Regular.otf`, 88 KB) and **AA00 Business System** (`/fonts/AA00BusinessSystem-Regular.otf`, 35 KB); both 400, `font-display:swap`; no Google Fonts | `@font-face{font-family:Business System;src:url(/fonts/AA00BusinessSystem-Regular.otf) format("opentype")}` `@font-face{font-family:Simon Mono;src:url(/fonts/SimonMono-Regular.otf) format("opentype")}` |
| UI labels | Simon Mono **12px, uppercase, ls −0.05em** | `.gA-dimf{font-size:12px;color:#FFFFFF;text-transform:uppercase;font-family:"Simon Mono",monospace;letter-spacing:-0.05em;white-space:nowrap}` |
| Body copy | Business System 13px, ls −0.05em, lh 1.24, **justified** | `.iYUzQI{font-family:"Business System",sans-serif;font-size:13px;letter-spacing:-0.05em;line-height:1.24;text-align:justify}` |
| Micro labels | 10px uppercase ls −0.05em | `.jqoccS{font-size:10px;color:#FFFFFF;text-transform:uppercase;letter-spacing:-0.05em;line-height:1}` |
| Display type | **bold 700, uppercase, ls −0.06em, lh 0.8, ~24.55vw**, rotated −20° | `.jdQEbU{font-size:calc(var(--vw) * 24.55vw - 0.2rem);font-weight:700;text-transform:uppercase;letter-spacing:-0.06em;line-height:0.8;transform:translateY(20vw) rotate(-20deg)}`; also `85px/700/-0.04em/lh .9` |
| Frames | **1px (0.5px ≥700px) dashed white** rules and boxes — "spec-sheet" look | `.iQheDJ{height:7.5px;width:100%;border:1px dashed #FFFFFF;border-bottom:none}@media(min-width:700px){…border:0.5px dashed #FFFFFF}`; `.fcOuKe{width:2px;height:100%;border-right:1px dashed #FFFFFF}` |
| Inputs | transparent, 1px dashed border, Simon Mono 12px | `.gTOAuh{background:transparent;font-family:"Simon Mono";font-size:12px;letter-spacing:-0.05em;padding:0.6rem 0.5rem;border:1px dashed #1C4A96;color:#1C4A96}` |
| Ruled-line "ticker" | vertical hairline pattern + horizontal mask, wiped in by clip-path | `.wimJN{height:48px;clip-path:inset(0 100% 0 0);animation:gzjafi 0.5s ease-out forwards;background-image:repeating-linear-gradient(90deg,transparent 0,transparent 8px,#FFFFFF 8px,#FFFFFF 8.5px);mask-image:repeating-linear-gradient(180deg,black 0,black 2px,transparent 2px,transparent 4px)}` |
| Motion | staggered 120 ms fade-ins (35 ms steps); dashed rules scale-in 350 ms; colours 500 ms ease | `.bbRXoP{opacity:0;animation:jBcSpD 0.12s ease-out forwards;animation-delay:0.035s}`; `.mEeTK{transform:scaleX(0);animation:fUWrDv 0.35s ease-out forwards}`; `transition:border-color 0.5s ease` |
| Film grain overlay | fixed full-screen noise PNG, 3 % opacity, hard-light, pixelated | `.kEpBKQ{position:fixed;inset:0;pointer-events:none;z-index:6000;opacity:0.03;mix-blend-mode:hard-light;background-image:url("/images/aj1-article/noise.png");image-rendering:pixelated}` |
| Invert mode | whole site can invert | `html.site-inverted{filter:invert(1)}` |
| Selection | currentColor bg / white text | `::selection{background:var(--selection-bg,currentColor);color:var(--selection-color,white)}` |
| Letter-spaced headers | "L A S T U P D A T E D 2 0 2 6", "V . A . A . A R C H I V E" (spaces inserted per glyph in markup) | page text extraction |
| Fake-OS windows | **none** (replaced by dashed spec-sheet frames) | — |

## 3b. virgilabloh.com — 2023 (static one-pager) and free-game.virgilabloh.com (live)

**virgilabloh.com 2023** (Wayback 2023-06-09, `/css/style.css`, header `Theme: virgilabloh`): `body{font-family:sans-serif;font-size:var(--size-1);line-height:1em}` with `--size-1: 1vw`; `a{color:#000;text-decoration:none}`; **`::selection{background:#000;color:#fff}`**; a flex-wrap grid of 20 SVG logos at 20 % width (`.wrapper-logos .single-logo{width:20%;padding:10px}`), each `img.black{filter:grayscale(1)}`, "coming soon" ones at `.grayed{opacity:0.3}`; links out to `/postmodern/`, `/free-game/`, `/skyscraper/`, `canary---yellow.com/archive`, `alaska---alaska.com`, `public---domain.com`. Mobile at 960px → 50 % columns.

**free-game.virgilabloh.com** (Netlify static; `css/reset.css`, `css/style.css`; `style-project-red.css` 404s):

| Property | Value | Evidence |
|---|---|---|
| Theme comment | "Canary---yellow trojanhorse" | `/* Theme: Canary---yellow trojanhorse */` |
| Fonts | **courier-prime.regular** (`../assets/fonts/courier-prime.regular.{eot,woff,ttf,svg}` — woff 62 KB, live) and **modern-no20-italic** (`../assets/fonts/modern-no20-italic.woff` 24 KB, live) | `@font-face{font-family:'courier-prime.regular';src:local('☺'),url('../assets/fonts/courier-prime.regular.woff') format('woff')…}` |
| Body | Courier Prime **0.78vw**, lh 1.16em, black on white, antialiased | `:root{--main-fontsize:0.78vw;--main-lineheight:1.16em;--size-toc:1vw;--lineh-toc:1.1em;--size-sectiontitle:2.8vw;--lineh-sectiontitle:1em}`; `body{font-family:'courier-prime.regular';font-size:var(--main-fontsize)}` |
| Mobile scale (≤960) | 3vw body, 4vw toc, 8vw section | `@media screen and (max-width:960px){:root{--main-fontsize:3vw;--size-toc:4vw;--size-sectiontitle:8vw}}` |
| Headings | `.helvetica{font-family:helvetica;font-weight:700}`; section titles 2.8vw Helvetica 700 | `#introduction .section-title{font-family:helvetica;font-weight:700;font-size:var(--size-sectiontitle)}` |
| Italic subtitle | Modern No. 20 Italic 1.5vw | `#introduction .subtitle{font-family:'modern-no20-italic';font-size:1.5vw;line-height:1.7vw}` |
| Links | black, no underline; TOC links **`#00f`**; hover underline via class | `a{color:#000;text-decoration:none}`; `.toc{column-count:2;color:#00f}` `.toc ol li a{color:#00f}`; `.underline-mouseover:hover{text-decoration:underline}` |
| Accent red | `#f00` pill (5vw radius, 13px/20px) and red window body | `.pill-postmodern{border-radius:5vw;border:1px solid #f00;color:#f00;font-size:13px;line-height:20px;padding:0 5px}`; `#postmodern-wrapper .popup-inner-wrapper{padding:1vw;background-color:#F00}` |
| Image frames | **3px solid `#00f`** on preview images & iframes | `#contents .row .preview-wrapper img{display:block;width:100%;border:3px solid #00f;margin-bottom:20px}` |
| Selection | **black bg / white text** | `::selection{background:#000;color:#fff;text-shadow:none}` |
| Header | **fixed**, white, 10px padding; body offset 16.5vw | `header{padding:10px;position:fixed;background-color:#fff;z-index:999;top:0}`; `body{padding-top:16.5vw}` |
| Header contents | spinning-logo GIF (`virgil-spinning.gif`) linking to canary---yellow.com; "FROM A - Z (TABLE OF CONTENTS)" in Helvetica 700 1vw; 2-column `<ol>` TOC in `#00f` | `.intro-toc{…font-family:helvetica;font-weight:700;font-size:var(--size-toc);padding-top:3.2vw}`; `.toc{column-count:2}` |
| Blink | 2 s | `.blink{animation:blink 2s infinite}` on `<span class="blink">✨</span>` |
| Grid | float-based 12-col (`.col-md-3` 25 % …), 16:9 iframes | `.col-md-3{width:25%;float:left}`; `#contents .row .preview-wrapper.boxed-4 iframe{height:18.74vw}` |
| **Fake-OS window** | `.popup-window`: 32vw wide, absolute, z 10000, **4px ridge `#d8d8d8`**; XP-blue gradient title bar; title 0.75vw white; icons 0.8vw with `1px outset #dad7d2`; `.iconize` hides body | `.popup-window{text-align:right;width:32vw;position:absolute;z-index:10000;border:4px ridge #d8d8d8}`; `.windows-header-wrapper{padding:2px;background:linear-gradient(90deg,rgba(51,78,165,1) 0%,rgba(76,127,193,1) 100%)}`; `.window-title{font-size:0.75vw;line-height:1.2vw;color:#fff;width:75%;float:left}`; `.window-icons img{height:0.8vw;margin-top:0.1vw;margin-left:3px;border:1px outset #dad7d2;cursor:pointer}`; `.popup-window.iconize .popup-inner-wrapper{display:none}` |
| Window instances | `#canary-yellow-wrapper` 28vw at left 5vw / top 40vw; `#postmodern-wrapper` 32vw at right 10vw / top 30vw, title `"POST-MODERN"` (literal quotes) | `#canary-yellow-wrapper{width:28vw;left:5vw;top:40vw;border:4px ridge #d8d8d8}`; HTML `<div class="window-title">"POST-MODERN"</div>` |
| Window buttons (JS) | jQuery toggles `iconize` / `resize` classes | `onclick="$('#postmodern-wrapper').toggleClass('iconize'); …removeClass('resize');"` |
| Mobile windows | become static full-width | `@media(max-width:960px){.popup-window{position:inherit!important;width:calc(100% - 20px)!important}}` |
| Transitions | **none** | no `transition:` in style.css |
| Cursor | native (`.cursor-pointer{cursor:pointer}` only) | — |

Confirmation of prior analysis: Courier Prime body ✔, Helvetica bold headings ✔, `#00f` links/frames ✔, `#f00` accents ✔, XP windows ✔, vw sizing ✔, no transitions ✔. **Additions:** the second font is *Modern No. 20 Italic*; selection is black/white (old Canary was `#ccc`); TOC uses CSS `column-count:2`; header is fixed with a 16.5vw body offset; image frames are 3px `#00f`; the XP window icons are hotlinked and currently 404.

## 4. Tribute / analysis pieces — stated specifics

| Source | Stated specifics | Notes |
|---|---|---|
| Highsnobiety, "Why Does Virgil Abloh Put Everything in 'QUOTES?'" (Alec Leach, 2017) | Helvetica (1957) as primary type; quotation marks as a device of "ironic detachment"; Abloh: "The diagonal lines help me solve a huge issue, how to take a bunch of random things and let them be one." (via 032c #32, 2017) | No hex, no angle. |
| Made Good Designs, "Off-White Brand Guidelines" (Aug 2026) | Helvetica **Bold**; "Helvetica plus quotation marks IS the identity"; palette **#000000, #111111 ink, #FFCC00 caution yellow, #F5A623 hazard orange, #FFFFFF**; crossing-arrows from Glasgow Airport wayfinding (Kinneir, Calvert & Associates, mid-1960s) | Explicitly says no official spec exists for stripe angle/width/tracking. Hex values are the author's reconstruction. |
| Design Your Way, "Off-White Logo" (Bogdan Sandu, Feb 2026) | Helvetica Bold wordmark; **#000000 / #FFFFFF / accent yellow #FFC700; Pantone Black 6 C, 116 C**; **four stripes at 45°**; clear-space = quote-mark height; 15 mm min wordmark | Secondary/unofficial; the "45°" and "four stripes" are that author's reading. |
| The Fashion Law, "From Off-White Stripes to Red Zip Ties" (Julie Zerbo, Dec 2021) | USPTO filings: diagonal-stripe marks with **15 and 19 stripes** (square and rectangle variants); red zip tie "with a substantially rectangular end, all in the color red"; quotation marks flanking "Product Bag", "For Walking" | Primary-ish (trademark record). |
| Open All Hours, "The Off-White Logo System" (Jan 2026) | Helvetica; stripes echo "hazard tape and loading bays"; "Identity is not a mark. It is behaviour." | No numbers. |
| Complex, "How Virgil Abloh Turned Diagonal Lines Into a Brand" (Cameron Wolf, Jul 2016) | stripes read as crosswalk / parking / traffic markings, "very industrial" | No numbers. |
| Hypebeast, "Virgil Abloh Launches a Comprehensive Archive" (Nicolaus Li, Jan 2019) | canary---yellow.com / virgilabloh.com designed by **Studio Temp (Bergamo)**; references Abloh's early "THE BRILLIANCE!" blog; "clean, minimalist aesthetic" | Credits the original theme. |
| It's Nice That / Eye on Design / Dezeen | no dedicated Off-White graphic-codes explainer surfaced in search | — |

Takeaway: **no primary source states a hex for "Off-White yellow" or a stripe angle.** Everything numeric comes from secondary write-ups; the only hard facts are Helvetica (Bold for the wordmark), the Glasgow-Airport arrow lineage, 15/19-stripe trademark drawings, and the quotation-mark device. Live CSS on off---white.com uses `#0019E9` blue and `#FE3E0D` orange as its accents, not yellow.

---

## 5. CSS recipe — reproduce the feel with clean assets

### 5.1 Tokens

```css
:root {
  /* --- surfaces (all three eras are white-on-white; VAA 2025 is blue) --- */
  --bg:            #ffffff;
  --bg-alt:        #f0f0f0;   /* canary 2026 --color-bg-alt */
  --bg-img:        #f3f3f3;   /* canary image placeholder */
  --ink:           #1e1e1c;   /* canary 2026 --color-primary (warm near-black) */
  --ink-pure:      #000000;   /* old canary / free-game */
  --rule:          #9a9a9a;   /* old canary column rules */
  --rule-soft:     #808080;   /* hr.proj-separator */
  --ink-10:        rgb(30 30 28 / .10);
  --ink-20:        rgb(30 30 28 / .20);

  /* --- accents --- */
  --link-blue:     #0000ff;   /* free-game / old canary TOC + 3px image frames */
  --ow-blue:       #0019e9;   /* off---white.com hover / link blue */
  --alert-red:     #ff0000;   /* free-game pill + red window body */
  --ow-orange:     #fe3e0d;   /* off---white.com secondary hover */
  --vaa-blue:      #1c4a96;   /* virgilabloh.com 2025 ground */
  --vaa-ice:       #b9e7fe;
  --hazard-yellow: #ffcc00;   /* NOT from any site CSS; secondary-source value, use only for stripes */
  --pill-cyan:     #00ffff;  --pill-lime: #adff2f;  --pill-pink: #ff1493;  /* old canary category pills */

  /* --- XP window chrome --- */
  --xp-title-a:    rgb(51 78 165);
  --xp-title-b:    rgb(76 127 193);
  --xp-bevel:      #d8d8d8;   /* 4px ridge */
  --xp-btn-bevel:  #dad7d2;   /* 1px outset */

  /* --- type --- */
  /* Helvetica Bold → Google substitutes. 'Inter Tight' 800 or 'Archivo' 700 is closest to Helvetica Neue 75/Bold;
     'Instrument Sans' 700 is a lighter-feeling option. Plain 'Inter' 700 also passes at display size. */
  --font-grotesk:  "Inter Tight", "Archivo", "Instrument Sans", Helvetica, Arial, sans-serif;
  --font-grotesk-weight-display: 800;
  --font-grotesk-weight: 700;
  /* Courier Prime is already an open Google Font (the sites self-host the same face) */
  --font-mono:     "Courier Prime", "Courier New", monospace;
  /* Simon Mono (proprietary) → 'IBM Plex Mono' (what off---white.com actually uses) or 'JetBrains Mono' */
  --font-mono-ui:  "IBM Plex Mono", "JetBrains Mono", "Courier Prime", monospace;
  /* Modern No. 20 Italic (free-game subtitle) → 'Bodoni Moda' italic or 'Playfair Display' italic */
  --font-didone-italic: "Bodoni Moda", "Playfair Display", Georgia, serif;
  /* Bookish-Off-White (store serif) → 'Newsreader' or 'Source Serif 4' */
  --font-serif:    "Newsreader", "Source Serif 4", Georgia, serif;

  /* --- scale (canary 2026 + free-game) --- */
  --text-copy:     12px;      /* canary body */
  --text-copy-vw:  0.78vw;    /* free-game body (mobile: 3vw) */
  --text-lead:     1.125rem;
  --text-heading:  2rem;
  --text-display:  3rem;
  --lh-tight:      0.88;      /* canary uppercase titles */
  --tracking:      -0.03em;   /* canary body */
  --tracking-ui:   -0.05em;   /* VAA mono labels */
  --tracking-display: -0.06em;

  /* --- motion --- */
  --ease:          cubic-bezier(.4, 0, .2, 1);
  --dur:           150ms;     /* canary; old sites use NONE */
  --ow-ease:       cubic-bezier(0, .7, .3, 1);  /* off-white underline draw */
}

/* Google Fonts import (everything above that isn't a system face) */
/* <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@700;800&family=Archivo:wght@700&family=Courier+Prime:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Bodoni+Moda:ital@1&display=swap" rel="stylesheet"> */
```

### 5.2 Base rules that carry the feel

```css
* { font-variant-ligatures: none; }                 /* canary 2026 */
html { scroll-padding-top: 10rem; }
body {
  background: var(--bg); color: var(--ink);
  font: 400 var(--text-copy)/1.5 var(--font-grotesk);
  letter-spacing: var(--tracking);
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
}
::selection { background: #000; color: #fff; text-shadow: none; }   /* free-game / VA 2023 */
/* alt: old canary  ::selection { background: #ccc; color: #000; } */
::-webkit-scrollbar { display: none; }              /* old canary */

a { color: inherit; text-decoration: none; }
a:hover { opacity: .4; transition: opacity var(--dur) var(--ease); }   /* canary 2026 */
.toc a { color: var(--link-blue); }                  /* free-game */
.toc a:hover { text-decoration: underline; }

.mono { font-family: var(--font-mono-ui); text-transform: uppercase; }   /* canary: mono ⇒ uppercase */
.label { opacity: .4; }                              /* "[PRODUCT]" style bracketed labels */
.label::before { content: "["; } .label::after { content: "]"; }

h1, .display {
  font: var(--font-grotesk-weight-display) clamp(32px, 8vw, 64px)/var(--lh-tight) var(--font-grotesk);
  text-transform: uppercase; letter-spacing: var(--tracking);
}
.quoted::before { content: "\201C"; } .quoted::after { content: "\201D"; }   /* "SHOELACES" device */

img { display: block; max-width: 100%; height: auto; }
.frame-blue { border: 3px solid var(--link-blue); }                 /* free-game image frame */
.frame-dashed { border: 1px dashed currentColor; }                  /* VAA spec-sheet frame */
@media (min-width: 700px) { .frame-dashed { border-width: .5px; } }
.img-box { background: var(--bg-img); aspect-ratio: 3 / 2; overflow: hidden; }

.header-fixed { position: fixed; inset: 0 0 auto 0; background: #fff; padding: 10px; z-index: 999; }
.cols-3 { column-count: 3; padding: 0 10px; }       /* old canary home */
.cols-3 > .col-mid { border-inline: 1px solid var(--rule); }

.pill { display: inline-block; border: 1px solid currentColor; border-radius: 16px;
        padding: 0 5px; font: 13px/20px var(--font-mono); cursor: pointer; }
.pill--red { color: var(--alert-red); }  .pill--blue { color: var(--link-blue); }

@keyframes blink { 0%,100% { opacity: 0 } 50% { opacity: 1 } }
.blink { animation: blink 2s infinite; }
@keyframes blink-colon { 0%,50% { opacity: 1 } 50.1%,100% { opacity: .2 } }
.clock-colon { animation: blink-colon 2s step-end infinite; }

/* off-white style link underline that draws in from the left */
.ow-link { position: relative; }
.ow-link::after { content: ""; position: absolute; left: 0; bottom: 0; height: 1px; width: 100%;
  background: currentColor; transform: scaleX(0); transform-origin: left;
  transition: transform .6s var(--ow-ease); }
.ow-link:hover::after { transform: scaleX(1); }
.ow-tile:hover .name, .ow-tile:hover .price { color: var(--ow-blue); }
```

### 5.3 Hazard-stripe snippet (original — no site ships this in CSS)

```css
/* Diagonal hazard stripes, 45°. Off-White's trademark drawings show 15 or 19 stripes;
   pick stripe width so the box lands on an odd count. Black/white is the canonical pair;
   swap --stripe-b for var(--hazard-yellow) for the caution-tape variant. */
.hazard {
  --stripe-a: #000;
  --stripe-b: #fff;
  --stripe-w: 12px;
  background: repeating-linear-gradient(
    45deg,
    var(--stripe-a) 0 var(--stripe-w),
    var(--stripe-b) var(--stripe-w) calc(var(--stripe-w) * 2)
  );
}
.hazard--yellow { --stripe-b: var(--hazard-yellow); }
.hazard--bar { height: 24px; width: 100%; }           /* divider / marquee ground */
.hazard--frame { padding: 8px; }                      /* wrap an image */
.hazard--frame > * { background: #fff; display: block; }

/* Text-marquee "stripe" like off---white.com's ScrollingStripeBanner */
.marquee { overflow: hidden; background: #000; color: #fff;
  font: 500 1.125rem/1.375rem var(--font-mono-ui); text-transform: uppercase; letter-spacing: .36px; padding: 1rem 0; }
.marquee__track { display: inline-flex; gap: 2rem; white-space: nowrap; animation: marquee 20s linear infinite; }
@keyframes marquee { to { transform: translateX(-50%); } }

/* Crossed-arrows placeholder: draw your OWN 4-arrow mark; do not trace Off-White's. */
```

### 5.4 Fake-OS-window snippet (from old Canary / free-game, icons rebuilt in CSS)

```css
.xp-window {
  position: absolute;               /* the sites scatter them with vw/vh: e.g. left:5vw; top:40vw */
  width: 32vw; min-width: 280px;
  z-index: 10000;
  border: 4px ridge var(--xp-bevel);
  background: #fff;
  text-align: right;
  font: 13px/1.3 var(--font-mono);
}
.xp-window__bar {
  display: flex; align-items: center; gap: 3px;
  padding: 2px;
  background: linear-gradient(90deg, var(--xp-title-a) 0%, var(--xp-title-b) 100%);
  color: #fff;
}
.xp-window__title { flex: 1; text-align: left; font-size: clamp(11px, .75vw, 13px); line-height: 1.6; padding-left: 4px; }
.xp-window__btn {                    /* replaces the 404'd icon-iconize/resize/close.jpg */
  width: 1.1em; height: 1.1em; padding: 0;
  border: 1px outset var(--xp-btn-bevel);
  background: #ece9d8; color: #000;
  font: 700 9px/1 "Inter Tight", Arial, sans-serif; cursor: pointer;
}
.xp-window__btn--close { background: #d64a3d; color: #fff; }
.xp-window__body { padding: 0; background: #fff; }
.xp-window__body img { width: 100%; display: block; }
.xp-window__body--red { background: var(--alert-red); padding: 1vw; }     /* "POST-MODERN" window */
.xp-window__body--scroll { height: 90vh; overflow: auto; }              /* old canary .look-content */
.xp-window.is-iconized .xp-window__body { display: none; }
.xp-window.is-resized { position: fixed; top: 0; left: 0; width: 50vw; height: 100vh; overflow: hidden; }
.xp-window .caption { text-align: center; padding: 5px 0; font-size: 13px; }
.xp-window a { color: var(--link-blue); text-decoration: underline; }   /* old canary .fashion-box links */
@media (max-width: 960px) {
  .xp-window { position: static; width: calc(100% - 20px); margin: 10px; }
}
```

```html
<div class="xp-window" style="left:10vw; top:30vw">
  <div class="xp-window__bar">
    <div class="xp-window__title">"POST-MODERN"</div>
    <button class="xp-window__btn" data-act="iconize">_</button>
    <button class="xp-window__btn" data-act="resize">□</button>
    <button class="xp-window__btn xp-window__btn--close" data-act="close">×</button>
  </div>
  <div class="xp-window__body xp-window__body--red"><img src="…" alt=""></div>
</div>
<script>
document.addEventListener('click', e => {
  const b = e.target.closest('.xp-window__btn'); if (!b) return;
  const w = b.closest('.xp-window');
  ({ iconize: () => { w.classList.toggle('is-iconized'); w.classList.remove('is-resized'); },
     resize:  () => { w.classList.toggle('is-resized');  w.classList.remove('is-iconized'); },
     close:   () => w.remove() })[b.dataset.act]();
});
</script>
```

### 5.5 Legal notes for the developer

- Fonts to **avoid shipping**: Helvetica / Helvetica Neue LT (Monotype/Linotype), Simon Mono, AA00 Business System, Bookish, Windsor, Modern No. 20, BigFatMarker. Use the Google substitutes in 5.1. *Courier Prime* and *IBM Plex Mono* are OFL and fine.
- The **crossed-arrows mark, the "OFF-WHITE" wordmark, and the specific 15/19-stripe square/rectangle** are registered trademarks; generic 45° hazard striping, quotation-mark labelling as a typographic habit, and XP-style window chrome are not.
- Don't hotlink anything from the sites (free-game's own window icons already broke this way).
- Colour values in 5.1 are measured from CSS except `--hazard-yellow`, which is a secondary-source value with no primary confirmation.

### 5.6 Raw sources kept locally

Scratchpad copies (this session): `canary___yellow_com.html`, `canary_theme.css`, `canary_old_style.css` (Wayback 2023), `www_off___white_com.html`, `ow_main.css`, `virgilabloh_com.html`, `va_next.css`, `va_2023_style.css` (Wayback), `free_game_virgilabloh_com.html`, `fg_style.css`, `fg_reset.css`.
