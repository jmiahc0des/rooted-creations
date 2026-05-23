import { Seal } from './Seal';
import { Stamp } from './Stamp';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.halftone} aria-hidden />
      <div className={styles.diagonal} aria-hidden />

      <div className={styles.top}>
        <span className={`mono ${styles.eyebrowLeft}`}>
          Vol. <span className={styles.gold}>01</span> · Spring &rsquo;26
        </span>
        <div className={styles.sealWrap}><Seal size={130} /></div>
        <span className={`mono ${styles.eyebrowRight}`}>SA · TX · &rsquo;24</span>
      </div>

      <div className={styles.stage}>
        <Stamp>Limited · N° 047</Stamp>
        <h1 className={styles.headline}>
          <span className={styles.line}>All Designs.</span>
          <span className={styles.line}>
            <em className={styles.italic}>All</em>{' '}
            <span>Rooted</span>
            <span className={styles.brick}>.</span>
          </span>
        </h1>
        <p className={styles.tag}>
          Custom apparel &amp; graphic design. <span className={styles.star}>★</span> Handprinted by hand in San&nbsp;Antonio, TX.
        </p>
      </div>

      <div className={styles.numbering}>
        <span>Edition</span>
        <strong>N° 01 / 12</strong>
      </div>

      <div className={styles.strip}>
        <span>★ Custom Tees · Hoodies · Custom Work</span>
        <span className={styles.arrow}>→</span>
      </div>
    </section>
  );
}
