'use client';

import { useMemo, useState } from 'react';
import type { Product } from '@/data/products';
import styles from './ProductInquire.module.css';

export function ProductInquire({ product }: { product: Product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const [color, setColor] = useState(product.colors[0]);

  const href = useMemo(() => {
    const subject = encodeURIComponent(`Order: ${product.name} (${size}, ${color})`);
    const body = encodeURIComponent(
      `Hi Rooted Creations Co.,\n\nI'd like to order:\n` +
      `• ${product.name} — $${product.price}\n` +
      `• Size: ${size}\n` +
      `• Color: ${color}\n\n` +
      `Let me know payment + pickup/shipping details when you get a chance. Thanks!\n`
    );
    return `mailto:hello@rootedcreations.co?subject=${subject}&body=${body}`;
  }, [product, size, color]);

  return (
    <div className={styles.inquire}>
      <div className={styles.group}>
        <label className={`mono ${styles.label}`}>Size</label>
        <div className={styles.options}>
          {product.sizes.map((s) => (
            <button
              key={s}
              type="button"
              className={`${styles.opt} ${s === size ? styles.optActive : ''}`}
              onClick={() => setSize(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      <div className={styles.group}>
        <label className={`mono ${styles.label}`}>Color</label>
        <div className={styles.options}>
          {product.colors.map((c) => (
            <button
              key={c}
              type="button"
              className={`${styles.opt} ${c === color ? styles.optActive : ''}`}
              onClick={() => setColor(c)}
            >{c}</button>
          ))}
        </div>
      </div>

      <a href={href} className={styles.btn}>
        Inquire to Order <span>→</span>
      </a>
      <p className={styles.note}>Orders run on email + Venmo or cash at pickup. We&rsquo;ll reach out within a day.</p>
    </div>
  );
}
