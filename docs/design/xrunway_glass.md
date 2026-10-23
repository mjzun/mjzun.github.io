<!-- xrunway_glass.md — the glassmorphism styling values measured from Matt's private xrunway repo, and how the portfolio's "glass window" tokens were reconciled with them. Styling values only. -->

# "GLASS" — xrunway values, measured

Source: Matt's private xrunway repo, read 2026-09-14. **Styling values only**; file names and line positions are left out on purpose so the private repo's structure stays private.

## 1. Tokens

| Token | Value |
|---|---|
| base tint | `rgba(10, 12, 16, 0.55)` |
| base border | `rgba(255, 255, 255, 0.14)` |
| base blur | `14px` |
| tier 1 "ambient" tint / blur | `rgba(10, 12, 16, 0.42)` / `12px` |
| tier 2 "card" tint / blur (the default) | `rgba(10, 12, 16, 0.58)` / `18px` |
| tier 3 "modal" tint / blur | `rgba(8, 10, 14, 0.7)` / `26px` |
| rim (top highlight) | `rgba(242, 245, 248, 0.22)` |
| rim, soft (bottom highlight) | `rgba(242, 245, 248, 0.05)` |
| colour tint wash | `rgba(75, 156, 211, 0.06)` |
| page ground behind the glass | `#0a0c10` |

## 2. The material, per tier

**Tier 2, the default**
- background, three layers top to bottom: `radial-gradient(120% 60% at 50% 0%, <tint wash>, transparent 55%)`, then a sheen `linear-gradient(160deg, rgba(242,245,248,0.045), rgba(242,245,248,0.008) 38%)`, then the tier-2 tint
- `backdrop-filter: blur(18px) saturate(1.4) brightness(1.06)`, with the `-webkit-` twin
- `border: 1px solid rgba(255,255,255,0.14)`
- `box-shadow: inset 0 1px 0 <rim>, inset 0 -1px 0 <rim soft>, 0 24px 60px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.35)`. The code comment calls the two outer shadows "tight contact + long ambient".

**Tier 1, ambient**
- sheen `linear-gradient(160deg, rgba(242,245,248,0.06), rgba(242,245,248,0.01) 45%)` over the tier-1 tint
- `backdrop-filter: blur(12px) saturate(1.5) brightness(1.1)`
- `box-shadow: inset 0 1px 0 rgba(242,245,248,0.28), 0 10px 32px rgba(0,0,0,0.4)`

**Tier 3, modal**
- tint wash `radial-gradient(130% 55% at 50% 0%, …)`, sheen `rgba(242,245,248,0.05)` to `0.01` at 40%, over the tier-3 tint
- `backdrop-filter: blur(26px) saturate(1.45) brightness(1.05)`
- `box-shadow: inset 0 1px 0 <rim>, inset 0 -1px 0 <rim soft>, 0 32px 80px rgba(0,0,0,0.65), 0 4px 12px rgba(0,0,0,0.4)`

**Small pieces**
- pill caption: tier-3 tint, `blur(26px) saturate(1.4)`, base border, `inset 0 1px 0 <rim>, 0 18px 40px rgba(0,0,0,0.45)`
- pill button: tier-1 tint, `blur(12px) saturate(1.4)`, base border; hover swaps the border to the rim colour
- a full-screen scrim: `rgba(4, 6, 10, 0.72)`, `blur(6px)`
- glass buttons sitting *on* glass get no backdrop-filter of their own (the comment says re-blurring blurred pixels is a compositing tax): `border: 1px solid <base border>`, `linear-gradient(160deg, rgba(255,255,255,0.09), rgba(255,255,255,0.04))`, `inset 0 1px 0 rgba(242,245,248,0.12)`

## 3. Radii

Glass panels are rounded throughout: pill `999px`, `16px`, `18px`, `22px`.

## 4. Noise, light mode, reduced transparency

- Noise or grain: **none** (no `noise`, `grain` or `feTurbulence` anywhere).
- Light variant: **none**. The glass is dark only (no `prefers-color-scheme` or `color-scheme`), so every glass value above is tuned for light text on a near-black ground.
- `prefers-reduced-transparency: reduce` turns the blur off and fills with `rgba(10, 12, 16, 0.94)`. The comment says "the rgba fills are load-bearing": contrast has to hold without the blur.

## 5. Motion on glass

- entrance `@keyframes glass-in`: from `opacity: 0; transform: translateY(18px) scale(0.985)` to `opacity: 1; transform: none`
- `0.7s cubic-bezier(0.16, 1, 0.3, 1)`, staggered `0.05s / 0.16s / 0.27s / 0.38s`; inner items `0.55s`, `+0.06s` steps
- a moving pill: `left/top 0.55s cubic-bezier(0.22, 0.8, 0.24, 1)`, `opacity 0.26s ease`
- all motion sits inside `prefers-reduced-motion: no-preference`

---

# "RECONCILED" — what the portfolio took

The site's `--glass-*` tokens are in `src/styles/tokens.css`; the `.glass-window` rules are in `src/styles/global.css`.

| Part | Portfolio value | Taken from xrunway? | Why |
|---|---|---|---|
| tint alpha | paper at **0.58** (white in light mode, black in dark mode) | tier-2 alpha | Tier 1 fails 4.5:1 over busy images (see contrast below). Tier 2 is the lightest tier that passes in both modes. The hue is the page's own paper, not `#0a0c10`, because Direction v2 is black and white only. |
| blur | **18px** | tier 2 | One tier for all three windows keeps one set of numbers. |
| saturate / brightness | **`saturate(1.4) brightness(1.06)`** | tier 2 | This is what makes it read as xrunway's glass rather than plain frosting: thumbnails behind the dock stay vivid. It acts on the image behind, not on site colours. |
| sheen | **dropped** (2026-09-14) | — | It is a gradient, and DIRECTION_v2 allows no gradients except the hazard stripe and the glass tint. |
| inner highlights | **dropped** (2026-09-14) | — | Inset rim highlights are still a box-shadow, and DIRECTION_v2 allows no shadows. |
| border | **1px** solid **ink** (100%) | width matches xrunway's 1px; alpha does not | The 14% white hairline disappears against a white page. Off-White's structural rule is a 1px black line, and the window needs a hard edge for its quoted title bar. |
| colour tint wash (`#4b9cd3` at 6%) | **dropped** | — | It is a hue, and Direction v2 allows no colours beyond its palette. |
| outer drop shadows | **none** | — | xrunway uses them for depth over a dark animated ground. The blur, highlight and frame don't depend on them, and Off-White says no shadows. |
| radius | **0** (square) | — | Rounded corners are everywhere in xrunway, but they're its general UI shape, not what makes the glass glass (blur, saturation, tint and rim do). Off-White rule stands: no exception in DIRECTION_v2. |
| noise | none | matches | — |
| motion | none (`--dur-none`) | not taken | Direction v2 allows no motion. The easing is recorded above in case that changes. |
| reduced transparency | solid paper, no blur | same idea as xrunway's | Fallback also applies when `backdrop-filter` is unsupported. |

## "CONTRAST" — worst case, computed

The worst case assumes the blur does no averaging: a solid black image behind light glass, and a solid white image behind dark glass. Text on the glass is ink (links inside the dock and filters are ink, not blue). WCAG relative luminance, sRGB, tint composited over the backdrop (the sheen these numbers first included has since been dropped, which can only raise light-mode contrast).

| Tint alpha | Light: black text over black image | Dark: white text over white image |
|---|---|---|
| 0.42 (tier 1) | 4.35:1, fails | 2.86:1, fails |
| **0.58 (chosen)** | **7.35:1** | **4.83:1** |
| 0.70 (tier 3) | 10.35:1 | 7.51:1 |

Over plain paper, text on glass is 21:1 in both modes. `brightness(1.06)` can't push a backdrop past pure white or lift pure black, so the worst cases above still hold with the filter on.
