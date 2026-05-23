import { Suspense } from 'react';
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
      <Suspense fallback={null}>
        <CategoryFilter />
      </Suspense>
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
