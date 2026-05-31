import Link from 'next/link';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { SectionHead } from '@/components/SectionHead';
import { ProductCard } from '@/components/ProductCard';
import { Categories } from '@/components/Categories';
import { Process } from '@/components/Process';
import { NewsletterCTA } from '@/components/NewsletterCTA';
import { PricingBlock } from '@/components/PricingBlock';
import { DesignsCarousel } from '@/components/DesignsCarousel';
import { products } from '@/data/products';
import { designs } from '@/data/designs';
import styles from './page.module.css';

export default function Home() {
  const featured = products.slice(0, 4);

  return (
    <>
      <Hero />

      <Marquee
        variant="ink"
        items={['CUSTOM TEES', 'GRAPHIC DESIGN', 'HOODIES & CREWNECKS', 'LOCAL BRANDING', 'MADE IN SA']}
      />

      <section className={styles.section}>
        <SectionHead
          idx="01 / The Shop"
          title={<>Currently <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>Rooted</em></>}
          aside="Custom prints, made in small batches. Each piece designed and printed in-house in San Antonio."
          link={{ href: '/shop', label: 'Shop all goods' }}
        />
        <div className={styles.grid}>
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} index={i} total={featured.length} />
          ))}
        </div>
      </section>

      <section className={styles.sectionMuted}>
        <SectionHead
          idx="02 / Categories"
          title={<>Five ways <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>to wear it</em></>}
          aside="A growing catalog of custom designs, available across our core blanks."
        />
        <Categories />
      </section>

      <PricingBlock variant="teaser" />

      <section className={styles.designsTeaser}>
        <SectionHead
          idx="03 / Designs"
          title={<>From the <em style={{ fontFamily: 'var(--font-script)', color: 'var(--gold)' }}>vault.</em></>}
          aside="A selection of designs printed for customers, teams, and one-off requests."
        />
        <DesignsCarousel cta={{ href: '/designs', label: `See all ${designs.length} →` }} />
      </section>

      <section className={styles.customTeaser}>
        <div className={styles.customGrid}>
          <div className={styles.customVisual}>
            <div className={`${styles.visualBox} ${styles.box1}`} />
            <div className={`${styles.visualBox} ${styles.box2}`}>
              <svg viewBox="0 0 200 200" width="80%" aria-hidden>
                <g transform="translate(100 100)" stroke="#0C0A07" strokeWidth="1.4" fill="none">
                  <circle r="78" /><circle r="60" />
                  <text fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3" fill="#0C0A07" textAnchor="middle" y="-66">YOUR LOGO HERE</text>
                  <text fontFamily="var(--font-mono)" fontSize="9" letterSpacing="3" fill="#0C0A07" textAnchor="middle" y="72">CUSTOM · DESIGN · CO.</text>
                </g>
                <g transform="translate(100 100)">
                  <text textAnchor="middle" fontFamily="var(--font-display)" fontWeight="900" fontSize="30" letterSpacing="2" y="-4" fill="#B8412A">YOURS</text>
                  <text textAnchor="middle" fontFamily="var(--font-script)" fontStyle="italic" fontSize="22" y="22" fill="#0C0A07">rooted</text>
                </g>
              </svg>
            </div>
            <div className={`${styles.visualBox} ${styles.box3}`} />
            <div className={styles.stamp}>Free<br />Quote<br />★</div>
          </div>
          <div>
            <span className={`mono`} style={{ color: 'var(--gold)' }}>04 / Custom Work</span>
            <h3 className={styles.customHead}>Bring us <em>your idea.</em></h3>
            <p className={styles.customLead}>
              We design and print custom apparel for small businesses, churches, schools, family reunions, birthdays, weddings, and one-off projects worth making real.
            </p>
            <div className={styles.customTags}>
              <span className={styles.customTag}>Local Business Branding</span>
              <span className={styles.customTag}>Team Apparel</span>
              <span className={styles.customTag}>Family Reunions</span>
              <span className={styles.customTag}>Birthdays &amp; Events</span>
              <span className={styles.customTag}>Weddings</span>
              <span className={styles.customTag}>Memorials</span>
            </div>
            <Link href="/custom" className={styles.cta}>Start a Project <span>→</span></Link>
          </div>
        </div>
      </section>

      <Process />

      <section className={styles.aboutTeaser}>
        <h3 className={styles.aboutPull}>Rooted here.<br /><em>Worn anywhere.</em></h3>
        <p className={styles.aboutBody}>
          A one-person studio born out of a love for great type, local pride, and the feeling of putting on a shirt that actually means something. Every order made by hand, in San Antonio.
        </p>
        <Link href="/about" className={styles.aboutLink}>Read the story <span>→</span></Link>
      </section>

      <NewsletterCTA />
    </>
  );
}
