import { Seal } from '@/components/Seal';
import { Marquee } from '@/components/Marquee';
import { Stamp } from '@/components/Stamp';
import { SectionHead } from '@/components/SectionHead';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';

export default function Preview() {
  return (
    <main style={{ padding: 32 }}>
      <section style={{ display: 'flex', gap: 32, alignItems: 'center', marginBottom: 48 }}>
        <Seal />
        <Stamp>Limited · N° 047</Stamp>
        <Stamp rotate={4}>Bestseller</Stamp>
      </section>

      <Marquee items={['CUSTOM TEES', 'HOODIES', 'CUSTOM WORK', 'SA MADE']} />

      <section style={{ padding: '64px 0' }}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-serif)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints in small batches, San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {products.slice(0, 4).map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} total={4} />
          ))}
        </div>
      </section>
    </main>
  );
}
