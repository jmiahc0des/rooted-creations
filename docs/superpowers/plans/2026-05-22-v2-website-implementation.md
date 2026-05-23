# Rooted Creations Co. V2 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a six-page Next.js brochure website for Rooted Creations Co. — a San Antonio custom apparel and graphic design business — in the "Print Shop Editorial" aesthetic with no live commerce.

**Architecture:** Next.js App Router project at `/Users/jeremiah/Projects/Claude/rooted-creations/web/`. Server Components by default; client components only for nav toggle, category filter, product inquiry selectors, and forms. Vanilla CSS with CSS Modules. Product catalog is a typed TypeScript file. Forms submit to Formspree. Static deploy to Vercel.

**Tech Stack:** Next.js 15 (App Router) · TypeScript · CSS Modules · next/font (Google Fonts) · Formspree · Playwright (smoke tests) · Vercel (deploy).

**Reference:** Design spec — `docs/superpowers/specs/2026-05-22-v2-website-design.md`. Brand guardrails — `/Users/jeremiah/Projects/Claude/rooted-creations/CLAUDE.md`. V1 reference — `index.html` (one directory up from `web/`).

---

## Task 1: Project Setup & Repo Init

**Files:**
- Create: `web/` (Next.js project root)
- Create: `web/.env.local.example`
- Create: `web/.gitignore` (Next.js default)
- Init: `git init` at project root

- [ ] **Step 1: Scaffold Next.js project**

Run from `/Users/jeremiah/Projects/Claude/rooted-creations/`:
```bash
npx create-next-app@latest web --typescript --eslint --app --src-dir false --import-alias "@/*" --no-tailwind
```
Expected: interactive prompts auto-answered, `web/` directory created with Next.js boilerplate.

- [ ] **Step 2: Prune the default starter content**

Delete the contents of `web/app/page.tsx` and replace with:
```tsx
export default function Home() {
  return <main style={{ padding: 24 }}>Rooted Creations V2 — scaffold OK</main>;
}
```

Delete `web/app/globals.css` content (we'll recreate it in Task 2). Delete `web/public/next.svg` and `web/public/vercel.svg` (we won't need them).

- [ ] **Step 3: Verify scaffold runs**

Run from `web/`:
```bash
npm run dev
```
Open `http://localhost:3000`. Expected: "Rooted Creations V2 — scaffold OK" text on a blank page. Stop the dev server (Ctrl-C).

- [ ] **Step 4: Add Formspree placeholder env vars**

Create `web/.env.local.example`:
```
# Formspree endpoints — replace with real IDs from https://formspree.io
NEXT_PUBLIC_FORMSPREE_CUSTOM_ENDPOINT=https://formspree.io/f/REPLACE_ME_CUSTOM
NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT=https://formspree.io/f/REPLACE_ME_CONTACT
NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT=https://formspree.io/f/REPLACE_ME_NEWSLETTER
```

Copy it to `web/.env.local` (so dev works) — the values are placeholders, real forms will submit to invalid endpoints until real IDs are added.

```bash
cp web/.env.local.example web/.env.local
```

- [ ] **Step 5: Initialize git at the parent dir, commit**

Run from `/Users/jeremiah/Projects/Claude/rooted-creations/`:
```bash
git init
echo ".superpowers/" >> .gitignore
echo ".DS_Store" >> .gitignore
echo "web/.env.local" >> .gitignore
echo "web/node_modules/" >> .gitignore
echo "web/.next/" >> .gitignore
git add .
git commit -m "chore: scaffold Next.js V2 project at web/"
```
Expected: initial commit succeeds.

---

## Task 2: Design Tokens & Global Styles

**Files:**
- Create: `web/styles/tokens.css`
- Create: `web/styles/globals.css`
- Modify: `web/app/layout.tsx`
- Create: `web/app/fonts.ts`
- Create: `web/public/grain.svg`

- [ ] **Step 1: Write design tokens**

Create `web/styles/tokens.css`:
```css
:root {
  /* ───── PALETTE ───── */
  --ink: #0C0A07;
  --ink-soft: #1A1611;
  --cream: #F4ECD8;
  --cream-dim: rgba(244, 236, 216, 0.7);
  --gold: #D4A547;
  --gold-soft: #C9A876;
  --brick: #B8412A;

  --hairline: rgba(244, 236, 216, 0.18);
  --hairline-strong: rgba(244, 236, 216, 0.35);

  /* ───── TYPE ───── */
  --font-display: var(--font-big-shoulders), 'Arial Black', sans-serif;
  --font-serif: var(--font-instrument), Georgia, serif;
  --font-mono: var(--font-jetbrains), 'Courier New', monospace;

  /* ───── SPACING (8pt grid) ───── */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-7: 48px;
  --space-8: 64px;
  --space-9: 96px;
  --space-10: 128px;

  /* ───── BREAKPOINTS (used in media queries) ───── */
  /* sm: 640px · md: 768px · lg: 1024px · xl: 1280px */
}
```

- [ ] **Step 2: Write global styles**

Create `web/styles/globals.css`:
```css
@import './tokens.css';

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  background: var(--ink);
  color: var(--cream);
  font-family: var(--font-serif);
  font-size: 17px;
  line-height: 1.55;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
}

/* Paper grain texture overlay — fixed, low opacity */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 200;
  opacity: 0.05;
  background-image: url('/grain.svg');
  mix-blend-mode: screen;
}

::selection { background: var(--gold); color: var(--ink); }

a { color: inherit; text-decoration: none; }
button { font-family: inherit; cursor: pointer; border: none; background: none; color: inherit; }

/* ───── UTILITY TYPE ───── */
.mono {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 500;
}
.display {
  font-family: var(--font-display);
  font-weight: 900;
  letter-spacing: -0.015em;
  line-height: 0.85;
  text-transform: uppercase;
}
.serif-i {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
}
```

- [ ] **Step 3: Add the paper grain SVG**

Create `web/public/grain.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>
```

- [ ] **Step 4: Configure Google Fonts via next/font**

Create `web/app/fonts.ts`:
```ts
import { Big_Shoulders_Display, Instrument_Serif, JetBrains_Mono } from 'next/font/google';

export const bigShoulders = Big_Shoulders_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  display: 'swap',
  variable: '--font-big-shoulders',
});

export const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-instrument',
});

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-jetbrains',
});
```

- [ ] **Step 5: Wire fonts and globals into the root layout**

Replace `web/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import '../styles/globals.css';
import { bigShoulders, instrumentSerif, jetbrains } from './fonts';

export const metadata: Metadata = {
  title: 'Rooted Creations Co. — Custom Apparel + Graphic Design / San Antonio, TX',
  description: 'Custom apparel and graphic design, handprinted in San Antonio. Designs made for people, families, and small businesses with something to say.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 6: Verify**

Run `npm run dev`. Open `http://localhost:3000`. Expected: black background, cream text, subtle grain visible on close inspection. Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add web/
git commit -m "feat: design tokens, global styles, fonts, and grain overlay"
```

---

## Task 3: Reusable Atoms — Seal, Marquee, Stamp, SectionHead

Build the small reusable components that show up across multiple pages. Each gets its own folder pattern: `Component.tsx` + `Component.module.css`.

**Files:**
- Create: `web/components/Seal.tsx`, `web/components/Seal.module.css`
- Create: `web/components/Marquee.tsx`, `web/components/Marquee.module.css`
- Create: `web/components/Stamp.tsx`, `web/components/Stamp.module.css`
- Create: `web/components/SectionHead.tsx`, `web/components/SectionHead.module.css`
- Create: `web/app/preview/page.tsx` (temporary preview route)

- [ ] **Step 1: Build the rotating seal**

Create `web/components/Seal.tsx`:
```tsx
import styles from './Seal.module.css';

type Props = {
  size?: number;
  text?: string;
};

export function Seal({ size = 130, text = 'ROOTED CREATIONS CO. · SAN ANTONIO TX · EST. 2024 · ' }: Props) {
  return (
    <svg className={styles.seal} viewBox="0 0 200 200" width={size} height={size} aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="4" fill="var(--gold)">
        <textPath href="#seal-circle" startOffset="0">{text}</textPath>
      </text>
      <g transform="translate(100 100)" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <line x1="0" y1="-32" x2="0" y2="32" />
        <line x1="-22" y1="-22" x2="22" y2="22" />
        <line x1="22" y1="-22" x2="-22" y2="22" />
        <line x1="-32" y1="0" x2="32" y2="0" />
        <circle cx="0" cy="0" r="6" fill="var(--brick)" stroke="none" />
      </g>
    </svg>
  );
}
```

Create `web/components/Seal.module.css`:
```css
.seal {
  animation: spin 38s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Build the marquee strip**

Create `web/components/Marquee.tsx`:
```tsx
import styles from './Marquee.module.css';

type Props = {
  items: string[];
  variant?: 'gold' | 'ink';
  speed?: number; // seconds for one loop
};

export function Marquee({ items, variant = 'gold', speed = 32 }: Props) {
  const cls = variant === 'gold' ? styles.gold : styles.ink;
  const doubled = [...items, ...items];
  return (
    <div className={`${styles.strip} ${cls}`}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <span key={i} className={styles.item}>
            {item} <span className={styles.star}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
```

Create `web/components/Marquee.module.css`:
```css
.strip {
  overflow: hidden;
  padding: 14px 0;
  border-top: 1px solid var(--ink);
  border-bottom: 1px solid var(--ink);
}
.gold { background: var(--gold); color: var(--ink); }
.ink { background: var(--ink); color: var(--cream); }

.track {
  display: inline-flex;
  align-items: center;
  gap: 36px;
  white-space: nowrap;
  animation: scroll linear infinite;
  padding-left: 36px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}
.item { display: inline-flex; align-items: center; gap: 36px; }
.star { color: var(--brick); }

@keyframes scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- [ ] **Step 3: Build the rotated stamp**

Create `web/components/Stamp.tsx`:
```tsx
import styles from './Stamp.module.css';

type Props = {
  children: React.ReactNode;
  rotate?: number;
};

export function Stamp({ children, rotate = -8 }: Props) {
  return (
    <span className={styles.stamp} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}
```

Create `web/components/Stamp.module.css`:
```css
.stamp {
  display: inline-block;
  border: 1.2px solid var(--brick);
  color: var(--brick);
  padding: 5px 10px;
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  background: var(--ink);
  white-space: nowrap;
}
```

- [ ] **Step 4: Build the SectionHead**

Create `web/components/SectionHead.tsx`:
```tsx
import styles from './SectionHead.module.css';
import Link from 'next/link';

type Props = {
  idx: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  link?: { href: string; label: string };
};

export function SectionHead({ idx, title, aside, link }: Props) {
  return (
    <div className={styles.head}>
      <span className={`mono ${styles.idx}`}>{idx}</span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.aside}>
        {aside && <p>{aside}</p>}
        {link && (
          <Link href={link.href} className={styles.link}>
            {link.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
```

Create `web/components/SectionHead.module.css`:
```css
.head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: end;
  gap: 40px;
  padding-bottom: 32px;
  border-bottom: 1px solid var(--hairline);
  margin-bottom: 48px;
}
.idx { color: var(--gold); }
.title {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(40px, 6vw, 88px);
  line-height: 0.9;
  letter-spacing: -0.015em;
  text-transform: uppercase;
  color: var(--cream);
}
.aside {
  text-align: right;
  color: var(--cream-dim);
  max-width: 300px;
  font-size: 15px;
  line-height: 1.5;
}
.link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--gold);
  padding-bottom: 2px;
  border-bottom: 1px solid var(--gold);
  transition: gap 0.3s ease;
}
.link:hover { gap: 14px; }

@media (max-width: 768px) {
  .head { grid-template-columns: 1fr; gap: 16px; }
  .aside { text-align: left; max-width: none; }
}
```

- [ ] **Step 5: Create a preview route to verify**

Create `web/app/preview/page.tsx`:
```tsx
import { Seal } from '@/components/Seal';
import { Marquee } from '@/components/Marquee';
import { Stamp } from '@/components/Stamp';
import { SectionHead } from '@/components/SectionHead';

export default function Preview() {
  return (
    <main style={{ padding: 32 }}>
      <section style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 64 }}>
        <Seal />
        <Stamp>Limited · N° 047</Stamp>
        <Stamp rotate={4}>Bestseller</Stamp>
      </section>

      <Marquee items={['CUSTOM TEES', 'HOODIES', 'ORIGINAL DROPS', 'SA MADE', 'CUSTOM WORK']} />

      <section style={{ padding: '96px 0' }}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints, made in small batches in San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
      </section>

      <Marquee items={['INK', 'GOLD', 'CREAM', 'BRICK']} variant="ink" />
    </main>
  );
}
```

- [ ] **Step 6: Verify visually**

Run `npm run dev`. Open `http://localhost:3000/preview`. Expected:
- Rotating seal with gold rings and brick center dot.
- Two rotated brick stamps.
- Gold marquee scrolling left.
- SectionHead with "01 / The Shop" + "Currently Rooted" headline + aside text + gold link.
- Ink-colored marquee at bottom.

Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add web/
git commit -m "feat: reusable atoms (Seal, Marquee, Stamp, SectionHead) with preview route"
```

---

## Task 4: Product Catalog Data + ProductCard

**Files:**
- Create: `web/data/products.ts`
- Create: `web/components/ProductCard.tsx`, `web/components/ProductCard.module.css`
- Create: `web/public/images/products/*.svg` (4 placeholder SVG mockups)
- Modify: `web/app/preview/page.tsx`

- [ ] **Step 1: Create product placeholder SVGs**

Create `web/public/images/products/tee-rooted.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect width="200" height="240" fill="#0C0A07"/>
  <path d="M40 50 L70 30 Q100 50 130 30 L160 50 L180 90 L155 100 L155 200 L45 200 L45 100 L20 90 Z" fill="#F4ECD8"/>
  <text x="100" y="135" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="22" letter-spacing="2" fill="#B8412A">ROOTED</text>
  <text x="100" y="160" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="16" fill="#0C0A07">in purpose</text>
</svg>
```

Create `web/public/images/products/hoodie-sa24.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect width="200" height="240" fill="#1A1611"/>
  <path d="M40 60 Q60 30 100 28 Q140 30 160 60 L185 90 L160 110 L160 215 L40 215 L40 110 L15 90 Z" fill="#0C0A07"/>
  <path d="M70 30 Q100 60 130 30 Q130 60 100 70 Q70 60 70 30 Z" fill="#0C0A07"/>
  <path d="M65 145 L135 145 L150 195 L50 195 Z" fill="none" stroke="#1A1611" stroke-width="2"/>
  <text x="100" y="125" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="18" fill="#D4A547">San Antonio</text>
  <text x="100" y="142" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="14" fill="#F4ECD8" letter-spacing="3">SINCE &#39;24</text>
</svg>
```

Create `web/public/images/products/tee-mark.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect width="200" height="240" fill="#B8412A"/>
  <path d="M40 50 L70 30 Q100 50 130 30 L160 50 L180 90 L155 100 L155 200 L45 200 L45 100 L20 90 Z" fill="#F4ECD8"/>
  <circle cx="100" cy="130" r="42" fill="none" stroke="#0C0A07" stroke-width="1.5"/>
  <text x="100" y="116" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="13" fill="#0C0A07" letter-spacing="2">MADE TO</text>
  <text x="100" y="136" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="20" fill="#B8412A">leave a</text>
  <text x="100" y="156" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="14" fill="#0C0A07" letter-spacing="3">MARK.</text>
</svg>
```

Create `web/public/images/products/onesie-lilroot.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240">
  <rect width="200" height="240" fill="#1A1611"/>
  <path d="M50 60 L75 40 Q100 60 125 40 L150 60 L165 90 L145 100 L145 170 Q145 200 100 220 Q55 200 55 170 L55 100 L35 90 Z" fill="#F4ECD8"/>
  <text x="100" y="135" text-anchor="middle" font-family="Arial Black" font-weight="900" font-size="16" fill="#D4A547" letter-spacing="2">LIL&#39; ROOT</text>
  <text x="100" y="155" text-anchor="middle" font-family="Georgia" font-style="italic" font-size="14" fill="#0C0A07">est. today</text>
</svg>
```

- [ ] **Step 2: Write the product data file**

Create `web/data/products.ts`:
```ts
export type ProductCategory = 'tees' | 'hoodies' | 'youth' | 'accessories';

export type Product = {
  slug: string;
  name: string;
  category: ProductCategory;
  price: number;
  tagline: string;
  description: string;
  sizes: string[];
  colors: string[];
  edition?: string;
  isLimited?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  images: string[];
};

export const products: Product[] = [
  {
    slug: 'rooted-heritage-tee',
    name: 'Rooted Heritage Tee',
    category: 'tees',
    price: 32,
    tagline: 'Heavyweight 100% cotton',
    description: 'Our signature tee — heavyweight cotton, made to soften with every wash. The mark you put on means something.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ink', 'Bone'],
    edition: 'N° 01 / 12',
    isNew: true,
    images: ['/images/products/tee-rooted.svg'],
  },
  {
    slug: 'sa-24-hoodie',
    name: "SA '24 Hoodie",
    category: 'hoodies',
    price: 68,
    tagline: 'Midweight fleece',
    description: 'A San Antonio love letter in cotton-poly fleece. Lined hood, kangaroo pouch, custom embroidered cuff.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ink', 'Sand', 'Sage'],
    isBestseller: true,
    images: ['/images/products/hoodie-sa24.svg'],
  },
  {
    slug: 'leave-a-mark-tee',
    name: 'Leave A Mark Tee',
    category: 'tees',
    price: 34,
    tagline: 'Garment-dyed burnt clay',
    description: 'Limited drop. Garment-dyed for a vintage hand and finished by hand.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Clay'],
    edition: 'N° 03 / 12',
    isLimited: true,
    images: ['/images/products/tee-mark.svg'],
  },
  {
    slug: 'lil-root-onesie',
    name: "Lil' Root Onesie",
    category: 'youth',
    price: 22,
    tagline: 'Soft cotton · 0–24m',
    description: 'For the smallest roots. Soft-spun cotton with snap closure.',
    sizes: ['0–3m', '3–6m', '6–12m', '12–18m', '18–24m'],
    colors: ['Bone'],
    images: ['/images/products/onesie-lilroot.svg'],
  },
  {
    slug: 'rooted-canvas-tote',
    name: 'Rooted Canvas Tote',
    category: 'accessories',
    price: 24,
    tagline: '12oz natural canvas',
    description: 'Heavy canvas, screen-printed by hand. Holds groceries, books, or a six-pack of Lone Star.',
    sizes: ['One size'],
    colors: ['Natural', 'Ink'],
    images: ['/images/products/tee-rooted.svg'],
  },
  {
    slug: 'sa-crewneck',
    name: 'SA Crewneck',
    category: 'hoodies',
    price: 58,
    tagline: 'Heavyweight cotton-poly fleece',
    description: 'Stripped-down version of the hoodie. No hood, all warmth.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ink', 'Sand'],
    images: ['/images/products/hoodie-sa24.svg'],
  },
  {
    slug: 'rooted-youth-tee',
    name: 'Rooted Youth Tee',
    category: 'youth',
    price: 22,
    tagline: 'Soft-spun cotton · Youth XS–XL',
    description: 'The classic tee, scaled for the small humans who will inherit your favorite shirts.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Bone', 'Ink'],
    images: ['/images/products/tee-rooted.svg'],
  },
  {
    slug: 'maker-cap',
    name: 'Maker Cap',
    category: 'accessories',
    price: 28,
    tagline: 'Unstructured 6-panel · adjustable',
    description: 'Soft brim, washed cotton, embroidered mark. Wears in better the more you wear it.',
    sizes: ['One size'],
    colors: ['Ink', 'Sand'],
    images: ['/images/products/tee-mark.svg'],
  },
  {
    slug: 'leave-mark-hoodie',
    name: 'Leave A Mark Hoodie',
    category: 'hoodies',
    price: 72,
    tagline: 'Heavyweight fleece · drop shoulder',
    description: 'The Leave A Mark print on our heaviest fleece. Drop-shoulder cut.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Ink', 'Clay'],
    edition: 'N° 05 / 12',
    isLimited: true,
    images: ['/images/products/hoodie-sa24.svg'],
  },
  {
    slug: 'rooted-sticker-pack',
    name: 'Rooted Sticker Pack',
    category: 'accessories',
    price: 8,
    tagline: 'Set of 4 · matte vinyl',
    description: 'Four 3-inch matte vinyl stickers. Hand-cut, weatherproof.',
    sizes: ['One size'],
    colors: ['Mixed'],
    images: ['/images/products/tee-mark.svg'],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelatedProducts(slug: string, limit = 3): Product[] {
  const current = getProduct(slug);
  if (!current) return [];
  return products
    .filter((p) => p.slug !== slug && p.category === current.category)
    .slice(0, limit);
}
```

- [ ] **Step 3: Add a sanity check that catches data errors at build time**

Create `web/data/products.test.ts`:
```ts
import { products } from './products';

const slugs = new Set<string>();
for (const p of products) {
  if (slugs.has(p.slug)) throw new Error(`Duplicate slug: ${p.slug}`);
  slugs.add(p.slug);
  if (p.price <= 0) throw new Error(`Invalid price for ${p.slug}: ${p.price}`);
  if (p.images.length === 0) throw new Error(`No images for ${p.slug}`);
  if (p.sizes.length === 0) throw new Error(`No sizes for ${p.slug}`);
  if (p.colors.length === 0) throw new Error(`No colors for ${p.slug}`);
}
console.log(`✓ products.ts: ${products.length} products, all valid`);
```

Run it:
```bash
cd web && npx tsx data/products.test.ts
```
Expected: `✓ products.ts: 10 products, all valid`. If `tsx` isn't installed, install it as a dev dep: `npm i -D tsx`.

- [ ] **Step 4: Build the ProductCard component**

Create `web/components/ProductCard.tsx`:
```tsx
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/data/products';
import styles from './ProductCard.module.css';

type Props = {
  product: Product;
  index: number;
  total: number;
};

export function ProductCard({ product, index, total }: Props) {
  const tag = product.isNew ? 'New' : product.isLimited ? 'Limited' : product.isBestseller ? 'Bestseller' : null;
  const idx = `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  return (
    <Link href={`/shop/${product.slug}`} className={styles.card}>
      <div className={styles.tile}>
        {tag && <span className={`mono ${styles.tag}`}>{tag}</span>}
        <span className={`mono ${styles.idx}`}>{idx}</span>
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className={styles.image}
        />
        <div className={styles.add}>Inquire — ${product.price}</div>
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>${product.price}</span>
      </div>
      <div className={styles.desc}>{product.tagline}</div>
    </Link>
  );
}
```

Create `web/components/ProductCard.module.css`:
```css
.card { display: flex; flex-direction: column; cursor: pointer; color: var(--cream); }
.tile {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  border: 1px solid var(--hairline);
  margin-bottom: 14px;
  background: var(--ink-soft);
  transition: transform 0.5s cubic-bezier(.2,.8,.2,1);
}
.card:hover .tile { transform: translateY(-6px); }
.image { object-fit: cover; }
.tag {
  position: absolute; top: 12px; left: 12px;
  background: var(--ink); color: var(--gold);
  padding: 4px 10px; z-index: 3;
  border: 1px solid var(--gold);
  font-size: 9px;
}
.idx {
  position: absolute; top: 12px; right: 12px;
  z-index: 3; color: var(--gold-soft); font-size: 9px;
}
.add {
  position: absolute; bottom: 12px; left: 12px; right: 12px;
  background: var(--gold); color: var(--ink);
  padding: 11px; text-align: center;
  font-family: var(--font-mono); font-size: 10px;
  letter-spacing: 0.16em; text-transform: uppercase;
  transform: translateY(calc(100% + 12px));
  transition: transform 0.4s cubic-bezier(.2,.8,.2,1);
  z-index: 3;
}
.card:hover .add { transform: translateY(0); }
.meta { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
.name {
  font-family: var(--font-display); font-weight: 700;
  font-size: 20px; letter-spacing: 0.01em; text-transform: uppercase; line-height: 1.05;
}
.price { font-family: var(--font-mono); font-size: 12px; }
.desc {
  font-family: var(--font-serif); font-style: italic;
  color: var(--cream-dim); margin-top: 4px; font-size: 14px;
}
```

- [ ] **Step 5: Update preview route to include product grid**

Replace `web/app/preview/page.tsx`:
```tsx
import { Seal } from '@/components/Seal';
import { Marquee } from '@/components/Marquee';
import { Stamp } from '@/components/Stamp';
import { SectionHead } from '@/components/SectionHead';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Preview() {
  return (
    <main style={{ padding: 32 }}>
      <section style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 48 }}>
        <Seal />
        <Stamp>Limited · N° 047</Stamp>
        <Stamp rotate={4}>Bestseller</Stamp>
      </section>

      <Marquee items={['CUSTOM TEES', 'HOODIES', 'CUSTOM WORK', 'SA MADE']} />

      <section style={{ padding: '64px 0' }}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints in small batches, San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} total={4} />
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 6: Verify**

Run `npm run dev` and open `/preview`. Expected: 4 product cards in a grid, each with image, tag, index, name, price, tagline. Hover reveals the "Inquire" overlay. Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add web/
git commit -m "feat: product catalog data + ProductCard component"
```

---

## Task 5: Nav and Footer

**Files:**
- Create: `web/components/Nav.tsx`, `web/components/Nav.module.css`
- Create: `web/components/Footer.tsx`, `web/components/Footer.module.css`
- Modify: `web/app/layout.tsx`

- [ ] **Step 1: Build the Nav**

Create `web/components/Nav.tsx` (client component for mobile toggle):
```tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Marquee } from './Marquee';
import styles from './Nav.module.css';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.utility}>
        <span className="mono">EST. 2024 / SAN ANTONIO, TX</span>
        <div className={styles.utilityMarqueeWrap}>
          <Marquee
            items={['FREE LOCAL PICKUP IN SA', 'CUSTOM ORDERS WELCOME', 'NEW DROPS EACH SEASON', 'HANDPRINTED IN TEXAS']}
            speed={40}
          />
        </div>
        <span className="mono">@ROOTEDCREATIONSCOTX</span>
      </div>

      <nav className={styles.nav}>
        <div className={`${styles.navLeft} ${open ? styles.navMobileOpen : ''}`}>
          <Link href="/shop" className={styles.link} onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/custom" className={styles.link} onClick={() => setOpen(false)}>Custom Work</Link>
          <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>Story</Link>
        </div>

        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>Rooted Creations Co.</span>
          <span className={styles.brandSub}>SA · TX · MADE WITH PURPOSE</span>
        </Link>

        <div className={styles.navRight}>
          <Link href="/contact" className={`${styles.link} ${styles.linkRight}`}>Contact</Link>
          <button
            className={styles.cart}
            title="Cart coming soon — inquire to order"
            type="button"
            aria-label="Cart (coming soon)"
          >
            Cart <span className={styles.count}>0</span>
          </button>
          <button
            className={styles.mobileToggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
```

Create `web/components/Nav.module.css`:
```css
.header {
  position: sticky; top: 0; z-index: 100;
  background: var(--ink);
  backdrop-filter: blur(8px);
}

.utility {
  background: var(--ink);
  color: var(--cream-dim);
  border-bottom: 1px solid var(--hairline);
  padding: 9px 24px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 24px;
  font-size: 10px;
}
.utilityMarqueeWrap {
  overflow: hidden;
  mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent);
}
.utilityMarqueeWrap > div {
  padding: 0; border: none; background: transparent !important;
}
.utilityMarqueeWrap > div > div {
  font-size: 11px !important;
  font-family: var(--font-mono) !important;
  font-weight: 500 !important;
  text-transform: uppercase !important;
  color: var(--gold-soft);
  letter-spacing: 0.14em !important;
}

.nav {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 22px 32px;
  border-bottom: 1px solid var(--hairline);
}
.navLeft, .navRight { display: flex; gap: 28px; align-items: center; }
.navRight { justify-content: flex-end; }

.link {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream);
  position: relative;
  padding: 6px 0;
}
.link::after {
  content: ''; position: absolute; left: 0; bottom: 2px;
  width: 0; height: 1px;
  background: var(--gold);
  transition: width 0.4s cubic-bezier(.2,.8,.2,1);
}
.link:hover::after { width: 100%; }

.brand { text-align: center; line-height: 1; }
.brandName {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 22px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--cream);
  display: block;
}
.brandSub {
  font-family: var(--font-mono);
  font-size: 8.5px;
  letter-spacing: 0.35em;
  margin-top: 4px;
  color: var(--gold-soft);
  display: block;
}

.cart {
  display: inline-flex; align-items: center; gap: 10px;
  border: 1px solid var(--cream);
  padding: 8px 14px 8px 16px;
  border-radius: 100px;
  font-family: var(--font-mono);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--cream);
  transition: all 0.3s ease;
  cursor: not-allowed;
}
.cart:hover { background: var(--cream); color: var(--ink); }
.count {
  background: var(--gold);
  color: var(--ink);
  border-radius: 100px;
  padding: 2px 8px;
  font-size: 10px;
  min-width: 20px;
  text-align: center;
}
.cart:hover .count { background: var(--ink); color: var(--gold); }

.mobileToggle { display: none; flex-direction: column; gap: 4px; padding: 8px; }
.mobileToggle span { display: block; width: 22px; height: 1.5px; background: var(--cream); }

@media (max-width: 768px) {
  .utility { grid-template-columns: 1fr; gap: 4px; text-align: center; padding: 7px 16px; }
  .utilityMarqueeWrap { display: none; }
  .nav { grid-template-columns: 1fr auto; padding: 14px 20px; }
  .navLeft {
    position: absolute; top: 100%; left: 0; right: 0;
    flex-direction: column; align-items: stretch; gap: 0;
    background: var(--ink); border-bottom: 1px solid var(--hairline);
    max-height: 0; overflow: hidden; transition: max-height 0.3s ease;
  }
  .navLeft.navMobileOpen { max-height: 240px; }
  .navLeft .link { padding: 14px 24px; border-bottom: 1px solid var(--hairline); }
  .navRight { gap: 12px; }
  .linkRight { display: none; }
  .mobileToggle { display: flex; }
}
```

- [ ] **Step 2: Build the Footer**

Create `web/components/Footer.tsx`:
```tsx
import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.mark}>
            Rooted<br />Creations <span className={styles.italic}>Co.</span>
          </div>
          <p className={styles.tag}>Custom apparel &amp; graphic design — handprinted in San Antonio, Texas.</p>
          <div className={styles.contact}>
            <div><a href="mailto:hello@rootedcreations.co">hello@rootedcreations.co</a></div>
            <div><a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a></div>
            <div>San Antonio, TX</div>
          </div>
        </div>

        <div className={styles.col}>
          <h5>Shop</h5>
          <ul>
            <li><Link href="/shop">All Goods</Link></li>
            <li><Link href="/shop?cat=tees">T-Shirts</Link></li>
            <li><Link href="/shop?cat=hoodies">Hoodies</Link></li>
            <li><Link href="/shop?cat=youth">Youth</Link></li>
            <li><Link href="/shop?cat=accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Custom</h5>
          <ul>
            <li><Link href="/custom">Local Business</Link></li>
            <li><Link href="/custom">Teams &amp; Staff</Link></li>
            <li><Link href="/custom">Events</Link></li>
            <li><Link href="/custom">Get a Quote</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Info</h5>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.massive} aria-hidden>
        Rooted <span className={styles.italic}>in</span> Purpose
      </div>

      <div className={styles.bottom}>
        <span className="mono">© 2026 Rooted Creations Co.</span>
        <span className="mono">Made in San Antonio, TX · 29.4241°N 98.4936°W</span>
      </div>
    </footer>
  );
}
```

Create `web/components/Footer.module.css`:
```css
.footer { background: var(--ink); color: var(--cream); padding: 80px 32px 24px; border-top: 1px solid var(--hairline); }
.top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 60px; padding-bottom: 56px; border-bottom: 1px solid var(--hairline); }
.brand { }
.mark {
  font-family: var(--font-display); font-weight: 900; font-size: 36px;
  line-height: 1; letter-spacing: 0.02em; text-transform: uppercase; margin-bottom: 8px;
}
.italic { font-family: var(--font-serif); font-style: italic; font-weight: 400; text-transform: none; color: var(--gold); }
.tag { font-family: var(--font-serif); font-style: italic; color: var(--cream-dim); font-size: 16px; max-width: 320px; margin-bottom: 24px; }
.contact { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; line-height: 2; }
.contact a:hover { color: var(--gold); }
.col h5 {
  font-family: var(--font-mono); font-size: 10.5px;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--gold);
  margin-bottom: 20px;
}
.col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.col li a {
  font-family: var(--font-display); font-weight: 700; font-size: 18px;
  text-transform: uppercase; letter-spacing: 0.02em;
  transition: color 0.3s ease, padding-left 0.3s ease; display: inline-block;
}
.col li a:hover { color: var(--gold); padding-left: 8px; }

.massive {
  font-family: var(--font-display); font-weight: 900;
  font-size: clamp(72px, 16vw, 240px); line-height: 0.85;
  letter-spacing: -0.03em; text-transform: uppercase; text-align: center;
  color: transparent; -webkit-text-stroke: 1.5px var(--hairline-strong);
  padding: 48px 0 0; overflow: hidden; user-select: none;
}
.massive .italic { -webkit-text-stroke: 0; color: var(--gold); }

.bottom { display: flex; justify-content: space-between; padding-top: 24px; color: var(--cream-dim); font-size: 10.5px; }

@media (max-width: 768px) {
  .top { grid-template-columns: 1fr 1fr; gap: 32px; }
  .footer { padding: 56px 20px 20px; }
  .bottom { flex-direction: column; gap: 8px; text-align: center; }
}
@media (max-width: 480px) {
  .top { grid-template-columns: 1fr; }
}
```

- [ ] **Step 3: Mount Nav and Footer in the root layout**

Replace `web/app/layout.tsx`:
```tsx
import type { Metadata } from 'next';
import '../styles/globals.css';
import { bigShoulders, instrumentSerif, jetbrains } from './fonts';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rooted Creations Co. — Custom Apparel + Graphic Design / San Antonio, TX',
  description: 'Custom apparel and graphic design, handprinted in San Antonio. Designs made for people, families, and small businesses with something to say.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

Run `npm run dev`. Visit `/`, `/preview`. Expected: utility bar with scrolling middle marquee, sticky nav with centered brand, footer at bottom with massive outline logotype. Resize to mobile — nav collapses, hamburger appears, footer columns stack. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add web/
git commit -m "feat: Nav (sticky, mobile-toggleable) and Footer"
```

---

## Task 6: Home Page

**Files:**
- Modify: `web/app/page.tsx`
- Create: `web/app/page.module.css`
- Create: `web/components/Hero.tsx`, `web/components/Hero.module.css`
- Create: `web/components/Categories.tsx`, `web/components/Categories.module.css`
- Create: `web/components/Process.tsx`, `web/components/Process.module.css`
- Create: `web/components/NewsletterCTA.tsx`, `web/components/NewsletterCTA.module.css`

- [ ] **Step 1: Build the Hero (Print Shop Editorial remix)**

Create `web/components/Hero.tsx`:
```tsx
import { Seal } from './Seal';
import { Stamp } from './Stamp';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.halftone} aria-hidden />
      <div className={styles.diagonal} aria-hidden />

      <div className={styles.top}>
        <span className={`mono ${styles.eyebrowLeft}`}>
          Vol. <span className={styles.gold}>01</span> · Spring &rsquo;26
        </span>
        <div className={styles.sealWrap}><Seal size={130} /></div>
        <span className={`mono ${styles.eyebrowRight}`}>SA · TX · &rsquo;24</span>
      </div>

      <div className={styles.stage}>
        <Stamp>Limited · N° 047</Stamp>
        <h1 className={styles.headline}>
          <span className={styles.line}>All Designs.</span>
          <span className={styles.line}>
            <em className={styles.italic}>All</em>{' '}
            <span>Rooted</span>
            <span className={styles.brick}>.</span>
          </span>
        </h1>
        <p className={styles.tag}>
          Custom apparel &amp; graphic design. <span className={styles.star}>★</span> Handprinted by hand in San&nbsp;Antonio, TX.
        </p>
      </div>

      <div className={styles.numbering}>
        <span>Edition</span>
        <strong>N° 01 / 12</strong>
      </div>

      <div className={styles.strip}>
        <span>★ Custom Tees · Hoodies · Custom Work</span>
        <span className={styles.arrow}>→</span>
      </div>
    </section>
  );
}
```

Create `web/components/Hero.module.css`:
```css
.hero {
  position: relative;
  padding: 56px 32px 0;
  min-height: 86vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.halftone {
  position: absolute; inset: 0;
  opacity: 0.08; pointer-events: none;
  background-image: radial-gradient(var(--gold) 1px, transparent 1.6px);
  background-size: 11px 11px;
  -webkit-mask-image: radial-gradient(ellipse 60% 55% at 100% 0%, #000 0%, transparent 70%);
  mask-image: radial-gradient(ellipse 60% 55% at 100% 0%, #000 0%, transparent 70%);
}
.diagonal {
  position: absolute; bottom: 22%; right: -80px;
  width: 280px; height: 1.5px;
  background: var(--brick);
  transform: rotate(-22deg);
  transform-origin: right center;
  opacity: 0.55;
}

.top {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  position: relative;
  z-index: 2;
  padding-bottom: 32px;
  color: var(--gold-soft);
}
.eyebrowLeft { justify-self: start; }
.eyebrowRight { justify-self: end; }
.gold { color: var(--gold); }
.sealWrap { position: relative; z-index: 3; }

.stage {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 22px;
  margin: 32px 0;
}
.stage > :global(.mono),
.stage > span:first-child { align-self: flex-start; }

.headline {
  font-family: var(--font-display);
  font-weight: 900;
  font-size: clamp(72px, 14vw, 240px);
  line-height: 0.78;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  transform: translateY(40px);
  opacity: 0;
  animation: rise 1.1s cubic-bezier(.2,.8,.2,1) 0.15s forwards;
}
.line { display: block; }
.italic {
  font-family: var(--font-serif);
  font-style: italic;
  font-weight: 400;
  color: var(--gold);
  text-transform: none;
  letter-spacing: -0.015em;
  font-size: inherit;
}
.brick { color: var(--brick); }
@keyframes rise { to { transform: translateY(0); opacity: 1; } }

.tag {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(15px, 2vw, 20px);
  color: var(--cream-dim);
  max-width: 480px;
  line-height: 1.4;
}
.star { color: var(--gold); }

.numbering {
  position: absolute;
  bottom: 80px; left: 32px;
  display: flex; flex-direction: column; gap: 4px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--gold-soft);
  z-index: 2;
}
.numbering strong { color: var(--gold); font-weight: 500; font-size: 12px; }

.strip {
  background: var(--gold);
  color: var(--ink);
  margin: 0 -32px;
  padding: 14px 32px;
  font-family: var(--font-display);
  font-weight: 900;
  font-size: 17px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 2;
}
.arrow { color: var(--brick); }

@media (max-width: 768px) {
  .hero { padding: 32px 20px 0; min-height: 70vh; }
  .top { grid-template-columns: 1fr; gap: 24px; text-align: center; }
  .eyebrowLeft, .eyebrowRight { justify-self: center; }
  .sealWrap :global(svg) { width: 90px; height: 90px; }
  .numbering { display: none; }
  .strip { margin: 0 -20px; padding: 12px 20px; font-size: 14px; }
}
```

- [ ] **Step 2: Build the Categories component**

Create `web/components/Categories.tsx`:
```tsx
import Link from 'next/link';
import styles from './Categories.module.css';

const cats = [
  { num: '01', name: 'Custom T-Shirts', count: '4 styles', href: '/shop?cat=tees', icon: 'tee' },
  { num: '02', name: 'Hoodies & Sweats', count: '3 styles', href: '/shop?cat=hoodies', icon: 'hoodie' },
  { num: '03', name: 'Onesies & Youth', count: '2 styles', href: '/shop?cat=youth', icon: 'onesie' },
  { num: '04', name: 'Accessories', count: '3 styles', href: '/shop?cat=accessories', icon: 'bag' },
  { num: '05', name: 'Custom Designs', count: 'By appointment', href: '/custom', icon: 'pencil', dark: true },
];

const icons: Record<string, React.ReactNode> = {
  tee: (
    <svg viewBox="0 0 60 50" height="56"><path d="M10 18 L20 8 Q30 18 40 8 L50 18 L57 30 L48 33 L48 48 L12 48 L12 33 L3 30 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  hoodie: (
    <svg viewBox="0 0 60 50" height="56"><path d="M10 18 L20 8 Q30 22 40 8 L50 18 L57 30 L48 33 L48 48 L12 48 L12 33 L3 30 Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M20 8 Q30 28 40 8" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M22 36 L38 36 L41 46 L19 46 Z" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
  ),
  onesie: (
    <svg viewBox="0 0 60 50" height="56"><path d="M14 14 L22 6 Q30 14 38 6 L46 14 L52 24 L46 28 L46 40 Q46 48 30 48 Q14 48 14 40 L14 28 L8 24 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  bag: (
    <svg viewBox="0 0 60 50" height="56"><path d="M12 18 L48 18 L52 48 L8 48 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M22 18 Q22 6 30 6 Q38 6 38 18" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
  pencil: (
    <svg viewBox="0 0 60 50" height="56"><path d="M8 42 L8 36 L36 8 L42 14 L14 42 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M32 12 L38 18" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
};

export function Categories() {
  return (
    <div className={styles.grid}>
      {cats.map((c) => (
        <Link href={c.href} key={c.num} className={`${styles.cat} ${c.dark ? styles.dark : ''}`}>
          <span className={`mono ${styles.num}`}>{c.num}</span>
          <div className={styles.icon}>{icons[c.icon]}</div>
          <div className={styles.name}>{c.name}</div>
          <div className={`mono ${styles.line}`}>
            <span>{c.count}</span>
            <span className={styles.arrow}>→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
```

Create `web/components/Categories.module.css`:
```css
.grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid var(--hairline);
  border-bottom: 1px solid var(--hairline);
}
.cat {
  padding: 40px 24px 32px;
  border-right: 1px solid var(--hairline);
  display: flex;
  flex-direction: column;
  gap: 24px;
  min-height: 300px;
  color: var(--cream);
  transition: background 0.3s ease;
}
.cat:last-child { border-right: none; }
.cat:hover { background: var(--ink-soft); }
.cat.dark { background: var(--gold); color: var(--ink); }
.cat.dark:hover { background: #C49636; }
.num { color: var(--gold); }
.cat.dark .num { color: var(--brick); }
.icon { height: 60px; display: flex; align-items: center; }
.name { font-family: var(--font-display); font-weight: 900; font-size: 24px; letter-spacing: 0.005em; text-transform: uppercase; line-height: 1; }
.line { color: var(--cream-dim); margin-top: auto; display: flex; justify-content: space-between; align-items: center; }
.cat.dark .line { color: rgba(12, 10, 7, 0.7); }
.arrow { transition: transform 0.3s ease; }
.cat:hover .arrow { transform: translateX(6px); }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .cat { border-bottom: 1px solid var(--hairline); }
  .cat:nth-child(2n) { border-right: none; }
  .cat:last-child { grid-column: 1 / -1; }
}
@media (max-width: 480px) {
  .grid { grid-template-columns: 1fr; }
  .cat { border-right: none; }
  .cat:last-child { grid-column: auto; }
}
```

- [ ] **Step 3: Build the Process component**

Create `web/components/Process.tsx`:
```tsx
import styles from './Process.module.css';

const steps = [
  { num: '01', title: 'Design', body: 'Tell us what you need. We sketch, mock up, and refine until it feels right — built for you, not pulled off a template.' },
  { num: '02', title: 'Print', body: 'Once approved, we print in-house on premium blanks. Inventory is managed and quality-checked by hand, piece by piece.' },
  { num: '03', title: 'Deliver', body: 'Local pickup in San Antonio or shipped to your door. Built to last, made to leave a mark.' },
];

export function Process() {
  return (
    <section className={styles.process}>
      <div className={styles.head}>
        <h3 className={styles.title}>From sketch <em className={styles.italic}>to stitch.</em></h3>
        <p className={`mono ${styles.aside}`}>A simple three-step process. Most projects ship in 7–10 days.</p>
      </div>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.num}>{s.num}</div>
            <h4 className={styles.stepTitle}>{s.title}</h4>
            <p className={styles.body}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

Create `web/components/Process.module.css`:
```css
.process { padding: 96px 32px; background: var(--ink-soft); border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); }
.head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 48px; gap: 32px; }
.title { font-family: var(--font-display); font-weight: 900; font-size: clamp(40px, 5.5vw, 72px); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.01em; }
.italic { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.aside { color: var(--cream-dim); max-width: 280px; text-align: right; }
.grid { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--hairline); }
.step { padding: 36px 28px 0 0; border-right: 1px solid var(--hairline); display: flex; flex-direction: column; gap: 16px; }
.step:last-child { border-right: none; }
.step:not(:first-child) { padding-left: 28px; }
.num { font-family: var(--font-display); font-weight: 900; font-size: 72px; line-height: 0.9; color: var(--gold); letter-spacing: -0.01em; }
.stepTitle { font-family: var(--font-display); font-weight: 900; font-size: 26px; text-transform: uppercase; letter-spacing: 0.01em; }
.body { color: var(--cream-dim); font-size: 16px; max-width: 320px; line-height: 1.5; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; }
  .step { border-right: none; border-bottom: 1px solid var(--hairline); padding: 24px 0; }
  .step:not(:first-child) { padding-left: 0; }
  .step:last-child { border-bottom: none; }
  .head { flex-direction: column; align-items: start; }
  .aside { text-align: left; }
}
```

- [ ] **Step 4: Build the Newsletter CTA**

Create `web/components/NewsletterCTA.tsx` (client for form interaction):
```tsx
'use client';

import { useState } from 'react';
import styles from './NewsletterCTA.module.css';

export function NewsletterCTA() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('loading');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          Stay <em className={styles.italic}>rooted.</em>
        </h3>
        <div>
          <p className={styles.lead}>First dibs on new drops, custom slots, and shop news. No spam — just the good stuff, a few times a season.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              aria-label="Email address"
              disabled={status === 'loading' || status === 'success'}
            />
            <button type="submit" disabled={status === 'loading' || status === 'success'}>
              {status === 'success' ? 'Subscribed ✓' : status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && <p className={styles.error}>Something went wrong — try again or DM us.</p>}
          <p className={`mono ${styles.disclaimer}`}>By subscribing you agree to occasional emails from Rooted Creations Co.</p>
        </div>
      </div>
    </section>
  );
}
```

Create `web/components/NewsletterCTA.module.css`:
```css
.cta { background: var(--gold); color: var(--ink); padding: 88px 32px; position: relative; overflow: hidden; }
.cta::before, .cta::after {
  content: '✺'; position: absolute; color: rgba(12, 10, 7, 0.08); font-size: 260px; line-height: 1;
}
.cta::before { top: -60px; right: -40px; }
.cta::after { bottom: -100px; left: -50px; }

.inner { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: center; position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; }
.title { font-family: var(--font-display); font-weight: 900; font-size: clamp(48px, 6.5vw, 96px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.015em; }
.italic { font-family: var(--font-serif); font-style: italic; font-weight: 400; text-transform: none; }
.lead { font-family: var(--font-serif); font-size: 20px; margin-bottom: 24px; line-height: 1.45; max-width: 460px; }
.form { display: flex; border: 1.5px solid var(--ink); background: rgba(12, 10, 7, 0.05); }
.form input { flex: 1; background: transparent; border: none; padding: 16px 20px; color: var(--ink); font-family: var(--font-serif); font-size: 18px; outline: none; }
.form input::placeholder { color: rgba(12, 10, 7, 0.5); }
.form button { background: var(--ink); color: var(--cream); padding: 0 26px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; transition: background 0.3s ease; cursor: pointer; }
.form button:hover { background: var(--brick); }
.form button:disabled { opacity: 0.7; cursor: default; }
.disclaimer { margin-top: 14px; color: rgba(12, 10, 7, 0.65); font-size: 10px; }
.error { color: var(--brick); margin-top: 12px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; }

@media (max-width: 1024px) { .inner { grid-template-columns: 1fr; gap: 32px; } }
@media (max-width: 480px) { .form { flex-direction: column; } .form button { padding: 14px; } }
```

- [ ] **Step 5: Assemble the Home page**

Create `web/app/page.module.css`:
```css
.section { padding: 96px 32px; }
.sectionMuted { padding: 96px 32px; background: var(--ink-soft); }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px 22px; }
.customTeaser { padding: 96px 32px; background: var(--ink); }
.customGrid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; max-width: 1200px; margin: 0 auto; }
.customHead { font-family: var(--font-display); font-weight: 900; font-size: clamp(40px, 5.5vw, 72px); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.015em; margin: 24px 0; }
.customHead em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.customLead { font-family: var(--font-serif); font-size: 19px; color: var(--cream-dim); margin-bottom: 28px; max-width: 460px; line-height: 1.45; }
.customTags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 32px; }
.customTag { border: 1px solid var(--hairline-strong); padding: 8px 14px; border-radius: 100px; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--cream-dim); }
.cta { display: inline-flex; align-items: center; gap: 12px; background: var(--gold); color: var(--ink); padding: 16px 24px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; transition: all 0.3s ease; }
.cta:hover { background: var(--cream); gap: 18px; }
.customVisual { position: relative; aspect-ratio: 1; }
.visualBox { position: absolute; }
.box1 { inset: 0 30% 30% 0; background: var(--brick); }
.box2 { inset: 25% 0 0 30%; background: var(--cream); display: flex; align-items: center; justify-content: center; padding: 32px; }
.box3 { inset: 65% 50% 0 0; background: var(--gold); }
.stamp { position: absolute; top: -16px; right: -16px; width: 100px; height: 100px; background: var(--ink); color: var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; transform: rotate(-12deg); font-family: var(--font-display); font-weight: 900; font-size: 14px; line-height: 1; letter-spacing: 0.04em; text-transform: uppercase; padding: 14px; z-index: 4; border: 1.5px solid var(--gold); }

.aboutTeaser { padding: 120px 32px; text-align: center; max-width: 900px; margin: 0 auto; }
.aboutPull { font-family: var(--font-display); font-weight: 900; font-size: clamp(56px, 9vw, 120px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.02em; }
.aboutPull em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.aboutBody { margin: 32px auto 0; max-width: 560px; font-family: var(--font-serif); font-size: 19px; color: var(--cream-dim); line-height: 1.55; }
.aboutLink { display: inline-flex; align-items: center; gap: 10px; margin-top: 28px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold); padding-bottom: 4px; border-bottom: 1px solid var(--gold); transition: gap 0.3s ease; }
.aboutLink:hover { gap: 16px; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
  .customGrid { grid-template-columns: 1fr; gap: 32px; }
}
@media (max-width: 640px) {
  .grid { grid-template-columns: 1fr; }
  .section, .sectionMuted, .customTeaser, .aboutTeaser { padding-left: 20px; padding-right: 20px; }
}
```

Replace `web/app/page.tsx`:
```tsx
import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { SectionHead } from '@/components/SectionHead';
import { ProductCard } from '@/components/ProductCard';
import { Categories } from '@/components/Categories';
import { Process } from '@/components/Process';
import { NewsletterCTA } from '@/components/NewsletterCTA';
import { products } from '@/data/products';
import styles from './page.module.css';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />

      <Marquee
        variant="ink"
        items={['CUSTOM TEES', 'GRAPHIC DESIGN', 'HOODIES & CREWNECKS', 'LOCAL BRANDING', 'MADE IN SA']}
      />

      <section className={styles.section}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints, made in small batches. Each piece designed and printed in-house in San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
        <div className={styles.grid}>
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} total={featured.length} />
          ))}
        </div>
      </section>

      <section className={styles.sectionMuted}>
        <SectionHead
          idx="02 / Categories"
          title={<>Five ways <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>to wear it</em></>}
          aside="A growing catalog of custom designs, available across our core blanks."
        />
        <Categories />
      </section>

      <section className={styles.customTeaser}>
        <div className={styles.customGrid}>
          <div className={styles.customVisual}>
            <div className={`${styles.visualBox} ${styles.box1}`} />
            <div className={`${styles.visualBox} ${styles.box2}`}>
              <svg viewBox="0 0 200 200" width="80%" aria-hidden>
                <g transform="translate(100 100)" stroke="#0C0A07" strokeWidth="1.4" fill="none">
                  <circle r="78" /><circle r="60" />
                  <text fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3" fill="#0C0A07" textAnchor="middle" y="-66">YOUR LOGO HERE</text>
                  <text fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3" fill="#0C0A07" textAnchor="middle" y="72">CUSTOM · DESIGN · CO.</text>
                </g>
                <g transform="translate(100 100)">
                  <text textAnchor="middle" fontFamily="var(--font-display)" fontWeight="900" fontSize="30" letterSpacing="2" y="-4" fill="#B8412A">YOURS</text>
                  <text textAnchor="middle" fontFamily="var(--font-serif)" fontStyle="italic" fontSize="22" y="22" fill="#0C0A07">rooted</text>
                </g>
              </svg>
            </div>
            <div className={`${styles.visualBox} ${styles.box3}`} />
            <div className={styles.stamp}>Free<br />Quote<br />★</div>
          </div>
          <div>
            <span className={`mono`} style={{ color: 'var(--gold)' }}>— 03 / Custom Work</span>
            <h3 className={styles.customHead}>Bring us <em>your idea.</em></h3>
            <p className={styles.customLead}>
              We design and print custom apparel for small businesses, churches, schools, family reunions, birthdays, weddings, and one-off projects worth making real.
            </p>
            <div className={styles.customTags}>
              <span className={styles.customTag}>Local Business Branding</span>
              <span className={styles.customTag}>Team Apparel</span>
              <span className={styles.customTag}>Family Reunions</span>
              <span className={styles.customTag}>Birthdays &amp; Events</span>
              <span className={styles.customTag}>Weddings</span>
              <span className={styles.customTag}>Memorials</span>
            </div>
            <Link href="/custom" className={styles.cta}>Start a Project <span>→</span></Link>
          </div>
        </div>
      </section>

      <Process />

      <section className={styles.aboutTeaser}>
        <h3 className={styles.aboutPull}>Rooted here.<br /><em>Worn anywhere.</em></h3>
        <p className={styles.aboutBody}>
          A one-person studio born out of a love for great type, local pride, and the feeling of putting on a shirt that actually means something. Every order made by hand, in San Antonio.
        </p>
        <Link href="/about" className={styles.aboutLink}>Read the story <span>→</span></Link>
      </section>

      <NewsletterCTA />
    </>
  );
}
```

- [ ] **Step 6: Verify**

Run `npm run dev`. Open `/`. Expected:
- Sticky nav at top.
- Hero with rotating seal, halftone in corner, layered headline ("ALL DESIGNS." / "All Rooted."), brick stamp, edition number, gold strip at bottom.
- Ink marquee.
- 4-card product grid.
- 5-column categories.
- Custom work teaser with overlapping color blocks + "Free Quote ★" stamp.
- Process strip.
- About teaser ("Rooted here. Worn anywhere.").
- Gold newsletter CTA.
- Footer.

Test mobile (devtools narrow viewport). Stop dev server.

- [ ] **Step 7: Commit**

```bash
git add web/
git commit -m "feat: Home page assembled (Hero, Categories, Process, Custom teaser, About teaser, Newsletter)"
```

---

## Task 7: Shop Page (Product Listing)

**Files:**
- Create: `web/app/shop/page.tsx`
- Create: `web/app/shop/page.module.css`
- Create: `web/components/CategoryFilter.tsx`, `web/components/CategoryFilter.module.css`

- [ ] **Step 1: Build CategoryFilter (client component)**

Create `web/components/CategoryFilter.tsx`:
```tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import styles from './CategoryFilter.module.css';

const filters = [
  { key: 'all', label: 'All' },
  { key: 'tees', label: 'Tees' },
  { key: 'hoodies', label: 'Hoodies' },
  { key: 'youth', label: 'Youth' },
  { key: 'accessories', label: 'Accessories' },
];

export function CategoryFilter() {
  const router = useRouter();
  const params = useSearchParams();
  const active = params.get('cat') ?? 'all';

  function set(key: string) {
    const url = key === 'all' ? '/shop' : `/shop?cat=${key}`;
    router.push(url, { scroll: false });
  }

  return (
    <div className={styles.filter}>
      {filters.map((f) => (
        <button
          key={f.key}
          className={`${styles.chip} ${active === f.key ? styles.active : ''}`}
          onClick={() => set(f.key)}
          type="button"
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
```

Create `web/components/CategoryFilter.module.css`:
```css
.filter { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 40px; }
.chip {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.14em; text-transform: uppercase;
  padding: 9px 16px; border-radius: 100px;
  border: 1px solid var(--hairline-strong);
  color: var(--cream-dim);
  transition: all 0.3s ease;
  cursor: pointer;
}
.chip:hover { color: var(--cream); border-color: var(--cream); }
.chip.active { background: var(--gold); color: var(--ink); border-color: var(--gold); }
```

- [ ] **Step 2: Build the Shop page**

Create `web/app/shop/page.module.css`:
```css
.shop { padding: 80px 32px 96px; }
.grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px 24px; }
.empty { padding: 64px 0; text-align: center; color: var(--cream-dim); font-family: var(--font-serif); font-style: italic; font-size: 19px; }

@media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } .shop { padding: 56px 20px 64px; } }
@media (max-width: 480px) { .grid { grid-template-columns: 1fr; } }
```

Create `web/app/shop/page.tsx`:
```tsx
import { SectionHead } from '@/components/SectionHead';
import { ProductCard } from '@/components/ProductCard';
import { CategoryFilter } from '@/components/CategoryFilter';
import { products, type ProductCategory } from '@/data/products';
import styles from './page.module.css';

const validCats: ProductCategory[] = ['tees', 'hoodies', 'youth', 'accessories'];

export default async function Shop({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const { cat } = await searchParams;
  const category = (validCats as string[]).includes(cat ?? '') ? (cat as ProductCategory) : null;
  const filtered = category ? products.filter((p) => p.category === category) : products;

  return (
    <main className={styles.shop}>
      <SectionHead
        idx="01 / The Catalog"
        title={<>Everything <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
        aside="Custom prints in small batches. Tap a category to filter."
      />
      <CategoryFilter />
      {filtered.length === 0 ? (
        <p className={styles.empty}>Nothing in this category yet — check back soon, or <a href="/custom" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>request a custom piece</a>.</p>
      ) : (
        <div className={styles.grid}>
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} total={filtered.length} />
          ))}
        </div>
      )}
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Open `/shop`. Expected: 10 product cards. Click "Tees" — URL becomes `/shop?cat=tees`, grid filters to 3 cards. Click "All" — back to 10. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add web/
git commit -m "feat: Shop page with category filter"
```

---

## Task 8: Product Detail Page (PDP)

**Files:**
- Create: `web/app/shop/[slug]/page.tsx`
- Create: `web/app/shop/[slug]/page.module.css`
- Create: `web/components/ProductGallery.tsx`, `web/components/ProductGallery.module.css`
- Create: `web/components/ProductInquire.tsx`, `web/components/ProductInquire.module.css`

- [ ] **Step 1: Build ProductGallery (client, thumbnail switching)**

Create `web/components/ProductGallery.tsx`:
```tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image src={main} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
            >
              <Image src={src} alt="" fill sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

Create `web/components/ProductGallery.module.css`:
```css
.gallery { display: flex; flex-direction: column; gap: 12px; }
.main { position: relative; aspect-ratio: 4/5; background: var(--ink-soft); border: 1px solid var(--hairline); overflow: hidden; }
.main :global(img) { object-fit: cover; }
.thumbs { display: flex; gap: 10px; }
.thumb { position: relative; width: 88px; height: 110px; border: 1px solid var(--hairline); background: var(--ink-soft); padding: 0; cursor: pointer; transition: border-color 0.3s ease; }
.thumb :global(img) { object-fit: cover; }
.thumbActive { border-color: var(--gold); }
```

- [ ] **Step 2: Build ProductInquire (client, dynamic mailto)**

Create `web/components/ProductInquire.tsx`:
```tsx
'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import styles from './ProductInquire.module.css';

export function ProductInquire({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  const href = useMemo(() => {
    const subject = encodeURIComponent(`Order: ${product.name} (${size}, ${color})`);
    const body = encodeURIComponent(
      `Hi Rooted Creations Co.,\n\nI'd like to order:\n` +
      `• ${product.name} — $${product.price}\n` +
      `• Size: ${size}\n` +
      `• Color: ${color}\n\n` +
      `Let me know payment + pickup/shipping details when you get a chance. Thanks!\n`
    );
    return `mailto:hello@rootedcreations.co?subject=${subject}&body=${body}`;
  }, [product, size, color]);

  return (
    <div className={styles.inquire}>
      <div className={styles.group}>
        <label className={`mono ${styles.label}`}>Size</label>
        <div className={styles.options}>
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.opt} ${s === size ? styles.optActive : ''}`}
              onClick={() => setSize(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={`mono ${styles.label}`}>Color</label>
        <div className={styles.options}>
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.opt} ${c === color ? styles.optActive : ''}`}
              onClick={() => setColor(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      <a href={href} className={styles.btn}>
        Inquire to Order <span>→</span>
      </a>
      <p className={styles.note}>Orders run on email + Venmo or cash at pickup. We&rsquo;ll reach out within a day.</p>
    </div>
  );
}
```

Create `web/components/ProductInquire.module.css`:
```css
.inquire { display: flex; flex-direction: column; gap: 24px; }
.group { display: flex; flex-direction: column; gap: 10px; }
.label { color: var(--gold-soft); }
.options { display: flex; flex-wrap: wrap; gap: 8px; }
.opt {
  font-family: var(--font-mono); font-size: 11px;
  letter-spacing: 0.12em; text-transform: uppercase;
  padding: 9px 14px; min-width: 48px;
  border: 1px solid var(--hairline-strong);
  background: transparent; color: var(--cream);
  transition: all 0.2s ease; cursor: pointer;
}
.opt:hover { border-color: var(--cream); }
.optActive { background: var(--gold); color: var(--ink); border-color: var(--gold); }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 12px;
  background: var(--gold); color: var(--ink);
  padding: 18px 28px;
  font-family: var(--font-mono); font-size: 12px;
  letter-spacing: 0.2em; text-transform: uppercase;
  transition: all 0.3s ease;
  margin-top: 8px;
}
.btn:hover { background: var(--cream); gap: 18px; }
.note { font-family: var(--font-serif); font-style: italic; color: var(--cream-dim); font-size: 14px; }
```

- [ ] **Step 3: Build the PDP page**

Create `web/app/shop/[slug]/page.module.css`:
```css
.pdp { padding: 56px 32px 96px; max-width: 1280px; margin: 0 auto; }
.crumb { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--gold-soft); margin-bottom: 32px; }
.crumb a { color: var(--gold); }
.crumb a:hover { text-decoration: underline; }

.layout { display: grid; grid-template-columns: 1.1fr 1fr; gap: 64px; align-items: start; }

.info { display: flex; flex-direction: column; gap: 20px; }
.tags { display: flex; gap: 8px; }
.tagPill {
  font-family: var(--font-mono); font-size: 9.5px;
  letter-spacing: 0.18em; text-transform: uppercase;
  padding: 4px 10px; border: 1px solid var(--gold);
  color: var(--gold);
}
.name { font-family: var(--font-display); font-weight: 900; font-size: clamp(40px, 5.5vw, 72px); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.015em; }
.edition { color: var(--gold-soft); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; }
.price { font-family: var(--font-display); font-weight: 700; font-size: 28px; color: var(--gold); }
.tagline { font-family: var(--font-serif); font-style: italic; font-size: 18px; color: var(--cream-dim); }
.description { font-family: var(--font-serif); font-size: 17px; line-height: 1.55; color: var(--cream); }

.rule { height: 1px; background: var(--hairline); margin: 8px 0; }

.madeFor { padding: 64px 0; border-top: 1px solid var(--hairline); margin-top: 80px; }
.madeForTitle { font-family: var(--font-display); font-weight: 900; font-size: clamp(32px, 4vw, 48px); text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 16px; }
.madeForTitle em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.madeForBody { font-family: var(--font-serif); font-size: 18px; color: var(--cream-dim); max-width: 640px; line-height: 1.55; margin-bottom: 24px; }
.madeForLink { display: inline-flex; align-items: center; gap: 10px; color: var(--gold); border-bottom: 1px solid var(--gold); padding-bottom: 4px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; transition: gap 0.3s ease; }
.madeForLink:hover { gap: 16px; }

.related { padding-top: 64px; border-top: 1px solid var(--hairline); }
.relatedGrid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }

@media (max-width: 1024px) {
  .layout { grid-template-columns: 1fr; }
  .relatedGrid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .pdp { padding: 32px 20px 64px; }
  .relatedGrid { grid-template-columns: 1fr; }
}
```

Create `web/app/shop/[slug]/page.tsx`:
```tsx
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getRelatedProducts, products } from '@/data/products';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInquire } from '@/components/ProductInquire';
import { ProductCard } from '@/components/ProductCard';
import styles from './page.module.css';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);
  const tags: string[] = [];
  if (product.isNew) tags.push('New');
  if (product.isLimited) tags.push('Limited');
  if (product.isBestseller) tags.push('Bestseller');

  return (
    <main className={styles.pdp}>
      <div className={styles.crumb}>
        <Link href="/shop">Shop</Link> &nbsp;/&nbsp; <span>{product.name}</span>
      </div>

      <div className={styles.layout}>
        <ProductGallery images={product.images} alt={product.name} />

        <div className={styles.info}>
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => <span key={t} className={styles.tagPill}>{t}</span>)}
            </div>
          )}
          <h1 className={styles.name}>{product.name}</h1>
          {product.edition && <span className={styles.edition}>{product.edition}</span>}
          <span className={styles.price}>${product.price}</span>
          <p className={styles.tagline}>{product.tagline}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.rule} />
          <ProductInquire product={product} />
        </div>
      </div>

      <section className={styles.madeFor}>
        <h2 className={styles.madeForTitle}>Want this <em>customized?</em></h2>
        <p className={styles.madeForBody}>
          Every piece in the shop can be reworked with your name, your business, your event, or a custom design. Tell us what you're picturing — we'll build it.
        </p>
        <Link href="/custom" className={styles.madeForLink}>Start a custom request <span>→</span></Link>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.madeForTitle}>You might also <em>like</em></h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} total={related.length} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
```

- [ ] **Step 4: Verify**

Run `npm run dev`. Visit `/shop/rooted-heritage-tee`. Expected: gallery on left, info on right with tags, name, edition, price, tagline, description, size/color pickers, "Inquire to Order" button. Click size/color buttons — selection highlights with gold. Click "Inquire to Order" — opens mail client with pre-filled subject `Order: Rooted Heritage Tee (S, Ink)`. Scroll down — see "Want this customized?" and related products. Stop dev server.

- [ ] **Step 5: Commit**

```bash
git add web/
git commit -m "feat: product detail page with gallery and inquire flow"
```

---

## Task 9: Custom Work Page

**Files:**
- Create: `web/app/custom/page.tsx`
- Create: `web/app/custom/page.module.css`
- Create: `web/components/CustomIntakeForm.tsx`, `web/components/CustomIntakeForm.module.css`

- [ ] **Step 1: Build CustomIntakeForm**

Create `web/components/CustomIntakeForm.tsx`:
```tsx
'use client';

import { useState } from 'react';
import styles from './CustomIntakeForm.module.css';

export function CustomIntakeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_CUSTOM_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successMark}>✓</div>
        <h3 className={styles.successTitle}>Request sent.</h3>
        <p className={styles.successBody}>We&rsquo;ll reach back out within 2 business days. In the meantime, follow along on Instagram <a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a>.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Phone (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Target Deadline</span>
          <input name="deadline" type="date" />
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={`mono ${styles.label}`}>Project Type</legend>
        <div className={styles.radios}>
          {[
            { v: 'business', l: 'Local Business' },
            { v: 'team', l: 'Team / Staff' },
            { v: 'family', l: 'Family / Reunion' },
            { v: 'event', l: 'Event / Birthday' },
            { v: 'wedding', l: 'Wedding' },
            { v: 'other', l: 'Other' },
          ].map((opt) => (
            <label key={opt.v} className={styles.radio}>
              <input type="radio" name="projectType" value={opt.v} required />
              <span>{opt.l}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Approximate Quantity</span>
        <input name="quantity" type="text" placeholder="e.g. 25 shirts, 10 hoodies" required />
      </label>

      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Tell us about it</span>
        <textarea name="description" rows={6} required placeholder="What's the project, the vibe, the deadline pressure? Anything we should know."></textarea>
      </label>

      <button type="submit" className={styles.submit} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Request'} <span>→</span>
      </button>

      {status === 'error' && <p className={styles.error}>Couldn&rsquo;t send. Try again, or email us directly at hello@rootedcreations.co.</p>}
    </form>
  );
}
```

Create `web/components/CustomIntakeForm.module.css`:
```css
.form { display: flex; flex-direction: column; gap: 24px; }
.row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.label { color: var(--gold-soft); }

.field input, .field textarea {
  background: var(--ink-soft);
  border: 1px solid var(--hairline-strong);
  color: var(--cream);
  padding: 14px 16px;
  font-family: var(--font-serif);
  font-size: 17px;
  outline: none;
  transition: border-color 0.3s ease;
}
.field input:focus, .field textarea:focus { border-color: var(--gold); }
.field textarea { resize: vertical; min-height: 140px; }

.fieldset { border: none; padding: 0; display: flex; flex-direction: column; gap: 12px; }
.radios { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
.radio { display: flex; align-items: center; gap: 10px; padding: 14px 16px; border: 1px solid var(--hairline-strong); cursor: pointer; transition: all 0.2s ease; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--cream-dim); }
.radio:hover { color: var(--cream); border-color: var(--cream); }
.radio input { accent-color: var(--gold); }
.radio:has(input:checked) { background: var(--gold); color: var(--ink); border-color: var(--gold); }

.submit {
  align-self: flex-start;
  display: inline-flex; align-items: center; gap: 14px;
  background: var(--gold); color: var(--ink);
  padding: 18px 28px;
  font-family: var(--font-mono); font-size: 12px;
  letter-spacing: 0.2em; text-transform: uppercase;
  transition: all 0.3s ease; cursor: pointer; margin-top: 12px;
}
.submit:hover { background: var(--cream); gap: 22px; }
.submit:disabled { opacity: 0.7; cursor: default; }

.error { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brick); }

.success { padding: 64px 0; text-align: center; }
.successMark { width: 60px; height: 60px; margin: 0 auto 20px; border: 2px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 28px; }
.successTitle { font-family: var(--font-display); font-weight: 900; font-size: 42px; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 12px; }
.successBody { font-family: var(--font-serif); font-size: 17px; color: var(--cream-dim); max-width: 480px; margin: 0 auto; line-height: 1.5; }
.successBody a { color: var(--gold); }
.successBody a:hover { text-decoration: underline; }

@media (max-width: 768px) {
  .row { grid-template-columns: 1fr; }
  .radios { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 2: Build the Custom Work page**

Create `web/app/custom/page.module.css`:
```css
.custom { padding: 64px 32px 96px; }
.intro { max-width: 900px; margin: 0 auto 80px; text-align: center; }
.eyebrow { color: var(--gold); margin-bottom: 24px; display: inline-block; }
.headline { font-family: var(--font-display); font-weight: 900; font-size: clamp(56px, 9vw, 120px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 32px; }
.headline em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.lead { font-family: var(--font-serif); font-size: 21px; color: var(--cream-dim); max-width: 640px; margin: 0 auto; line-height: 1.5; }

.examples { padding: 64px 0; border-top: 1px solid var(--hairline); border-bottom: 1px solid var(--hairline); margin-bottom: 80px; }
.examplesHead { font-family: var(--font-display); font-weight: 900; font-size: 32px; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 32px; }
.cards { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.card { background: var(--ink-soft); padding: 24px; border: 1px solid var(--hairline); display: flex; flex-direction: column; gap: 16px; aspect-ratio: 4/5; }
.cardLabel { color: var(--gold-soft); }
.cardTitle { font-family: var(--font-display); font-weight: 900; font-size: 22px; line-height: 1; text-transform: uppercase; letter-spacing: 0.01em; margin-top: auto; }
.cardMeta { font-family: var(--font-serif); font-style: italic; color: var(--cream-dim); font-size: 14px; }

.formSection { max-width: 760px; margin: 0 auto; padding: 80px 0 0; border-top: 1px solid var(--hairline); }
.formHead { text-align: center; margin-bottom: 48px; }
.formTitle { font-family: var(--font-display); font-weight: 900; font-size: clamp(40px, 5.5vw, 72px); line-height: 0.9; text-transform: uppercase; letter-spacing: -0.015em; }
.formTitle em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.formIntro { font-family: var(--font-serif); font-size: 18px; color: var(--cream-dim); margin-top: 16px; }

@media (max-width: 1024px) { .cards { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 640px) { .cards { grid-template-columns: 1fr; } .custom { padding: 40px 20px 64px; } }
```

Create `web/app/custom/page.tsx`:
```tsx
import { CustomIntakeForm } from '@/components/CustomIntakeForm';
import styles from './page.module.css';

const examples = [
  { label: 'Local Business', title: 'Coffee Shop Branding', meta: 'Staff tees + apron prints' },
  { label: 'Family Event', title: 'Reunion 2025', meta: '40 custom shirts, three generations' },
  { label: 'Wedding', title: '"He Said Yes"', meta: 'Bachelorette weekend tees' },
  { label: 'Team', title: 'Little League', meta: 'Numbered jerseys + parent hoodies' },
];

export default function CustomWork() {
  return (
    <main className={styles.custom}>
      <div className={styles.intro}>
        <span className={`mono ${styles.eyebrow}`}>— 03 / Custom Work</span>
        <h1 className={styles.headline}>
          Bring us <em>your idea.</em>
        </h1>
        <p className={styles.lead}>
          Custom apparel made for local businesses, families, teams, and one-off projects worth making real. Tell us what you&rsquo;re picturing — we&rsquo;ll handle the design, printing, and delivery.
        </p>
      </div>

      <section className={styles.examples}>
        <h2 className={styles.examplesHead}>Recent Work</h2>
        <div className={styles.cards}>
          {examples.map((e) => (
            <div key={e.title} className={styles.card}>
              <span className={`mono ${styles.cardLabel}`}>{e.label}</span>
              <span className={styles.cardTitle}>{e.title}</span>
              <span className={styles.cardMeta}>{e.meta}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formHead}>
          <h2 className={styles.formTitle}>Tell us about <em>your project.</em></h2>
          <p className={styles.formIntro}>The more detail, the faster we can quote you.</p>
        </div>
        <CustomIntakeForm />
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Visit `/custom`. Expected: centered intro with "Bring us your idea." headline, examples grid, intake form with name/email/phone/deadline/project type/quantity/description fields. Try submitting without filling required fields — browser validation kicks in. Fill all fields and submit — without a real Formspree endpoint it'll show the error state; that's fine for now. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add web/
git commit -m "feat: Custom Work page with intake form"
```

---

## Task 10: About Page

**Files:**
- Create: `web/app/about/page.tsx`
- Create: `web/app/about/page.module.css`

- [ ] **Step 1: Build the About page**

Create `web/app/about/page.module.css`:
```css
.about { padding: 80px 32px 120px; max-width: 1280px; margin: 0 auto; }

.grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 80px; align-items: start; padding-top: 40px; }

.meta { position: sticky; top: 140px; display: flex; flex-direction: column; gap: 28px; }
.star { width: 56px; height: 56px; }
.idx { color: var(--gold); }
.coords { font-family: var(--font-mono); font-size: 11px; color: var(--cream-dim); letter-spacing: 0.14em; line-height: 1.8; }
.coords strong { color: var(--cream); font-weight: 500; }

.body { }
.pull { font-family: var(--font-display); font-weight: 900; font-size: clamp(56px, 9vw, 124px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.02em; margin-bottom: 40px; }
.pull em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }
.paragraph { font-family: var(--font-serif); font-size: 21px; line-height: 1.55; color: var(--cream); margin-bottom: 24px; max-width: 660px; }
.paragraph.muted { color: var(--cream-dim); }
.paragraph:first-of-type::first-letter {
  font-family: var(--font-display); font-weight: 900; font-size: 80px; line-height: 0.8;
  float: left; padding: 6px 12px 0 0; color: var(--gold);
}

@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; gap: 32px; }
  .meta { position: static; flex-direction: row; flex-wrap: wrap; }
}
@media (max-width: 640px) { .about { padding: 40px 20px 80px; } }
```

Create `web/app/about/page.tsx`:
```tsx
import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.about}>
      <div className={styles.grid}>
        <aside className={styles.meta}>
          <svg className={styles.star} viewBox="0 0 50 50" aria-hidden>
            <g stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round">
              <line x1="25" y1="4" x2="25" y2="46" />
              <line x1="4" y1="25" x2="46" y2="25" />
              <line x1="10" y1="10" x2="40" y2="40" />
              <line x1="40" y1="10" x2="10" y2="40" />
              <circle cx="25" cy="25" r="4" fill="var(--gold)" stroke="none" />
            </g>
          </svg>
          <div className={`mono ${styles.idx}`}>04 / The Story</div>
          <div className={styles.coords}>
            <strong>San Antonio, TX</strong><br />
            29.4241° N<br />
            98.4936° W<br /><br />
            Independent &amp; locally owned<br />
            Est. 2024
          </div>
        </aside>
        <div className={styles.body}>
          <h1 className={styles.pull}>
            Rooted here.<br />
            <em>Worn anywhere.</em>
          </h1>
          <p className={styles.paragraph}>
            Rooted Creations Co. is a one-person studio born out of a love for great type, local pride, and the feeling of putting on a shirt that actually means something. We design and print custom apparel for the people, families, and small businesses we share a city with.
          </p>
          <p className={`${styles.paragraph} ${styles.muted}`}>
            We work with neighbors and small businesses across San Antonio — and ship to people across Texas who carry a piece of SA wherever they go. Every order is made by hand: designed for the customer, printed in small batches, and quality-checked piece by piece.
          </p>
          <p className={`${styles.paragraph} ${styles.muted}`}>
            If you&rsquo;ve got something to say, we&rsquo;ll help you put it on a shirt. <em style={{ color: 'var(--gold)' }}>Made with purpose. Built to leave a mark.</em>
          </p>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Verify**

Run `npm run dev`. Visit `/about`. Expected: two-column layout (sticky meta sidebar with star, "04 / The Story", coordinates / right side with massive "Rooted here. Worn anywhere." pull quote and three paragraphs, first letter drop-cap in gold). Stop dev server.

- [ ] **Step 3: Commit**

```bash
git add web/
git commit -m "feat: About page"
```

---

## Task 11: Contact Page

**Files:**
- Create: `web/app/contact/page.tsx`
- Create: `web/app/contact/page.module.css`
- Create: `web/components/ContactForm.tsx`, `web/components/ContactForm.module.css`

- [ ] **Step 1: Build ContactForm**

Create `web/components/ContactForm.tsx`:
```tsx
'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setStatus('success'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.mark}>✓</div>
        <h3>Message sent.</h3>
        <p>We&rsquo;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Name</span>
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Message</span>
        <textarea name="message" rows={6} required></textarea>
      </label>
      <button type="submit" className={styles.submit} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Message'} <span>→</span>
      </button>
      {status === 'error' && <p className={styles.error}>Couldn&rsquo;t send. Try again, or email hello@rootedcreations.co.</p>}
    </form>
  );
}
```

Create `web/components/ContactForm.module.css`:
```css
.form { display: flex; flex-direction: column; gap: 20px; }
.field { display: flex; flex-direction: column; gap: 8px; }
.label { color: var(--gold-soft); }
.field input, .field textarea {
  background: var(--ink-soft); border: 1px solid var(--hairline-strong);
  color: var(--cream); padding: 14px 16px;
  font-family: var(--font-serif); font-size: 17px;
  outline: none; transition: border-color 0.3s ease;
}
.field input:focus, .field textarea:focus { border-color: var(--gold); }
.field textarea { resize: vertical; min-height: 140px; }
.submit {
  align-self: flex-start; display: inline-flex; align-items: center; gap: 14px;
  background: var(--gold); color: var(--ink);
  padding: 16px 24px;
  font-family: var(--font-mono); font-size: 12px;
  letter-spacing: 0.2em; text-transform: uppercase;
  transition: all 0.3s ease; cursor: pointer;
}
.submit:hover { background: var(--cream); gap: 20px; }
.submit:disabled { opacity: 0.7; cursor: default; }
.error { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--brick); }

.success { padding: 48px 0; text-align: center; }
.mark { width: 56px; height: 56px; margin: 0 auto 16px; border: 2px solid var(--gold); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--gold); font-size: 24px; }
.success h3 { font-family: var(--font-display); font-weight: 900; font-size: 36px; text-transform: uppercase; letter-spacing: -0.01em; margin-bottom: 8px; }
.success p { font-family: var(--font-serif); font-style: italic; color: var(--cream-dim); }
```

- [ ] **Step 2: Build the Contact page**

Create `web/app/contact/page.module.css`:
```css
.contact { padding: 80px 32px 120px; max-width: 1100px; margin: 0 auto; }
.head { text-align: center; margin-bottom: 64px; }
.eyebrow { color: var(--gold); margin-bottom: 16px; display: inline-block; }
.title { font-family: var(--font-display); font-weight: 900; font-size: clamp(56px, 9vw, 120px); line-height: 0.85; text-transform: uppercase; letter-spacing: -0.02em; }
.title em { font-family: var(--font-serif); font-style: italic; font-weight: 400; color: var(--gold); text-transform: none; }

.grid { display: grid; grid-template-columns: 1fr 1.5fr; gap: 80px; align-items: start; padding-top: 32px; border-top: 1px solid var(--hairline); }

.info { display: flex; flex-direction: column; gap: 36px; }
.block { display: flex; flex-direction: column; gap: 8px; }
.blockLabel { color: var(--gold-soft); }
.blockValue { font-family: var(--font-display); font-weight: 900; font-size: 24px; text-transform: uppercase; letter-spacing: 0.02em; line-height: 1.1; }
.blockValue a:hover { color: var(--gold); }
.blockSub { font-family: var(--font-serif); font-style: italic; color: var(--cream-dim); font-size: 16px; }

@media (max-width: 1024px) {
  .grid { grid-template-columns: 1fr; gap: 48px; }
}
@media (max-width: 640px) { .contact { padding: 48px 20px 80px; } }
```

Create `web/app/contact/page.tsx`:
```tsx
import { ContactForm } from '@/components/ContactForm';
import styles from './page.module.css';

export default function Contact() {
  return (
    <main className={styles.contact}>
      <div className={styles.head}>
        <span className={`mono ${styles.eyebrow}`}>05 / Contact</span>
        <h1 className={styles.title}>Say <em>hello.</em></h1>
      </div>

      <div className={styles.grid}>
        <aside className={styles.info}>
          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Email</span>
            <span className={styles.blockValue}>
              <a href="mailto:hello@rootedcreations.co">hello@rootedcreations.co</a>
            </span>
            <span className={styles.blockSub}>For orders, custom requests, and general inquiries.</span>
          </div>

          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Instagram</span>
            <span className={styles.blockValue}>
              <a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a>
            </span>
            <span className={styles.blockSub}>DM us — we&rsquo;re usually quickest here.</span>
          </div>

          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Location</span>
            <span className={styles.blockValue}>San Antonio, TX</span>
            <span className={styles.blockSub}>Local pickup available. Shipping across Texas + beyond.</span>
          </div>
        </aside>

        <ContactForm />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Verify**

Run `npm run dev`. Visit `/contact`. Expected: centered "Say hello." headline; two-column grid below with email/instagram/location info on the left, contact form on the right. Stop dev server.

- [ ] **Step 4: Commit**

```bash
git add web/
git commit -m "feat: Contact page with form"
```

---

## Task 12: Smoke Tests (Playwright) + Polish

**Files:**
- Create: `web/playwright.config.ts`
- Create: `web/tests/smoke.spec.ts`
- Modify: `web/package.json` (add scripts)
- Create/modify: any pages that fail smoke checks

- [ ] **Step 1: Install Playwright**

Run from `web/`:
```bash
npm i -D @playwright/test
npx playwright install chromium
```

- [ ] **Step 2: Configure Playwright**

Create `web/playwright.config.ts`:
```ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
```

Add to `web/package.json` `scripts`:
```json
"test:e2e": "playwright test"
```

- [ ] **Step 3: Write smoke tests**

Create `web/tests/smoke.spec.ts`:
```ts
import { test, expect } from '@playwright/test';

const pages = ['/', '/shop', '/shop/rooted-heritage-tee', '/custom', '/about', '/contact'];

for (const path of pages) {
  test(`${path} renders without errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => { if (msg.type() === 'error') errors.push(msg.text()); });

    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('footer')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('shop filter works', async ({ page }) => {
  await page.goto('/shop');
  await expect(page.locator('a[href^="/shop/"]')).toHaveCount(10);
  await page.getByRole('button', { name: 'Tees' }).click();
  await expect(page).toHaveURL(/cat=tees/);
});

test('product inquire link has correct mailto', async ({ page }) => {
  await page.goto('/shop/rooted-heritage-tee');
  const link = page.locator('a[href^="mailto:"]').first();
  const href = await link.getAttribute('href');
  expect(href).toContain('hello@rootedcreations.co');
  expect(href).toContain('Order');
});

test('mobile nav toggles', async ({ page }) => {
  await page.setViewportSize({ width: 380, height: 800 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: /toggle menu/i });
  await toggle.click();
  await expect(page.getByRole('link', { name: 'Shop' })).toBeVisible();
});
```

- [ ] **Step 4: Run smoke tests**

Run from `web/`:
```bash
npm run test:e2e
```
Expected: all 9 tests pass. If any fail, debug the corresponding page (route mismatch, missing footer, console error, etc.) and re-run.

- [ ] **Step 5: Delete preview route**

Run from `web/`:
```bash
rm -rf app/preview
```
(It was scaffolding; the real pages now exist.)

- [ ] **Step 6: Production build sanity check**

Run from `web/`:
```bash
npm run build
```
Expected: build succeeds with no TypeScript or lint errors. All 6 routes appear in the output (`/`, `/about`, `/contact`, `/custom`, `/shop`, `/shop/[slug]`).

- [ ] **Step 7: Commit**

```bash
git add web/
git commit -m "test: Playwright smoke tests + delete preview route"
```

---

## Task 13: Deploy Prep

**Files:**
- Create: `README.md` (project root, not under `web/`)
- Modify: `web/.env.local.example` (already exists, may need clarification)

- [ ] **Step 1: Write the project README**

Create `/Users/jeremiah/Projects/Claude/rooted-creations/README.md`:
````markdown
# Rooted Creations Co. — Website

Custom apparel + graphic design business based in San Antonio, TX.
[@rootedcreationscotx](https://instagram.com/rootedcreationscotx)

## Project

`/web/` — Next.js (App Router, TypeScript) brochure site. Six pages, no live commerce. Black + cream + burnished gold + brick "Print Shop Editorial" aesthetic.

See:
- `docs/superpowers/specs/2026-05-22-v2-website-design.md` — design spec
- `docs/superpowers/plans/2026-05-22-v2-website-implementation.md` — implementation plan
- `CLAUDE.md` — brand voice and project notes

## Local Development

```bash
cd web
cp .env.local.example .env.local   # add real Formspree endpoint IDs
npm install
npm run dev
```

Visit http://localhost:3000.

## Editing Products

All product data lives in `web/data/products.ts`. To add, edit, or remove a product, edit that file — the shop, product details, related products, and filters update automatically.

Product images go in `web/public/images/products/` (any format `next/image` supports — `.svg`, `.jpg`, `.png`, `.webp`).

## Forms

Custom Work intake, Contact, and Newsletter forms submit to [Formspree](https://formspree.io).

1. Create three forms on Formspree (or one — separate is just for organization).
2. Copy the form IDs into `web/.env.local`:
   - `NEXT_PUBLIC_FORMSPREE_CUSTOM_ENDPOINT`
   - `NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT`
   - `NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT`
3. For production, set the same vars in Vercel project settings.

## Tests

```bash
cd web
npm run test:e2e
```

Runs Playwright smoke tests against `localhost:3000` (auto-starts dev server).

## Deploy

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Set **Root Directory** to `web` (since the Next.js app lives in a subfolder).
4. Add the three `NEXT_PUBLIC_FORMSPREE_*` env vars.
5. Deploy.

Vercel auto-deploys on every push to `main`.

## License

All code under MIT. Brand assets (mark, designs, copy) © Rooted Creations Co.
````

- [ ] **Step 2: Final smoke check**

Run from `web/`:
```bash
npm run build && npm run test:e2e
```
Expected: build succeeds, all Playwright tests pass.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: project README with setup, forms, and deploy instructions"
```

- [ ] **Step 4: (Optional) Push to GitHub**

If the user has a GitHub account configured, ask them to create an empty repo (`rooted-creations`) and run:
```bash
git remote add origin git@github.com:<their-username>/rooted-creations.git
git branch -M main
git push -u origin main
```

This is the user's call — don't push without explicit instruction.

---

## Self-Review (already completed)

**Spec coverage:** Every section of the design spec is implemented:
- §2 Aesthetic direction → Tasks 2, 3, 6
- §3 Brand voice → Task 1 (placeholders in copy) + all page tasks (real copy uses Custom/Local/Quality framing)
- §4 Site map (6 pages) → Tasks 6–11 (one per page)
- §5 Tech stack → Tasks 1–2
- §6 File structure → Task 1 lays it out, subsequent tasks fill it
- §7 Page specs → Tasks 6–11 (one per page)
- §8 Components → Tasks 3, 4, 5, 7, 8, 9, 11
- §9 Data model → Task 4
- §10 Forms behavior → Tasks 6 (Newsletter), 9 (Custom), 11 (Contact)
- §11 Imagery → Task 4 (SVG placeholders, `next/image` ready for swap)
- §12 Deployment → Task 13

**Placeholder scan:** No "TBD"/"TODO"/"implement later" patterns in steps. Every file path is exact; every code step has full code.

**Type consistency:** `Product` type defined once in Task 4 `data/products.ts`, imported by every consumer (`ProductCard`, `ProductGallery`, `ProductInquire`, shop pages). `ProductCategory` exported alongside.

---

Plan complete and saved to `docs/superpowers/plans/2026-05-22-v2-website-implementation.md`. Two execution options:

**1. Subagent-Driven (recommended)** — I dispatch a fresh subagent per task, review between tasks, fast iteration.

**2. Inline Execution** — Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach?
