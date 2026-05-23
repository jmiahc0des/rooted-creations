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
        <div className={styles.add}>Inquire · ${product.price}</div>
      </div>
      <div className={styles.meta}>
        <span className={styles.name}>{product.name}</span>
        <span className={styles.price}>${product.price}</span>
      </div>
      <div className={styles.desc}>{product.tagline}</div>
    </Link>
  );
}
