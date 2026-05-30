import Link from 'next/link';
import { pricing } from '@/data/pricing';
import styles from './PricingBlock.module.css';

type Props = {
  /** 'full' renders all items + custom note. 'teaser' renders first 4 + a See-all link. */
  variant?: 'full' | 'teaser';
};

export function PricingBlock({ variant = 'full' }: Props) {
  const items = variant === 'teaser' ? pricing.items.slice(0, 4) : pricing.items;

  return (
    <section className={styles.block} id={variant === 'full' ? 'pricing' : undefined}>
      <div className={styles.head}>
        <span className={`mono ${styles.eyebrow}`}>Pricing</span>
        <h2 className={styles.title}>PRICING</h2>
        <p className={styles.sub}>Quality prints. Great prices.</p>
      </div>

      <ul className={styles.grid}>
        {items.map((it) => (
          <li key={it.id} className={styles.item}>
            <span className={styles.label}>{it.label}</span>
            <span className={styles.price}>${it.price}</span>
            <span className={`mono ${styles.each}`}>each</span>
          </li>
        ))}
      </ul>

      {variant === 'full' ? (
        <p className={styles.custom}>
          {pricing.customNote}{' '}
          <Link href="/custom" className={styles.customLink}>Start a project →</Link>
        </p>
      ) : (
        <Link href="/shop#pricing" className={styles.seeAll}>See full pricing →</Link>
      )}
    </section>
  );
}
