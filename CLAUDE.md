# Rooted Creations Co. — Project Notes

Custom apparel and graphic design website for a local San Antonio business.

## Project context

- **Business:** Rooted Creations Co. (`@rootedcreationscotx`)
- **Location:** San Antonio, TX
- **Tagline:** "Rooted in purpose. Made to leave a mark."
- **What they sell:** Custom t-shirts, hoodies/sweatshirts, onesies/youth, accessories, custom design work for local businesses, families, and events.
- **Owner-managed:** Designs, prints, and manages inventory in-house. No Printful/Printify integration needed.
- **Payments today:** Cash and Venmo. Plan to support on-site purchases (likely Shopify Lite when volume justifies it).
- **Audience:** Local San Antonio businesses, families, and shoppers.
- **Tone:** Professional, creative, customer-oriented. Local, clean, and custom.

## Brand voice — do's and don'ts

- **Brand pillars:** **Custom** (made for you) · **Local** (San Antonio handprinted) · **Quality** (premium materials, made with care).
- **Do not claim** "original designs only," "no template work," "every design hand-sketched from scratch," or anything implying artist-pure originality. AI is part of the design toolkit. Lean into *customization for the customer*, not *originality of the designer*.
- **Do emphasize**: custom work for local businesses, families, and events; local pride; quality of materials and printing; care of the process.

## Files

- `index.html` — Single-file homepage demonstrating the full design system (hero, shop grid, categories, custom work pitch, process, story, newsletter CTA, footer).
- `wireframe.txt` — ASCII wireframe of the homepage layout.

## Design system (as built)

- **Palette:**
  - `--bone` `#ECE5D6` (background)
  - `--cream` `#F7F1E3` (highlight)
  - `--ink` `#14110E` (primary text / dark blocks)
  - `--clay` `#B14A23` (accent — terracotta, nods to SA / Texas earth)
  - `--sage` `#5B6B4D` (secondary accent)
- **Typography:**
  - Display: **Big Shoulders Display** (900) — heritage condensed sans
  - Editorial accent: **Instrument Serif** italic — refined counterpoint
  - Mono: **JetBrains Mono** (500) — labels, eyebrows, meta
- **Texture:** Subtle SVG paper-grain noise overlay, multiplied at ~5.5% opacity.
- **Motifs:** Rotating circular seal, hairline rules, numbered section indices (01 / 02 / ...), ✺ star separator, hand-drawn SVG product mockups.

## When working on this project

- Keep the heritage-workshop / editorial aesthetic — do not drift toward generic SaaS or AI-default look.
- Product images are placeholder SVGs; swap with real photography when available.
- When adding e-commerce, prefer **Shopify** or **Squarespace Commerce** (owner self-manages, accepts cards). Don't build a custom backend unless explicitly requested.
- Pages worth adding next: Shop (PLP), Product detail (PDP), Custom Work intake form, About, Cart/Checkout mockup.

---

DISTILLED_AESTHETICS_PROMPT = """
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Interpret creatively and make unexpected choices that feel genuinely designed for the context. Vary between light and dark themes, different fonts, different aesthetics. You still tend to converge on common choices (Space Grotesk, for example) across generations. Avoid this: it is critical that you think outside the box!
</frontend_aesthetics>
"""
