import Link from 'next/link';
import { designs } from '@/data/designs';
import { DesignCard } from './DesignCard';
import styles from './DesignsGrid.module.css';

type Props = {
  /** When set, only render the first N designs. */
  limit?: number;
  /** Optional CTA link rendered after the grid. */
  cta?: { href: string; label: string };
};

export function DesignsGrid({ limit, cta }: Props) {
  const items = typeof limit === 'number' ? designs.slice(0, limit) : designs;

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {items.map((d) => (
          <DesignCard key={d.id} design={d} />
        ))}
      </div>
      {cta ? (
        <Link href={cta.href} className={styles.cta}>{cta.label}</Link>
      ) : null}
    </section>
  );
}
