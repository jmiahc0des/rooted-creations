# Brand Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Swap the placeholder seal for the real 4-variant brand mark (with stamp-then-rotate animation in the hero), shift typography to Heritage + Fiesta accent (keep Big Shoulders, swap Instrument Serif → Lobster, add Bowlby One), build a `/designs` lookbook, surface pricing on `/shop` + the home page, and add a payment-methods line to the footer.

**Architecture:** All changes live in the Next.js V2 app at `web/`. New components added to `web/src/components/`. New data files in `web/src/data/`. New route at `web/src/app/designs/`. The four extracted variant SVGs already live at `web/public/logos/`. Tests extend the existing single Playwright file `web/tests/smoke.spec.ts`. Static export config and `basePath` plumbing are already in place.

**Tech Stack:** Next.js 16.2.6 (V2), React 19, TypeScript 5, CSS Modules, `next/font/google`, Playwright (e2e).

---

## Preflight (do this before Task 1)

- [ ] **Read `web/AGENTS.md`** — it warns that this is Next.js V2 and your training data may be wrong. Skim `web/node_modules/next/dist/docs/` for current routing + font conventions before touching code.
- [ ] **Verify dev server starts cleanly:** `cd web && npm install && npm run dev` — confirm http://localhost:3000 loads the current home page. Stop the server when done.
- [ ] **Confirm baseline tests pass:** `cd web && npm run test:e2e` — capture the green baseline so you can detect regressions.
- [ ] **Confirm the four logo SVGs exist:** `ls web/public/logos/rooted-{blue,coral,dark,light}.svg` — these were already split during brainstorm. If missing, re-run `/tmp/split_logo3.py` from the brainstorm to regenerate.

---

## Task 1: Add Lobster + Bowlby One fonts, remove Instrument Serif

**Files:**
- Modify: `web/src/app/fonts.ts`
- Modify: `web/src/app/layout.tsx`

- [ ] **Step 1: Replace `web/src/app/fonts.ts`** with the new font set.

```ts
import { Big_Shoulders, Lobster, Bowlby_One, JetBrains_Mono } from 'next/font/google';

export const bigShoulders = Big_Shoulders({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-big-shoulders',
});

export const lobster = Lobster({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-lobster',
});

export const bowlby = Bowlby_One({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-bowlby',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
});
```

- [ ] **Step 2: Update `web/src/app/layout.tsx`** import + html className to use the new font variables.

Replace the import line:

```ts
import { bigShoulders, instrumentSerif, jetbrains } from './fonts';
```

with:

```ts
import { bigShoulders, lobster, bowlby, jetbrains } from './fonts';
```

Replace the html className:

```tsx
<html lang="en" className={`${bigShoulders.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}>
```

with:

```tsx
<html lang="en" className={`${bigShoulders.variable} ${lobster.variable} ${bowlby.variable} ${jetbrains.variable}`}>
```

- [ ] **Step 3: Verify TypeScript compiles.**

Run: `cd web && npx tsc --noEmit`
Expected: no errors. (You may see warnings about unused imports elsewhere — those get cleared in Task 3.)

- [ ] **Step 4: Verify dev build runs.**

Run: `cd web && npm run dev`, open http://localhost:3000, confirm page loads with no console errors. Stop the server.

- [ ] **Step 5: Commit.**

```bash
git add web/src/app/fonts.ts web/src/app/layout.tsx
git commit -m "feat(fonts): swap Instrument Serif for Lobster, add Bowlby One"
```

---

## Task 2: Rename `--font-serif` → `--font-script`, add `--font-chunky` in tokens.css

**Files:**
- Modify: `web/src/styles/tokens.css`

- [ ] **Step 1: Replace the TYPE section in `web/src/styles/tokens.css`.**

Find the block:

```css
  /* ───── TYPE ───── */
  --font-display: var(--font-big-shoulders), 'Arial Black', sans-serif;
  --font-serif: var(--font-instrument), Georgia, serif;
  --font-mono: var(--font-jetbrains), 'Courier New', monospace;
```

Replace with:

```css
  /* ───── TYPE ───── */
  --font-display: var(--font-big-shoulders), 'Arial Black', sans-serif;
  --font-script: var(--font-lobster), 'Brush Script MT', cursive;
  --font-chunky: var(--font-bowlby), 'Impact', sans-serif;
  --font-mono: var(--font-jetbrains), 'Courier New', monospace;
```

- [ ] **Step 2: Don't commit yet — Task 3 cleans up the now-broken `var(--font-serif)` references.**

---

## Task 3: Replace every `var(--font-serif)` reference with `var(--font-script)`

**Files (sweep):**
- Modify: `web/src/styles/globals.css`
- Modify: `web/src/components/Hero.module.css`
- Modify: `web/src/app/page.tsx`
- Modify: `web/src/app/shop/page.tsx`
- Modify: any other file flagged by the grep below

- [ ] **Step 1: Find every reference to the old variable.**

Run: `cd web && grep -rn "font-serif\|font-instrument" src/`
Expected: a list of files that reference `--font-serif` or `--font-instrument`. Note the count.

- [ ] **Step 2: Replace `--font-serif` with `--font-script` in CSS files.**

In `web/src/styles/globals.css`:
- Line ~8: replace `font-family: var(--font-serif);` with `font-family: var(--font-script);`
- Line ~48-50: in the `.serif-i { font-family: var(--font-serif); ... }` rule, replace with `.serif-i { font-family: var(--font-script); ... }`.

In `web/src/components/Hero.module.css`:
- Both occurrences on lines ~66-67 and ~83-84: replace `font-family: var(--font-serif);` with `font-family: var(--font-script);`.

In `web/src/app/page.tsx`:
- Every inline `style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}` → replace `var(--font-serif)` with `var(--font-script)`. There are 2 occurrences (the `em` in the "Currently Rooted" and "Five ways to wear it" SectionHead titles).

In `web/src/app/shop/page.tsx`:
- One occurrence in the SectionHead title `<em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>` → swap to `var(--font-script)`.

- [ ] **Step 3: Search for any stragglers.**

Run: `cd web && grep -rn "font-serif\|font-instrument" src/`
Expected: **no output**. If anything is left, fix it before moving on.

- [ ] **Step 4: Verify dev build runs and italic spans render in Lobster.**

Run: `cd web && npm run dev`. Open http://localhost:3000 and visually confirm the "Rooted" italic on the home page now renders in **Lobster** (curly script), not Instrument Serif. Also confirm Shop page title. Stop the server.

- [ ] **Step 5: Commit.**

```bash
git add web/src/styles/tokens.css web/src/styles/globals.css web/src/components/Hero.module.css web/src/app/page.tsx web/src/app/shop/page.tsx
git commit -m "refactor(fonts): rename --font-serif to --font-script (now Lobster), add --font-chunky"
```

---

## Task 4: Crop design PNGs into `web/public/images/designs/`

**Files:**
- Create: `scripts/crop-designs.sh` (one-shot script — can be deleted after)
- Create: `web/public/images/designs/*.png` (11 files)

**Context:** The 11 source PNGs live at the repo root (`IMG_0797.PNG` … `IMG_0808.PNG`, skipping `IMG_0800`). Each is an Instagram screenshot at roughly 1290×2796 (iPhone) with the design centered in the middle ~60% of the image. We need to crop out the IG chrome.

- [ ] **Step 1: Inspect one image to find the crop region.**

Run: `sips -g pixelHeight -g pixelWidth IMG_0797.PNG`
Capture the actual width/height (likely 1290×2796 or similar).

- [ ] **Step 2: Write a shell script that crops all 11 sources.**

Create `scripts/crop-designs.sh`:

```bash
#!/usr/bin/env bash
# Crops Instagram screenshots to just the design content.
# Each source is ~1290×2796; design content sits roughly y=300..2200, x=0..1290.
# Adjust CROP_Y_OFFSET and CROP_HEIGHT if first output looks wrong.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/web/public/images/designs"
mkdir -p "$OUT"

declare -A MAP=(
  [IMG_0797.PNG]=spurs-palm.png
  [IMG_0798.PNG]=shes-from-texas.png
  [IMG_0799.PNG]=crazy-hispanic-fan.png
  [IMG_0801.PNG]=icon-set.png
  [IMG_0802.PNG]=wemby-alien.png
  [IMG_0803.PNG]=nombre-shut-up.png
  [IMG_0804.PNG]=elbows-up.png
  [IMG_0805.PNG]=the-coyote.png
  [IMG_0806.PNG]=spurs-snoopy.png
  [IMG_0807.PNG]=wembanyama-2023.png
  [IMG_0808.PNG]=spurs-boots.png
)

CROP_H=1900   # tweak after inspecting first output
CROP_W=1290   # full IG width

for src in "${!MAP[@]}"; do
  dst="${MAP[$src]}"
  if [[ ! -f "$ROOT/$src" ]]; then
    echo "skip: $src not found" >&2; continue
  fi
  # sips -c heightPx widthPx crops from the center.
  cp "$ROOT/$src" "$OUT/$dst"
  sips -c "$CROP_H" "$CROP_W" "$OUT/$dst" >/dev/null
  echo "wrote $OUT/$dst"
done
```

- [ ] **Step 3: Run it.**

```bash
chmod +x scripts/crop-designs.sh
./scripts/crop-designs.sh
ls -la web/public/images/designs/
```

Expected: 11 PNG files written.

- [ ] **Step 4: Visually inspect one cropped output** (e.g., `open web/public/images/designs/spurs-palm.png`).

If IG chrome (top status bar, bottom comment block) is still visible, adjust `CROP_H` smaller and re-run. If the design is cut off at top/bottom, increase `CROP_H`. Iterate once or twice until you're happy.

- [ ] **Step 5: Commit cropped designs.**

```bash
git add scripts/crop-designs.sh web/public/images/designs/
git commit -m "chore(designs): crop 11 Instagram source PNGs into public/images/designs/"
```

---

## Task 5: Create data files (pricing + designs)

**Files:**
- Create: `web/src/data/pricing.ts`
- Create: `web/src/data/designs.ts`
- Test: `web/src/data/pricing.test.ts` (no — we already have a Playwright e2e setup; skip unit tests for data and validate via Playwright in later tasks)

- [ ] **Step 1: Create `web/src/data/pricing.ts`.**

```ts
export type PricingItem = {
  id: string;
  label: string;
  price: number;
  /** Optional secondary line shown under the label */
  sub?: string;
};

export const pricing = {
  items: [
    { id: 'tee',    label: 'Adult Tees',                price: 15 },
    { id: 'polo',   label: 'Adult Polos',               price: 20 },
    { id: 'youth',  label: 'Youth / Toddler / Onesie',  price: 10 },
    { id: 'hoodie', label: 'Hoodies',                   price: 30 },
    { id: 'jogger', label: 'Joggers',                   price: 15 },
    { id: 'apron',  label: 'Aprons',                    price: 15 },
  ] satisfies PricingItem[],
  customNote: 'Need a design? DM or email for custom work.',
  paymentMethods: ['Cash', 'Venmo'] as const,
} as const;
```

- [ ] **Step 2: Create `web/src/data/designs.ts`.**

```ts
export type DesignTheme = 'spurs' | 'sa' | 'texas' | 'hispanic';

export type Design = {
  id: string;
  slug: string;
  name: string;
  /** Absolute path under /public (no basePath; consumers should pass to asset()). */
  image: string;
  caption: string;
  theme?: DesignTheme;
};

export const designs: Design[] = [
  { id: 'd01', slug: 'spurs-palm',          name: 'Spurs × Palm Trees',  image: '/images/designs/spurs-palm.png',          caption: 'Sunset Spurs',                          theme: 'spurs' },
  { id: 'd02', slug: 'shes-from-texas',     name: "She's from Texas",    image: '/images/designs/shes-from-texas.png',     caption: 'I can tell.',                           theme: 'texas' },
  { id: 'd03', slug: 'crazy-hispanic-fan',  name: 'Crazy Hispanic Fan',  image: '/images/designs/crazy-hispanic-fan.png',  caption: 'Papel picado + Spurs',                  theme: 'hispanic' },
  { id: 'd04', slug: 'icon-set',            name: 'Icon Set',            image: '/images/designs/icon-set.png',            caption: 'Fox · Alien · Castle · Harp' },
  { id: 'd05', slug: 'wemby-alien',         name: 'Wemby Alien',         image: '/images/designs/wemby-alien.png',         caption: '#1 from the cosmos',                    theme: 'spurs' },
  { id: 'd06', slug: 'nombre-shut-up',      name: 'Nombre, Shut Up',     image: '/images/designs/nombre-shut-up.png',      caption: 'Go Spurs Go.',                          theme: 'spurs' },
  { id: 'd07', slug: 'elbows-up',           name: 'Elbows Up San Anto',  image: '/images/designs/elbows-up.png',           caption: 'Coyote graffiti',                       theme: 'sa' },
  { id: 'd08', slug: 'the-coyote',          name: 'The Coyote',          image: '/images/designs/the-coyote.png',          caption: 'Mascot tag',                            theme: 'sa' },
  { id: 'd09', slug: 'spurs-snoopy',        name: 'Spurs × Snoopy',      image: '/images/designs/spurs-snoopy.png',        caption: 'Crossover edition',                     theme: 'spurs' },
  { id: 'd10', slug: 'wembanyama-2023',     name: 'Wembanyama · Since 2023', image: '/images/designs/wembanyama-2023.png', caption: 'Retro wave',                           theme: 'spurs' },
  { id: 'd11', slug: 'spurs-boots',         name: 'Spurs Boots',         image: '/images/designs/spurs-boots.png',         caption: 'Custom cowgirl illustration',           theme: 'texas' },
];
```

- [ ] **Step 3: Verify TypeScript compiles.**

Run: `cd web && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add web/src/data/pricing.ts web/src/data/designs.ts
git commit -m "feat(data): add pricing.ts (6 items + payment methods) and designs.ts (11 entries)"
```

---

## Task 6: Rewrite the `<Seal>` component to use the real SVGs + stamp/rotate animation

**Files:**
- Modify: `web/src/components/Seal.tsx`
- Modify: `web/src/components/Seal.module.css`

- [ ] **Step 1: Replace `web/src/components/Seal.tsx` with the new implementation.**

```tsx
import { asset } from '@/lib/asset';
import styles from './Seal.module.css';

export type SealVariant = 'dark' | 'light' | 'blue' | 'coral';

type Props = {
  /** Pixel size of the rendered seal. Defaults to 130. */
  size?: number;
  /** Which color variant to render. Defaults to 'dark' (outline-on-bone). */
  variant?: SealVariant;
  /** When true, applies the stamp-then-rotate animation. */
  animated?: boolean;
  /** Optional accessible label. If omitted, the seal is treated as decorative. */
  label?: string;
};

export function Seal({ size = 130, variant = 'dark', animated = false, label }: Props) {
  const cls = [styles.seal, animated ? styles.animated : ''].filter(Boolean).join(' ');
  const src = asset(`/logos/rooted-${variant}.svg`);
  const ariaProps = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <span
      className={cls}
      style={{ width: size, height: size, backgroundImage: `url(${src})` }}
      {...ariaProps}
    />
  );
}
```

- [ ] **Step 2: Replace `web/src/components/Seal.module.css` with the new styles.**

```css
.seal {
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  transform-origin: 50% 50%;
}

.animated {
  animation:
    stamp 1.4s cubic-bezier(.18, .89, .32, 1.28) both,
    spin-slow 40s linear 1.4s infinite;
}

@keyframes stamp {
  0%   { transform: scale(1.6) rotate(-8deg);  opacity: 0; filter: blur(3px); }
  35%  { transform: scale(1.05) rotate(2deg);  opacity: 1; filter: blur(0); }
  55%  { transform: scale(0.98) rotate(-1deg); }
  100% { transform: scale(1)    rotate(0);     opacity: 1; }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .animated { animation: none; }
}
```

- [ ] **Step 3: Verify TypeScript and dev build.**

Run: `cd web && npx tsc --noEmit && npm run dev`
Open http://localhost:3000 — the hero should now show the real circular seal where the old placeholder was. It will be static for now (Hero hasn't been updated to pass `animated`); animation comes in Task 7. Stop the server.

- [ ] **Step 4: Commit.**

```bash
git add web/src/components/Seal.tsx web/src/components/Seal.module.css
git commit -m "feat(seal): swap placeholder SVG for real brand mark + stamp/rotate animation"
```

---

## Task 7: Wire the animated seal into `Hero.tsx`

**Files:**
- Modify: `web/src/components/Hero.tsx`

- [ ] **Step 1: Update the Seal usage in `web/src/components/Hero.tsx`.**

Find:

```tsx
<div className={styles.sealWrap}><Seal size={130} /></div>
```

Replace with:

```tsx
<div className={styles.sealWrap}>
  <Seal size={130} variant="dark" animated label="Rooted Creations Co." />
</div>
```

- [ ] **Step 2: Verify the animation runs.**

Run: `cd web && npm run dev`. Open http://localhost:3000. The seal should stamp in on load (1.4s), then slow-rotate. Visually confirm the pivot is at the star/snowflake center (not drifting). Stop the server.

- [ ] **Step 3: Sanity-check reduced motion.**

In the browser dev tools, emulate "prefers-reduced-motion: reduce" (Rendering tab → Emulate CSS media feature) and reload. The seal should appear static (no stamp, no rotation).

- [ ] **Step 4: Commit.**

```bash
git add web/src/components/Hero.tsx
git commit -m "feat(hero): use real animated seal (stamp + slow rotation)"
```

---

## Task 8: Add the seal + "Designs" link to the Nav

**Files:**
- Modify: `web/src/components/Nav.tsx`
- Modify: `web/src/components/Nav.module.css`

- [ ] **Step 1: Add a small static Seal to the brand block in `web/src/components/Nav.tsx`.**

Find:

```tsx
<Link href="/" className={styles.brand}>
  <span className={styles.brandName}>Rooted Creations Co.</span>
  <span className={styles.brandSub}>SA · TX · MADE WITH PURPOSE</span>
</Link>
```

Replace with:

```tsx
<Link href="/" className={styles.brand} aria-label="Rooted Creations Co., home">
  <Seal size={36} variant="dark" />
  <span className={styles.brandText}>
    <span className={styles.brandName}>Rooted Creations Co.</span>
    <span className={styles.brandSub}>SA · TX · MADE WITH PURPOSE</span>
  </span>
</Link>
```

Add the import at the top:

```tsx
import { Seal } from './Seal';
```

- [ ] **Step 2: Add a Designs link to the left nav cluster.**

Find:

```tsx
<div className={`${styles.navLeft} ${open ? styles.navMobileOpen : ''}`}>
  <Link href="/shop" className={styles.link} onClick={() => setOpen(false)}>Shop</Link>
  <Link href="/custom" className={styles.link} onClick={() => setOpen(false)}>Custom Work</Link>
  <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>Story</Link>
</div>
```

Replace with:

```tsx
<div className={`${styles.navLeft} ${open ? styles.navMobileOpen : ''}`}>
  <Link href="/shop" className={styles.link} onClick={() => setOpen(false)}>Shop</Link>
  <Link href="/designs" className={styles.link} onClick={() => setOpen(false)}>Designs</Link>
  <Link href="/custom" className={styles.link} onClick={() => setOpen(false)}>Custom Work</Link>
  <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>Story</Link>
</div>
```

- [ ] **Step 3: Update `web/src/components/Nav.module.css`** so the brand block uses flex with the seal and text side-by-side. Add this rule (or update if it exists):

```css
.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}
.brandText {
  display: inline-flex;
  flex-direction: column;
  line-height: 1.1;
}
```

(The existing `.brandName` / `.brandSub` rules should already handle typography — only update if the layout looks wrong.)

- [ ] **Step 4: Visually verify in the browser.**

Run: `cd web && npm run dev`. Open http://localhost:3000 — confirm the small static seal appears next to "Rooted Creations Co." in the top nav, and that "Designs" appears between "Shop" and "Custom Work". Click "Designs" — it will 404 (page comes in Task 14). That's expected. Stop the server.

- [ ] **Step 5: Commit.**

```bash
git add web/src/components/Nav.tsx web/src/components/Nav.module.css
git commit -m "feat(nav): add brand seal + Designs link"
```

---

## Task 9: Add the seal to the Footer

**Files:**
- Modify: `web/src/components/Footer.tsx`
- Modify: `web/src/components/Footer.module.css` (only if layout needs adjustment)

- [ ] **Step 1: Add the Seal above the wordmark in the brand column.**

Find:

```tsx
<div className={styles.brand}>
  <div className={styles.mark}>
    Rooted<br />Creations <span className={styles.italic}>Co.</span>
  </div>
  <p className={styles.tag}>Custom apparel &amp; graphic design. Handprinted in San Antonio, Texas.</p>
```

Replace with:

```tsx
<div className={styles.brand}>
  <Seal size={56} variant="dark" />
  <div className={styles.mark}>
    Rooted<br />Creations <span className={styles.italic}>Co.</span>
  </div>
  <p className={styles.tag}>Custom apparel &amp; graphic design. Handprinted in San Antonio, Texas.</p>
```

Add the import:

```tsx
import { Seal } from './Seal';
```

- [ ] **Step 2: If the seal crowds the mark, add `margin-bottom: 16px;` to the seal via a wrapping class, or just rely on the existing column gap.** Inspect in the browser and tweak only if needed.

- [ ] **Step 3: Visually verify in the browser.**

Run: `cd web && npm run dev`. Open any page, scroll to footer — confirm a small seal renders above the wordmark. Stop the server.

- [ ] **Step 4: Commit.**

```bash
git add web/src/components/Footer.tsx web/src/components/Footer.module.css
git commit -m "feat(footer): add brand seal to footer brand column"
```

---

## Task 10: Create `PaymentLine` and embed it in the Footer

**Files:**
- Create: `web/src/components/PaymentLine.tsx`
- Create: `web/src/components/PaymentLine.module.css`
- Modify: `web/src/components/Footer.tsx`

- [ ] **Step 1: Create `web/src/components/PaymentLine.tsx`.**

```tsx
import { pricing } from '@/data/pricing';
import styles from './PaymentLine.module.css';

export function PaymentLine() {
  return (
    <p className={`mono ${styles.line}`}>
      We accept{' '}
      {pricing.paymentMethods.map((m, i) => (
        <span key={m}>
          {i > 0 ? ' · ' : ' · '}
          <span className={styles.method}>{m}</span>
        </span>
      ))}
    </p>
  );
}
```

- [ ] **Step 2: Create `web/src/components/PaymentLine.module.css`.**

```css
.line {
  font-size: 0.72rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--cream-dim);
  margin: 0;
}
.method {
  color: var(--cream);
  font-weight: 500;
}
```

- [ ] **Step 3: Add `<PaymentLine />` to the Footer bottom strip.**

In `web/src/components/Footer.tsx`, find:

```tsx
<div className={styles.bottom}>
  <span className="mono">© 2026 Rooted Creations Co.</span>
  <span className="mono">Made in San Antonio, TX · 29.4241°N 98.4936°W</span>
</div>
```

Replace with:

```tsx
<div className={styles.bottom}>
  <span className="mono">© 2026 Rooted Creations Co.</span>
  <PaymentLine />
  <span className="mono">Made in San Antonio, TX · 29.4241°N 98.4936°W</span>
</div>
```

Add the import:

```tsx
import { PaymentLine } from './PaymentLine';
```

- [ ] **Step 4: Visually verify** the new payment line appears in the footer bottom strip.

Run: `cd web && npm run dev`. Scroll to footer on any page; confirm "WE ACCEPT · CASH · VENMO" renders between the copyright and the location line. Stop the server.

- [ ] **Step 5: Commit.**

```bash
git add web/src/components/PaymentLine.tsx web/src/components/PaymentLine.module.css web/src/components/Footer.tsx
git commit -m "feat(footer): add PaymentLine (Cash · Venmo)"
```

---

## Task 11: Create the `PricingBlock` component (full + teaser variants)

**Files:**
- Create: `web/src/components/PricingBlock.tsx`
- Create: `web/src/components/PricingBlock.module.css`

- [ ] **Step 1: Create `web/src/components/PricingBlock.tsx`.**

```tsx
import Link from 'next/link';
import { pricing } from '@/data/pricing';
import styles from './PricingBlock.module.css';

type Props = {
  /** 'full' renders all items + custom note. 'teaser' renders first 4 + a See-all link. */
  variant?: 'full' | 'teaser';
};

export function PricingBlock({ variant = 'full' }: Props) {
  const items = variant === 'teaser' ? pricing.items.slice(0, 4) : pricing.items;

  return (
    <section className={styles.block} id={variant === 'full' ? 'pricing' : undefined}>
      <div className={styles.head}>
        <span className={`mono ${styles.eyebrow}`}>Pricing</span>
        <h2 className={styles.title}>PRICING</h2>
        <p className={styles.sub}>Quality prints. Great prices.</p>
      </div>

      <ul className={styles.grid}>
        {items.map((it) => (
          <li key={it.id} className={styles.item}>
            <span className={styles.label}>{it.label}</span>
            <span className={styles.price}>${it.price}</span>
            <span className={`mono ${styles.each}`}>each</span>
          </li>
        ))}
      </ul>

      {variant === 'full' ? (
        <p className={styles.custom}>
          {pricing.customNote}{' '}
          <Link href="/custom" className={styles.customLink}>Start a project →</Link>
        </p>
      ) : (
        <Link href="/shop#pricing" className={styles.seeAll}>See full pricing →</Link>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Create `web/src/components/PricingBlock.module.css`.**

```css
.block {
  padding: var(--space-9) var(--space-5);
  background: var(--cream);
  color: var(--ink);
}

.head {
  max-width: 720px;
  margin: 0 auto var(--space-7);
  text-align: center;
}
.eyebrow {
  display: block;
  color: var(--brick);
  margin-bottom: var(--space-3);
  font-size: 0.7rem;
  letter-spacing: 0.2em;
}
.title {
  font-family: var(--font-chunky);
  font-size: clamp(3rem, 8vw, 5.5rem);
  line-height: 1;
  letter-spacing: -0.005em;
  margin: 0;
  color: var(--ink);
}
.sub {
  font-family: var(--font-script);
  font-size: clamp(1.4rem, 3vw, 2rem);
  margin: var(--space-3) 0 0;
  color: var(--brick);
}

.grid {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1100px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(6, 1fr); }
}
@media (max-width: 380px) {
  .grid { grid-template-columns: 1fr; }
}

.item {
  border: 1px solid var(--ink);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: var(--cream);
}
.label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  margin-bottom: var(--space-3);
}
.price {
  font-family: var(--font-chunky);
  font-size: 2.5rem;
  line-height: 1;
  color: var(--brick);
  margin-bottom: var(--space-2);
}
.each {
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  color: var(--cream-dim);
  color: rgba(12, 10, 7, 0.6);
}

.custom {
  margin: var(--space-7) auto 0;
  max-width: 720px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  line-height: 1.6;
}
.customLink {
  color: var(--brick);
  font-weight: 500;
}
.customLink:hover { text-decoration: underline; }

.seeAll {
  display: block;
  margin: var(--space-6) auto 0;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--brick);
}
.seeAll:hover { text-decoration: underline; }
```

- [ ] **Step 3: Verify TypeScript compiles.**

Run: `cd web && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add web/src/components/PricingBlock.tsx web/src/components/PricingBlock.module.css
git commit -m "feat(pricing): add PricingBlock component (full + teaser variants)"
```

---

## Task 12: Integrate PricingBlock into `/shop` (full) and home (teaser)

**Files:**
- Modify: `web/src/app/shop/page.tsx`
- Modify: `web/src/app/page.tsx`

- [ ] **Step 1: Append PricingBlock to `/shop`.**

In `web/src/app/shop/page.tsx`, find the closing `</main>` and add `<PricingBlock />` just before it:

```tsx
import { Suspense } from 'react';
import { SectionHead } from '@/components/SectionHead';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ShopGrid } from '@/components/ShopGrid';
import { PricingBlock } from '@/components/PricingBlock';
import styles from './page.module.css';

export default function Shop() {
  return (
    <main className={styles.shop}>
      <SectionHead
        idx="01 / The Catalog"
        title={<>Everything <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>Rooted</em></>}
        aside="Custom prints in small batches. Tap a category to filter."
      />
      <Suspense fallback={null}>
        <CategoryFilter />
        <ShopGrid />
      </Suspense>
      <PricingBlock variant="full" />
    </main>
  );
}
```

- [ ] **Step 2: Add PricingBlock teaser to home page.**

In `web/src/app/page.tsx`, add the import:

```tsx
import { PricingBlock } from '@/components/PricingBlock';
```

Then add `<PricingBlock variant="teaser" />` between the Categories section and the Custom Teaser. Find:

```tsx
<section className={styles.sectionMuted}>
  <SectionHead
    idx="02 / Categories"
    ...
  />
  <Categories />
</section>

<section className={styles.customTeaser}>
```

Insert between them:

```tsx
<section className={styles.sectionMuted}>
  <SectionHead
    idx="02 / Categories"
    ...
  />
  <Categories />
</section>

<PricingBlock variant="teaser" />

<section className={styles.customTeaser}>
```

- [ ] **Step 3: Visually verify.**

Run: `cd web && npm run dev`. Open http://localhost:3000 — confirm a 4-item pricing teaser renders between Categories and Custom Teaser, with a "See full pricing →" link. Open http://localhost:3000/shop — confirm the full 6-item pricing block renders below the shop grid, with a `#pricing` anchor (click "See full pricing →" from home and verify it scrolls). Stop the server.

- [ ] **Step 4: Commit.**

```bash
git add web/src/app/shop/page.tsx web/src/app/page.tsx
git commit -m "feat(pricing): wire PricingBlock into /shop (full) and home (teaser)"
```

---

## Task 13: Create the `DesignCard` component

**Files:**
- Create: `web/src/components/DesignCard.tsx`
- Create: `web/src/components/DesignCard.module.css`

- [ ] **Step 1: Create `web/src/components/DesignCard.tsx`.**

```tsx
import type { Design } from '@/data/designs';
import { asset } from '@/lib/asset';
import styles from './DesignCard.module.css';

type Props = { design: Design };

export function DesignCard({ design }: Props) {
  return (
    <figure className={styles.card}>
      <div className={styles.imageWrap}>
        {/* Native <img> — Next/Image disabled by static export here.
            Fallback handled by browser broken-image; placeholder shown via ::after on parent. */}
        <img
          src={asset(design.image)}
          alt={`${design.name} design`}
          loading="lazy"
          className={styles.image}
        />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.name}>{design.name}</span>
        <span className={styles.tag}>{design.caption}</span>
      </figcaption>
    </figure>
  );
}
```

- [ ] **Step 2: Create `web/src/components/DesignCard.module.css`.**

```css
.card {
  margin: 0;
  display: flex;
  flex-direction: column;
  background: var(--ink-soft);
  border: 1px solid var(--hairline);
  overflow: hidden;
}
.imageWrap {
  position: relative;
  aspect-ratio: 4 / 5;
  background: var(--ink);
}
.imageWrap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--ink);
  z-index: 0;
}
.image {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.caption {
  padding: var(--space-4) var(--space-4) var(--space-5);
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.name {
  font-family: var(--font-display);
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  font-size: 1.1rem;
  color: var(--cream);
}
.tag {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
  color: var(--cream-dim);
}
```

- [ ] **Step 3: Verify TypeScript compiles.**

Run: `cd web && npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 4: Commit.**

```bash
git add web/src/components/DesignCard.tsx web/src/components/DesignCard.module.css
git commit -m "feat(designs): add DesignCard component"
```

---

## Task 14: Create the `DesignsGrid` component + home teaser integration

**Files:**
- Create: `web/src/components/DesignsGrid.tsx`
- Create: `web/src/components/DesignsGrid.module.css`
- Modify: `web/src/app/page.tsx`

- [ ] **Step 1: Create `web/src/components/DesignsGrid.tsx`.**

```tsx
import Link from 'next/link';
import { designs } from '@/data/designs';
import { DesignCard } from './DesignCard';
import styles from './DesignsGrid.module.css';

type Props = {
  /** When set, only render the first N designs. */
  limit?: number;
  /** Optional CTA link rendered after the grid. */
  cta?: { href: string; label: string };
};

export function DesignsGrid({ limit, cta }: Props) {
  const items = typeof limit === 'number' ? designs.slice(0, limit) : designs;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((d) => (
          <DesignCard key={d.id} design={d} />
        ))}
      </div>
      {cta ? (
        <Link href={cta.href} className={styles.cta}>{cta.label}</Link>
      ) : null}
    </section>
  );
}
```

- [ ] **Step 2: Create `web/src/components/DesignsGrid.module.css`.**

```css
.section {
  padding: var(--space-8) var(--space-5);
  background: var(--ink);
  color: var(--cream);
}
.grid {
  max-width: 1280px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
}
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
.cta {
  display: block;
  margin: var(--space-7) auto 0;
  max-width: 1280px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--gold);
}
.cta:hover { text-decoration: underline; }
```

- [ ] **Step 3: Add a Designs teaser to the home page.**

In `web/src/app/page.tsx`, add the import:

```tsx
import { DesignsGrid } from '@/components/DesignsGrid';
import { designs } from '@/data/designs';
```

(Importing `designs` lets us compute the count for the CTA label.)

Then, between the `<PricingBlock variant="teaser" />` and `<section className={styles.customTeaser}>`, insert:

```tsx
<section className={styles.designsTeaser}>
  <SectionHead
    idx="03 / Designs"
    title={<>From the <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>vault.</em></>}
    aside="A selection of designs printed for customers, teams, and one-off requests."
  />
  <DesignsGrid limit={6} cta={{ href: '/designs', label: `See all ${designs.length} →` }} />
</section>
```

- [ ] **Step 4: Add a tiny CSS rule in `web/src/app/page.module.css`** so the teaser has neutral background. Add at the end of the file:

```css
.designsTeaser { background: var(--ink); }
```

- [ ] **Step 5: Visually verify.**

Run: `cd web && npm run dev`. Open http://localhost:3000 — confirm the new Designs teaser renders with 6 design cards, the "From the vault" headline, and a "See all 11 →" link. The link will 404 (page comes in Task 15). Stop the server.

- [ ] **Step 6: Commit.**

```bash
git add web/src/components/DesignsGrid.tsx web/src/components/DesignsGrid.module.css web/src/app/page.tsx web/src/app/page.module.css
git commit -m "feat(designs): DesignsGrid + home teaser (first 6 + see-all link)"
```

---

## Task 15: Build the `/designs` page

**Files:**
- Create: `web/src/app/designs/page.tsx`
- Create: `web/src/app/designs/page.module.css`

- [ ] **Step 1: Create the page file.**

```tsx
import { DesignsGrid } from '@/components/DesignsGrid';
import { SectionHead } from '@/components/SectionHead';
import styles from './page.module.css';

export const metadata = {
  title: 'Designs · Rooted Creations Co.',
  description: 'A selection of custom designs printed in San Antonio — Spurs, Texas, Hispanic-pride, and more.',
};

export default function DesignsPage() {
  return (
    <main className={styles.page}>
      <SectionHead
        idx="01 / Designs"
        title={<>A selection of <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>designs.</em></>}
        aside="Pieces we've printed for customers, families, and small businesses. Want one of these on a tee? Hit the Custom Work link below."
      />
      <DesignsGrid cta={{ href: '/custom', label: 'Want one on a tee? Custom Work →' }} />
    </main>
  );
}
```

- [ ] **Step 2: Create `web/src/app/designs/page.module.css`.**

```css
.page {
  background: var(--ink);
  color: var(--cream);
  min-height: 100vh;
  padding-bottom: var(--space-9);
}
```

- [ ] **Step 3: Verify the page renders.**

Run: `cd web && npm run dev`. Open http://localhost:3000/designs — confirm:
- Page returns 200 (no 404).
- Section head shows "01 / Designs" + "A selection of designs."
- All 11 design cards render.
- CTA link at the bottom points to `/custom`.
- "Designs" link in the Nav now lands here.

Stop the server.

- [ ] **Step 4: Commit.**

```bash
git add web/src/app/designs/page.tsx web/src/app/designs/page.module.css
git commit -m "feat(designs): /designs lookbook page (11 cards + Custom Work CTA)"
```

---

## Task 16: Extend Playwright tests for new sections + page

**Files:**
- Modify: `web/tests/smoke.spec.ts`

- [ ] **Step 1: Add `/designs` to the smoke route list and add focused assertions.**

Edit `web/tests/smoke.spec.ts`. Find:

```ts
const pages = ['/', '/shop', '/shop/rooted-heritage-tee', '/custom', '/about', '/contact'];
```

Replace with:

```ts
const pages = ['/', '/shop', '/shop/rooted-heritage-tee', '/designs', '/custom', '/about', '/contact'];
```

Then append the following tests to the end of the file:

```ts
test('home shows pricing teaser and designs teaser', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'PRICING', level: 2 })).toBeVisible();
  await expect(page.getByRole('link', { name: /See full pricing/i })).toHaveAttribute('href', '/shop#pricing');
  await expect(page.getByRole('link', { name: /See all 11/i })).toHaveAttribute('href', '/designs');
});

test('shop shows full pricing block with 6 items', async ({ page }) => {
  await page.goto('/shop');
  const block = page.locator('#pricing');
  await expect(block).toBeVisible();
  await expect(block.locator('li')).toHaveCount(6);
  await expect(block.getByText('$15').first()).toBeVisible();
  await expect(block.getByText('$30')).toBeVisible();
});

test('designs page renders 11 cards and Custom Work CTA', async ({ page }) => {
  await page.goto('/designs');
  await expect(page.locator('figure').filter({ hasText: /./ })).toHaveCount(11);
  await expect(page.getByRole('link', { name: /Want one on a tee/i })).toHaveAttribute('href', '/custom');
});

test('footer shows payment line', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer.getByText(/We accept/i)).toBeVisible();
  await expect(footer.getByText('Cash')).toBeVisible();
  await expect(footer.getByText('Venmo')).toBeVisible();
});

test('nav has Designs link', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Designs', exact: true }).first()).toBeVisible();
});
```

- [ ] **Step 2: Run the tests.**

Run: `cd web && npm run test:e2e`
Expected: all tests pass (existing + new). If any fail, read the output, fix, and re-run.

- [ ] **Step 3: Commit.**

```bash
git add web/tests/smoke.spec.ts
git commit -m "test(e2e): cover pricing, designs, payment line, nav additions"
```

---

## Task 17: Final verification — build, lint, manual sanity

- [ ] **Step 1: Type-check and lint.**

Run: `cd web && npx tsc --noEmit && npm run lint`
Expected: no errors.

- [ ] **Step 2: Production build.**

Run: `cd web && npm run build`
Expected: successful build with no warnings about missing modules or broken paths.

- [ ] **Step 3: Run e2e tests against the production build.**

Run: `cd web && npm run test:e2e`
Expected: all green.

- [ ] **Step 4: Manual sanity check (dev server).**

Run: `cd web && npm run dev`. Walk through:
- Home → seal stamps in, then slow-rotates around its star center; "Rooted" italic renders in Lobster (script).
- Pricing teaser renders 4 items; "See full pricing →" jumps to `/shop#pricing` and the pricing block scrolls into view.
- Designs teaser renders 6 cards; "See all 11 →" goes to `/designs`.
- `/designs` shows all 11 cards; CTA goes to `/custom`.
- `/shop` shows 6-item PRICING block.
- Nav: Shop · **Designs** · Custom Work · Story · Contact; small seal next to brand text.
- Footer: small seal at top of brand column; "WE ACCEPT · CASH · VENMO" in bottom strip.
- Mobile (380×800): mobile nav still toggles, pricing block goes single-column, designs grid is single-column.
- Reduced-motion: emulate in dev tools; seal stays static.

Note any issues, fix inline, recommit.

Stop the server.

- [ ] **Step 5: Final cleanup commit if any tweaks were made during Step 4.**

```bash
git add -A
git status
# review, then:
git commit -m "polish: final sanity-check tweaks"
```

(Skip this step if nothing changed.)

---

## Out of scope (do NOT do in this plan)

- Per-design URLs (`/designs/[slug]`).
- Lightbox or click-to-zoom on design cards.
- Search / filter on `/designs`.
- E-commerce / cart wiring.
- Replacing the placeholder product SVGs in `web/public/images/products/`.
- Removing or rewriting the legacy `index.html` at the repo root.
- Tightening the four logo SVGs' viewBoxes (deferred — current quadrant viewBoxes work fine with `background-size: contain`).

## Notes for the executor

- **Next.js V2 caveat:** `web/AGENTS.md` warns that APIs and conventions may differ from training data. If you hit an unexpected error, check `web/node_modules/next/dist/docs/` before guessing.
- **`asset()` helper:** any path under `web/public/` referenced from a component must go through `import { asset } from '@/lib/asset'` so the static-export `basePath` is prepended. The plan already wires this through Seal and DesignCard.
- **Single test file:** the repo uses one Playwright file (`web/tests/smoke.spec.ts`). Don't split it — keep adding tests to the bottom.
- **Reduced motion:** the seal animation is the only motion this plan adds. The `@media (prefers-reduced-motion: reduce)` guard in `Seal.module.css` handles it.
- **Image cropping:** if Task 4's crop dimensions look wrong on inspection, iterate the `CROP_H` value in the shell script and re-run. Don't ship visibly-truncated designs.
