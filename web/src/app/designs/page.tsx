import { DesignsGrid } from '@/components/DesignsGrid';
import { SectionHead } from '@/components/SectionHead';
import styles from './page.module.css';

export const metadata = {
  title: 'Designs · Rooted Creations Co.',
  description: 'A selection of custom designs printed in San Antonio — Spurs, Texas, Hispanic-pride, and more.',
};

export default function DesignsPage() {
  return (
    <main className={styles.page}>
      <SectionHead
        idx="01 / Designs"
        title={<>A selection of <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>designs.</em></>}
        aside="Pieces we've printed for customers, families, and small businesses. Want one of these on a tee? Hit the Custom Work link below."
      />
      <DesignsGrid cta={{ href: '/custom', label: 'Want one on a tee? Custom Work →' }} />
    </main>
  );
}
