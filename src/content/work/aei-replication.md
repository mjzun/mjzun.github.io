---
# Case study: independent replication of the Anthropic Economic Index (data + ai tracks). Every number comes from PORTFOLIO_BRIEF.md "Verified facts" or resume_v3.txt.
title: "Anthropic Economic Index replication"
slug: aei-replication
tracks: ["data", "ai"]
featured: true
order: 7
date: "2026-04"
timeline: "Apr 2026"
role: "Independent researcher — analysis, code, charts, and writeup"
audience: "Public — notebook, writeup, and code published at github.com/mjzun/aei-education-analysis"
constraint: "Independent replication using the open-source Economic Index dataset and O*NET Job Zones"
outcome: "Replicated the ~21.1% top-10-task finding; mapped 3,514 task-level usage shares onto 923 O*NET occupations; found a roughly tenfold spread between graduate-level (~3× over-represented) and high-school-level (~4× under-represented) occupations"
tools: ["Python", "pandas", "matplotlib", "Jupyter", "GitHub"]
# The notebook itself is printed on the page in place of chart pictures (Matt, 2026-09-14).
notebook:
  path: "src/content/notebooks/aei_education_analysis.ipynb"
  repo: "https://github.com/mjzun/aei-education-analysis"
  # Alt text for the two chart outputs, keyed by execution count; wording taken only from the notebook (chart titles in cells 13 and 16, ratios in the "Findings" cell).
  alts:
    "13": "Bar chart: Claude conversation coverage by O*NET Job Zone, the summed conversation share (%) for each zone, Economic Index February 2025 release"
    "16": "Bar chart: Claude usage share next to O*NET occupation share (baseline) for each Job Zone; over-representation ratios Zone 2 0.27, Zone 3 0.45, Zone 4 1.24, Zone 5 2.98"
images: []
---

## What I made

An independent, public replication of the Anthropic Economic Index, extended with an education-level (O*NET Job Zone) breakdown of Claude.ai usage.

O*NET Job Zones sort occupations into five tiers by the education, training, and experience they need, from Zone 1 (little or none) to Zone 5 (extensive, usually a graduate degree).

First I replicated the Index's own finding that the top 10 tasks account for ~21.1% of Claude.ai conversations. Then I mapped 3,514 task-level usage shares onto 923 O*NET occupations and their Job Zones.

The notebook, writeup, and code are on GitHub: [github.com/mjzun/aei-education-analysis](https://github.com/mjzun/aei-education-analysis).

## Outcome

- Replicated the Index's ~21.1% top-10-task finding.
- Graduate-level occupations (Zone 5) are roughly 3× over-represented in usage relative to their share of occupations.
- High-school-level occupations (Zone 2) are roughly 4× under-represented.
- Zone 1 is absent entirely.
- Taken together, that is a roughly tenfold spread, consistent with the Index's skill-biased adoption results.

## Process

I started by reproducing a published number before adding anything of my own, so the extension would rest on a result I could trust. The Job Zone mapping came next: joining task-level usage shares to occupations, then to the Zone each occupation belongs to, and comparing each Zone's share of usage against its share of occupations.

People seem to have this idea that the STEM fields and art are separate, but that cannot be further from the truth. In fact they are at their best when paired together. That's the point I try to pursue in my technical endeavors.

## Tools

Python (pandas, matplotlib, Jupyter) for the analysis and charts; GitHub for the public notebook, writeup, and code.
