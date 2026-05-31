import type { Design } from '@/data/designs';
import { asset } from '@/lib/asset';
import styles from './DesignCard.module.css';

type Props = { design: Design };

export function DesignCard({ design }: Props) {
  return (
    <figure className={styles.card}>
      <div className={styles.imageWrap}>
        {/* Native <img> — Next/Image disabled by static export here.
            Fallback handled by browser broken-image; placeholder shown via ::after on parent. */}
        <img
          src={asset(design.image)}
          alt={`${design.name} design`}
          loading="lazy"
          className={styles.image}
        />
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.name}>{design.name}</span>
        <span className={styles.tag}>{design.caption}</span>
      </figcaption>
    </figure>
  );
}
