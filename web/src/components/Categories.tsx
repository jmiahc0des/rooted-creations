import Link from 'next/link';
import styles from './Categories.module.css';

const cats = [
  { num: '01', name: 'Custom T-Shirts', count: '4 styles', href: '/shop?cat=tees', icon: 'tee' },
  { num: '02', name: 'Hoodies & Sweats', count: '3 styles', href: '/shop?cat=hoodies', icon: 'hoodie' },
  { num: '03', name: 'Onesies & Youth', count: '2 styles', href: '/shop?cat=youth', icon: 'onesie' },
  { num: '04', name: 'Accessories', count: '3 styles', href: '/shop?cat=accessories', icon: 'bag' },
  { num: '05', name: 'Custom Designs', count: 'By appointment', href: '/custom', icon: 'pencil', dark: true },
];

const icons: Record<string, React.ReactNode> = {
  tee: (
    <svg viewBox="0 0 60 50" height="56"><path d="M10 18 L20 8 Q30 18 40 8 L50 18 L57 30 L48 33 L48 48 L12 48 L12 33 L3 30 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  hoodie: (
    <svg viewBox="0 0 60 50" height="56"><path d="M10 18 L20 8 Q30 22 40 8 L50 18 L57 30 L48 33 L48 48 L12 48 L12 33 L3 30 Z" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M20 8 Q30 28 40 8" fill="none" stroke="currentColor" strokeWidth="1.6"/><path d="M22 36 L38 36 L41 46 L19 46 Z" fill="none" stroke="currentColor" strokeWidth="1.4"/></svg>
  ),
  onesie: (
    <svg viewBox="0 0 60 50" height="56"><path d="M14 14 L22 6 Q30 14 38 6 L46 14 L52 24 L46 28 L46 40 Q46 48 30 48 Q14 48 14 40 L14 28 L8 24 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>
  ),
  bag: (
    <svg viewBox="0 0 60 50" height="56"><path d="M12 18 L48 18 L52 48 L8 48 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M22 18 Q22 6 30 6 Q38 6 38 18" fill="none" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
  pencil: (
    <svg viewBox="0 0 60 50" height="56"><path d="M8 42 L8 36 L36 8 L42 14 L14 42 Z" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M32 12 L38 18" stroke="currentColor" strokeWidth="1.6"/></svg>
  ),
};

export function Categories() {
  return (
    <div className={styles.grid}>
      {cats.map((c) => (
        <Link href={c.href} key={c.num} className={`${styles.cat} ${c.dark ? styles.dark : ''}`}>
          <span className={`mono ${styles.num}`}>{c.num}</span>
          <div className={styles.icon}>{icons[c.icon]}</div>
          <div className={styles.name}>{c.name}</div>
          <div className={`mono ${styles.line}`}>
            <span>{c.count}</span>
            <span className={styles.arrow}>→</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
