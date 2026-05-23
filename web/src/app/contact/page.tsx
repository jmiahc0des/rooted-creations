import { ContactForm } from '@/components/ContactForm';
import styles from './page.module.css';

export default function Contact() {
  return (
    <main className={styles.contact}>
      <div className={styles.head}>
        <span className={`mono ${styles.eyebrow}`}>05 / Contact</span>
        <h1 className={styles.title}>Say <em>hello.</em></h1>
      </div>

      <div className={styles.grid}>
        <aside className={styles.info}>
          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Email</span>
            <span className={styles.blockValue}>
              <a href="mailto:hello@rootedcreations.co">hello@rootedcreations.co</a>
            </span>
            <span className={styles.blockSub}>For orders, custom requests, and general inquiries.</span>
          </div>

          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Instagram</span>
            <span className={styles.blockValue}>
              <a href="https://instagram.com/rootedcreationscotx" target="_blank" rel="noreferrer">@rootedcreationscotx</a>
            </span>
            <span className={styles.blockSub}>DM us. We&rsquo;re usually quickest here.</span>
          </div>

          <div className={styles.block}>
            <span className={`mono ${styles.blockLabel}`}>Location</span>
            <span className={styles.blockValue}>San Antonio, TX</span>
            <span className={styles.blockSub}>Local pickup available. Shipping across Texas + beyond.</span>
          </div>
        </aside>

        <ContactForm />
      </div>
    </main>
  );
}
