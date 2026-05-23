import { CustomIntakeForm } from '@/components/CustomIntakeForm';
import styles from './page.module.css';

const examples = [
  { label: 'Local Business', title: 'Coffee Shop Branding', meta: 'Staff tees + apron prints' },
  { label: 'Family Event', title: 'Reunion 2025', meta: '40 custom shirts, three generations' },
  { label: 'Wedding', title: '"He Said Yes"', meta: 'Bachelorette weekend tees' },
  { label: 'Team', title: 'Little League', meta: 'Numbered jerseys + parent hoodies' },
];

export default function CustomWork() {
  return (
    <main className={styles.custom}>
      <div className={styles.intro}>
        <span className={`mono ${styles.eyebrow}`}>— 03 / Custom Work</span>
        <h1 className={styles.headline}>
          Bring us <em>your idea.</em>
        </h1>
        <p className={styles.lead}>
          Custom apparel made for local businesses, families, teams, and one-off projects worth making real. Tell us what you&rsquo;re picturing — we&rsquo;ll handle the design, printing, and delivery.
        </p>
      </div>

      <section className={styles.examples}>
        <h2 className={styles.examplesHead}>Recent Work</h2>
        <div className={styles.cards}>
          {examples.map((e) => (
            <div key={e.title} className={styles.card}>
              <span className={`mono ${styles.cardLabel}`}>{e.label}</span>
              <span className={styles.cardTitle}>{e.title}</span>
              <span className={styles.cardMeta}>{e.meta}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.formSection}>
        <div className={styles.formHead}>
          <h2 className={styles.formTitle}>Tell us about <em>your project.</em></h2>
          <p className={styles.formIntro}>The more detail, the faster we can quote you.</p>
        </div>
        <CustomIntakeForm />
      </section>
    </main>
  );
}
