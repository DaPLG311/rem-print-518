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
      <head>
        {/*
          DOM-mutation resilience. GSAP ScrollTrigger `pin` wraps pinned nodes
          in a pin-spacer, so on client navigation React can try to removeChild
          a node whose real parent is now the spacer — throwing
          "NotFoundError: removeChild ... not a child" and white-screening the
          page ("Application error"). This runs before hydration and makes
          React's DOM ops no-op instead of throw when a node was moved by a
          third party. Standard, production-safe fix for this exact crash.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof Node==="undefined"||!Node.prototype)return;var p=Node.prototype,r=p.removeChild;p.removeChild=function(c){if(c&&c.parentNode!==this){return c;}return r.apply(this,arguments);};var i=p.insertBefore;p.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){return n;}return i.apply(this,arguments);};})();`,
          }}
        />
      </head>
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
