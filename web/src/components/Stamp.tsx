import styles from './Stamp.module.css';

type Props = {
  children: React.ReactNode;
  rotate?: number;
};

export function Stamp({ children, rotate = -8 }: Props) {
  return (
    <span className={styles.stamp} style={{ transform: `rotate(${rotate}deg)` }}>
      {children}
    </span>
  );
}
