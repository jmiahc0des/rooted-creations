'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Marquee } from './Marquee';
import styles from './Nav.module.css';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.utility}>
        <span className="mono">EST. 2024 / SAN ANTONIO, TX</span>
        <div className={styles.utilityMarqueeWrap}>
          <Marquee
            items={['FREE LOCAL PICKUP IN SA', 'CUSTOM ORDERS WELCOME', 'NEW DROPS EACH SEASON', 'HANDPRINTED IN TEXAS']}
            speed={40}
          />
        </div>
        <span className="mono">@ROOTEDCREATIONSCOTX</span>
      </div>

      <nav className={styles.nav}>
        <div className={`${styles.navLeft} ${open ? styles.navMobileOpen : ''}`}>
          <Link href="/shop" className={styles.link} onClick={() => setOpen(false)}>Shop</Link>
          <Link href="/custom" className={styles.link} onClick={() => setOpen(false)}>Custom Work</Link>
          <Link href="/about" className={styles.link} onClick={() => setOpen(false)}>Story</Link>
        </div>

        <Link href="/" className={styles.brand}>
          <span className={styles.brandName}>Rooted Creations Co.</span>
          <span className={styles.brandSub}>SA · TX · MADE WITH PURPOSE</span>
        </Link>

        <div className={styles.navRight}>
          <Link href="/contact" className={`${styles.link} ${styles.linkRight}`}>Contact</Link>
          <button
            className={styles.cart}
            title="Cart coming soon. Inquire to order"
            type="button"
            aria-label="Cart (coming soon)"
          >
            Cart <span className={styles.count}>0</span>
          </button>
          <button
            className={styles.mobileToggle}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
