import Link from 'next/link';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <div className={styles.mark}>
            Rooted<br />Creations <span className={styles.italic}>Co.</span>
          </div>
          <p className={styles.tag}>Custom apparel &amp; graphic design. Handprinted in San Antonio, Texas.</p>
          <div className={styles.contact}>
            <div><a href="mailto:hello@rootedcreations.co">hello@rootedcreations.co</a></div>
            <div><a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a></div>
            <div>San Antonio, TX</div>
          </div>
        </div>

        <div className={styles.col}>
          <h5>Shop</h5>
          <ul>
            <li><Link href="/shop">All Goods</Link></li>
            <li><Link href="/shop?cat=tees">T-Shirts</Link></li>
            <li><Link href="/shop?cat=hoodies">Hoodies</Link></li>
            <li><Link href="/shop?cat=youth">Youth</Link></li>
            <li><Link href="/shop?cat=accessories">Accessories</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Custom</h5>
          <ul>
            <li><Link href="/custom">Local Business</Link></li>
            <li><Link href="/custom">Teams &amp; Staff</Link></li>
            <li><Link href="/custom">Events</Link></li>
            <li><Link href="/custom">Get a Quote</Link></li>
          </ul>
        </div>

        <div className={styles.col}>
          <h5>Info</h5>
          <ul>
            <li><Link href="/about">Our Story</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className={styles.massive} aria-hidden>
        Rooted <span className={styles.italic}>in</span> Purpose
      </div>

      <div className={styles.bottom}>
        <span className="mono">© 2026 Rooted Creations Co.</span>
        <span className="mono">Made in San Antonio, TX · 29.4241°N 98.4936°W</span>
      </div>
    </footer>
  );
}
