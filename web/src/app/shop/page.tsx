import { Suspense } from 'react';
import { SectionHead } from '@/components/SectionHead';
import { CategoryFilter } from '@/components/CategoryFilter';
import { ShopGrid } from '@/components/ShopGrid';
import styles from './page.module.css';

export default function Shop() {
  return (
    <main className={styles.shop}>
      <SectionHead
        idx="01 / The Catalog"
        title={<>Everything <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
        aside="Custom prints in small batches. Tap a category to filter."
      />
      <Suspense fallback={null}>
        <CategoryFilter />
        <ShopGrid />
      </Suspense>
    </main>
  );
}
