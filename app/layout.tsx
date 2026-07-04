import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Playfair_Display, Archivo } from 'next/font/google';
import { business } from '@/lib/config';
import { pageMetadata, localBusinessJsonLd, JsonLd } from '@/lib/seo';
import Analytics from '@/components/shared/Analytics';
import SmoothScroll from '@/components/shared/SmoothScroll';
import Header from '@/components/shared/Header';
import Footer from '@/components/shared/Footer';
import MobileUtilityBar from '@/components/shared/MobileUtilityBar';
import '@/styles/globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-ui',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(business.siteUrl),
  ...pageMetadata({
    title: `${business.name} — Print, Apparel, Mail & Promo. Handled In-House.`,
    description:
      'Albany businesses, campaigns, schools, organizations, and communities trust REM for fast-turnaround production backed by decades of local experience.',
    path: '/',
  }),
  title: {
    default: `${business.name} — Print, Apparel, Mail & Promo. Handled In-House.`,
    template: `%s | ${business.shortName}`,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#C8102E',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${archivo.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Analytics />
        <SmoothScroll />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileUtilityBar />
        <JsonLd data={localBusinessJsonLd()} />
      </body>
    </html>
  );
}
