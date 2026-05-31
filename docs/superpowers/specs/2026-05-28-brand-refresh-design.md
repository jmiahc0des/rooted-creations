# Brand refresh: real logo, typography update, designs gallery, pricing

**Date:** 2026-05-28
**Owner:** Jeremiah
**Status:** Approved (brainstorm), ready for implementation plan

## Overview

The current v2 site uses a placeholder hand-drawn seal and the Instrument Serif italic. The brand actually has:

- A real four-variant circular seal (`rooted_creations_co.svg`).
- A loud, vibrant design portfolio (11 designs captured from Instagram — Spurs, San Antonio, Texas, Hispanic-culture themes).
- A published pricing list with 6 product types and a custom-work option (IG post IMG_0796).

This refresh swaps the placeholder seal for the real one (with a stamp-on-load + slow-rotation animation), tightens the typography toward a heritage-with-fiesta-accent voice, adds a dedicated `/designs` lookbook page, surfaces pricing on `/shop` and the homepage, and shows accepted payment methods in the footer.

## Goals

1. Replace every placeholder seal usage with the real brand mark.
2. Animate the hero seal with a stamp-press entrance settling into a slow rotation pivoted on the star/snowflake center.
3. Update typography to Direction A (Heritage + Fiesta accent): keep Big Shoulders, swap Instrument Serif for Lobster, add Bowlby One.
4. Add `/designs` lookbook with all 11 designs.
5. Add a pricing block to `/shop` and a pricing teaser to the home page.
6. Show accepted payment methods in the sitewide footer.
7. Stay within the heritage-editorial frame (per `CLAUDE.md`) — no drift toward generic SaaS.

## Non-goals

- E-commerce / checkout (per CLAUDE.md).
- Per-design detail pages (e.g., `/designs/[slug]`) — static grid only.
- CMS integration — designs and pricing live as static TypeScript data files.
- Instagram embeds — we host cropped design images ourselves.
- Adding new product photos for the Shop PLP (out of scope for this refresh).

## Decisions (locked in brainstorm)

| Topic | Decision |
|---|---|
| Typography | **Direction A · Heritage + Fiesta accent** (Big Shoulders 900 + Lobster + Bowlby One + JetBrains Mono) |
| Logo source | The 4-variant `rooted_creations_co.svg`, split into standalone files (already done — see Assets) |
| Logo animation (hero only) | Stamp 1.4s overshoot → 40s/turn slow rotation, infinite. `transform-origin: 50% 50%`. |
| Logo usage | Replace **every** existing usage of the `Seal` component. Animation runs in the hero only; nav and footer use the static seal. |
| Information architecture | **Hybrid (Option C)**: home gets teasers; `/designs` is a new lookbook page; pricing block lives on `/shop`. |
| Nav | Home · Shop · Designs (new) · Custom · About · Contact (6 items) |
| `/designs` UX | Static responsive grid of all 12 designs. No lightbox, no per-design URLs. CTA at bottom points to `/custom`. |
| Payment methods | "We accept · Cash · Venmo" line in sitewide footer. |
| Pricing data | 6 items: Tees $15 · Polos $20 · Youth/Toddler/Onesie $10 · Hoodies $30 · Joggers $15 · Aprons $15. Custom = DM/email. |

## Information architecture

### `/` (Home) — modified

| Section | Status | Notes |
|---|---|---|
| Hero | Modified | Real seal + stamp/rotate animation; typography updated to Direction A |
| Categories | Unchanged | |
| **Pricing preview** | **New** | 4 product cards w/ prices; "See full pricing →" links to `/shop#pricing` |
| **Designs teaser** | **New** | First 6 of 11 designs; "See all 11 →" links to `/designs` |
| Process | Unchanged | |
| Custom teaser | Unchanged | |
| About teaser | Unchanged | |
| Newsletter | Unchanged | |

### `/designs` (new page)

- Header strip — page title (e.g., "Designs · A Selection") + tagline + mono dateline.
- `<DesignsGrid />` (no `limit`) — static responsive grid of all 11 designs.
- Footer CTA — "Want one of these on a tee? → Custom Work".

### `/shop` — modified

- Existing PLP at top (unchanged).
- New `<PricingBlock>` section appended (or sidebar on wide screens) at anchor `#pricing` so the home teaser can deep-link.
- Custom-work line in the block: "Custom design? DM / Email" linking to `/custom`.

### Sitewide

- **Nav** — add `Designs` link (between `Shop` and `Custom`).
- **Footer** — add `<PaymentLine />` inline ("We accept · Cash · Venmo", mono, small).

## Components

### New

| Component | Purpose | Used in |
|---|---|---|
| `PricingBlock.tsx` | 6 product types + prices + custom note. Props: `variant?: 'full' \| 'teaser'` (teaser = 4 items + link; full = all 6 + custom note). | `/shop` (full), home pricing preview (teaser) |
| `DesignCard.tsx` | Single design tile — image + caption (+ optional theme tag) | `DesignsGrid` |
| `DesignsGrid.tsx` | Wraps `DesignCard`s. Props: `limit?: number` (omit on `/designs`, set to 6 on home), `ctaHref?: string` (e.g. `/designs` for home teaser, `/custom` for `/designs` page bottom) | `/designs` (no limit), home (limit 6) |
| `PaymentLine.tsx` | Small mono "We accept · ..." strip | `Footer` |

### Modified

| Component | Change |
|---|---|
| `Seal.tsx` | Gut and rewrite. New props: `size: number`, `variant: 'dark' \| 'light' \| 'blue' \| 'coral'`, `animated?: boolean`. Renders `/logos/rooted-<variant>.svg` via inline `<svg>` or `<img>`. When `animated`, applies stamp+rotate CSS. |
| `Hero.tsx` | Use `<Seal variant="dark" animated />`. Replace Instrument Serif italic spans with Lobster spans (`.script` class). |
| `Nav.tsx` | Static `<Seal variant="dark" size={32} />` next to wordmark. Add `Designs` link. |
| `Footer.tsx` | Static `<Seal>` in brand block. Embed `<PaymentLine />`. |
| `app/fonts.ts` | Remove `Instrument_Serif`. Add `Lobster` (single weight 400) and `Bowlby_One` (single weight 400). Variables: `--font-script`, `--font-chunky`. |
| `styles/tokens.css` | Remove `--font-instrument`. Add `--font-script: var(--font-lobster)` and `--font-chunky: var(--font-bowlby)`. |
| `styles/globals.css` | Audit any remaining `Instrument_Serif` references; remove. |
| Shop page (`app/shop/page.tsx`) | Append `<PricingBlock />` at the bottom with `id="pricing"`. |

## Data

### `src/data/designs.ts`

```ts
export type Design = {
  id: string;
  slug: string;
  name: string;
  image: string;      // e.g. '/images/designs/wemby-alien.png'
  caption: string;
  theme?: 'spurs' | 'sa' | 'texas' | 'hispanic';
};

export const designs: Design[] = [
  { id: 'd01', slug: 'spurs-palm', name: 'Spurs × Palm Trees',     image: '/images/designs/spurs-palm.png',     caption: 'Sunset Spurs', theme: 'spurs' },
  { id: 'd02', slug: 'shes-from-texas', name: "She's from Texas",  image: '/images/designs/shes-from-texas.png', caption: 'I can tell.', theme: 'texas' },
  { id: 'd03', slug: 'crazy-hispanic-fan', name: 'Crazy Hispanic Fan', image: '/images/designs/crazy-hispanic-fan.png', caption: 'Papel picado + Spurs', theme: 'hispanic' },
  { id: 'd04', slug: 'icon-set',  name: 'Icon Set',                 image: '/images/designs/icon-set.png',  caption: 'Fox · Alien · Castle · Harp' },
  { id: 'd05', slug: 'wemby-alien', name: 'Wemby Alien',            image: '/images/designs/wemby-alien.png', caption: '#1 from the cosmos', theme: 'spurs' },
  { id: 'd06', slug: 'nombre-shut-up', name: 'Nombre, Shut Up',     image: '/images/designs/nombre-shut-up.png', caption: 'Go Spurs Go.', theme: 'spurs' },
  { id: 'd07', slug: 'elbows-up-san-anto', name: 'Elbows Up San Anto', image: '/images/designs/elbows-up.png', caption: 'Coyote graffiti', theme: 'sa' },
  { id: 'd08', slug: 'the-coyote', name: 'The Coyote',              image: '/images/designs/the-coyote.png', caption: 'Mascot tag', theme: 'sa' },
  { id: 'd09', slug: 'spurs-snoopy', name: 'Spurs × Snoopy',        image: '/images/designs/spurs-snoopy.png', caption: 'Crossover edition', theme: 'spurs' },
  { id: 'd10', slug: 'wembanyama-since-2023', name: 'Wembanyama · Since 2023', image: '/images/designs/wembanyama-2023.png', caption: 'Retro wave', theme: 'spurs' },
  { id: 'd11', slug: 'spurs-boots', name: 'Spurs Boots',            image: '/images/designs/spurs-boots.png', caption: 'Custom cowgirl illustration', theme: 'texas' },
];
```

(11 entries match the 11 source PNGs `IMG_0797–0808` minus `IMG_0800` brand-summary and `IMG_0796` pricing. Captions are first-draft and editable.)

### `src/data/pricing.ts`

```ts
export type PricingItem = { id: string; label: string; price: number; sub?: string };

export const pricing = {
  items: [
    { id: 'tee',     label: 'Adult Tees',                       price: 15 },
    { id: 'polo',    label: 'Adult Polos',                      price: 20 },
    { id: 'youth',   label: 'Youth / Toddler / Onesie',         price: 10 },
    { id: 'hoodie',  label: 'Hoodies',                          price: 30 },
    { id: 'jogger',  label: 'Joggers',                          price: 15 },
    { id: 'apron',   label: 'Aprons',                           price: 15 },
  ],
  customNote: 'Need a design? DM or email for custom work.',
  paymentMethods: ['Cash', 'Venmo'],
} as const;
```

## Asset prep

1. **Logos** — done. Four standalone files at `web/public/logos/rooted-{blue,coral,dark,light}.svg`. Source split via the script at `/tmp/split_logo3.py` (or equivalent re-runnable).
2. **Design images** — crop Instagram screenshots `IMG_0796.PNG` … `IMG_0808.PNG` to remove IG chrome. Output to `web/public/images/designs/<slug>.png` (or `.webp` if file size justifies it). This step happens as part of implementation (sips-based crop script or manual export). IMG_0796 is pricing, not a design — skip.
3. **Move source files** out of repo root once cropping is done — keep the cropped versions under `web/public/images/designs/`. The originals (`IMG_*.PNG`, `Screenshot*.png`) live at the repo root today; they don't get bundled into the static export (which only includes `web/public/`), but for tidiness they can be moved into a gitignored `assets/source/` folder. Not blocking.

## Logo animation (hero only)

```css
.seal-animated {
  transform-origin: 50% 50%;
  animation:
    stamp     1.4s cubic-bezier(.18, .89, .32, 1.28) both,
    spin-slow 40s  linear 1.4s infinite;
}
@keyframes stamp {
  0%   { transform: scale(1.6) rotate(-8deg); opacity: 0; filter: blur(3px); }
  35%  { transform: scale(1.05) rotate(2deg);  opacity: 1; filter: blur(0); }
  55%  { transform: scale(0.98) rotate(-1deg); }
  100% { transform: scale(1)    rotate(0); }
}
@keyframes spin-slow {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .seal-animated { animation: none; }
}
```

Center pivot relies on the seal's visible glyph being centered in its SVG viewBox. The four split SVGs satisfy this via their quadrant-sized viewBox plus `background-size: contain` / `object-fit: contain`.

## Typography wiring

- `app/fonts.ts` exports `lobster` (`--font-lobster`) and `bowlby` (`--font-bowlby`). `instrumentSerif` is removed.
- `styles/tokens.css`:
  - Remove `--font-instrument`.
  - Add `--font-script: var(--font-lobster)`.
  - Add `--font-chunky: var(--font-bowlby)`.
- All existing `.italic` / `.editorial` / `font-family: var(--font-instrument)` rules — audit and switch to `var(--font-script)`.
- Bowlby One is used sparingly: `PRICING` heading on `/shop`, "Custom?" lockup in pricing block, possibly the "Vol. 01" eyebrow.

## Accessibility

- `<Seal>` is `aria-hidden="true"` when decorative (hero, footer brand block). In the Nav, it's wrapped by a link to `/` with `aria-label="Rooted Creations Co., home"`.
- `<DesignCard>` `<img>` requires a descriptive `alt` (e.g., `"\"She's from Texas\" design — Texas state outline in pink glitter style"`). Captions go in a `<figcaption>` style block, not `alt`.
- All new interactive elements get visible `:focus-visible` outlines using the `--gold` ring.
- `prefers-reduced-motion: reduce` disables the hero animation.
- Focus order on `/designs` follows reading order; cards are not interactive unless we add a CTA later.

## Testing (Playwright, `web/tests/`)

| File | Assertion |
|---|---|
| `home.spec.ts` (extend) | PricingBlock (teaser variant) and DesignsGrid (limit 6) render; "See all 11 →" goes to `/designs`; pricing teaser link goes to `/shop#pricing`. |
| `designs.spec.ts` (new) | `/designs` returns 200; 11 cards render; Custom Work CTA present and links to `/custom`. |
| `shop.spec.ts` (extend) | PricingBlock renders with all 6 items, in order, with correct prices. Anchor `#pricing` scrolls into view. |
| `nav.spec.ts` (extend) | "Designs" link exists and points to `/designs`. |
| `footer.spec.ts` (extend) | PaymentLine renders "Cash · Venmo". |
| Visual smoke | Optional: post-stamp hero screenshot diff. Defer if flaky on CI. |

## Edge cases & error handling

- **Design image missing** → `<DesignCard>` shows a bone-colored placeholder block with the caption visible. No empty `<img>` boxes.
- **Reduced motion** → static logo on hero. Pricing teaser and designs grid have no motion to disable.
- **Mobile pricing block** → 2-column grid below 640px, 1 column below 380px.
- **Nav overflow (6 items)** → existing mobile drawer handles this; verify "Designs" appears in the drawer.
- **Font load failure** → `next/font` provides automatic fallbacks; Lobster failure falls back to cursive system stack, Bowlby to a heavy sans stack. No flash-of-unstyled-text mitigation beyond `display: 'swap'` (already in `fonts.ts`).
- **Static export** → all assets live under `web/public/` with `basePath` prefix applied via existing `lib/asset.ts` helper (already in use for grain.svg + product images). New logo and design paths go through the same helper.

## Out of scope

- Per-design URLs (`/designs/[slug]`).
- Lightbox / fullscreen modal on design click.
- Search / filter on `/designs`.
- E-commerce or cart.
- Adding new product photography to the Shop PLP.
- Replacing the placeholder product SVGs (`tee-rooted.svg`, etc.).
- Removing the existing `index.html` at the repo root (legacy demo, separate cleanup).

## Open questions (to resolve during implementation)

- **Design count / final list** — currently 11 from the captured IG screenshots. If more designs become available before launch, append to `src/data/designs.ts`.
- **Design captions** — first-draft captions are guesses. User can edit `src/data/designs.ts` directly after the page lands.
- **IMG_0800 brand-summary photo** — currently unused. Could be repurposed on About or as a hero background; not in scope for this refresh.
- **Tight-crop the logo SVGs?** — deferred. Current quadrant viewBoxes work for `background-size: contain`. Revisit if we ever need tight square SVGs (favicons, social cards).

## File touch list (preview for implementation plan)

```
web/src/app/fonts.ts                            (modify)
web/src/app/layout.tsx                          (modify — wire new font vars)
web/src/styles/tokens.css                       (modify)
web/src/styles/globals.css                      (audit)
web/src/components/Seal.tsx                     (rewrite)
web/src/components/Seal.module.css              (rewrite)
web/src/components/Hero.tsx                     (modify)
web/src/components/Hero.module.css              (modify)
web/src/components/Nav.tsx                      (modify)
web/src/components/Footer.tsx                   (modify)
web/src/components/PricingBlock.tsx             (new)
web/src/components/PricingBlock.module.css      (new)
web/src/components/PaymentLine.tsx              (new)
web/src/components/PaymentLine.module.css       (new)
web/src/components/DesignCard.tsx               (new)
web/src/components/DesignCard.module.css        (new)
web/src/components/DesignsGrid.tsx              (new)
web/src/components/DesignsGrid.module.css       (new)
web/src/app/page.tsx                            (modify — add PricingBlock teaser + DesignsGrid teaser)
web/src/app/shop/page.tsx                       (modify — append PricingBlock)
web/src/app/designs/page.tsx                    (new)
web/src/app/designs/page.module.css             (new)
web/src/data/designs.ts                         (new)
web/src/data/pricing.ts                         (new)
web/public/logos/rooted-{blue,coral,dark,light}.svg  (already done)
web/public/images/designs/<slug>.png            (new — from cropped IMG_0797–0808)
web/tests/home.spec.ts                          (extend)
web/tests/shop.spec.ts                          (extend)
web/tests/designs.spec.ts                       (new)
web/tests/nav.spec.ts                           (extend if it exists, else folded into home)
web/tests/footer.spec.ts                        (extend if it exists, else folded into home)
```
