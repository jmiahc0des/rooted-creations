import styles from './Process.module.css';

const steps = [
  { num: '01', title: 'Design', body: 'Tell us what you need. We sketch, mock up, and refine until it feels right — built for you, not pulled off a template.' },
  { num: '02', title: 'Print', body: 'Once approved, we print in-house on premium blanks. Inventory is managed and quality-checked by hand, piece by piece.' },
  { num: '03', title: 'Deliver', body: 'Local pickup in San Antonio or shipped to your door. Built to last, made to leave a mark.' },
];

export function Process() {
  return (
    <section className={styles.process}>
      <div className={styles.head}>
        <h3 className={styles.title}>From sketch <em className={styles.italic}>to stitch.</em></h3>
        <p className={`mono ${styles.aside}`}>A simple three-step process. Most projects ship in 7–10 days.</p>
      </div>
      <div className={styles.grid}>
        {steps.map((s) => (
          <div key={s.num} className={styles.step}>
            <div className={styles.num}>{s.num}</div>
            <h4 className={styles.stepTitle}>{s.title}</h4>
            <p className={styles.body}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
