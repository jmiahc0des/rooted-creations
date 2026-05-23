import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProduct, getRelatedProducts, products } from '@/data/products';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductInquire } from '@/components/ProductInquire';
import { ProductCard } from '@/components/ProductCard';
import styles from './page.module.css';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = getRelatedProducts(slug, 3);
  const tags: string[] = [];
  if (product.isNew) tags.push('New');
  if (product.isLimited) tags.push('Limited');
  if (product.isBestseller) tags.push('Bestseller');

  return (
    <main className={styles.pdp}>
      <div className={styles.crumb}>
        <Link href="/shop">Shop</Link> &nbsp;/&nbsp; <span>{product.name}</span>
      </div>

      <div className={styles.layout}>
        <ProductGallery images={product.images} alt={product.name} />

        <div className={styles.info}>
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t) => <span key={t} className={styles.tagPill}>{t}</span>)}
            </div>
          )}
          <h1 className={styles.name}>{product.name}</h1>
          {product.edition && <span className={styles.edition}>{product.edition}</span>}
          <span className={styles.price}>${product.price}</span>
          <p className={styles.tagline}>{product.tagline}</p>
          <p className={styles.description}>{product.description}</p>
          <div className={styles.rule} />
          <ProductInquire product={product} />
        </div>
      </div>

      <section className={styles.madeFor}>
        <h2 className={styles.madeForTitle}>Want this <em>customized?</em></h2>
        <p className={styles.madeForBody}>
          Every piece in the shop can be reworked with your name, your business, your event, or a custom design. Tell us what you&rsquo;re picturing — we&rsquo;ll build it.
        </p>
        <Link href="/custom" className={styles.madeForLink}>Start a custom request <span>→</span></Link>
      </section>

      {related.length > 0 && (
        <section className={styles.related}>
          <h2 className={styles.madeForTitle}>You might also <em>like</em></h2>
          <div className={styles.relatedGrid}>
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} total={related.length} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
