import { Seal } from '@/components/Seal';
import { Marquee } from '@/components/Marquee';
import { Stamp } from '@/components/Stamp';
import { SectionHead } from '@/components/SectionHead';

export default function Preview() {
  return (
    <main style={{ padding: 32 }}>
      <section style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 64 }}>
        <Seal />
        <Stamp>Limited · N° 047</Stamp>
        <Stamp rotate={4}>Bestseller</Stamp>
      </section>

      <Marquee items={['CUSTOM TEES', 'HOODIES', 'ORIGINAL DROPS', 'SA MADE', 'CUSTOM WORK']} />

      <section style={{ padding: '96px 0' }}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints, made in small batches in San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
      </section>

      <Marquee items={['INK', 'GOLD', 'CREAM', 'BRICK']} variant="ink" />
    </main>
  );
}
