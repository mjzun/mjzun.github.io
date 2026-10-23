# mjzun.github.io — build plan (written 2026-09-13)

Plain-English map of how the site gets built, what is done, and what Matt still has to hand over.

## What exists today
| Source | Where it is now | Status |
|---|---|---|
| Portfolio brief + working rules | `PORTFOLIO_BRIEF.md`, `CLAUDE.md` (copied from Downloads) | done |
| Resume v3 | `assets/Zuniga_Matthew_Resume.pdf`, text in `docs/source/resume_v3.txt` | done — phone number must never appear on the site |
| Figma prototype text (Home, Innovation, Work Designs, Photography) | `docs/source/figma_prototype_text.md` | done (BSA tab text missing) |
| Figma prototype images (60+ flyers, photos, 3D renders) | not yet | blocked: needs a Figma token → `scripts/figma_export.py` |
| xrunway glassmorphism design tokens | not yet | blocked: needs GitHub login or a copy of the repo |
| Virgil Abloh "Free Game" design analysis | `docs/design/virgil_design_brief.md` | done |
| Astro scaffold | `astro.config.mjs`, `src/` | done by workflow |
| Case studies (12) | `src/content/work/*.md` | drafted by workflow, images TODO |

## Build phases
1. **Content + scaffold (no external access needed)** — write every case study from the verified facts, scaffold Astro, build the design system from the Figma prototype's dark-glass look + Virgil brief, verify every number against the brief. *(Runs now.)*
2. **Assets** — Matt supplies a Figma token and GitHub login; export originals, drop them into each case study's folder, convert to WebP.
3. **xrunway pass** — read xrunway's real glass tokens (blur, borders, gradients, motion) and reconcile the design system with them.
4. **Deploy** — create the public repo `mjzun.github.io`, push, GitHub Actions publishes. *(Asks Matt first.)*
5. **Retire the tinyurl** — swap URL into resume, LinkedIn, GitHub profile.

## Case-study frontmatter (fixed schema — every agent uses it)
```yaml
title: string
slug: string            # file name
tracks: [design|presentation|data|ai|leadership]
featured: boolean
order: number           # lower = earlier on the Work page
date: "YYYY-MM"         # end date
timeline: string        # "Jan 2024 – Jul 2025"
role: string
audience: string
constraint: string
outcome: string         # one line, numbers only from the brief
tools: [string]
images: []              # filled in phase 2 — each {src, alt, caption}
```
Body sections in order: **What I made**, **Outcome**, **Process** (optional), **Tools**.

## Status after the first build (2026-09-14)
Phase 1 is done: 13 case studies published (2 held back), design system "virgil-first" chosen by a three-judge panel, Astro site builds (17 pages), deploy workflow written, QA passed. Full detail and every open question in `docs/STATUS.md`.

## What Matt has to hand over next (nothing below can be done without him)
1. **Figma token** — Figma → Settings → Security → Personal access tokens → scope `file_content:read`. Then in Terminal:
   `export FIGMA_TOKEN=paste-here && cd ~/mjzun.github.io && python3 scripts/figma_export.py`
   That pulls every original image and all text into `figma_export/`. The token's account must be able to open the file (owner or shared viewer).
2. **GitHub login** — run `gh auth login` in Terminal (browser flow). Needed to read the private `xrunway` repo for the glass tokens and to create the public `mjzun.github.io` repo.
3. **xrunway access** — after (2), say which folder in xrunway holds the styling (or just "look at all of it").
4. **Answer the TODO(Matt) questions** in `docs/STATUS.md`, at least the ~50 marked *visible*, before deploy.
5. **Permissions** — confirm with EdMotion and STEMPLUG what can appear publicly.

## Re-running the agent workflow
`scripts/portfolio_workflow.js` is the Claude Code Workflow that built phase 1 (3 design directions → 3 judges → design system; 15 writers → 15 fact-checkers → fixes; build; 3 QA lenses; status). Phase 2 (assets + xrunway) will be a second workflow of the same shape.
