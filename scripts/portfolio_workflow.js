export const meta = {
  name: 'build-mjzun-portfolio',
  description: 'Design-direction panel, 12 fact-checked case studies, Astro build, and QA for mjzun.github.io',
  phases: [
    { title: 'Design directions', detail: '3 independent home-page mockups: glass-first, Virgil-first, hybrid editorial' },
    { title: 'Judge', detail: '3 judges score the directions; a synthesis agent writes the design system' },
    { title: 'Content', detail: 'one writer per case study + About/Home copy' },
    { title: 'Fact-check', detail: 'adversarial verifier per case study: every number must trace to the brief' },
    { title: 'Build', detail: 'Astro site: collection, layouts, pages, URL-driven filters, deploy workflow' },
    { title: 'QA', detail: 'build passes, accessibility + mobile + fact audit, fixes applied' },
  ],
}

const ROOT = args.root
const CONTEXT = `
PROJECT ROOT: ${ROOT}  (an Astro 7 project; Node and npm are installed at /opt/homebrew/bin — prefix commands with PATH="/opt/homebrew/bin:$PATH").
Read these first: ${ROOT}/PORTFOLIO_BRIEF.md (the "Verified facts" section is the ONLY source for any number, date, or outcome),
${ROOT}/docs/PLAN.md (fixed case-study frontmatter schema), ${ROOT}/docs/source/figma_prototype_text.md (Matt's own words from the old portfolio),
${ROOT}/docs/source/resume_v3.txt (never copy the phone number anywhere), ${ROOT}/docs/design/virgil_design_brief.md (design reference).
Owner: Matthew Jay Zuniga ("Matt"), beginner coder. Contact on site = email zun@ad.unc.edu, linkedin.com/in/mjzun, github.com/mjzun. No phone number, no GPA.
Write plain readable code; add a one-line comment at the top of every file saying what it does.
`

const DIRECTIONS = [
  { key: 'glass-first', angle: 'GLASS-FIRST: frosted-glass surfaces (backdrop blur, 1px translucent borders, soft inner highlights, layered gradients on a near-black ground like the old Figma prototype, ~#141519) carry the UI; Virgil "Free Game" shows up only as typography — quotation-marked section titles, all-caps numbered table-of-contents navigation, spec-sheet style labels.' },
  { key: 'virgil-first', angle: 'VIRGIL-FIRST: a raw, document-like page — off-white ground, black system type (Helvetica/Arial-style via a Google Font like Inter Tight or Archivo), blue underlined links, numbered A–Z table of contents, "quoted" headlines, dense but ordered — with glassmorphism used sparingly for a floating dock/nav and image cards that sit over photography.' },
  { key: 'hybrid-editorial', angle: 'HYBRID EDITORIAL: a typographic, whitespace-heavy grid (the brief\'s "restrained, precise" direction) where large photography and design pieces are the color; glass panels float over images for captions and the filter chips; Virgil influence = quoted titles, industrial numbering (01–12), and a monospaced "spec" line under every piece (ROLE / TIMELINE / TRACKS).' },
]

const SCORE_SCHEMA = {
  type: 'object',
  properties: {
    scores: { type: 'array', items: { type: 'object', properties: {
      direction: { type: 'string' }, total: { type: 'number' },
      strengths: { type: 'string' }, weaknesses: { type: 'string' },
    }, required: ['direction', 'total', 'strengths', 'weaknesses'] } },
    winner: { type: 'string' },
    graft: { type: 'string', description: 'best ideas from the losers worth grafting onto the winner' },
  },
  required: ['scores', 'winner', 'graft'],
}

const VERDICT_SCHEMA = {
  type: 'object',
  properties: {
    ok: { type: 'boolean' },
    problems: { type: 'array', items: { type: 'string' } },
  },
  required: ['ok', 'problems'],
}

const CASE_STUDIES = [
  { slug: 'raider-education', title: 'Raider Education — reviving a dormant program\'s identity', tracks: ['design', 'presentation'], featured: true, order: 1 },
  { slug: 'texas-tech-event-collateral', title: 'Texas Tech event collateral system — 60+ pieces for 25–30 events', tracks: ['design'], featured: true, order: 2 },
  { slug: 'stemplug-social-relaunch', title: 'STEMPLUG TikTok and Instagram relaunch', tracks: ['design', 'presentation'], featured: true, order: 3 },
  { slug: 'raider-education-deck-system', title: 'Raider Education deck system', tracks: ['presentation'], featured: false, order: 4 },
  { slug: 'faculty-ai-training', title: 'Faculty and staff generative-AI training at UNC EdIT', tracks: ['presentation', 'ai'], featured: true, order: 5 },
  { slug: 'edmotion-competitor-heatmap', title: 'EdMotion 10-competitor dashboard and heatmap', tracks: ['data'], featured: true, order: 6 },
  { slug: 'aei-replication', title: 'Anthropic Economic Index replication', tracks: ['data', 'ai'], featured: true, order: 7 },
  { slug: 'ai-communication-lab', title: 'AI & Communication Lab research assistantship', tracks: ['data', 'ai'], featured: false, order: 8 },
  { slug: 'lovable-apps', title: 'Five AI-built web apps as a Lovable Ambassador', tracks: ['ai'], featured: true, order: 9 },
  { slug: 'agent-automation-concept', title: 'Agent-based automation concept for a registration workflow', tracks: ['ai'], featured: false, order: 10 },
  { slug: 'gpsg-vice-president', title: 'Vice President, UNC Graduate and Professional Student Government', tracks: ['leadership'], featured: true, order: 11 },
  { slug: 'bsa-big-xii-asu-gsv', title: 'Texas Tech BSA, Big XII delegate, ASU+GSV Summit scholar', tracks: ['leadership'], featured: false, order: 12 },
  { slug: 'zun-fashion-and-community', title: 'ZUN, fashion, and the Lubbock creative community', tracks: ['design'], featured: false, order: 13 },
  { slug: '3d-blender-rhino', title: '3D work in Blender and Rhino', tracks: ['design'], featured: false, order: 14 },
  { slug: 'photography', title: 'Photography', tracks: ['design'], featured: false, order: 15 },
]

// ---------- Track 1: design directions → judges → design system ----------
async function designTrack() {
  const mockups = await parallel(DIRECTIONS.map(d => () => agent(`${CONTEXT}
You are one of three designers proposing a look for Matt's portfolio. Your angle: ${d.angle}
Study ${ROOT}/docs/design/virgil_design_brief.md and the "Design direction" section of the brief (typographic, whitespace, consistent grid, large images, mobile-first, no stock imagery, no carousels, no animation that delays content; the site itself is a design work sample and must not read as a template).
Deliver two files:
1. ${ROOT}/docs/design/mockups/${d.key}.html — a self-contained single-file HTML mockup (inline CSS, Google Fonts only, no JS frameworks) of the HOME page: positioning line "Designer and analyst working where education, AI, and visual communication meet.", a featured grid of 6 real case-study cards (use real titles/outcomes from the brief; use solid color or CSS-gradient placeholders for images, labeled with what image goes there), track filter chips (design / presentation / data / ai / leadership), resume download link, contact links. Must look good at 400px and 1280px wide. Must pass WCAG AA contrast.
2. ${ROOT}/docs/design/directions/${d.key}.md — the rationale: type system (families, sizes, weights), color tokens (hex), spacing scale, glass recipe (blur/border/background values), motion rules, and how Virgil's language was borrowed WITHOUT copying his text, marks, or fonts.
Return a 5-line summary of the direction.`, { label: `design:${d.key}`, phase: 'Design directions', effort: 'high' })))

  const judges = await parallel(['a hiring manager for a design/communications role', 'a front-end engineer who cares about accessibility, performance and maintainability', 'Matt himself — a Virgil Abloh fan who owns a streetwear brand (ZUN) and loves glassmorphism'].map((lens, i) => () => agent(`${CONTEXT}
Judge three home-page mockups from the perspective of ${lens}. Open each file in ${ROOT}/docs/design/mockups/ (glass-first.html, virgil-first.html, hybrid-editorial.html) and its rationale in ${ROOT}/docs/design/directions/. Also read ${ROOT}/docs/design/virgil_design_brief.md.
Score each 0–10 on: (1) distinctiveness — does not read as a template; (2) fit with the brief's "restrained, precise, typographic" direction; (3) how well it fuses glassmorphism with the Virgil "Free Game" language; (4) legibility, contrast, mobile viability; (5) buildability in plain Astro + CSS. Sum to a total out of 50.
Name a winner and list the specific ideas from the other two worth grafting onto it.`, { label: `judge:${i + 1}`, phase: 'Judge', schema: SCORE_SCHEMA })))

  const tally = {}
  for (const j of judges.filter(Boolean)) for (const s of j.scores) tally[s.direction] = (tally[s.direction] || 0) + s.total
  const winner = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]?.[0] || 'hybrid-editorial'
  const graft = judges.filter(Boolean).map(j => j.graft).join('\n')
  log(`Design winner: ${winner} — tally ${JSON.stringify(tally)}`)

  const system = await agent(`${CONTEXT}
The judges chose the "${winner}" direction (scores: ${JSON.stringify(tally)}). Ideas to graft from the other directions:
${graft}
Read ${ROOT}/docs/design/mockups/${winner}.html and ${ROOT}/docs/design/directions/${winner}.md, then write the production design system:
1. ${ROOT}/src/styles/tokens.css — CSS custom properties on :root (colors, type scale, spacing, radii, glass recipe, motion durations) with dark and light handled via prefers-color-scheme.
2. ${ROOT}/src/styles/global.css — reset, base typography, focus rings, the glass utility classes, the "quoted" heading style, the numbered-list nav style, the spec-line style, responsive grid utilities, reduced-motion support.
3. ${ROOT}/docs/design/DESIGN_SYSTEM.md — the rules in plain English for a beginner: what each token means, when to use glass vs flat, image treatment, do/don't list.
Google Fonts only (load via <link> in the layout later — document the exact URL in DESIGN_SYSTEM.md).
Return the winner name and the font families chosen.`, { label: 'design-system', phase: 'Judge', effort: 'high' })
  return { winner, tally, system }
}

// ---------- Track 2: content → fact-check → fix ----------
function writerPrompt(cs) {
  return `${CONTEXT}
Write the case study "${cs.title}" as ${ROOT}/src/content/work/${cs.slug}.md using EXACTLY the frontmatter schema in docs/PLAN.md:
slug: ${cs.slug}; tracks: ${JSON.stringify(cs.tracks)}; featured: ${cs.featured}; order: ${cs.order}.
Use the matching "Verified facts" and "Case studies to build" entries in PORTFOLIO_BRIEF.md, the resume text, and — for anything personal (ZUN, fashion, 3D, photography) — Matt's own words in docs/source/figma_prototype_text.md (edit lightly for clarity, keep first person, keep his voice).
Rules: every number, date, and outcome must appear verbatim in the brief or the resume; if a fact you need is missing write TODO(Matt): <question> in the body instead of inventing. Respect every "do not claim" note in the brief. Timeline/role/audience/constraint fields must be filled from the sources or be TODO. images: [] with a comment listing which assets Matt should export for this page. Body sections: ## What I made, ## Outcome, ## Process (optional), ## Tools. 150–350 words. No phone number, no GPA.
Return the file path and a one-line summary.`
}

function checkerPrompt(cs) {
  return `${CONTEXT}
You are an adversarial fact-checker. Read ${ROOT}/src/content/work/${cs.slug}.md. For EVERY number, date, name, and claimed outcome in it, find the exact supporting line in PORTFOLIO_BRIEF.md ("Verified facts"), docs/source/resume_v3.txt, or docs/source/figma_prototype_text.md. Report a problem for anything unsupported, exaggerated, violating a "do not claim" note, or containing a phone number / GPA. Also flag frontmatter that does not match the schema in docs/PLAN.md. Default to ok=false if uncertain.`
}

async function contentTrack() {
  const results = await pipeline(CASE_STUDIES,
    cs => agent(writerPrompt(cs), { label: `write:${cs.slug}`, phase: 'Content' }),
    (_, cs) => agent(checkerPrompt(cs), { label: `check:${cs.slug}`, phase: 'Fact-check', schema: VERDICT_SCHEMA }),
    async (verdict, cs) => {
      if (!verdict || verdict.ok) return { slug: cs.slug, fixed: false, problems: [] }
      await agent(`${CONTEXT}
Fix ${ROOT}/src/content/work/${cs.slug}.md. A fact-checker found these problems:\n- ${verdict.problems.join('\n- ')}\nCorrect each one using only the sources; where the source has no answer, replace the claim with TODO(Matt): <question>. Keep the schema intact. Return what you changed.`, { label: `fix:${cs.slug}`, phase: 'Fact-check' })
      return { slug: cs.slug, fixed: true, problems: verdict.problems }
    })
  const pages = await agent(`${CONTEXT}
Write the site copy file ${ROOT}/src/content/site.json with: positioning line (from the brief), a 120–180 word About bio in first person (M.A./B.A. facts, the five tracks, ZUN and Virgil as inspiration from the Figma text — no numbers not in the brief), a one-line contact blurb, the email/LinkedIn/GitHub links, resume path "/Zuniga_Matthew_Resume.pdf", and a "tracks" array of {key,label,blurb}. Also copy ${ROOT}/assets/Zuniga_Matthew_Resume.pdf to ${ROOT}/public/Zuniga_Matthew_Resume.pdf. Return the path.`, { label: 'write:site-copy', phase: 'Content' })
  return { caseStudies: results.filter(Boolean), pages }
}

// ---------- Run both tracks concurrently (no shared files) ----------
const [design, content] = await parallel([designTrack, contentTrack])
log(`Content: ${content.caseStudies.length} case studies, ${content.caseStudies.filter(c => c.fixed).length} needed fixes`)

// ---------- Build ----------
phase('Build')
const build = await agent(`${CONTEXT}
Design system is ready in ${ROOT}/src/styles/ (read ${ROOT}/docs/design/DESIGN_SYSTEM.md and the winning mockup ${ROOT}/docs/design/mockups/${design.winner}.html — the site should look like that mockup). Case studies are in ${ROOT}/src/content/work/*.md and site copy in ${ROOT}/src/content/site.json.
Build the full Astro 7 site (check the installed version's docs at https://docs.astro.build if an API is unfamiliar):
- src/content.config.ts: "work" collection with the schema from docs/PLAN.md (zod), glob loader over src/content/work.
- src/layouts/Base.astro: <head> with title/description/OG tags, Google Fonts <link>, tokens.css + global.css, skip link, header nav (numbered, Virgil-style per design system), footer with email/LinkedIn/GitHub.
- src/components/: CaseCard.astro, TrackChips.astro (chips are <a href="/work/?track=x">), SpecLine.astro, Glass.astro (or equivalents from the design system).
- src/pages/index.astro: positioning line, featured grid (featured:true sorted by order), chips, resume link, contact.
- src/pages/work/index.astro: every case study sorted by order; a small inline <script> reads ?track= from the URL, shows matching cards, marks the active chip, and updates the URL (history.replaceState) when a chip is clicked — so filtered views are shareable links. Works with JS disabled (all cards shown).
- src/pages/work/[slug].astro: the case-study template — Title · Role · Timeline · Audience · Constraint · What I made · Outcome · images (render an obvious "image coming" placeholder with the alt text when images is empty) · Tools · Tracks, plus prev/next links.
- src/pages/about.astro and src/pages/contact.astro from site.json.
- public/favicon.svg (a simple "ZUN" or "MJZ" mark in the design system's colors), public/robots.txt.
- astro.config.mjs: site "https://mjzun.github.io" (no base path — it's a user site).
- .github/workflows/deploy.yml: official withastro/action + actions/deploy-pages on push to main.
Then run PATH="/opt/homebrew/bin:$PATH" npm run build and fix every error until it passes. Delete the starter src/pages/index.astro content you replaced. Return: files created, build result, anything you could not finish.`, { label: 'astro-build', phase: 'Build', effort: 'high' })

// ---------- QA: three lenses, each fixes what it finds ----------
phase('QA')
const qa = await parallel([
  () => agent(`${CONTEXT}
Accessibility + mobile audit of ${ROOT}. Run PATH="/opt/homebrew/bin:$PATH" npm run build, then inspect dist/ HTML and src/styles: every <img> has alt; heading order is logical; color contrast of every text/background token pair is ≥ 4.5:1 (compute it); focus styles visible; skip link works; no horizontal scroll at 400px (check for fixed widths / min-width > 100vw); prefers-reduced-motion respected; tap targets ≥ 44px. Fix what fails directly in src/, re-run the build, and return a list of what you changed and what still needs Matt.`, { label: 'qa:a11y-mobile', phase: 'QA' }),
  () => agent(`${CONTEXT}
Fact audit of the BUILT site. Run PATH="/opt/homebrew/bin:$PATH" npm run build, then grep dist/ for every number (digits), every year, "GPA", and the phone number pattern 469. For each number, confirm it appears in PORTFOLIO_BRIEF.md "Verified facts" or the resume text; remove or TODO anything unsupported, and make sure no phone number or GPA exists anywhere. Also confirm every "do not claim" note in the brief is respected. Fix in src/, rebuild, and return the list of changes.`, { label: 'qa:facts', phase: 'QA' }),
  () => agent(`${CONTEXT}
Code + performance review of ${ROOT}: run PATH="/opt/homebrew/bin:$PATH" npm run build; check that the filter script on /work/ handles ?track=, updates the URL, and degrades without JS; that fonts use display=swap and only the weights actually used; that no JS framework or unnecessary dependency was added; that total CSS is reasonable; that dist/ has no broken internal links (write a quick script to check every href in dist/**/*.html resolves to a file in dist/). Fix issues in src/, rebuild, and return the list of changes.`, { label: 'qa:code-perf', phase: 'QA' }),
])

const final = await agent(`${CONTEXT}
Three QA agents just edited ${ROOT}/src in parallel. Run PATH="/opt/homebrew/bin:$PATH" npm run build; if it fails, fix it. Then write ${ROOT}/docs/STATUS.md: what pages exist, the design direction chosen ("${design.winner}"), every TODO(Matt) found in src/content (grep for it) grouped by case study, and the exact assets Matt must export next. Return the build status and the TODO count.`, { label: 'final-build+status', phase: 'QA' })

return { design: { winner: design.winner, tally: design.tally }, content, build, qa: qa.filter(Boolean), final }
