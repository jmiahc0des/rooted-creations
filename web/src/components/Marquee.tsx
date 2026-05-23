import styles from './Marquee.module.css';

type Props = {
  items: string[];
  variant?: 'gold' | 'ink';
  speed?: number; // seconds for one loop
};

export function Marquee({ items, variant = 'gold', speed = 32 }: Props) {
  const cls = variant === 'gold' ? styles.gold : styles.ink;
  const doubled = [...items, ...items];
  return (
    <div className={`${styles.strip} ${cls}`}>
      <div className={styles.track} style={{ animationDuration: `${speed}s` }}>
        {doubled.map((item, i) => (
          <span key={`${item}-${i}`} className={styles.item}>
            {item} <span className={styles.star}>★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
