import styles from './Seal.module.css';

type Props = {
  size?: number;
  text?: string;
};

export function Seal({ size = 130, text = 'ROOTED CREATIONS CO. · SAN ANTONIO TX · EST. 2024 · ' }: Props) {
  return (
    <svg className={styles.seal} viewBox="0 0 200 200" width={size} height={size} aria-hidden="true">
      <defs>
        <path id="seal-circle" d="M 100, 100 m -78, 0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="var(--gold)" strokeWidth="1.2" />
      <text fontFamily="var(--font-mono)" fontSize="11" letterSpacing="4" fill="var(--gold)">
        <textPath href="#seal-circle" startOffset="0">{text}</textPath>
      </text>
      <g transform="translate(100 100)" stroke="var(--gold)" strokeWidth="1.5" fill="none" strokeLinecap="round">
        <line x1="0" y1="-32" x2="0" y2="32" />
        <line x1="-22" y1="-22" x2="22" y2="22" />
        <line x1="22" y1="-22" x2="-22" y2="22" />
        <line x1="-32" y1="0" x2="32" y2="0" />
        <circle cx="0" cy="0" r="6" fill="var(--brick)" stroke="none" />
      </g>
    </svg>
  );
}
