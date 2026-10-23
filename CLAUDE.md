# Portfolio site — working rules for Claude Code

@PORTFOLIO_BRIEF.md

## Who you're working with
- The owner (Matt) is a beginner coder. Explain what each file does and why each step matters, in one line each. Never assume prior knowledge of git, npm, or Astro.
- Before running anything that deletes, overwrites, or force-pushes, say what it will do and wait for a yes.

## Facts
- Every number, date, and claim on the site must come from the "Verified facts" section of PORTFOLIO_BRIEF.md or from text Matt pastes in. If something isn't there, write `TODO` in the copy and ask — never invent a figure or an outcome.
- Never put a phone number on the site. Contact is email, LinkedIn, and GitHub only.

## How to work
- One case study or one feature per commit, with a plain-English commit message.
- After each change, run the local dev server and tell Matt the exact URL to open to see it.
- Prefer plain, readable code over clever code. No dependency unless the brief calls for it or Matt agrees.
- If the deploy fails, read the GitHub Actions log and explain the failure before fixing it.
