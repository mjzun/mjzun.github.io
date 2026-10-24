---
# Case study: (X)RUNWAY, a first-person AR runway-walk trainer built as a UNC EDUC 761 project. Sources: the live app (startling-moxie-143212.netlify.app, read and screenshotted 2026-10-22), the project README and source in Matt's private xrunway repo, and the repo's commit history for dates. Matt asked for it as the portfolio's focal point 2026-10-22. Code excerpts are copied unedited from the private repo; the repo itself is not linked. Gaps are marked TODO(Matt).
title: "(X)RUNWAY — a first-person AR runway trainer"
slug: xrunway
tracks: ["design", "data"]
featured: true
lead: true
# Hero loop: 25 s of the live app's hands-free Preview Walk (countdown, walk out, turn, walk back, scored summary), recorded from headless Chrome on 2026-10-22.
hero:
  mp4: "/video/xrunway-hero.mp4"
  webm: "/video/xrunway-hero.webm"
  poster: "/video/xrunway-hero-poster.jpg"
  width: 1280
  height: 720
  caption: "PREVIEW WALK · RECORDED 2026-10-22"
order: 0
# Dates from Matt (2026-10-22): started Feb 2026, still in active development. "date" is the current month because the project is ongoing.
date: "2026-10"
timeline: "Feb 2026 – present"
role: "Designer and developer, EDUC 761 project, UNC School of Education"
audience: "Aspiring runway models practicing their walk at home, and the coaches and agencies who want their walk data"
constraint: "Score only what a Meta Quest 3 headset can actually measure: head tracking, no camera and no body scan"
outcome: "A working WebXR trainer that maps your own floor into a runway and scores every walk on pace, carriage, and line, with replay and data export"
tools: ["Meta Immersive Web SDK (IWSDK)", "WebXR", "Three.js", "TypeScript", "Vite", "Vitest", "Meta Quest 3", "Claude Code", "Netlify"]
links:
  - kind: "LIVE APP"
    label: "(X)RUNWAY"
    url: "https://startling-moxie-143212.netlify.app"
    note: "Runs in a desktop browser with Preview Walk; the full experience is in a Meta Quest 3"
  - kind: "SOURCE"
    label: "github.com/mjzun/xrunway-web"
    url: "https://github.com/mjzun/xrunway-web"
    note: "Public copy of the web prototype's code; view-only"
# Screenshots of the live app, captured in headless Chrome at 1440 × 900 on 2026-10-22 (the walk shots come from the hands-free Preview Walk).
images:
  - src: "../../assets/work/xrunway/scored-summary.png"
    alt: "The (X)RUNWAY scored summary over the 3D runway and audience: an overall score ring reading 84 out of 100 with Pass and Gold badges, bars for pace 97, carriage 0 and line 100, coach's notes, and buttons for Walk Again, Export CSV plus JSON, Replay and Share Card."
    caption: "\"SCREENSHOT\" SCORED SUMMARY · PREVIEW WALK · 1440 × 900 · 2026-10-22"
  - src: "../../assets/work/xrunway/walk-hud.png"
    alt: "Mid-walk in (X)RUNWAY: low-poly audience figures fill the stage, and a glass HUD bar at the bottom shows WALK, time 15 seconds, and live meters for pace 94, carriage 100 and line 100."
    caption: "\"SCREENSHOT\" LIVE WALK HUD · PACE · CARRIAGE · LINE · 1440 × 900 · 2026-10-22"
  - src: "../../assets/work/xrunway/scoring-method.png"
    alt: "The Understanding the Score panel beside a lit runway and audience: definitions and formulas for pace, carriage and line, each with an industry quote, and a note that scores come from Meta Quest 3 head tracking only."
    caption: "\"SCREENSHOT\" UNDERSTANDING THE SCORE · METHODOLOGY PANEL · 1440 × 900 · 2026-10-22"
  - src: "../../assets/work/xrunway/welcome-tour.png"
    alt: "The (X)RUNWAY welcome card on a blurred stage: Train like you're already on the runway, a short description, an optional name field, and Skip and Next buttons."
    caption: "\"SCREENSHOT\" WELCOME TOUR · FIRST RUN · 1440 × 900 · 2026-10-22"
  - src: "../../assets/work/xrunway/xrunway-cam-app-icon.jpg"
    alt: "The (X)RUNWAY Cam app icon on an iPhone home screen: a green (X) mark on a dark rounded square."
    caption: "\"APP ICON\" (X)RUNWAY CAM · IPHONE CAMERA COMPANION"
  - src: "../../assets/work/xrunway/landing-desktop.png"
    alt: "The (X)RUNWAY landing in dark frosted glass: a Map your floor panel with a 7 by 1.4 meter runway and Preview Walk button, a settings panel with music, beat pulse, duration and pace style, and a user-flow panel listing four steps."
    caption: "\"SCREENSHOT\" LANDING · SETTINGS + USER FLOW · 1440 × 900 · 2026-10-22"
  - src: "../../assets/work/xrunway/landing-phone.png"
    alt: "The (X)RUNWAY landing at phone width: the green (X)RUNWAY wordmark, the Map your floor panel, and the stacked training settings ending in a Start button."
    caption: "\"SCREENSHOT\" LANDING · PHONE · 390 WIDE · 2026-10-22"
---

## What I made

(X)RUNWAY is a first-person augmented-reality trainer for the runway walk. You put on a Meta Quest 3, walk your own floor, and the headset lays a runway, stage lighting, and an audience over it. Every walk gets scored, and you can replay it, compare it with your best, and export the data.

The flow is four steps: enter the headset and set your runway, choose your experience level, set the duration, and walk. Then you review a scored summary. There are four levels, from Beginner to Challenge, and each sets its own target pace and music tempo.

The scoring stays honest about the hardware. The headset only knows where your head is, so the app scores only what it can measure:

- **Pace:** your head speed against the target speed for your level.
- **Carriage:** how much of the walk your head stays level and facing down the line.
- **Line:** how close you stay to the runway's center line.

The app's methodology panel pairs each metric with how the industry describes it, quoting Naomi Campbell, CM Models, and Backstage. A FIT step measures your standing head height, head bob, pace, and cadence, so scores adjust to your body. You re-run it when you change footwear, since heels change your height and stride.

You can map the runway to your room with sliders, or by walking it in the headset. Preview Walk runs the whole thing hands-free in a desktop browser, so anyone can try it without a headset. Walk history saves on the device and exports as CSV, JSON, or an Excel sheet.

There's also an iPhone camera companion, (X)RUNWAY Cam. Set on a tripod, it streams your full-body pose to the trainer, so the engine can see more than your head.

## Why I built it

The project abstract, in my words:

> While stumbling my way through learning how to walk down a runway, I noticed a glaring issue within the existing instruction methods. It is almost impossible to learn unless someone receives one on one coaching that costs hundreds of dollars or someone enrolls in a fashion school / modeling agency that hosts classes. By combining the affordances of XR technology with the creative arts, (X)RUNWAY is the answer to these underdeveloped methods of training people on how to improve their runway walk. Exclusively using the Meta Quest, the (X)RUNWAY app will be available to download for free, filled with innovative MR experiences that will deploy helpful overlays over a physical runway using pass through technology.
>
> Within my community, we share the same experience of doing some sort of runway training that doesn't reflect the actual runway environment at all. Lights, cameras, and people surround the area, making it difficult to consistently recreate during training, which is exactly what AR helps to emulate. VR experiences will be developed later with a dedicated VR development team to implement all sides of the MR experience. With the technology in place, AI and Real-life coaches will be created to facilitate training, harnessing bodily movement data to improve metrics like pace, stride, posing, and more. For example, a modeling class could use the AR functionality [to] match their unique runway environment, and to have deeper data points available to them to follow in the AR overlay like tracking specific foot placements and eye positioning. In the future, partnerships with fashion houses, modeling agencies, and influencers will lay the foundation for the (X)RUNWAY pipeline to become the staple runway training technology in the modeling industry.

## Outcome

It's early. I started in February 2026 and I'm still building it. The working web prototype is live and anyone can try it with Preview Walk, but it hasn't been released on the Quest store and has no outside users yet. Everything in the abstract about AI coaches, VR, and partnerships is the plan, not something already built.

The frosted-glass panels on this portfolio's navigation and filter windows come from this project's landing page.

## Process

I built it as a web prototype on Meta's Immersive Web SDK, so it runs on the web and in a Quest 3 without an app store. Everything in the scene is generated in code, with no outside 3D models or audio files. The design follows the Quest's frame-rate budget, and unit tests cover the core scoring and runway math.

## Under the hood

The scoring is plain arithmetic you can check, not a black box. These are short excerpts from the project's source, copied unedited. The full web prototype's code is public at [github.com/mjzun/xrunway-web](https://github.com/mjzun/xrunway-web); product, business, and testing documents stay private.

Every score lives between a floor of 40 and a cap of 100.

<p class="label fine source-label"><span class="q">SOURCE</span> <span class="mono">src/pose-derive.ts · clampScore</span></p>

```ts
export const SCORE_MIN = 40;
export const SCORE_MAX = 100;

export function clampScore(v: number): number {
  return v < SCORE_MIN ? SCORE_MIN : v > SCORE_MAX ? SCORE_MAX : v;
}
```

Pace is full marks inside a band around your level's target speed. Walking too slowly costs twice as much as walking too fast.

<p class="label fine source-label"><span class="q">SOURCE</span> <span class="mono">src/pose-derive.ts · paceBandScore</span></p>

```ts
export const PACE_BAND_MPS = 0.1;
export const PACE_K_SLOW = 90;
export const PACE_K_FAST = 45;

/** The pace score BEFORE clamping (callers clamp like every other channel). */
export function paceBandScore(
  speed: number,
  idealPace: number,
  opts: PaceBandOpts = DEFAULT_PACE_OPTS,
): number {
  const d = speed - idealPace;
  if (d > opts.band) return 100 - (d - opts.band) * opts.kFast;
  if (d < -opts.band) return 100 - (-d - opts.band) * opts.kSlow;
  return 100;
}
```

Carriage blends how much of the walk your head stayed level with how much it faced down the line.

<p class="label fine source-label"><span class="q">SOURCE</span> <span class="mono">src/head-carriage.ts · carriageScoreOf</span></p>

```ts
export function carriageScoreOf(
  pitchFrac: number,
  yawFrac: number | null,
): number {
  const fc =
    yawFrac === null
      ? pitchFrac
      : M8_PITCH_FRAC_WEIGHT * pitchFrac +
        (1 - M8_PITCH_FRAC_WEIGHT) * yawFrac;
  return SCORE_MIN + (SCORE_MAX - SCORE_MIN) * fc;
}
```

Line drops with your average sideways distance from the center line, in meters.

<p class="label fine source-label"><span class="q">SOURCE</span> <span class="mono">src/metrics.ts · line</span></p>

```ts
const footPlacement = 100 - this.latEma * 240;
```

Each walk moves through five phases, and the summary only appears once the walk ends.

<p class="label fine source-label"><span class="q">SOURCE</span> <span class="mono">src/show.ts · ShowPhaseValue</span></p>

```ts
export type ShowPhaseValue = "idle" | "brief" | "countdown" | "walk" | "summary";
```

## Tools

Meta Immersive Web SDK, WebXR, Three.js, TypeScript, Vite, Vitest, Meta Quest 3, Claude Code, Netlify.
