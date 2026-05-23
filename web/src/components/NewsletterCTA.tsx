'use client';

import { useState } from 'react';
import styles from './NewsletterCTA.module.css';

export function NewsletterCTA() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus('loading');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_NEWSLETTER_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          Stay <em className={styles.italic}>rooted.</em>
        </h3>
        <div>
          <p className={styles.lead}>First dibs on new drops, custom slots, and shop news. No spam. Just the good stuff, a few times a season.</p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              required
              aria-label="Email address"
              disabled={status === 'loading' || status === 'success'}
            />
            <button type="submit" disabled={status === 'loading' || status === 'success'}>
              {status === 'success' ? 'Subscribed ✓' : status === 'loading' ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && <p className={styles.error}>Something went wrong. Try again or DM us.</p>}
          <p className={`mono ${styles.disclaimer}`}>By subscribing you agree to occasional emails from Rooted Creations Co.</p>
        </div>
      </div>
    </section>
  );
}
