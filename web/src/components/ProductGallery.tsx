'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './ProductGallery.module.css';

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const main = images[active] ?? images[0];

  return (
    <div className={styles.gallery}>
      <div className={styles.main}>
        <Image src={main} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
      {images.length > 1 && (
        <div className={styles.thumbs}>
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ''}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
            >
              <Image src={src} alt="" fill sizes="120px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
