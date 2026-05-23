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
