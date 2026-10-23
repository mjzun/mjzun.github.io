<!-- STATUS.md — where the site stands after the QA pass on 2026-09-14: build result, pages that exist, the chosen design direction, every open TODO(Matt) grouped by case study, and the exact assets Matt must export next. -->
# Site status — 2026-09-14

## 1. Build

`npm run build` **passes**: 17 static pages in 375 ms, no errors, no warnings. Nothing had to be fixed after the three parallel QA edits.

Two draft files are skipped on purpose by the content loader (`src/content.config.ts` ignores any file whose name starts with `_`):
- `src/content/work/_3d-blender-rhino.md` (optional 3D page; ships only once a render exists)
- `src/content/work/_ai-communication-lab.md` (no shareable output confirmed yet)

## 2. Pages that exist (all under `src/pages/`)

| URL | File | What it shows |
|---|---|---|
| `/` | `index.astro` | Spec strip, quoted positioning line, A–E index, featured grid (8 of 13), track links, short About, resume pill, contact |
| `/work/` | `work/index.astro` | All 13 published case studies, filterable by track; filter lives in the URL (`/work/?track=design`) |
| `/work/<slug>/` | `work/[slug].astro` | Case-study template: title, ROLE / TIMELINE / TRACKS spec line, audience, constraint, outcome, images (or an "image coming" well), body, tools, prev/next |
| `/about/` | `about.astro` | Bio from `site.json`, pull quote, facts list, resume pill, links |
| `/contact/` | `contact.astro` | Email, LinkedIn, GitHub only (no phone number) |

Published case studies (13), in Work-page order:

| # | Slug | Tracks | Featured |
|---|---|---|---|
| 1 | `raider-education` | design, presentation | yes |
| 2 | `texas-tech-event-collateral` | design | yes |
| 3 | `stemplug-social-relaunch` | design, presentation | yes |
| 4 | `raider-education-deck-system` | presentation | no |
| 5 | `faculty-ai-training` | presentation, ai | yes |
| 6 | `edmotion-competitor-heatmap` | data | yes |
| 7 | `aei-replication` | data, ai | yes |
| 9 | `lovable-apps` | ai | yes |
| 10 | `agent-automation-concept` | ai | no |
| 11 | `gpsg-vice-president` | leadership | yes |
| 12 | `bsa-big-xii-asu-gsv` | leadership | no |
| 13 | `zun-fashion-and-community` | design | no |
| 15 | `photography` | design | no |

(Order 8 is the unpublished AI & Communication Lab draft; order 14 is the unpublished 3D draft.)

Shared pieces: `src/layouts/Base.astro` (page shell, fonts, dock), `src/components/CaseCard.astro`, `Glass.astro`, `SpecLine.astro`, `TrackChips.astro`, `src/styles/tokens.css` (every design value), `src/styles/global.css` (reset and reusable classes), `src/content/site.json` (site-wide copy and links). Deploy: `.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`.

## 3. Design direction: **virgil-first**

Chosen by the judges (80/100, against 74 for hybrid-editorial and 62 for glass-first). Full rules in `docs/design/DESIGN_SYSTEM.md`; rationale in `docs/design/directions/virgil-first.md`; reference mockup `docs/design/mockups/virgil-first.html`; what we borrow and must not copy in `docs/design/virgil_design_brief.md`.

In one paragraph: the page is a document, not a website. Off-white paper, black grotesque type (Archivo), Courier Prime for spec lines and meta, one Bodoni Moda italic word in the headline, an index instead of a menu, numbers instead of adjectives. One accent colour, rust `#9C3506` (not the reference site's pure blue). Square corners, 1.5px ink frames on every image, no shadows, no transitions. Glass appears in exactly three places: the floating dock, the caption on each card image, and one chip bar on the lead image.

## 4. Every TODO(Matt) in `src/content`, grouped by case study

**Totals:** 113 occurrences on 111 lines across 15 files (`grep -rc "TODO(Matt)" src/content`). 12 of those lines are file-header notes that only say "gaps are marked TODO(Matt)"; the remaining **99 are real questions** for Matt.

**Important — 50 of them are visible on the live site right now.** TODOs written as YAML `#` comments or HTML `<!-- -->` comments never render, but TODOs typed as plain text in the body, or put into `date` / `timeline` / `role` / `constraint` / `outcome` / `tools` frontmatter values, render on the page and on the home/Work cards. Visible counts per built page: ZUN 11, BSA 6, Lovable 6, Raider deck system 6, Photography 5, Agent concept 4, Faculty AI training 4, GPSG 4, AEI 3, Raider Education 1 (its timeline shows on the home page and Work page); Work index 6, Home 1. EdMotion, STEMPLUG and Texas Tech collateral render zero. Resolve or delete each visible one before deploy.

Line numbers below refer to the file at the time of this pass.

### raider-education.md (6)
- L9 `date`: YYYY-MM the revival wrapped (within Jan 2024 – Jul 2025). *Renders on cards.*
- L10 `timeline`: start month – end month of the revival. *Renders on cards and the page.*
- L33 When did the revival start and finish, and roughly how many decks and pieces did it include?
- L39 Any workshop counts or attendance numbers? (None in the verified facts; do not add without confirming.)
- L43 Two or three sentences: how did you go from the assistant director's rough content to the finished identity and decks?
- L51 Which of the role-wide tools did you use on Raider Education specifically? Is the flagship deck rebuilt in Keynote yet?

### texas-tech-event-collateral.md (5, plus header note L2)
- L31 Once images land, restore the old-portfolio line ("Here you can find most of the designs I made for the department over the year…").
- L35 Confirm "shared template system" is accurate; how many templates, what did they share, did each unit have a variant?
- L43 Any attendance, reach, or reuse numbers for these events?
- L47 How did a piece move from event request to finished flyer (briefing, approvals, scheduling the 2025–26 set)?
- L53 Which tools did the bulk of the flyer work, and which were only for video (Premiere, OBS) or 3D (Blender)?

### stemplug-social-relaunch.md (5, plus header note L2)
- L8 `date` is blank: the role is ongoing. Fill YYYY-MM when it ends, or say whether ongoing work should sort by its start month (2026-05).
- L15 `tools` is empty: which did you use for STEMPLUG videos and graphics (Premiere, Express, Canva, CapCut, other)?
- L31 Describe the content series in one or two sentences: recurring formats, posting cadence, what the relaunch video was about.
- L40 What did the first few weeks look like (audit, cadence, format tests)? Answering this unlocks a Process section.
- L44 List the tools used, then the Tools section and frontmatter `tools` get filled.

### raider-education-deck-system.md (7, plus header note L2)
- L14 `tools`: which tool(s) were the original decks built in?
- L30 Which of the brochure's sessions or topics did the decks cover? *Visible.*
- L32 How many decks did you build, which is the flagship, and roughly how many slides? *Visible.*
- L38 Is the Keynote rebuild finished? If yes, add `.key` and PDF and this becomes the download link. *Visible.*
- L44 What was the ChatGPT prompt-engineering piece for Raider Education, and when did you make it? *Visible.*
- L46 Describe the shared slide structure, and whether the deck or the identity came first. *Visible.*
- L50 Which of the role-wide tools did the original decks live in? *Visible.*

### faculty-ai-training.md (6, plus header note L2)
- L11 `audience`: were sessions limited to School of Education faculty and staff, or open to others at UNC?
- L14 `tools` is empty: which software built the training materials (Keynote, Canva, Figma)?
- L27 Which generative-AI tools did the trainings cover, and is there a deck or one-pager EdIT has cleared for sharing? *Visible.*
- L35 Do any attendance, satisfaction, or adoption numbers exist? *Visible.*
- L39 How did a typical session run, and what did attendees leave with? Did hardware/AV visitors also bring AI questions? *Visible.*
- L45 Which software built any training materials? *Visible.*

### edmotion-competitor-heatmap.md (5, plus header note L2)
- L14 `tools` is empty: Excel, Python (pandas, matplotlib, Jupyter), or something else?
- L27 How was each criterion scored (numeric scale, tiers, mix)? Where did price and install data come from?
- L35 Is there a specific decision or shift the heatmap led to that EdMotion is comfortable naming publicly?
- L41 How were the five criteria chosen, and how many rounds did the dashboard go through?
- L45 Confirm tools, then write one sentence and fill `tools`. Sharing: confirm with EdMotion what can appear publicly; anonymize competitor names if needed.

### aei-replication.md (2)
- L29 Do you want a one-line plain-English gloss of what an O*NET Job Zone is? Confirm wording. *Visible.*
- L47 Which charts from the notebook should be featured, and is there a one-line takeaway for the repo link? *Visible.*

### lovable-apps.md (7, plus header note L2)
- L12 `audience`: who was each of the five apps built for (students, faculty, the public)?
- L29 Name each of the five apps, what it does, and its live URL. *Visible.*
- L31 Which beta features did you test, and what feedback did you send the Lovable team? *Visible.*
- L37 Which app drew the most visitors, and is there an analytics view that can be shown publicly? *Visible.*
- L45 Did the pairing of design and engineering show up in these five apps, and how? *Visible.*
- L47 Short note on how you worked day to day: prompting approach, build loop, hand edits, which app shipped first. *Visible.*
- L51 Confirm whether the apps also relied on prompt engineering, Claude Code, GitHub, or hand-written HTML so they can be added to tools. *Visible.*

### agent-automation-concept.md (4, plus header note L2)
- L28 What did the workflow register? How was it run before, which steps go to an agent, which stay with a person? Has EdIT cleared this for sharing? *Visible.*
- L34 Did the concept move forward after Jul 2026, and is there a status you are comfortable stating? *Visible.*
- L40 How did the ideation sessions run, roughly when, and how many? *Visible.*
- L44 Which specific tools or agent frameworks did you use or propose? *Visible.*

### gpsg-vice-president.md (9, plus header note L2)
- L8–L9 `date`: the sources only give 2025–2026. Replace with the YYYY-MM the term ended. *Renders on cards.*
- L13 `constraint`: swap in something more specific if you have it (term length, hours per week, fit around the M.A.).
- L16–L17 `tools`: placeholder string — replace with the meeting, document, and presentation software you actually used. *Visible.*
- L28 The pull quote keeps the original "Everyday" spelling; keep as is, or change to "Every day"?
- L45 Any specific fee decisions, resolutions, or policy changes you can name publicly? *Visible.*
- L51 Did the EdIT trainings and the AI committee work inform each other? What did a typical week look like? *Visible.*
- L55 List the tools you relied on. *Visible.*

### bsa-big-xii-asu-gsv.md (11, plus header note L2)
- L9 `date`: real end month of the ASU+GSV Summit Scholarship as YYYY-MM.
- L14 `audience`: who did this work serve (BSA members, wider student body, other Big XII delegates)?
- L15 `constraint`: what shaped this work (holding these roles alongside the brand coordinator job and classes)?
- L19 `tools` is empty: which tools did you use for BSA work?
- L24 Planned image 3: one photo or document from the Big XII delegate role, if any exists.
- L38 The old portfolio's BSA tab text was not captured. What did you write there, and what did the VP role involve day to day? *Visible.*
- L47 Measurable results from the BSA years (membership, events held, funds raised)? *Visible.*
- L51 What did the Big XII Black Student Government Delegate role involve? *Visible.*
- L53 What did the Graduate Advisor role involve in 2025, and how did it connect to your VP year? *Visible.*
- L55 What did you do at the ASU+GSV Summit, and how does the scholarship relate to your M.A.? *Visible.*
- L59 List the tools you relied on for BSA work. *Visible.*

### zun-fashion-and-community.md (12, plus header note L2)
- L3 Confirm you want this page at all. It is not one of the brief's 12 case studies and has no verified numbers. If not, rename to `_zun-fashion-and-community.md`.
- L10 `date`: end month if ZUN has ended, or say ongoing. *Renders on cards.*
- L11 `timeline`: no start or end date in the verified facts; confirm the start year, add to the brief, then fill. *Visible.*
- L12 `role`: confirm whether to add "co-founder of a Lubbock creatives group". *Visible.*
- L14 `constraint`: what shapes the work? *Visible.*
- L15 `outcome`: one line with a number from the verified facts; none exists yet. *Visible on cards.*
- L16 `tools` is empty: which do you use for ZUN designs and shoots?
- L20 Planned image 3: when was your first show, what was it called, and what was Key Johnson's role?
- L30 When did ZUN start? The old portfolio says 2021, but that year is not in the verified facts. *Visible.*
- L36 Confirm the Lubbock creatives group and its 100+ member count, and whether Chi is fine being named. *Visible.*
- L42 Outcome section needs numbers from the verified facts; none exist. *Visible.*
- L54 Which tools do you use for ZUN designs and shoots? *Visible.*

### photography.md (11)
- L8 `date`: YYYY-MM of the newest photo. *Renders on cards.*
- L9 `timeline`: first month – last month you shot these (or "present"). *Visible.*
- L13 `outcome`: no number exists; how many photos are in the series, and has any been shown, printed, or used? *Visible on cards.*
- L18 Confirm you want this page at all; it is not one of the brief's 12 case studies. If not, rename to `_photography.md`.
- L28 Were these shot for yourself, or for a client or the department?
- L34 Roughly how many photos, and where were they shot?
- L36 Has any of this work been shown, printed, or used in a flyer or social post you designed?
- L42 Who is the person in the durag portrait, and are they fine appearing on the site?
- L44 Is the T7i + 18–135mm the only gear you shoot with?
- L46 How do you edit (Lightroom, camera JPGs, other), and do you shoot RAW?
- L52 Editing tools, if any.

### _ai-communication-lab.md (unpublished draft; 6, plus header note L2)
- L5 `tracks`: add "ai" only if you want it tagged that way; the brief does not assign it.
- L11 `audience`: who was the prompt-engineering, AI-architecture, and disinformation work for?
- L12 `constraint`: any other constraint worth naming (overlap with the brand coordinator role)?
- L24 What did the prompt-engineering and AI-architecture work produce, which lectures did you assist, and is any of it shareable? Confirm with Dr. Austin Lee before publishing.
- L30 Did the disinformation study feed into a paper, poster, or presentation, and is any of it public?
- L36 Which specific AI tools, architectures, game engine, or behavior-tree tools did the lab and course use?

### _3d-blender-rhino.md (unpublished draft; 3, plus header note L2)
- L8 `date`: no source gives an end date for the Blender or Rhino work; fill YYYY-MM, or say it is ongoing and how to sort it.
- L10 `timeline`: when was the Rhino architecture stint, and when did you start Blender?
- L22 Did any 3D work ship inside a Texas Tech piece? Do not claim it unless confirmed.

### Related placeholder (not a TODO(Matt))
`src/pages/work/[slug].astro` line 26 prints the literal word `TODO` in the TOOLS spec line whenever a case study's `tools` list is empty. Today that is: stemplug, raider-education-deck-system, faculty-ai-training, edmotion-competitor-heatmap, bsa-big-xii-asu-gsv, zun-fashion-and-community. It disappears as each `tools` list is filled.

## 5. Exact assets Matt must export next

Global rules (from the brief and `DESIGN_SYSTEM.md`): PNG or JPG at **2x** for screen, PDF for print pieces, MP4 for video; everything will be converted to **WebP** and lazy-loaded; every image needs real alt text. Drop files into a per-study folder (e.g. `src/content/work/raider-education/`) and each becomes an `{src, alt, caption}` entry in that study's `images` list. Nothing renders on any case-study page until this happens; every page currently shows the "images are being exported" well.

**Before exporting anything:** get a Figma token so `scripts/figma_export.py` can pull the originals from the old prototype (file key `yLf57sLbNZrBNeXnRMLH4X`), and confirm with **EdMotion**, **STEMPLUG**, and **EdIT** what may appear publicly.

**Site-wide**
- Resume PDF: already at `public/Zuniga_Matthew_Resume.pdf` (v3). Re-export only if the header changes to the new URL.
- Optional headshot (About page).

**1. Raider Education** (`raider-education`)
1. Raider Education logo / identity sheet (SVG, or PNG at 2x)
2. Flagship deck: title slide plus 3–5 content slides (PNG at 2x); original file + PDF
3. The hexagon brochure (PDF for print, PNG for the page)
4. 2–3 Raider Education flyers or posters (PNG at 2x, PDF for print)
5. One program video (MP4) or a still from it
6. Optional: the assistant director's rough content beside the finished slide, as a before/after

**2. Texas Tech event collateral** (`texas-tech-event-collateral`)
1. Contact-sheet grid of 12–20 flyers across the three units (PNG at 2x)
2. One flyer per unit: Campus Access & Engagement, Student Enrichment Center, Raider Education (PNG at 2x, PDF for print)
3. Pieces seen in the old Figma portfolio: Trivia Bowl, MLK Week "King: Mission Possible", Hooray for the Holidays, Create a Calming Bottle
4. One poster or event-signage piece and one social graphic
5. The 2025–26 academic-year flyer set laid out as a single image
6. Optional: a short event video clip (MP4) and one merchandise photo

**3. STEMPLUG social relaunch** (`stemplug-social-relaunch`) — after STEMPLUG confirms
- Screenshots of the 3–5 strongest TikTok and Instagram posts, each showing the view count (PNG at 2x)
- The relaunch video (MP4) or a still from it

**4. Raider Education deck system** (`raider-education-deck-system`)
1. Flagship deck title slide (PNG at 2x)
2. 3–5 representative content slides showing the shared layout
3. Before/after pair: rough content next to the finished slide
4. Original deck file and a PDF export
5. Keynote rebuild, only once finished: `raider-education-flagship.key` and `raider-education-flagship.pdf` for download
6. Optional: photo or screen capture of a deck in use at a workshop

**5. Faculty AI training** (`faculty-ai-training`) — only if EdIT clears it
1. The training deck or one-pager as a PDF
2. 1–2 slide or handout screenshots (PNG at 2x)
3. Optional: photo of a small-group session or the AV setup (no faculty faces without permission)
4. Optional: sketch of the registration-workflow automation idea

**6. EdMotion heatmap** (`edmotion-competitor-heatmap`) — only after EdMotion confirms
1. The comparison heatmap (PNG at 2x; competitor names anonymized if needed)
2. 1–2 dashboard views cleared for sharing (PNG at 2x)
3. Optional: the scoring table or criteria legend
4. Optional: the 21st CCLC contact database with names and emails blurred

**7. AEI replication** (`aei-replication`) — from the notebook in github.com/mjzun/aei-education-analysis
1. Chart replicating the top-10-tasks share (~21.1%) (PNG at 2x)
2. Chart of usage share by O*NET Job Zone showing the ~3x / ~4x over- and under-representation
3. One screenshot of the notebook or the task-to-occupation mapping table
4. Optional: screenshot of the repo README

**9. Lovable apps** (`lovable-apps`)
1. One 2x PNG screenshot of each of the five apps, plus each app's live URL
2. Optional: a second screenshot per app showing its main interaction
3. Optional: analytics screenshot showing the 110+ organic visitors, if shareable
4. Optional: screenshot of any beta feature tested, if Lovable allows

**10. Agent automation concept** (`agent-automation-concept`) — only if EdIT clears it
1. Before/after diagram: current registration workflow vs. proposed agent-based flow (PNG at 2x)
2. One whiteboard photo or sketch from an ideation session, if one exists
3. Optional: anonymized screenshot of any prototype or prompt

**11. GPSG Vice President** (`gpsg-vice-president`)
1. Photo from a Senate, Cabinet, or Joint Governance Council meeting, or the official VP headshot
2. One slide or one-pager from the fee review or the generative-AI syllabus guidelines, only if public or cleared (PDF is fine)
3. Photo from a UNC System Association of Student Governments meeting
4. Optional: GPSG logo or a screenshot of the GPSG site listing 2025–2026 officers

**12. BSA / Big XII / ASU+GSV** (`bsa-big-xii-asu-gsv`)
1. The BSA tab images from the old Figma prototype (needs the Figma token)
2. One photo from a BSA general meeting or event (with permission from anyone pictured)
3. One photo or document from the Big XII delegate role, if any exists
4. The ASU+GSV Summit Scholarship confirmation, or a photo from the 2026 Summit
5. Optional: any BSA flyer or social graphic designed while Vice President

**13. ZUN / fashion** (`zun-fashion-and-community`) — only if Matt keeps the page
1. ZUN wordmark or logo on a clean background (PNG at 2x)
2. Two to three ZUN streetwear pieces, flat or on-body (JPG at 2x)
3. A photo from the first show, with photographer credit
4. Only if you took part: a First Friday Art Trail photo of your booth, show, or pieces
5. Optional: photo of the creatives group meetup, if everyone pictured agrees

**15. Photography** (`photography`) — only if Matt keeps the page
- The best 8–12 photos from the old prototype's Photography grid (nature, architecture, still life, portrait), JPG at 2x, with the durag-portrait subject's permission

**Unpublished drafts (export only if the page is going to ship)**
- `_3d-blender-rhino`: best Blender render(s) (PNG at 2x) or a short motion piece (MP4); Rhino progression as three screenshots (Beams and Flooring / Walls and extra structure / Glass); optional final rendered view
- `_ai-communication-lab`: nothing until Dr. Austin Lee clears an output and it is recorded in the brief's Verified facts

## 6. Uncommitted work

`git status` shows the QA edits, the new `src/components/`, `src/layouts/`, `src/pages/work/`, `src/content.config.ts`, `.github/workflows/deploy.yml`, and `public/robots.txt` are not yet committed (`public/favicon.ico` was deleted in favour of `favicon.svg`). Commit before the next phase so the fact-checked state is recorded.

## 7. Direction v2 — review fixes (2026-09-14, afternoon)

Two reviewers listed ~50 problems with the first v2 build. Everything fixable in `src/` was fixed; `npm run build` passes (18 pages, no errors). Content files in `src/content/work/` were not edited.

### What changed (by file)

- `astro.config.mjs` — the `noteToSelf` Markdown plugin now has an `html` handler: `<!-- TODO(Matt): … -->` comments render as visible `"NOTE TO SELF"` lines (only the question, any drafting note before it is dropped); every other HTML comment is removed, so no drafting note ships in view-source. New `pageWeight` integration measures each built page and its linked CSS after the build and prints them in the receipt (`HTML 16.5 KB / CSS 15.4 KB / JS 1.3 KB`). Note: the content layer caches rendered Markdown; after changing the plugin run `npx astro build --force` once.
- `src/lib/case.ts` — `frontmatterTodos()` collects every frontmatter TODO (date, timeline, role, audience, constraint, outcome, tools, images) so they render as labelled notes (`"DATE" · …`) inside `"NOTES"`; `answered()` keeps the answered half of a field that ends in a TODO.
- `src/lib/image.ts` (new) — reads pixel width × height from PNG/JPEG/GIF/WebP/SVG headers plus format and KB; captions read `"IMAGE" 01 · 1600×1000 · JPG · 210 KB`, and `<img>` gets width/height. Nothing rounded.
- `src/lib/scripts.ts` (new) — the `"OPEN ALL"` / `"CLOSE ALL"` button script (revealed only when JavaScript runs).
- `src/layouts/Base.astro` — `<title>` is the mark (`"PORTFOLIO" c/o MATTHEW JAY ZUNIGA™`, `"RAIDER EDUCATION" c/o TEXAS TECH`); `c/o` wrapped in `.co-mark` everywhere (never uppercased); dock moved to just after the skip link (first in tab order); `"YOU ARE HERE"` in quotes; receipt rows `WEIGHT` (three measured numbers) and `INFLUENCE / VIRGIL ABLOH (METHOD, NOT MARKS)`; hazard band moved outside `.page` and full-bleed; dock focus ring is now the hazard stripe (6px striped frame behind the ink fill), no yellow; tap targets 44px on dock links, grid toggle, masthead link; `matchMedia` listener guarded for old Safari; `role="list"` on lists; Inter Tight 400 italic loaded for any `<em>`.
- `src/components/CaseRow.astro` — `level` prop (h2 on /work/, h3 on /); `"UNDATED"` for blank dates; `"IN PROGRESS"` mark + dashed well on rows with open TODOs; the orange tag reads `"NEW" · YYYY-MM` only on pieces dated the build month, else `"FEATURED"`; each row now carries the `"OUTCOME"` caption and a `"NOTES"` details block (audience, constraint, tools, tracks, frontmatter notes); thumbnail caption with file facts when a cover exists; `title` (alt) on the image.
- `src/components/Glass.astro` — fake window buttons removed. `Definition.astro` — provenance tag `[VER. 002]`, accepts extra attributes. `TrackChips.astro` — no server-side `aria-current`.
- `src/pages/work/[slug].astro` — subtitle labelled `"SUBTITLE"`; caption labelled `"OUTCOME"`; band chip is `.hazard__chip` (fits the 24px band, no hover), no `role="status"`; images: measured captions, `"ALT"` text shown on hover/focus-within; frontmatter TODOs listed in `"NOTES"`; prev/next at the object size (no fourth size); `co` passed to the title.
- `src/pages/work/index.astro` — all five `<Definition>` blocks render, the script shows the active one; valid tracks derived from `site.tracks`; unknown `?track=` shows `"EMPTY" · 00 ITEMS · "ALL" →`; `<noscript>` line; `"OPEN ALL"` button.
- `src/pages/index.astro` — `05 TRACKS` instead of the slogan; `[VER. 002]` tags; `"OPEN ALL"` button; `role="list"`.
- `src/pages/about.astro` — header `"ABOUT" · 24 TERMS · A–Z`; `c/o` lowercase + `™`; `See:` links blue/underlined and resolved (a missing term renders as plain text, no broken `#` links); per-entry provenance (`prov` in site.json, else `[VER. 002]`).
- `src/pages/contact.astro` — three rows only (`03 ROWS`); blurb kept for the meta description only. `src/pages/how-to.astro` — step 12 rewritten as `HOW TO REUSE THIS`; step titles are labels; `"STACK"` head on the receipt.
- `src/content/site.json` — `c/o` and `VER. 002` definitions rewritten in Matt's terms; `CHAPEL HILL, NC` is `pr. n.`; new `HOW TO` entry (fixes the See: link); dated `prov` on the five education/role entries; bio no longer names Abloh (the receipt does, once).
- `src/styles/tokens.css` — `--grey-2` derived from paper + ink (`color-mix`), so dark mode adds no colour; `--link` in dark mode is ink (documented exception, see DIRECTION_v2 Tokens); `--caution` only for the yellow hazard variant; `--dock-clearance` 160px under 640px; `--hit: 44px`; contrast comment corrected (5.9:1).
- `src/styles/global.css` — `.tag` is a rectangle with a 1px black edge; `.prov` in ink (was 2.46:1 grey); `(n.)` upright (no faux italic); `.q` / `.track` / `.prose h2` / note prefix use `content: … / ""` alternative text so screen readers do not hear "quote"; grid-mode outlines and labels in ink, labels in quotes; `a:hover` thickens the underline (works in dark mode); receipt/definition links are link-blue; body bottom padding adds `env(safe-area-inset-bottom)`; tap targets (`.track`, `.chip`, `.index a`, `.count a`, receipt/definition links).
- `src/content.config.ts` — `alt: z.string().min(1)`. `package.json` — `@astrojs/markdown-satteri` is a direct dependency (lockfile synced).
- `docs/design/DIRECTION_v2.md` — one line added under Tokens documenting the dark-mode link exception.

### Not fixed here (content owner or asset work)

- **Resume PDF** (`public/Zuniga_Matthew_Resume.pdf`): phone number removed and mjzun.github.io in the header (done, ff7d1da). It still says "no GPA is issued", see "Assets pass (2026-09-14)" below.
- **Camera specs** in `photography.md` (constraint, tools, body) are not in PORTFOLIO_BRIEF.md Verified facts: add them to the brief or turn the three lines into TODO(Matt).
- **ZUN numbers** ("2021", "100+ members") sit inside two visible NOTE TO SELF paragraphs in `zun-fashion-and-community.md`; move the questions into `<!-- TODO(Matt) -->` comments (now rendered as notes without the numbers) or shorten them. The same file's body still names Abloh (line 50); the site credits him once, in the receipt.
- **BSA date** `2026-01` in `bsa-big-xii-asu-gsv.md` is not verified to the month; confirm or set to a TODO(Matt).
- Every case study still carries at least one open TODO, so all 13 rows wear `"IN PROGRESS"` and every case-study page the band. That is the honest state, not a bug.

## Assets pass (2026-09-14)

Review fixes on top of the image, notebook and Lovable work. `astro build` passes (19 pages). Nothing committed.

### Images placed per case study

| Case study | Shown | Head on the page |
|---|---|---|
| texas-tech-event-collateral | 22 | `"IMAGES" 22 · "FLYER" 17 · "SOCIAL POST" 03 · "GRAPHIC" 01 · "INVITATION" 01` |
| zun-fashion-and-community | 11 | `"IMAGES" 11 · "RUNWAY" 03 · "PRODUCT" 03 · "MOCKUP" 02 · …` |
| bsa-big-xii-asu-gsv | 8 | `"IMAGES" 08 · "GROUP PORTRAIT" 01 · "GROUP PHOTO" 01 · "PHOTO" 01 · …` |
| photography | 8 (of 9) | `"IMAGES" 08 · "PHOTOGRAPH" 08` |
| 3d-blender-rhino | 5 | from the captions' quoted types |
| lovable-apps | 5 | `"IMAGES" 05 · "SCREENSHOT" 05` |
| raider-education, raider-education-deck-system | 1 each | |
| aei-replication | 0 | the notebook replaces the chart pictures |

### Images skipped, and why

- **EdMotion, STEMPLUG:** text only (Matt's decision today).
- **No headshot** anywhere (Matt's decision today).
- **photography `profile-portrait-orange-durag.jpg`:** hidden (commented out in the frontmatter) until Matt says who the person is and whether they agree to be shown. If it is Matt, it breaks the no-headshot rule. The body text still mentions "a portrait in an orange durag" twice. Edit those lines once Matt decides.
- **faculty-ai-training, gpsg-vice-president, agent-automation-concept, _ai-communication-lab:** no images placed. Each shows one "IMAGE" well.

### Gallery, now a contact sheet (src/pages/work/[slug].astro)

- A visible `"IMAGES" nn` head with a count per quoted type, taken from the captions, plus `data-region="IMAGES"` so "SHOW GRID" names the region.
- A mono `01/22` over each frame, a 1px rule over every row, and captions that read `"FLYER" … · 1200×1553 · WEBP · 57 KB`.
- **Lightbox:** each image links to a 1600w WebP (or smaller if the original is smaller). With JavaScript, the link opens one `<dialog>` built with Glass.astro, titled `"IMAGE"` with `03 OF 22` in its note, showing the image, its provenance and a `"CLOSE"` button. Without JavaScript, the link opens the WebP itself.
- **Weight:** gallery widths are capped at 1200 (`GALLERY_WIDTHS`), `sizes` says 1200px at ≥1440px, and WebP quality is 70 (`GALLERY_QUALITY`). Captions are measured at the same quality. Largest desktop candidates now: texas-tech 1.62 MB, bsa 0.90 MB, zun 0.76 MB, photography 0.41 MB, lovable 0.15 MB. All are under 2 MB.
- **"WORK IN PROGRESS" band:** now paints edge to edge, using a border-image outset. The page does not scroll sideways (checked at 491px).

### Notebook embed (aei-replication)

- The toolbar is a plain paper bar (1px frame, quoted `"NOTEBOOK"` title row, no blur). Glass is back to its three uses: dock, "FILTERS", lightbox.
- Markdown headings inside the notebook are labels, styled like `.prose h2`. The off-scale 1.4× size is gone.
- Chart captions read `"IMAGE" 01 · "OUT" [13] · 889×490 · PNG · 37 KB · Step 6 — Aggregate by Job Zone`.
- New optional `notebook.alts` frontmatter (schema in src/content.config.ts) sets alt text for charts 13 and 16. The wording comes only from the notebook.
- The notebook's numbers match the page copy (3,514 · 923 · ~21.1% · Zone 5 2.98 · Zone 2 0.27 · tenfold).

### Lovable links

- Five "LIVE APP" rows: doyourwork, looped584, schemascope, reading-lab, llmmathsec (.lovable.app). llmmathsec is listed first because it is the most visited (Matt). No per-app number is given.
- Captions now read `"SCREENSHOT" <APP> · <HOST> · 1440 WIDE · 2026-09-14`.

### xrunway glass values

- **Kept from xrunway tier 2:** 58% tint, `blur(18px) saturate(1.4) brightness(1.06)`, a 1px frame (ink, not 14% white).
- **Dropped today:** the 160° sheen gradient and the inset rim highlights (no gradients or shadows allowed). Their tokens are deleted.
- **Already dropped earlier:** colour wash, outer shadows, radius, motion.
- docs/design/xrunway_glass.md no longer cites file names or line numbers in the private repo, and the second-page section is removed.

### Other fixes

- The Definition block has a space before `[VER. 002]`.
- `c.` renders lowercase in the hero and the receipt.
- The dock shows `← "HERE"` on phones instead of hiding the label.
- SHOW GRID region names on home: `A. WORK`, `D. RESUME + E. CONTACT`.
- photography labels are all `"PHOTOGRAPH"`. STILL LIFE moved into the description.
- The personal Gmail address in the three docs/design/mockups files is replaced with zun@ad.unc.edu.

### Not fixed (needs Matt)

- **CRITICAL, git history:** the old phone number is in docs/source/resume_v3.txt in every commit, and the old resume PDF in commit 51b71f5 still has it. The personal Gmail address is in older copies of site.json, STATUS.md and scripts/portfolio_workflow.js, and is the author email on all commits. There is no remote yet. Before the first push, the simplest fix is: delete `.git`, run `git init`, set `git config user.email` to the GitHub noreply address, and make one fresh commit of the cleaned tree.
- **Resume PDF and resume_v3.txt** still say "no GPA is issued". PORTFOLIO_BRIEF.md and DESIGN_SYSTEM.md say no GPA anywhere. Re-export with "High Pass in every course" or confirm it as an exception.
- **Inconsistent object labels on bsa and zun:** "GROUP PORTRAIT", "GROUP PHOTO" and "PHOTO" all name photographs. These are content captions; pick one literal name per object.
- **Notebook charts** are still inline base64 PNGs (about 66 KB inside the HTML). Optional: write them out as WebP at build time.
- **dist/_astro** still holds 61 JPG/PNG originals that no page links to. They are not page weight, but GitHub Pages will upload them.
- **3D page captions** were not checked this pass.

