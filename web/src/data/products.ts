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
    description: "The Leave A Mark print on our heaviest fleece. Drop-shoulder cut.",
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
