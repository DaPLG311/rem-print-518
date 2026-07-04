'use client';

import Link from 'next/link';
import { business, services } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './Footer.module.css';

const SITE_LINKS = [
  { href: '/about', label: 'About REM' },
  { href: '/quote', label: 'Request a Quote' },
  { href: '/upload', label: 'Upload Artwork' },
  { href: '/rush', label: 'Rush Job' },
];

/**
 * Global footer: strapline, service lanes, site nav, contact from config,
 * service-area line, small print. Warm-black production floor at the
 * bottom of every page.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.strapline}>{business.tagline}</p>

        <div className={styles.columns}>
          <div className={styles.col}>
            <h2 className={styles.colTitle}>Service Lanes</h2>
            <ul className={styles.list} role="list">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/${service.slug}`} className={styles.link}>
                    <span className={styles.laneNumber} aria-hidden="true">
                      {service.number}
                    </span>
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>REM</h2>
            <ul className={styles.list} role="list">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h2 className={styles.colTitle}>Contact</h2>
            <ul className={styles.list} role="list">
              <li>
                <a
                  href={`tel:${business.phone}`}
                  className={styles.link}
                  onClick={() => track('call_clicked', { location: 'footer' })}
                >
                  {business.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${business.email}`} className={styles.link}>
                  {business.email}
                </a>
              </li>
              <li>
                <span className={styles.plain}>{business.addressLine}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.baseline}>
          <p className={styles.serviceArea}>
            Serving {business.serviceArea}
          </p>
          <p className={styles.smallPrint}>
            © {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
