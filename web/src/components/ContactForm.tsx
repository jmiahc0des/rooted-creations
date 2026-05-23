'use client';

import { useState } from 'react';
import styles from './ContactForm.module.css';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_FORMSPREE_CONTACT_ENDPOINT || '', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (res.ok) { setStatus('success'); form.reset(); }
      else setStatus('error');
    } catch { setStatus('error'); }
  }

  if (status === 'success') {
    return (
      <div className={styles.success}>
        <div className={styles.mark}>✓</div>
        <h3>Message sent.</h3>
        <p>We&rsquo;ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Name</span>
        <input name="name" type="text" required autoComplete="name" />
      </label>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Email</span>
        <input name="email" type="email" required autoComplete="email" />
      </label>
      <label className={styles.field}>
        <span className={`mono ${styles.label}`}>Message</span>
        <textarea name="message" rows={6} required></textarea>
      </label>
      <button type="submit" className={styles.submit} disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Message'} <span>→</span>
      </button>
      {status === 'error' && <p className={styles.error}>Couldn&rsquo;t send. Try again, or email hello@rootedcreations.co.</p>}
    </form>
  );
}
