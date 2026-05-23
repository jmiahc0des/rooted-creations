'use client';

import { useSearchParams } from 'next/navigation';
import { ProductCard } from './ProductCard';
import { products, type ProductCategory, type Product } from '@/data/products';
import styles from './ShopGrid.module.css';

const validCats: ProductCategory[] = ['tees', 'hoodies', 'youth', 'accessories'];

function filterProducts(cat: string | null): Product[] {
  const category = (validCats as string[]).includes(cat ?? '') ? (cat as ProductCategory) : null;
  return category ? products.filter((p) => p.category === category) : products;
}

export function ShopGrid() {
  const params = useSearchParams();
  const filtered = filterProducts(params.get('cat'));

  if (filtered.length === 0) {
    return (
      <p className={styles.empty}>
        Nothing in this category yet. Check back soon, or{' '}
        <a href="/custom" className={styles.emptyLink}>request a custom piece</a>.
      </p>
    );
  }

  return (
    <div className={styles.grid}>
      {filtered.map((p, i) => (
        <ProductCard key={p.slug} product={p} index={i} total={filtered.length} />
      ))}
    </div>
  );
}
