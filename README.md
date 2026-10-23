# mjzun.github.io

Matthew Jay Zuniga's master portfolio. Built with Astro, deployed to GitHub Pages.

- `docs/PLAN.md` — the build plan and what is still needed
- `docs/source/` — text recovered from the old Figma portfolio and the resume
- `scripts/figma_export.py` — pulls every image and text layer out of the Figma file (needs `FIGMA_TOKEN`)
- `src/content/work/` — one Markdown file per case study

```sh
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # static site into dist/
```
