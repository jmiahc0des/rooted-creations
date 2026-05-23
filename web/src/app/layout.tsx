import type { Metadata } from 'next';
import '../styles/globals.css';
import { bigShoulders, instrumentSerif, jetbrains } from './fonts';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Rooted Creations Co. — Custom Apparel + Graphic Design / San Antonio, TX',
  description: 'Custom apparel and graphic design, handprinted in San Antonio. Designs made for people, families, and small businesses with something to say.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bigShoulders.variable} ${instrumentSerif.variable} ${jetbrains.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
