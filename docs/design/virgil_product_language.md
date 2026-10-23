<!-- virgil_product_language.md — Virgil Abloh's cross-disciplinary product-design moves (Nike, IKEA, Rimowa, Evian, Braun, Mercedes, Vitra, Moncler, Louis Vuitton) with sources, then 22 buildable portfolio-UI ideas derived from them. Companion to virgil_design_brief.md (FREE GAME site) and DESIGN_SYSTEM.md (tokens/classes). -->
# Virgil Abloh's product language, and what a static portfolio can borrow from it

Prepared 2026-09-14. Research by web search + direct fetch; every move below carries a source, and quotes are verbatim from the page they are attributed to. Where a page could not be fetched (Dezeen returns 403), the item is marked **[snippet only]** and rests on the search-result excerpt plus a second fetched source.

How this relates to the other design docs:

- `docs/design/virgil_design_brief.md` — the *website* (FREE GAME): fonts, vw sizing, index nav. Do not duplicate.
- `docs/design/DESIGN_SYSTEM.md` — our tokens and classes (`.spec`, `.index`, `.tag`, `.quoted`, `.glass`). Ideas in section 3 name the class they extend.
- This file — the *objects*: what he did to a shoe, a rug, a suitcase, a car, a brick, and a runway, and the graphic habits that ran through all of them.

---

## 0. Sources: what was fetched

| # | Source | Status |
|---|---|---|
| 1 | Nike News, "Virgil Abloh and Nike Announce New Design Project 'The10'" (2017) — https://about.nike.com/en/newsroom/releases/virgil-abloh-nike-the-10 | fetched |
| 2 | Nike, "The History of Nike x Virgil Abloh's 'The Ten'" — https://about.nike.com/en/magazine/virgil-abloh-nike-the-ten-history | fetched |
| 3 | Sotheby's, "Nike x Off-White 'The Ten' explained" — https://www.sothebys.com/en/articles/nike-x-off-white-the-ten-the-iconic-sneaker-collaboration-explained | fetched |
| 4 | Wikipedia, "Nike and Off-White: 'The Ten'" — https://en.wikipedia.org/wiki/Nike_and_Off-White:_'The_Ten' | fetched |
| 5 | Highsnobiety, "OFF-WHITE Zip Ties Explained" — https://www.highsnobiety.com/p/virgil-abloh-off-white-zip-ties/ | fetched |
| 6 | Highsnobiety, "Why Is Off-White Always Using Quotation Marks?" (quotes 032c) — https://www.highsnobiety.com/p/virgil-abloh-off-white-quotation-marks/ | fetched |
| 7 | Wallpaper*, "Virgil Abloh and Nike collate the design history of The Ten" (ICONS, Taschen) — https://www.wallpaper.com/fashion/virgil-abloh-nike-icons-taschen | fetched |
| 8 | Dezeen, "Virgil Abloh reconstructs 10 of Nike's most iconic sneakers" — https://www.dezeen.com/2017/09/15/the-ten-virgil-abloh-nike-off-white-air-jordan-1-nike-air-vapormax/ | snippet only (403) |
| 9 | Azure, "Virgil Abloh's IKEA Collection Interrogates the Everyday" — https://www.azuremagazine.com/article/virgil-abloh-ikea-markerad/ | fetched |
| 10 | designboom, "exclusive interview: virgil abloh discusses MARKERAD" — https://www.designboom.com/design/interview-virgil-abloh-markerad-collaboration-ikea-11-07-2019/ | fetched |
| 11 | Highsnobiety, "We Spoke to Virgil Abloh About His IKEA MARKERAD Collection" — https://www.highsnobiety.com/p/virgil-abloh-ikea-interview/ | fetched |
| 12 | Dezeen, "Virgil Abloh reveals full IKEA collection" — https://www.dezeen.com/2019/10/10/virgil-abloh-markerad-collection-ikea-launches-usa/ | snippet only (403) |
| 13 | designboom, "off-white bares your belongings in transparent luggage for RIMOWA" — https://www.designboom.com/design/off-white-rimowa-transparent-luggage-suitcase-10-09-2018/ | fetched |
| 14 | Dazed, "Virgil Abloh designed a totally transparent suitcase" — https://www.dazeddigital.com/fashion/article/40253/1/virgil-abloh-designed-a-totally-transparent-suitcase-rimowa-off-white-supreme | fetched |
| 15 | designboom, "virgil abloh-designed glass evian bottle" — https://www.designboom.com/design/virgil-abloh-glass-evian-bottle-design-miami-12-11-2019/ | fetched |
| 16 | Wallpaper*, "Virgil Abloh reimagines Braun's iconic Wandanlage stereo" — https://www.wallpaper.com/design/braun-wandalage-stereo-virgil-abloh | fetched |
| 17 | WhichCar, "Mercedes-Benz and Virgil Abloh's Project Geländewagen revealed" — https://www.whichcar.com.au/news/virgil-abloh-mercedes-project-gelandewagen | fetched |
| 18 | Dezeen, "Virgil Abloh designs race-car version of Mercedes G-Class" — https://www.dezeen.com/2020/09/09/project-gelandewagen-virgil-abloh-mercedes%E2%80%91benz-g%E2%80%91class-car/ | snippet only (403) |
| 19 | designboom, "virgil abloh transports classic VITRA pieces into the future" — https://www.designboom.com/design/virgil-abloh-vitra-twentythirtyfive-06-12-2019/ | fetched |
| 20 | Hypebeast, "Virgil Abloh Reveals Art and Design Collaboration with Vitra" — https://hypebeast.com/2019/6/virgil-abloh-vitra-collaboration-art-basel-twentythirtyfive | fetched |
| 21 | Dwell, "Virgil Abloh Gives Vitra Classics a Streetwear Twist" — https://www.dwell.com/article/vitra-virgil-abloh-twentythirtyfive-cedd951f | fetched |
| 22 | designboom, "the virgil abloh c/o VITRA collection" (2020) — https://www.designboom.com/design/virgil-abloh-c-o-vitra-collection-12-03-2020/ | fetched |
| 23 | Complex, "Virgil Abloh's Off-White Collaborates With Moncler" — https://www.complex.com/style/a/cameron-wolf/virgil-abloh-off-white-collaborates-moncler-o-streetwear-outerwear | fetched |
| 24 | ZOE Magazine, "The Virgil Abloh's Vocabulary for Louis Vuitton SS19 Men" (reproduces the full SS19 glossary) — https://www.zoemagazine.net/135739-virgil-ablohs-vocabulary-louis-vuitton-ss19-men/ | fetched |
| 25 | Louis Vuitton, FW21 Men's show notes PDF (Index, essays, "The vocabulary according to Virgil Abloh, Edition No. 7") — https://d3uqg2ap1kpnl9.cloudfront.net/wp-content/uploads/2021/01/21224213/shownotes-def-2021.pdf | fetched (39 pp, text extracted) |
| 26 | FASHION Magazine, "Virgil Abloh Created a New Vocabulary for His Louis Vuitton Debut" — https://fashionmagazine.com/style/virgil-abloh-louis-vuitton-debut/ | fetched |
| 27 | Dezeen, "Virgil Abloh makes debut for Louis Vuitton on rainbow runway" — https://www.dezeen.com/2018/06/27/virgil-abloh-louis-vuitton-paris-rainbow-runway-fashion/ | snippet only (403) |
| 28 | WBUR, "At The ICA, Virgil Abloh's 'Figures Of Speech' Offers Loaded Words" — https://www.wbur.org/news/2021/07/01/ica-virgil-abloh-figures-of-speech | fetched |
| 29 | The Arts Section, "MCA's New Virgil Abloh Exhibit Explores the Dichotomies of Purists vs. Tourists" — https://theartssection.org/home/2019/6/18/mcas-new-virgil-abloh-exhibit-explores-the-dichotomies-of-purists-vs-tourists | fetched |
| 30 | ARTS ATL, "'Figures of Speech' at the High tells 'the story arc of my career'" — https://www.artsatl.org/figures-of-speech-at-the-high-tells-the-story-arc-of-my-career-says-virgil-abloh/ | fetched |
| 31 | Refinery29, "Virgil Abloh Figures Of Speech Review: Tourist or Purist" (Brooklyn Museum) — https://www.refinery29.com/en-us/2022/07/11034481/virgil-abloh-figures-of-speech-brooklyn-museum-review | fetched |
| 32 | Jarrett Fuller, "Tourist/Purist" — https://www.jarrettfuller.blog/2019/07/virgil-abloh/ | fetched |
| 33 | Harvard Gazette, "Harvard welcomes Virgil Abloh for GSD lecture" (Personal Design Language, 3%) — https://news.harvard.edu/gazette/story/2017/11/harvard-welcomes-virgil-abloh-for-gsd-lecture/ | fetched |
| 34 | MCA Chicago, "Virgil Abloh" exhibition page — https://mcachicago.org/publications/video/2019/virgil-abloh | fetched |

Not needed per the brief and not researched: Converse, Alyx/1017 comparisons.

---

## 1. The grammar that runs through every object

Before the per-collaboration list, the eleven moves that recur. Each collaboration below is mostly a recombination of these.

| Move | What it is | Where it shows up | Key quote |
|---|---|---|---|
| **Quotation marks** | A word in all-caps grotesque, inside straight quotes, placed on the object it names. | Every collab: "AIR", "SHOELACES", "WET GRASS", "TEMPORARY", "SECURITY", "PERSONAL BELONGINGS". | "You can use typography and wording to completely change the perception of a thing without changing anything about it. If I take a men's sweatshirt and write 'woman' on its back, that's art." — Abloh, 032c via [6] |
| **Label the obvious** | Print the material, the part, or the category on itself. | "AIR"/"FOAM" on midsoles [3][4]; "SHOELACES" on laces [4]; "MISCELLANEOUS" on the suitcase divider [13]; "SCULPTURE" on a tote [9]. | "It's about elevating the anonymous, everyday icons that we use without noticing." — [9] |
| **3%** | Change a readymade by the smallest amount that makes it new. | The whole method; he defines it himself in the LV glossary. | "3% — The exact ratio needed to twist a normative object into something special." [24][25]; "I was only interested in restraining myself, and only editing it 3 percent." [33] |
| **Reveal the construction** | Cut it open, leave the foam, stitching, frame, or chassis visible. | The Ten's "REVEALING" half [1]; Vitra Antony chair with a plexiglass shell "revealing the structural framework" [21]; the G-Wagen [17]. | "In one gesture, I wanted to underscore how the design system and manufacturing of Nike are so perfect." — [1][2] |
| **Transparency** | Make the shell clear so the contents are the graphic. | Rimowa polycarbonate case [13][14]; The Ten's "GHOSTING" half (translucent uppers) [1]; LV holdalls in transparent green and red [26]. | "It's like putting your items on display and rethinking the premise of a product." — [14] |
| **Unfinished / primer** | Present the object as in-progress: hand-sanded, hand-cut, unglossed. | Project Geländewagen's hand-sanded finish [17][18]; the X-ACTO'd Jordan 1 [1][3]. | "The idea of the paint is unique in that it runs away from the idea of perfection... The idea here is to embrace the human touch." — [17] |
| **The tag that stays on** | An industrial fastener (zip tie) left attached as a signature; printed with date and collaboration name. | The Ten (red on the 2017 shoes; later Off-White Nikes used orange) [4][5]. | No Abloh quote found; Highsnobiety's four readings: industrial/architectural language, deliberate uselessness, anti-resale, recontextualising the mundane [5]. |
| **Interior print / provenance** | A maker's mark inside: who, for whom, where, when. | Inside The Ten: "Off-White for Nike", shoe name, "Beaverton, Oregon USA", "c. 2017" [4]; "c/o" in every collab title (Off-White c/o Virgil Abloh; Virgil Abloh c/o Vitra; IKEA c/o Virgil Abloh) [22]. | The "c/o" is read as a curatorial credit: he is caring for an existing design rather than authoring it [22]. |
| **Numbered edition** | Every unit carries its own number; the count is part of the design. | Vitra: 999 orange ceramic blocks, "each with a noticeable numeral that makes it unique" [19][20]; Potence lamp 300, Antony chair 100 [21]. | — |
| **The glossary** | Dictionary-style definitions distributed as show notes, cumulative across seasons, with cross-references. | LV SS19 "The vocabulary according to Virgil Abloh" [24][26]; FW21 Edition No. 7 [25]. | "A liberal definition of terms and explanation of ideas." — subtitle of every edition [25][26] |
| **Tourist vs. Purist** | Design for two readers at once: the eager outsider and the guarded expert. | LV from 2018 on; the title device of the *Figures of Speech* retrospective [28][29][30]. | "Tourist and purist, that's my main device to understand the sections of culture, that move culture forward." — [29] |

---

## 2. Per-collaboration moves

### 2.1 Nike × Off-White, "The Ten" (2017)

Nike's own framing: ten icons split into two themes. **"REVEALING"** (Air Jordan I, Air Max 90, Air Presto, VaporMax, Blazer Mid) was "designed to look accessible: hand-cut, open-source and reconstructed." **"GHOSTING"** (Chuck Taylor, Zoom Fly SP, Air Force 1, React Hyperdunk, Air Max 97) used translucent uppers to unify five silhouettes. [1]

Moves, with sources:

1. **Exposed foam.** Abloh used an X-ACTO knife to cut the tongue open and leave the foam showing. [1][3] Nike lists "X-ACTO knife cuts revealing internal foam" as a design detail. [1]
2. **Deconstructed / visible stitching and floating parts.** "Visible stitching", "deconstructed floating Swoosh", "deconstructed tongues and exposed stitching", "additional fabric panels repositioned across each silhouette." [3][4] Also "exposed tongues with moved Nike labels" and "altered Swoosh placements and enlargements." [1]
3. **Material words on the midsole.** "The name of the main material of the specific shoe... in bold black quotation marks" — "AIR", "FOAM". [4] Sotheby's: "sans-serif text in playful quotation marks." [3]
4. **The zip tie.** A red tie on every pair "that features the date, name of collaboration and 'zip-tie' in bold white letters." [4] Highsnobiety calls the colour "industrial red." [5] (Nike's release separately lists "orange tabs for color accents." [1] Later Off-White × Nike releases moved to orange ties, which is the colour most people remember.)
5. **"SHOELACES" on the laces.** "The word 'SHOELACES' was written in bold at the end of each shoelace"; every pair shipped with several lace sets. [4]
6. **The Helvetica label.** Fuller calls it his "trademark typographic gesture — all-caps Helvetica in quotes (never smart quotes!)". [32] Abloh on Helvetica as a unifier: "The diagonal lines help me solve a huge issue, how to take a bunch of random things and let them be one. That's the mindset of Helvetica. That's the mindset of architecture." [6]
7. **Interior print.** Inside each shoe: "Off-White for Nike", the shoe name, "Beaverton, Oregon USA", "C. 2017". [4]
8. **The "in-progress" / DIY look and why.** "Yes, we're making a desired product, but by making a trip to your local store, and using tools you have at home, *you could also make this shoe*." [1][2] And: "By combining these shoes with design that amplifies their 'handmade' quality, we're intensifying the human element and expanding the emotional connection of these 10 icons." [2] The pace was part of the point: "Most of the creative decisions were made in the first three hours... The Jordan I was done in one design session." [1][2]
9. **Documenting the process as a product.** The ICONS book (Taschen, with Zak Group) prints "concepts, prototypes, and text messages between Abloh and Nike's designers." Abloh: "It's essentially the whole logic of how. It's a printed documentary of the Off White and Nike project." [7]
10. **Whose kid it is for.** "I spend a tremendous amount of time thinking about the kid in the middle of nowhere who has a passion for design, much like I did." [1][2]

### 2.2 IKEA, MARKERAD (2019)

Stated ethos: "The ethos of the collection is to add an artful quality to anonymous objects. It's about elevating the anonymous, everyday icons that we use without noticing." [9] And: "my concept of design resonates with IKEA's democratic design principles, with the idea that great design can be accessible for many people." [9]

Moves:

1. **"SCULPTURE" tote.** IKEA's blue FRAKTA bag re-cut as a reinforced brown-paper-coloured bag, labelled "SCULPTURE" — the shopping bag reframed as an art object. [9][12]
2. **"WET GRASS" rug.** Astroturf-textured green rug "branded with thick white sans serif lettering stating 'WET GRASS'"; a companion "KEEP OFF" rug carries the warning. [9]
3. **"TEMPORARY" clock.** White-on-white timepiece inscribed "TEMPORARY", "conceptually questioning time as a human construct." [9] Wonderland describes it as a matte white clock. [12 via search]
4. **The receipt rug.** "An enlarged IKEA receipt transformed into low pile carpet, visually evoking a shopping receipt to recall recent purchases." [9] The receipt — the most anonymous IKEA document — becomes the artwork.
5. **Mona Lisa light box.** Back-lit, 1:1 scale. Abloh: "for me it's this back-lit mona lisa we've made. It's a 1 to 1 scale of the original." [10] "It's true to scale. I put my signature on it; it makes it something of the time." [11]
6. **The doorstop chair (the 3% interruption).** A Windsor-type chair with one leg ending in a wedge/doorstop. Abloh: "The fact that it has a doorstop attached to the leg is so subtle but so odd at the same time." [11] The design-press paraphrase: "When we put a doorstop on one of the legs of an ordinary chair we create something unexpected — an interruption." [search excerpt of 9/10]
7. **"HOMEWORK" toolbox.** An IKEA toolbox fronted with the word "HOMEWORK". [12 snippet]
8. **The reader it is for.** "somebody in a suburb, like the 17-year-old version of myself, can actually afford it for under a hundred bucks." [11] "I wanted people to be, like, I can make it my own. It's part of our culture." [11] "You just think the sofa is a sofa. That thinking has crept into this IKEA project." [11]
9. **The rug as a worn object.** "To me, it's almost like a pair of Jordan 1s: they are meant to be worn — and a Jordan is a piece of art." [11]

### 2.3 Rimowa, transparent polycarbonate case (2018)

1. **See-through shell.** Rimowa's Essential Cabin S in clear polycarbonate, "revealing packed belongings"; no interior lining at all. [13][14]
2. **The contents become the graphic; the only print is the label.** Quoted words "SECURITY", "PERSONAL", "BELONGINGS"; an opaque "Personal Belongings" variant carries the text front and back. [13] The Flex-Divider is black with "MISCELLANEOUS" on it; dust bags are also "MISCELLANEOUS". [13, and search excerpt]
3. **One colour accent.** Interchangeable orange wheels; an industrial yellow luggage belt. [13]
4. **Why transparent, in his words.** "It's like 3.0 of personalisation. It's not just putting your initials on it, but allowing another layer to come into play." "There's an emotional component to owning (the suitcase) and you become a performance art piece just by using the thing." "It's like putting your items on display and rethinking the premise of a product." [14]

### 2.4 Evian, glass bottle (2019)

1. **One drop, one idea, one bottle.** 75 cL glass bottle covered in water drops in a range of hues; the concept "one drop can make a rainbow." [15]
2. **His explanation.** "The notion that one drop of water can create a rainbow served as the inspiration and metaphor to drive my first project as evian's creative advisor for sustainable innovation design." "As light refracts through that droplet, it reveals its full polychromatic potential. We don't see just water, we see infinite possibilities and inspiration for anyone. Everyone." [15]
3. **The move, generalised.** A single small unit (a drop) repeated becomes the whole surface. Same rainbow motif as the LV SS19 runway, applied to a commodity.

### 2.5 Braun, Wandanlage (2021)

1. **Keep the function, change the surface.** The 1965 wall-mounted hi-fi (speakers, tuner, reel-to-reel) was refinished in polished chrome; the electronics still work as they did in 1965. [16, plus Hypebeast search excerpt]
2. **Why chrome.** The finish references "platinum chains or gold teeth" and hip-hop car customisation, a "long history within the Black canon of aesthetics." [16]
3. **"Functional art".** Positioned as a functional art piece, not a product update; first shown publicly at the Brooklyn Museum *Figures of Speech*. [16]
4. **Quotes.** "I have always had a deep appreciation for Braun design... challenge what we have come to expect from design." "The final result... is deep within the ethos of Braun, to build things to last, to truly be timeless, while allowing new stories to be told. We all make stuff. The goal is to make it with purpose." [16]

### 2.6 Mercedes-Benz, Project Geländewagen (2020)

1. **Strip the object to its structure.** G-Class turned into a race car: indicators, exterior mirrors and bumpers removed; race seats and a roll cage; baby-blue interior. [17][18 snippet]
2. **The unfinished finish.** "Painted to look unfinished, kind of like someone's stripped the paint back on a Matchbox car." [18 snippet] Hand-sanded paint. [17]
3. **His explanation.** "The initial idea... was to have this car that is luxurious in a deconstructed way." "The idea of the paint is unique in that it runs away from the idea of perfection." "The finish is typically like the underlining of a car. The idea here is to embrace the human touch." [17] Wagener: "We have turned an off-road icon into a racecar." [17]
4. **Sold as a maquette.** A 1:3 model went to Sotheby's, proceeds to his Post-Modern Scholarship Fund. [search excerpt]

### 2.7 Vitra, "TWENTYTHIRTYFIVE" (2019) and "Virgil Abloh c/o Vitra" (2020)

1. **Numbered orange bricks as architecture.** 999 glazed ceramic blocks, "consecutively numbered", forming a wall that "doubles as storage"; visitors could buy one and pull it out of the wall. [19][20][21] The labelling is "almost scientific", "typography an important design element and no two alike." [search excerpts]
2. **Two rooms: Past/Present and Tomorrow.** Prouvé's Petite Potence lamp and Antony armchair and Eames pieces shown "through a dream-like filter"; "Tomorrow" is a 2035 live/work studio. [19][20]
3. **Reveal the frame.** The Antony chair remade "with a plexiglass shell and bright orange lacquer finish, revealing the structural framework." The Potence lamp's LED sits in "an oblong cage." [21]
4. **Quotes.** "to me, design has the inherent idea of being a bridge from the past, with an eye towards the future." [19][21] "It's arguable whether we will even have a need for furniture by 2035." [20][21] On the 2020 baby-blue edition: "This collaboration invites the new generation into the conversation — my work is meant to open doors for them." [22]
5. **"c/o".** The 2020 drop is titled "Virgil Abloh c/o Vitra"; the "care of" reads as curatorial — reissuing existing pieces rather than authoring new ones. [22]

### 2.8 Moncler (Off-White c/o Virgil Abloh × Moncler, 2016–17; Moncler O)

1. **Borrowed uniforms.** Fisherman gear (after an episode of *Deadliest Catch*) and '90s hip-hop "yachtwear" (vintage Nautica in rap videos): yellow puffers that mimic life vests, rubberised rain coats, anoraks and parkas. [23, plus search excerpt]
2. **Signature stripes in a swapped colour.** Off-White's diagonals done in yellow instead of white; a "WHITEWIDOW" knit collar. [search excerpt]
3. **Quote.** "The best part of working on the Moncler collaboration was being able to work with a different range of fabrics and the technical ability to make garments." [23]
4. **Least useful for UI.** The Moncler work is mostly material and silhouette; the transferable move is *borrow a working uniform and change one variable* (stripe colour), i.e. 3% again.

### 2.9 Louis Vuitton menswear (2018–2021)

1. **The rainbow runway (SS19, June 2018).** A 200-metre hand-painted "gradient painting" runway through the Palais-Royal gardens, from *The Wizard of Oz*; guests wore T-shirts matching their section's colour, "effectively activating the show through attendance." [27 snippet][24 "Production"] Two looks made with Warner Bros. for the film's 80th anniversary. [26]
2. **The glossary as show notes.** SS19's notes were "The vocabulary according to Virgil Abloh", subtitled "A liberal definition of terms and explanation of ideas", A–Z. [24][26] Sample entries, verbatim [24]:
   - **3%** — "The exact ratio needed to twist a normative object into something special."
   - **Accessomorphosis** — "A portmanteau describing the transformation of an accessory into a garment, effectively evolving its functional form."
   - **Irony** — "The philosophy of a new generation. The presence of Virgil Abloh at Louis Vuitton."
   - **Off-White** — "A greige gradient of white, which alters a component familiar to all. It serves as a blank canvas for perception and interpretation."
   - **Palette** — "Black, white, off-white, and taupe. Ruby shoe red, brick road yellow, tin man metallic, garland green, and rainbow."
   - **Rainbow** — "A kaleidoscopic palette evolving from off-white to polychromatic, synchronously forming a holographic archway known to represent dreams. A motif in The Wizard of Oz, which provides construct to the Spring-Summer 2019 collection."
   - **Staple** — "A twisted piece of metal that holds two elements together. A term for the essential garments and accessories in a wardrobe."
   - **Motto** — Abloh states, "Good style is always off-putting."
3. **The glossary is cumulative and cross-referenced (FW21, Edition No. 7).** Every entry ends with a bracketed season tag — `[SS19]`, `[PS20]`, `[FW21]` — telling you which collection coined it, and entries point sideways with "See: *Nuance*", "See: *Un-designed*", "See: *Archetype*". New FW21 entries include **Un-designed** ("Virgil Abloh's term for articles of fashion, art or everyday life objects devoid of artistic ownership and definitive provenance"), **Nail** ("A metal spike that joins things together... knows no artistic ownership. See: Un-designed"), **Archetype**, **Neotype**, **Normality**, **Stereotype**, **Maintainamorphosis**, **7.0'd** ("something that has been elevated to its ultimate degree"). [25]
4. **The show notes open with an "Index".** FW21's first page is literally headed "Index": "P.3 Notes on the collection / P.8 Notes on the performance art piece / P.10 Notes on the soundtrack / P.12 Paper dolls / P.19 An anthology for a collection / ... P.29 The vocabulary according to Virgil Abloh / P.56 Look descriptions / P.70 Model map." Under it, the epigraph: "Within my practice, I contribute to a Black canon of culture and art and its preservation. This is why, to preserve my own output, I record it at length." [25]
5. **Essays titled as questions.** The FW21 anthology's section heads are all questions: "What do you want to be when you grow up?", "Who wants to look normal?", "Are you a tourist or a purist?", "What is art and who is it for?", "Who did it first?", "Go fish?" [25]
6. **"Tourist vs. Purist" as lexicon.** Coined on his 2018 arrival at LV. FW21 notes: "those who observe and aspire towards a domain of knowledge, and those who inhabit it... Applied to fashion, the idea of 'Tourist vs. Purist' can echo that of low vs. high." The phrase was printed on FW21 garments and bags alongside "linguistic creations by Lawrence Weiner." [25] In interviews: "A 'tourist' is someone who is eager and interested to seek out new information and learn — ultimately driven by seeing." "A 'purist' is a learned individual who is equally important but is guarded by their knowledge." "I strive to make artwork and ideas that force those two subsects of people to cross paths." [30]
7. **"Upcycling Ideology" as an A/B/C list.** FW21 states its method as a lettered list: "A. Pieces upcycled by recycling material from overstock. B. Pieces upcycled from recycled ideas. C. Pieces upcycled through reiteration from previous storylines." and reverses the usual hierarchy: "made up of pieces that make looks rather than looks that have pieces in them." [25]
8. **"Figures of speech" as a title for the whole practice.** The retrospective (MCA Chicago 2019 → High → ICA Boston → Brooklyn) took its title from the method of combining "classical architecture, skateboarding ramps, lines from Hollywood movies and the graffiti you see on that building across the street." [28] Abloh: "It's the story arc of my career." "It is the engine of *Figures of Speech* to be one big gray area that is actually our everyday lives." [30]

### 2.10 His graphic-design habits, collected

1. **The DEFINITION piece.** A term, a definition, a provenance tag, a cross-reference. In print (show notes) and on objects (LV bags with "Tourist vs. Purist"). The subtitle never changes: "A liberal definition of terms and explanation of ideas." [24][25] Fuller: the quote-marks "paradoxically mask the depth of his conceptual thinking." [32]
2. **The glossary as design element.** Cumulative editions ("Edition No. 7, January 2021"), alphabetised, season-tagged, cross-referenced. [25] It is the one artefact he re-issued every season.
3. **The index / table of contents as navigation.** Show notes start with "Index" and page numbers [25]; the FREE GAME site starts with a numbered TOC (see `virgil_design_brief.md`); *Figures of Speech* was hung in seven named sections: "Introduction, Early Work, Fashion, Music, The Black Gaze, Design, and The End." [29]
4. **Exhibition wall text as design.** Entrance: "Tourist or Purist?" in black and electric green; a flag reading "Question Everything" in quotes; yellow neon "You're Obviously in the Wrong Place" (a *Pretty Woman* line) on a black wall; graphic prompts "Are you a [purist] or a [tourist]?" [28][29] Otherwise "barely any signage accompanying the pieces" — the brochure is for the purist, the room is for the tourist. [31]
5. **Brackets, quotes, and "c/o" rather than parentheses.** The verified punctuation habits are: straight double quotes around all-caps nouns [6][32]; square-bracketed provenance tags `[SS19]` [25]; square-bracketed choices "[purist] or [tourist]" [29]; the "c/o" credit line [22]; and the deadpan-descriptive title ("Insert Complex Title Here", his Harvard lecture, which ended "Insert Yourself Here" [33]; "TWENTYTHIRTYFIVE"; "MARKERAD", Swedish for "marked"). No source shows a consistent *(TITLE)*-in-parentheses habit; treat parenthesised titles as a site invention, not an Abloh quotation. The square bracket is the documented one.
6. **The manifesto as a numbered list.** Harvard 2017: a seven-point "Personal Design Language" including "the 3 percent approach" and speaking to "the tourist and purist simultaneously." [33] FW21 "Manifesto" entry is a single quoted commitment. [25]
7. **Recording everything.** "to preserve my own output, I record it at length." [25] Process artefacts (text messages, prototypes) are published as the book. [7]

---

## 3. Portfolio UI ideas derived from the moves

Twenty-two ideas, all buildable in the current static Astro site with CSS and at most a few lines of vanilla JS. Each names the move it comes from, what to build, where it goes, an effort estimate (S = under an hour, M = an afternoon, L = a day), and a caution. Tracks referenced are the site's own: design, presentation, data, ai, leadership (`docs/PLAN.md`).

### 3.1 Grid overlay toggle — "REVEALING"
- **From:** The Ten's REVEALING theme; exposed foam; "underscore how the design system... [is] so perfect." [1]
- **Build:** A `<button class="spec" aria-pressed>` in the colophon (and the `g` key) toggles `html[data-grid]`. A fixed `::before` on `body` draws the 12-column grid with `repeating-linear-gradient` using `--gutter` and `--col`, in rust at 25% opacity, plus a 4px baseline grid. A mono label in the corner reads `GRID / 12 COL / GUTTER 24 / BASELINE 4`.
- **Where:** Global; off by default; state in `localStorage` wrapped in try/catch.
- **Effort:** S. **Caution:** `pointer-events: none` on the overlay; respect `prefers-reduced-motion` (no fade, it just appears — the site has no transitions anyway).

### 3.2 Spec-label captions on every image
- **From:** "AIR" / "FOAM" on the midsole [4]; Vitra's "almost scientific" labels [19].
- **Build:** Every `<figure>` gets `<figcaption class="spec">IMG 03 / JPG / 1600×1067 / 212 KB / 2025-03</figcaption>`. Astro's `getImage()` / `import` metadata exposes `width`, `height`, `format`; file size via `fs.statSync` in the component at build time. Number images per page in order.
- **Where:** Case-study pages, the About portrait, the Featured grid captions (`.caption.glass` already carries `span.num`).
- **Effort:** M (one `<Spec>` component). **Caution:** Literal, not decorative: if the numbers are fake, the idea dies. Never round the dimensions.

### 3.3 DEFINITION block at the top of each case study
- **From:** "The vocabulary according to Virgil Abloh"; entry format term → definition → `[tag]` → "See:" [24][25].
- **Build:** A `<dl class="definition">` above the case-study body: `<dt>“DATA”</dt><dd>Work where a number changed a decision. See: <a>Presentation</a>. [RAIDER 2024]</dd>`. Definition text lives in `src/content/tracks/*.md` so each track's definition is written once and reused on `/work/?track=data` and every case study.
- **Where:** First block of every case study, under the spec strip.
- **Effort:** S. **Caution:** Write your own definitions. Do not reuse LV's text.

### 3.4 A cumulative `/vocabulary/` page
- **From:** The glossary re-issued every season as "Edition No. N" with `[SS19]` provenance tags and cross-references [25].
- **Build:** One markdown file per term in `src/content/vocabulary/`, frontmatter `{term, coinedIn: "raider-education", edition: 3}`. The page renders A–Z, two columns above 720px (reuse `.index-num`), each entry ending in a mono `[RAIDER]`-style tag linking to the project that coined the word. Page header: `“VOCABULARY” / EDITION NO. 3 / 2026-09`. Bump the edition when a term is added.
- **Where:** New page; add to the A–E index as its own letter or fold under About.
- **Effort:** M. **Caution:** Keep it under ~30 terms or it stops being read; every term must appear somewhere in the site's prose.

### 3.5 In-prose "See:" references and `<dfn>` marks
- **From:** "See: *Nuance*", "See: *Un-designed*" in the FW21 glossary [25].
- **Build:** A remark plugin (or manual markup) wraps the first use of a vocabulary term in a case study with `<a class="dfn" href="/vocabulary/#term">`. Style: dotted underline, mono `See:` prefix on hover via `::before`. Also allow explicit `See: Data` lines at paragraph ends, set in Courier.
- **Where:** Case-study prose. **Effort:** S (manual) / M (plugin). **Caution:** First use only; a page full of dotted underlines is noise.

### 3.6 X-ray card — the transparent "Rimowa" treatment
- **From:** The clear polycarbonate shell; "putting your items on display and rethinking the premise of a product." [13][14]
- **Build:** A toggle `[data-xray]` on `.card` (hover/focus-within on desktop, a small "X-RAY" button on touch). In x-ray, backgrounds go transparent, every child gets `outline: 1px dashed var(--rust)` and a mono `::before { content: attr(data-part) }` label — `MEDIA`, `CAPTION`, `TITLE`, `SPEC`, `TAG`. The `.spec` line stays black, as the "MISCELLANEOUS" divider was the only opaque thing in the case.
- **Where:** Work grid and featured grid. **Effort:** M. **Caution:** Labels must be `aria-hidden`; the toggle button needs a real accessible name. Do not make x-ray the default: the suitcase shipped one clear and one opaque.

### 3.7 Receipt-style resume
- **From:** The MARKERAD receipt rug — "an enlarged IKEA receipt transformed into low pile carpet." [9]
- **Build:** `/resume/` as a thermal receipt: `max-width: 42ch`, Courier Prime, `border-bottom: 1px dotted` rules, three columns (ITEM / QTY / TOTAL) where items are roles, QTY is months, TOTAL is the outcome number; `SUBTOTAL`, `TAX (0.00)`, `TOTAL`; footer `THANK YOU FOR VISITING / RETURNS: NONE / MADE IN CHAPEL HILL, NC`; a CSS barcode via `repeating-linear-gradient(90deg, #000 0 2px, transparent 2px 5px, ...)`. A `@media print` sheet keeps it one narrow column, so printing gives you an actual receipt.
- **Where:** Sits beside, not instead of, the PDF resume (the pill link stays). **Effort:** M. **Caution:** Recruiters skim; keep the real dates and titles legible and put a "PLAIN VERSION" link at the top.

### 3.8 Zip-tie tag for tracks
- **From:** The tie printed with the date and collaboration name, left attached on purpose [4][5].
- **Build:** Extend `a.tag` with `.tag--tie`: a small square "head" (`::before`, 10×10, rust border) fused to a long thin strap (`::after`, 1px ridge pattern via `repeating-linear-gradient`), text set on the strap: `“DATA” / 2026`. Pure CSS, ~20 lines. On the case-study lead image it hangs off the corner of `.media` with `position:absolute; rotate:-6deg`.
- **Where:** Card tags and the chip bar. **Effort:** S. **Caution:** Off-White's tie is a trade-dress signature; this borrows the *gesture* (a label that stays attached, dated) in the site's own colour, not the red/orange strap with their wording.

### 3.9 "IN PROGRESS" treatment for pages with TODOs
- **From:** The hand-sanded G-Wagen ("runs away from the idea of perfection... embrace the human touch") [17]; the X-ACTO'd Jordan [1]; `li.pending` in the index (DESIGN_SYSTEM §7).
- **Build:** Frontmatter `status: in-progress` and `todo: 3` switch on `.page--wip`: (a) a spec strip line `“IN PROGRESS” / 4 OF 7 SECTIONS / LAST TOUCHED 2026-09-14` (date from git via `execSync('git log -1 --format=%cs -- ' + file)` at build); (b) unwritten sections render as a grey block with a mono `[TEXT PENDING]`; (c) images without captions show `[IMG PENDING]` in the spec caption; (d) the page's card in the grid gets a dashed outline and `.small` reads "in progress"; (e) `noindex` meta and exclusion from `sitemap.xml`. Nothing is hidden; the page is honest about its state and the state is designed.
- **Where:** Any case study not yet finished. **Effort:** M. **Caution:** A WIP page must still have the definition block and at least one real outcome; otherwise it is a placeholder, not a prototype.

### 3.10 Primer finish for unfinished hero images
- **From:** "The finish is typically like the underlining of a car." [17]
- **Build:** `.media.primer img { filter: grayscale(1) contrast(.85); }` plus a `mix-blend-mode: multiply` overlay of `--paper` at 30% and a mono corner label `PRIMER / FINAL IMAGE PENDING`. Remove the class when the real image lands.
- **Where:** WIP case studies. **Effort:** S. **Caution:** Only on `status: in-progress` pages; a finished page never wears primer.

### 3.11 Structural labels — "AIR" / "FOAM" for layout regions
- **From:** Naming the material on the part [4].
- **Build:** When the grid overlay (3.1) is on, each landmark gets a mono label from `attr(aria-label)` or a `data-part`: `HEADER`, `INDEX`, `MAIN`, `SECTION B / 06 ITEMS`, `DOCK`, `COLOPHON`, hanging in the left margin at ≥1280px. Same `::before` technique as 3.6.
- **Where:** Global, gated behind 3.1. **Effort:** S. **Caution:** Labels are the literal HTML landmark names, not jokes.

### 3.12 Two view modes for the work grid — REVEALING / GHOSTING
- **From:** The Ten's split into a hand-cut half and a translucent half [1].
- **Build:** A two-state control above `.grid-cards`: **REVEALING** (default: full captions, spec lines, tags, x-ray available) and **GHOSTING** (images only; every text node at `opacity:.2` and `.media` at full; hover/focus restores the card). Persist per visitor.
- **Where:** `/work/`. **Effort:** S. **Caution:** In GHOSTING the card link must keep its accessible name; opacity does not remove it from the a11y tree, which is what we want.

### 3.13 Interior print — a per-page maker's mark
- **From:** Inside the shoe: "Off-White for Nike / [name] / Beaverton, Oregon USA / C. 2017." [4]
- **Build:** Extend `dl.colophon` per page: `MJZUN for [Client or Course] / [PAGE TITLE] / CHAPEL HILL, NC USA / c. 2026 / BUILT 2026-09-14 / COMMIT a1b2c3d`. Build date and short SHA from `git rev-parse --short HEAD` at build time.
- **Where:** Foot of every page, above the dock. **Effort:** S. **Caution:** Keep it four to six lines; it is a stamp, not a footer.

### 3.14 Numbered editions everywhere
- **From:** 999 blocks, each with its own numeral; 300 lamps; 100 chairs [19][21].
- **Build:** The index already numbers pieces 01–12. Extend the same `No. 007 / 012` format to images (3.2), downloads (`FILE 02 / 03 · PDF · 1.2 MB`), and vocabulary entries. The denominator is computed, never typed.
- **Where:** Global. **Effort:** S. **Caution:** If a count is wrong the whole device reads as decoration; compute from the content collection.

### 3.15 Tourist / Purist reading depth
- **From:** "I strive to make artwork and ideas that force those two subsects of people to cross paths." [30]; the brochure-vs-room split of the exhibition [31].
- **Build:** A single toggle at the top of each case study: **“TOURIST”** shows the definition block, three outcome numbers, and the images; **“PURIST”** opens every `<details>` (method, data tables, footnotes, what failed). Implemented as `html[data-depth]` + `<details open>` set by 8 lines of JS; without JS, all `<details>` stay closed but reachable.
- **Where:** Case studies. **Effort:** M. **Caution:** Everything must exist in the HTML in both modes; this is a reading aid, not two pages.

### 3.16 One wall-text sentence per page
- **From:** "Tourist or Purist?" at the entrance; the "Question Everything" flag; minimal signage elsewhere [28][29][31].
- **Build:** At most one `h2.wall` per page: `--fs-h1`, Archivo 700, tight tracking, full-bleed, in quotes, in Matt's own words (the About pull quote already does this). The rule: if a page has a `.wall`, no other element on it may exceed `--fs-h2`.
- **Where:** Home (the headline), About (the pull), one per case study at most. **Effort:** S. **Caution:** Own words only; never a borrowed line.

### 3.17 The 3% interruption — one wedge per page
- **From:** The doorstop leg: "so subtle but so odd at the same time." [11]
- **Build:** A documented list of allowed oddities and a rule of exactly one per page: the last index item set in Bodoni italic; one card in the grid 8px lower than its row; one spec value in rust; the `meet.` in the headline (already the wedge on the home page). Keep the list in `DESIGN_SYSTEM.md` §10 so nobody adds a second.
- **Where:** Any page. **Effort:** S. **Caution:** Two wedges is a style; one wedge is an interruption.

### 3.18 Page-weight receipt
- **From:** Rimowa transparency [14] + the receipt rug [9]: show what is actually inside.
- **Build:** At build, an Astro integration totals the page's HTML, CSS, image and JS bytes and request count, and prints them in the colophon as a mini receipt: `HTML 14.2 KB / CSS 8.1 KB / IMG 412 KB / JS 0.0 KB / TOTAL 434 KB / REQUESTS 9`. Zero JS should read `0.0 KB` proudly.
- **Where:** Colophon of every page. **Effort:** M. **Caution:** Measure the built `dist/` output, not the source.

### 3.19 `/changelog/` written as an "Upcycling Ideology" list
- **From:** FW21's A/B/C list: recycled material, recycled ideas, reiterated storylines [25]; "REV. 1" in the spec strip.
- **Build:** A page that groups each revision under three lettered heads: **A. Reused** (components moved between pages), **B. Recycled** (an old idea rebuilt), **C. Reissued** (a section republished unchanged with a new date). Entries are one mono line each: `2026-09-14 / B / receipt resume rebuilt from PDF`. `REV.` in the header increments from this file.
- **Where:** Linked from the colophon. **Effort:** S. **Caution:** Update it when you ship, not later.

### 3.20 Bracketed provenance tags on facts
- **From:** `[SS19]`, `[FW21]` after every glossary entry [25]; "[purist] or [tourist]" prompts [29].
- **Build:** Facts in About and the hero (`dl.facts-row`, `ul.facts.mono`) end in a mono bracket linking to their source page or year: `TRACKS 05 [INDEX]`, `HONORS Dean's List [2025]`. Style `.prov { font: var(--fs-meta) var(--font-mono); color: var(--mute) }`.
- **Where:** Facts rows, definition blocks, vocabulary. **Effort:** S. **Caution:** Square brackets, not parentheses; it is the documented mark and it reads as a citation rather than an aside.

### 3.21 1:1 scale toggle for design artefacts
- **From:** The Mona Lisa light box: "It's true to scale." [11]
- **Build:** On design-track images (slides, screens), a control `FIT / 1:1`. `1:1` sets the `<img>` to its intrinsic pixel size inside an `overflow:auto` frame and updates the spec caption to `SHOWN AT 1:1 / 1440×900`. FIT restores `max-width:100%`.
- **Where:** Case studies in the design and presentation tracks. **Effort:** S. **Caution:** The frame, not the page, scrolls horizontally (DESIGN_SYSTEM rule: the body never scrolls sideways).

### 3.22 A “WRONG PLACE” 404 and a “MISCELLANEOUS” section
- **From:** The neon "You're Obviously in the Wrong Place" [28][29]; the "MISCELLANEOUS" divider and dust bags [13].
- **Build:** `/404.html`: black ground, one line of wall text in Matt's words (e.g. `“NOT THIS PAGE.”`), then the full 01–12 index so the visitor is one click from anything. And a final index entry **“MISCELLANEOUS”** for the small things that do not earn a case study (a script, a talk, a spreadsheet), listed as spec lines only.
- **Where:** 404; end of the index. **Effort:** S. **Caution:** The 404 must still carry the dock and the skip link.

---

## 4. Borrow the gesture, not the mark

- The moves above are methods: label the obvious, reveal the build, number everything, define your terms, design for the tourist and the purist. Those are free to use.
- The *marks* are not: Off-White's specific quotation-mark trade dress on garments, the red/orange zip tie with Off-White's wording, the diagonal stripes, the arrows logo, the "c/o Virgil Abloh" credit line, and any LV, IKEA, Nike, Rimowa, Braun, Mercedes or Vitra asset or copy. The existing brief's "Do not copy" list still applies (`virgil_design_brief.md` §7).
- Every quoted word on the site must be Matt's own word about Matt's own work. The glossary entries, the wall text, the definitions and the receipt lines are written fresh; the LV definitions quoted in §2.9 are here as evidence of a *format*, not as text to reuse.
- Attribution: if the site's colophon credits an influence, credit it the way FREE GAME does — a single line, no logo, e.g. `INFLUENCE Virgil Abloh (method, not marks)`.

---

## 5. Source list (plain)

1. https://about.nike.com/en/newsroom/releases/virgil-abloh-nike-the-10
2. https://about.nike.com/en/magazine/virgil-abloh-nike-the-ten-history
3. https://www.sothebys.com/en/articles/nike-x-off-white-the-ten-the-iconic-sneaker-collaboration-explained
4. https://en.wikipedia.org/wiki/Nike_and_Off-White:_'The_Ten'
5. https://www.highsnobiety.com/p/virgil-abloh-off-white-zip-ties/
6. https://www.highsnobiety.com/p/virgil-abloh-off-white-quotation-marks/
7. https://www.wallpaper.com/fashion/virgil-abloh-nike-icons-taschen
8. https://www.dezeen.com/2017/09/15/the-ten-virgil-abloh-nike-off-white-air-jordan-1-nike-air-vapormax/ (snippet only)
9. https://www.azuremagazine.com/article/virgil-abloh-ikea-markerad/
10. https://www.designboom.com/design/interview-virgil-abloh-markerad-collaboration-ikea-11-07-2019/
11. https://www.highsnobiety.com/p/virgil-abloh-ikea-interview/
12. https://www.dezeen.com/2019/10/10/virgil-abloh-markerad-collection-ikea-launches-usa/ (snippet only)
13. https://www.designboom.com/design/off-white-rimowa-transparent-luggage-suitcase-10-09-2018/
14. https://www.dazeddigital.com/fashion/article/40253/1/virgil-abloh-designed-a-totally-transparent-suitcase-rimowa-off-white-supreme
15. https://www.designboom.com/design/virgil-abloh-glass-evian-bottle-design-miami-12-11-2019/
16. https://www.wallpaper.com/design/braun-wandalage-stereo-virgil-abloh
17. https://www.whichcar.com.au/news/virgil-abloh-mercedes-project-gelandewagen
18. https://www.dezeen.com/2020/09/09/project-gelandewagen-virgil-abloh-mercedes%E2%80%91benz-g%E2%80%91class-car/ (snippet only)
19. https://www.designboom.com/design/virgil-abloh-vitra-twentythirtyfive-06-12-2019/
20. https://hypebeast.com/2019/6/virgil-abloh-vitra-collaboration-art-basel-twentythirtyfive
21. https://www.dwell.com/article/vitra-virgil-abloh-twentythirtyfive-cedd951f
22. https://www.designboom.com/design/virgil-abloh-c-o-vitra-collection-12-03-2020/
23. https://www.complex.com/style/a/cameron-wolf/virgil-abloh-off-white-collaborates-moncler-o-streetwear-outerwear
24. https://www.zoemagazine.net/135739-virgil-ablohs-vocabulary-louis-vuitton-ss19-men/
25. https://d3uqg2ap1kpnl9.cloudfront.net/wp-content/uploads/2021/01/21224213/shownotes-def-2021.pdf
26. https://fashionmagazine.com/style/virgil-abloh-louis-vuitton-debut/
27. https://www.dezeen.com/2018/06/27/virgil-abloh-louis-vuitton-paris-rainbow-runway-fashion/ (snippet only)
28. https://www.wbur.org/news/2021/07/01/ica-virgil-abloh-figures-of-speech
29. https://theartssection.org/home/2019/6/18/mcas-new-virgil-abloh-exhibit-explores-the-dichotomies-of-purists-vs-tourists
30. https://www.artsatl.org/figures-of-speech-at-the-high-tells-the-story-arc-of-my-career-says-virgil-abloh/
31. https://www.refinery29.com/en-us/2022/07/11034481/virgil-abloh-figures-of-speech-brooklyn-museum-review
32. https://www.jarrettfuller.blog/2019/07/virgil-abloh/
33. https://news.harvard.edu/gazette/story/2017/11/harvard-welcomes-virgil-abloh-for-gsd-lecture/
34. https://mcachicago.org/publications/video/2019/virgil-abloh
