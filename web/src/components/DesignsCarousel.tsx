'use client';

import gsap from 'gsap';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { designs } from '@/data/designs';
import { DesignCard } from './DesignCard';
import styles from './DesignsCarousel.module.css';

type Props = {
  cta?: { href: string; label: string };
};

// How many cards we clone on each end. Must be >= max visible count so the
// user never sees the seam during a swipe/scroll.
const N_CLONE = 3;
const GAP_PX = 24; // must match `gap` in DesignsCarousel.module.css .strip

function getVisibleCount(width: number): number {
  if (width > 820) return 3;
  if (width > 480) return 2;
  return 1;
}

export function DesignsCarousel({ cta }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<((direction: 1 | -1) => void) | null>(null);
  const [mounted, setMounted] = useState(false);

  // Rendered set: lead clones (last N real items) + real items + tail clones
  // (first N real items). Indices in this array:
  //   0 .. N_CLONE-1                            → lead clones
  //   N_CLONE .. N_CLONE+designs.length-1       → real items
  //   N_CLONE+designs.length .. end             → tail clones
  const leadClones = designs.slice(-N_CLONE);
  const tailClones = designs.slice(0, N_CLONE);
  const allCards = [...leadClones, ...designs, ...tailClones];

  useEffect(() => {
    const viewportEl = viewportRef.current;
    const stripEl = stripRef.current;
    if (!viewportEl || !stripEl) return;
    const viewport: HTMLDivElement = viewportEl;
    const strip: HTMLDivElement = stripEl;

    let index = 0; // logical index into the REAL designs array
    let busy = false;
    let touchStartX = 0;
    let cardWidth = 0;

    const realStart = N_CLONE;
    const realCount = designs.length;

    function applyLayout() {
      const w = viewport.clientWidth;
      const visible = getVisibleCount(w);
      cardWidth = (w - GAP_PX * (visible - 1)) / visible;
      strip.querySelectorAll<HTMLElement>('[data-card]').forEach((el) => {
        el.style.width = `${cardWidth}px`;
      });
      // Snap (no animation) to the current real position with the new widths
      const x = -((realStart + index) * (cardWidth + GAP_PX));
      gsap.set(strip, { x });
    }

    function move(direction: 1 | -1) {
      if (busy) return;
      busy = true;
      const target = index + direction;
      const x = -((realStart + target) * (cardWidth + GAP_PX));

      gsap.to(strip, {
        x,
        duration: 0.55,
        ease: 'power2.out',
        onComplete: () => {
          // If the tween landed in clone territory, snap silently to the
          // equivalent REAL slot. Because the clone IS pixel-identical to
          // the real card, the snap is invisible.
          let wrapped = target;
          if (target < 0) wrapped = realCount - 1;
          else if (target >= realCount) wrapped = 0;

          if (wrapped !== target) {
            const realX = -((realStart + wrapped) * (cardWidth + GAP_PX));
            gsap.set(strip, { x: realX });
          }
          index = wrapped;
          busy = false;
        },
      });
    }

    function onResize() {
      applyLayout();
    }
    function onTouchStart(e: TouchEvent) {
      touchStartX = e.touches[0].clientX;
    }
    function onTouchEnd(e: TouchEvent) {
      const endX = e.changedTouches[0].clientX;
      const dx = endX - touchStartX;
      if (Math.abs(dx) > 40) move(dx < 0 ? 1 : -1);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        move(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        move(1);
      }
    }
    function onWheel(e: WheelEvent) {
      // Only act on horizontal intent — never hijack vertical page scrolling.
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
      if (Math.abs(e.deltaX) < 10) return;
      // `busy` already prevents overlapping animations, so we don't need
      // a manual debounce — fast continuous swipes will advance multiple
      // cards as each previous animation finishes.
      move(e.deltaX > 0 ? 1 : -1);
    }

    moveRef.current = move;
    applyLayout();
    setMounted(true);

    window.addEventListener('resize', onResize);
    strip.addEventListener('touchstart', onTouchStart, { passive: true });
    strip.addEventListener('touchend', onTouchEnd, { passive: true });
    viewport.addEventListener('keydown', onKeyDown);
    viewport.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      window.removeEventListener('resize', onResize);
      strip.removeEventListener('touchstart', onTouchStart);
      strip.removeEventListener('touchend', onTouchEnd);
      viewport.removeEventListener('keydown', onKeyDown);
      viewport.removeEventListener('wheel', onWheel);
      moveRef.current = null;
    };
  }, []);

  return (
    <section className={styles.section}>
      <div ref={viewportRef} className={styles.viewport} tabIndex={0}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowLeft}`}
          aria-label="Previous designs"
          onClick={() => moveRef.current?.(-1)}
        >
          ←
        </button>

        <div className={styles.viewportInner}>
          <div
            ref={stripRef}
            className={`${styles.strip} ${mounted ? styles.mounted : ''}`}
          >
            {allCards.map((d, i) => {
              const isReal = i >= N_CLONE && i < N_CLONE + designs.length;
              return (
                <div
                  key={`${d.id}-${i}`}
                  data-card
                  className={styles.cell}
                  aria-hidden={isReal ? undefined : true}
                >
                  <DesignCard design={d} />
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowRight}`}
          aria-label="Next designs"
          onClick={() => moveRef.current?.(1)}
        >
          →
        </button>
      </div>

      {cta ? (
        <Link href={cta.href} className={styles.cta}>
          {cta.label}
        </Link>
      ) : null}
    </section>
  );
}
