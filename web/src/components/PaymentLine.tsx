import { pricing } from '@/data/pricing';
import styles from './PaymentLine.module.css';

export function PaymentLine() {
  return (
    <p className={`mono ${styles.line}`}>
      We accept{' '}
      {pricing.paymentMethods.map((m, i) => (
        <span key={m}>
          {i > 0 ? ' · ' : ' · '}
          <span className={styles.method}>{m}</span>
        </span>
      ))}
    </p>
  );
}
