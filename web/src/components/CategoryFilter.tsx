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
