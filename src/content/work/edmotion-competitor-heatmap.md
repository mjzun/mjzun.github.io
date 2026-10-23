---
# Case study: the 8-competitor dashboard and comparison heatmap built for EdMotion (track: data). Every number and outcome comes from PORTFOLIO_BRIEF.md "Verified facts", resume_v3.txt, or docs/source/matt-answers-2026-10-22.md (answers 25–28); the scoring method comes from Matt's dashboard file competitive-matrices-complete-v5 (received 2026-10-23; competitor names and figures deliberately left out); the personal line is Matt's own words from docs/source/figma_prototype_text.md.
title: "EdMotion 8-competitor dashboard and heatmap"
slug: edmotion-competitor-heatmap
tracks: ["data"]
featured: true
order: 6
date: "2026-05"
timeline: "Aug 2025 – May 2026"
role: "Intern, EdMotion (Cary, NC) — market and competitive research, dashboard and heatmap design"
audience: "EdMotion's CEO and the company; the embodied-learning EdTech market and its institutional buyers"
constraint: "Compare 8 competitors on five criteria — price, installs, distribution model, technological novelty, and research backing — in one readable view; public sharing depends on what EdMotion clears, with competitor names anonymized if needed"
outcome: "8 competitors scored on five criteria; changed how the company understood distribution relative to price and technological novelty"
tools: ["GitHub", "GitHub Copilot"]
# images: [] — Matt should export for this page (phase 2), only after EdMotion confirms what can be shown publicly:
#   1. The comparison heatmap, PNG at 2x (competitor names anonymized if needed)
#   2. 1–2 dashboard views cleared for sharing, PNG at 2x
#   3. Optional: the scoring table or criteria legend (price, installs, distribution model, technological novelty, research backing)
#   4. Optional: a screenshot of the 21st CCLC contact database with names and emails blurred
images: []
# The live dashboard: an anonymized public build of Matt's file (competitors renamed A–H; all notes, sources, and identifying details withheld; scores kept). Built 2026-10-23 into public/embeds/edmotion-dashboard/.
embed:
  src: "/embeds/edmotion-dashboard/"
  title: "DASHBOARD"
  note: "Public version · scores and charts are real · competitor names and notes withheld"
  height: 820
---

## What I made

As an intern at EdMotion, an embodied-learning EdTech startup in Cary, North Carolina, I built an 8-competitor dashboard and a comparison heatmap. Each competitor was scored on five criteria: price, installs, distribution model, technological novelty, and research backing. The heatmap put all eight competitors and all five criteria in a single comparison view.

## How it was scored

The dashboard has six chart views — research against market reach, innovation against mobility, price against adoption, innovation against content breadth, and research and embodiment against average pedagogy — plus two heatmaps: one for the competitive scores and one for pedagogy.

- **Innovation** is a 100-point rubric with seven weighted parts: AI and machine learning (25), sensor technology (20), cloud analytics (15), content personalization (15), platform capabilities (10), interaction methods (10), and patents (5).
- **Mobility** is a 10-point score: 7 for how easily the system moves between rooms, 3 for how many surfaces it can project onto.
- **Research** counts the peer-reviewed studies and research items found for each product.
- **Installations** come from vendor and partner listings and sales notes. Where no count was published, it was estimated from reported revenue divided by the per-system price.
- **System cost** is the first three years of ownership, from vendor and reseller pricing.

Each company's profile also records its distribution channel, taken from reseller and distributor listings. In the heatmap, each score falls into one of five color bands, from Low to Excellent, scaled against the strongest company on that metric. For cost, lower scores better.

Try it below. The scores and charts are real; competitor names and notes are withheld in this public version.

## Outcome

The heatmap changed how the company understood distribution relative to price and technological novelty — in particular, it reshaped how the CEO understood the embodied-learning market's distribution and pricing.

In the same internship I compiled a contact database of 21st Century Community Learning Centers (21st CCLC) program leads in every state, and helped open the company's first institutional conversations in North Carolina.

## Process

People seem to have this idea that the STEM fields and art are separate, but that cannot be further from the truth. In fact they are at their best when paired together. That's the point I try to pursue in my technical endeavors. Here, the scoring is the analysis and the heatmap is the design.

Using a heatmap was my own decision. I chose it so the information could be spotted faster.

## Tools

I built the dashboard and the heatmap in GitHub, using GitHub Copilot.
