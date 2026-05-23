# Rooted Creations Co. — V2 Website Design Spec

**Date:** 2026-05-22
**Status:** Approved — ready for implementation plan

---

## 1. Project Overview

Rebuild the Rooted Creations Co. website as a multi-page Next.js brochure site for a custom apparel and graphic design business in San Antonio, TX.

**Goals:**
- Showcase available designs and product categories.
- Pitch the owner's custom work to local businesses, families, and events.
- Provide intake forms for custom inquiries and general contact.
- Establish a foundation that can grow into a real e-commerce site later (Shopify Lite or full custom checkout) without a rewrite.

**Non-goals for v2:**
- Real cart / checkout flow (deferred).
- Real product photography (placeholders only; owner replaces later).
- User accounts, auth, or order history.

---

## 2. Aesthetic Direction

**"Print Shop Editorial" — pushed poster remix.**

A black-backgrounded, warm-toned aesthetic that splits the difference between a screen-print shop window and an editorial product page. Signature treatments: paper grain overlay, halftone dot pattern, rotating circular seal, rotated "Limited N° XX" stamps, edition numbering, diagonal accent rules, marquee strips.

**Palette:**
| Token        | Hex      | Role                          |
| ------------ | -------- | ----------------------------- |
| `--ink`      | `#0C0A07`| Primary background            |
| `--ink-soft` | `#1A1611`| Secondary surfaces            |
| `--cream`    | `#F4ECD8`| Primary text                  |
| `--gold`     | `#D4A547`| Primary accent                |
| `--gold-soft`| `#C9A876`| Muted gold for meta text      |
| `--brick`    | `#B8412A`| Secondary accent / stamps     |
| `--hairline` | `rgba(244,236,216,0.18)` | Dividers          |

**Typography (Google Fonts via `next/font`):**
- **Big Shoulders Display** (900) — display headlines, condensed heritage sans.
- **Instrument Serif** (400, italic) — editorial accents, pull quotes.
- **JetBrains Mono** (500) — labels, eyebrows, numbering, meta.

**Signature elements (each becomes a component):**
- Paper grain SVG overlay, 4–6% opacity, multiplied/screened.
- Halftone dot pattern (CSS radial gradient + mask).
- Rotating circular seal (SVG with `@keyframes spin`).
- Rotated "Limited · N° 047" stamps (brick outlined).
- Edition numbering blocks ("N° 01 / 12").
- ★ separator on marquees and inline meta.

---

## 3. Brand Voice & Copy Guidance

**Pillars:** **Custom** · **Local** · **Quality**.

**Do say:**
- "Custom apparel and graphic design"
- "Handprinted in San Antonio"
- "Made with care, made to last"
- "Designs made for you"
- "Built to leave a mark"

**Do not say:**
- "Original designs only"
- "No templates"
- "Every design hand-sketched from scratch"
- Anything implying artist-pure originality.

AI is part of the design process. The pitch is *customization for the customer*, not *originality of the designer*. Lean on local pride, quality of materials, care in printing, and the ability to make anything the customer brings.

---

## 4. Site Map

| Route                | Purpose                                                                |
| -------------------- | ---------------------------------------------------------------------- |
| `/`                  | Home — hero, featured products, categories, custom CTA, about teaser   |
| `/shop`              | Product listing — grid with category filter                            |
| `/shop/[slug]`       | Product detail — gallery, description, size/color picker, "Inquire"    |
| `/custom`            | Custom Work — pitch, examples, intake form                             |
| `/about`             | About — story, owner, San Antonio roots                                |
| `/contact`           | Contact — email, IG, location, general inquiry form                    |

---

## 5. Tech Stack

- **Framework:** Next.js (App Router, TypeScript, ESLint).
- **Rendering:** Server Components by default; `"use client"` only for interactive bits (mobile menu, form validation).
- **Styling:** Vanilla CSS via CSS Modules + global tokens (`tokens.css`, `globals.css`). No Tailwind.
- **Fonts:** Google Fonts loaded via `next/font/google` (self-hosted, no FOUT).
- **Images:** `next/image` with placeholder SVGs in v2; ready for real photography swap.
- **Forms:** Formspree free tier for Custom Work intake and Contact. Buy buttons use `mailto:` with pre-filled subjects.
- **Hosting:** Vercel free tier, deployed from GitHub.

---

## 6. File Structure

```
rooted-creations-v2/
├── app/
│   ├── layout.tsx              # Shared root layout: fonts, global CSS, <Nav />, <Footer />
│   ├── page.tsx                # Home
│   ├── shop/
│   │   ├── page.tsx            # Product listing
│   │   └── [slug]/page.tsx     # Product detail
│   ├── custom/page.tsx         # Custom Work + intake form
│   ├── about/page.tsx          # About / story
│   └── contact/page.tsx        # Contact form
├── components/
│   ├── Nav.tsx                 # Utility bar + sticky nav
│   ├── Nav.module.css
│   ├── Footer.tsx
│   ├── Footer.module.css
│   ├── Seal.tsx                # Rotating circular seal SVG
│   ├── Marquee.tsx             # Scrolling marquee strip
│   ├── ProductCard.tsx         # Reusable product tile
│   ├── ProductCard.module.css
│   ├── SectionHead.tsx         # idx + headline + aside layout
│   ├── Stamp.tsx               # Rotated "Limited · N°" stamp
│   ├── CustomIntakeForm.tsx    # Formspree-backed
│   └── ContactForm.tsx
├── data/
│   └── products.ts             # Typed product catalog (8–10 items)
├── lib/
│   └── formspree.ts            # Formspree endpoint constants
├── styles/
│   ├── globals.css             # Reset, body defaults, grain overlay
│   └── tokens.css              # Color/typography CSS variables
├── public/
│   ├── grain.svg               # Paper grain texture
│   └── images/                 # Product image placeholders
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## 7. Page Specifications

### 7.1 Home (`/`)

Sections in order:
1. **Utility bar** (black) — "EST. 2024 / SA · TX" · scrolling marquee ("Free local pickup · Custom orders welcome · ★") · `@rootedcreationscotx`.
2. **Sticky nav** — left: Shop / Custom / Story · centered logo: ROOTED CREATIONS CO. · right: Contact / Search / Cart pill (visual only).
3. **Hero** — rotating circular seal, "Vol. 01 / SA · TX", massive "ALL DESIGNS. / ALL ROOTED." with italic gold accent, brick "Limited · N° 047" stamp, edition numbering ("N° 01 / 12"), tagline. Diagonal brick line accent.
4. **Gold marquee strip** — "★ CUSTOM TEES ★ HOODIES ★ CUSTOM WORK ★ SA MADE ★".
5. **Featured products** — `01 / The Shop` · "Currently Rooted" · 4 product cards (server-rendered from `products.ts`).
6. **Categories** — `02 / Categories` · 5-column grid: Tees / Hoodies / Youth / Accessories / Custom.
7. **Custom Work teaser** — `03 / Custom Work` · "Bring us your idea." · audience tags · CTA → `/custom`.
8. **Process strip** — "From sketch to stitch" · 01 Design / 02 Print / 03 Deliver.
9. **About teaser** — pull quote, brief copy, CTA → `/about`.
10. **Newsletter CTA** — gold band, email input → Formspree.
11. **Footer** — brand block, columns (Shop / Custom / Info), giant outlined logotype, copyright.

### 7.2 Shop (`/shop`)

- Section head: `01 / The Catalog` · "Everything Rooted".
- Category filter chips (client component): All / Tees / Hoodies / Youth / Accessories.
- Product grid (4 columns desktop, 2 tablet, 1 mobile).
- Each card links to `/shop/[slug]`.

### 7.3 Product Detail (`/shop/[slug]`)

- Two-column layout (image gallery left, info right).
- Gallery: main image + 3 thumbnails (placeholders for v2). Thumbnail-switching is client-side (`ProductGallery`).
- Right column: product name, edition number, price, tagline, description, size picker, color picker, "Inquire to buy" button. Size/color pickers are part of a single client component (`ProductInquire`) that builds the `mailto:` URL dynamically based on selection.
- Below: "Made for…" small section explaining customization.
- Related products carousel at bottom (3 cards, server-rendered from `products.ts`).

### 7.4 Custom Work (`/custom`)

- Hero: "Bring us your idea." with italic gold accent.
- Lead copy: pitch to local businesses, teams, families, events, weddings, memorials.
- Examples section: 3–4 mock case study cards (placeholder copy: "Local Coffee Shop", "Family Reunion 2025", etc.).
- Intake form (`<CustomIntakeForm />`): name, email, phone, project type (radio: business / family / event / other), quantity estimate, deadline, project description.
- Form submits to Formspree.

### 7.5 About (`/about`)

- Pull quote: "Rooted here. Worn anywhere."
- Story copy: small studio, San Antonio roots, custom-first philosophy, quality and care. (Revised from v1 to remove "original designs only" language.)
- Coordinates block: 29.4241° N / 98.4936° W.
- Star motif graphic.

### 7.6 Contact (`/contact`)

- Heading: "Say hello."
- Three blocks: Email (mailto link) · Instagram (`@rootedcreationscotx`) · Location (San Antonio, TX).
- General contact form: name, email, message → Formspree.

---

## 8. Component Inventory

| Component             | Server/Client | Purpose                                                |
| --------------------- | ------------- | ------------------------------------------------------ |
| `Nav`                 | Client        | Sticky nav, mobile menu toggle                         |
| `Footer`              | Server        | Bottom of every page                                   |
| `Seal`                | Server        | Rotating circular SVG seal                             |
| `Marquee`             | Server        | Animated scrolling text strip (CSS only)               |
| `ProductCard`         | Server        | Reusable product tile (grid + carousel)                |
| `SectionHead`         | Server        | `idx / headline / aside` 3-column layout               |
| `Stamp`               | Server        | Rotated "Limited · N°" brick stamp                     |
| `CustomIntakeForm`    | Client        | Form with validation; submits to Formspree             |
| `ContactForm`         | Client        | Simpler form; submits to Formspree                     |
| `CategoryFilter`      | Client        | Chip-based filter on `/shop`                           |
| `ProductGallery`      | Client        | Image gallery with thumbnail switching on PDP          |
| `ProductInquire`      | Client        | Size/color selectors + dynamic mailto button (PDP)     |

---

## 9. Data Model

```ts
// data/products.ts
export type Product = {
  slug: string;              // 'rooted-heritage-tee'
  name: string;              // 'Rooted Heritage Tee'
  category: 'tees' | 'hoodies' | 'youth' | 'accessories';
  price: number;             // 32
  tagline: string;           // 'Heavyweight 100% cotton'
  description: string;       // 2–3 sentences
  sizes: string[];           // ['XS','S','M','L','XL','XXL']
  colors: string[];          // ['Ink','Bone']
  edition?: string;          // 'N° 01 / 12'
  isLimited?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  images: string[];          // ['/images/heritage-tee-01.svg', ...]
};

export const products: Product[] = [
  // 8–10 seeded products spanning all 4 categories
];
```

Seed catalog will include at least: 3 tees, 2 hoodies, 2 youth/onesies, 2 accessories, with realistic-feeling names, prices ($20–$70 range), and varied tags (new/limited/bestseller).

---

## 10. Forms & Interactions

**Custom Work Intake (`/custom`)**
- Fields: name, email, phone, project type (radio), quantity estimate, deadline (date), description (textarea).
- Client-side validation: required fields, email format.
- Submits to Formspree → owner's email.
- Success state: confirmation card with "We'll reach back out within 2 business days."

**Contact Form (`/contact`)**
- Fields: name, email, message.
- Same Formspree pattern.

**Product "Inquire to buy" buttons (PDP)**
- Click → opens `mailto:hello@rootedcreations.co?subject=Order: [Product Name] (size, color)&body=Hi! I'd like to order: ...`.
- No JS needed beyond rendering the link.

**Newsletter CTA (Home)**
- Single email input → Formspree (separate list endpoint).
- Inline success state ("Subscribed ✓").

**Cart pill in nav**
- Visual only (always shows "0"). CSS-only hover state reveals "Cart coming soon — inquire to order" via `::after` content.

---

## 11. Imagery Strategy

**v2:** Use hand-illustrated SVG product mockups (carried over from v1) — they look intentional and consistent with the heritage workshop aesthetic. Stored in `public/images/` as `.svg`.

**Future swap to photos:** Set up `next/image` from the start with correct aspect ratios (4/5 for product cards). Owner provides photos → drop in `/public/images/` → update `products.ts` paths.

---

## 12. Deployment

- GitHub repo.
- Vercel project connected to repo, auto-deploys on push to `main`.
- Free tier covers expected traffic.
- Environment variables in Vercel dashboard: `FORMSPREE_CUSTOM_ENDPOINT`, `FORMSPREE_CONTACT_ENDPOINT`, `FORMSPREE_NEWSLETTER_ENDPOINT`.
- Custom domain attached once owner has one (e.g., `rootedcreations.co`).

---

## 13. Trade-offs & Future Work

**Accepted trade-offs:**
- No real cart → buyers email per item. Acceptable at current volume.
- Formspree free tier capped at 50 submissions/month — sufficient initially.
- Made-up product data → owner replaces with real listings when ready.

**Future work (not in v2 scope):**
- Real e-commerce via Shopify Lite, Shopify Buy Button, or custom Stripe integration.
- Real product photography.
- Lookbook / gallery page showcasing finished custom work.
- Blog or journal section for behind-the-scenes content.
- Newsletter automation beyond Formspree (Mailchimp / Buttondown).

---

## 14. Success Criteria

- All 6 pages render statically, lighthouse score 95+ on performance/SEO/accessibility.
- Mobile-responsive across breakpoints (320, 768, 1024, 1440).
- Forms successfully submit to Formspree in production.
- Buttons and links all functional (no `href="#"` placeholders in shipped code).
- Owner can clone the repo, swap `products.ts`, swap photos, and redeploy with zero code edits.
