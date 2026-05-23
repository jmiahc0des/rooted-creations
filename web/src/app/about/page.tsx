import styles from './page.module.css';

export default function About() {
  return (
    <main className={styles.about}>
      <div className={styles.grid}>
        <aside className={styles.meta}>
          <svg className={styles.star} viewBox="0 0 50 50" aria-hidden>
            <g stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round">
              <line x1="25" y1="4" x2="25" y2="46" />
              <line x1="4" y1="25" x2="46" y2="25" />
              <line x1="10" y1="10" x2="40" y2="40" />
              <line x1="40" y1="10" x2="10" y2="40" />
              <circle cx="25" cy="25" r="4" fill="var(--gold)" stroke="none" />
            </g>
          </svg>
          <div className={`mono ${styles.idx}`}>04 / The Story</div>
          <div className={styles.coords}>
            <strong>San Antonio, TX</strong><br />
            29.4241° N<br />
            98.4936° W<br /><br />
            Independent &amp; locally owned<br />
            Est. 2024
          </div>
        </aside>
        <div className={styles.body}>
          <h1 className={styles.pull}>
            Rooted here.<br />
            <em>Worn anywhere.</em>
          </h1>
          <p className={styles.paragraph}>
            Rooted Creations Co. is a one-person studio born out of a love for great type, local pride, and the feeling of putting on a shirt that actually means something. We design and print custom apparel for the people, families, and small businesses we share a city with.
          </p>
          <p className={`${styles.paragraph} ${styles.muted}`}>
            We work with neighbors and small businesses across San Antonio — and ship to people across Texas who carry a piece of SA wherever they go. Every order is made by hand: designed for the customer, printed in small batches, and quality-checked piece by piece.
          </p>
          <p className={`${styles.paragraph} ${styles.muted}`}>
            If you&rsquo;ve got something to say, we&rsquo;ll help you put it on a shirt. <em style={{ color: 'var(--gold)' }}>Made with purpose. Built to leave a mark.</em>
          </p>
        </div>
      </div>
    </main>
  );
}
