import styles from './SectionHead.module.css';
import Link from 'next/link';

type Props = {
  idx: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  link?: { href: string; label: string };
};

export function SectionHead({ idx, title, aside, link }: Props) {
  return (
    <div className={styles.head}>
      <span className={`mono ${styles.idx}`}>{idx}</span>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.aside}>
        {aside && <p>{aside}</p>}
        {link && (
          <Link href={link.href} className={styles.link}>
            {link.label} <span aria-hidden>→</span>
          </Link>
        )}
      </div>
    </div>
  );
}
