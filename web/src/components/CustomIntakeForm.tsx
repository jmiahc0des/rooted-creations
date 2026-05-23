'use client';

import { useState } from 'react';
import styles from './CustomIntakeForm.module.css';

export function CustomIntakeForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_CUSTOM_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.successMark}>✓</div>
        <h3 className={styles.successTitle}>Request sent.</h3>
        <p className={styles.successBody}>We&rsquo;ll reach back out within 2 business days. In the meantime, follow along on Instagram <a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a>.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Name</span>
          <input name="name" type="text" required autoComplete="name" />
        </label>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Email</span>
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>

      <div className={styles.row}>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Phone (optional)</span>
          <input name="phone" type="tel" autoComplete="tel" />
        </label>
        <label className={styles.field}>
          <span className={`mono ${styles.label}`}>Target Deadline</span>
          <input name="deadline" type="date" />
        </label>
      </div>

      <fieldset className={styles.fieldset}>
        <legend className={`mono ${styles.label}`}>Project Type</legend>
        <div className={styles.radios}>
          {[
            { v: 'business', l: 'Local Business' },
            { v: 'team', l: 'Team / Staff' },
            { v: 'family', l: 'Family / Reunion' },
            { v: 'event', l: 'Event / Birthday' },
            { v: 'wedding', l: 'Wedding' },
            { v: 'other', l: 'Other' },
          ].map((opt) => (
            <label key={opt.v} className={styles.radio}>
              <input type="radio" name="projectType" value={opt.v} required />
              <span>{opt.l}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Approximate Quantity</span>
        <input name="quantity" type="text" placeholder="e.g. 25 shirts, 10 hoodies" required />
      </label>

      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Tell us about it</span>
        <textarea name="description" rows={6} required placeholder="What's the project, the vibe, the deadline pressure? Anything we should know."></textarea>
      </label>

      <button type="submit" className={styles.submit} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Request'} <span>→</span>
      </button>

      {status === 'error' && <p className={styles.error}>Couldn&rsquo;t send. Try again, or email us directly at hello@rootedcreations.co.</p>}
    </form>
  );
}
