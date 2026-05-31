import { asset } from '@/lib/asset';
import styles from './Seal.module.css';

export type SealVariant = 'dark' | 'light' | 'white' | 'blue' | 'coral';

type Props = {
  /** Pixel size of the rendered seal. Defaults to 130. */
  size?: number;
  /** Which color variant to render. Defaults to 'dark' (outline-on-bone). */
  variant?: SealVariant;
  /** When true, applies the stamp-then-rotate animation. */
  animated?: boolean;
  /** Optional accessible label. If omitted, the seal is treated as decorative. */
  label?: string;
};

export function Seal({ size = 130, variant = 'dark', animated = false, label }: Props) {
  const cls = [styles.seal, animated ? styles.animated : ''].filter(Boolean).join(' ');
  const src = asset(`/logos/rooted-${variant}.svg`);
  const ariaProps = label
    ? { role: 'img' as const, 'aria-label': label }
    : { 'aria-hidden': true as const };

  return (
    <span
      className={cls}
      style={{ width: size, height: size, backgroundImage: `url(${src})` }}
      {...ariaProps}
    />
  );
}
