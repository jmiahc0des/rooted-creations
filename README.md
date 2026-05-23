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

All product data lives in `web/src/data/products.ts`. To add, edit, or remove a product, edit that file — the shop, product details, related products, and filters update automatically.

Product images go in `web/public/images/products/` (any format `next/image` supports — `.svg`, `.jpg`, `.png`, `.webp`).

## Forms

Custom Work intake, Contact, and Newsletter forms submit to [Formspree](https://formspree.io).

1. Create forms on Formspree (one or three — separate is just for organization).
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
