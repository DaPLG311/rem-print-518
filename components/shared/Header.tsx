'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './Header.module.css';

const NAV_LINKS = [
  { href: '/printing-bindery', label: 'Services' },
  { href: '/apparel', label: 'Apparel' },
  { href: '/direct-mail', label: 'Direct Mail' },
  { href: '/promotional-products', label: 'Promotional Products' },
  { href: '/political-printing', label: 'Political Printing' },
  { href: '/about', label: 'About' },
];

/**
 * Global header. Transparent over hero fields at page top, solid
 * warm-black once scrolled. Accessible mobile menu (Escape closes,
 * focus returns to the trigger, links close on navigate).
 */
export default function Header() {
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close the menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  /* Escape closes, focus returns to trigger; lock body scroll while open */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const onCall = (location: string) => () => track('call_clicked', { location });

  return (
    <header className={`${styles.header} ${solid || menuOpen ? styles.solid : ''}`}>
      <div className={styles.bar}>
        <Link href="/" className={styles.brand} aria-label={`${business.name} — home`}>
          <span className={styles.brandMark} aria-hidden="true">
            {business.shortName}
          </span>
          <span className={styles.brandText}>Digital Print &amp; Mail Center</span>
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          <ul className={styles.navList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.navLink}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.utility}>
          <Link href="/upload" className={styles.utilityLink}>
            Upload Artwork
          </Link>
          <a href={`tel:${business.phone}`} className={styles.utilityLink} onClick={onCall('header')}>
            Call REM
          </a>
          <Link href="/rush" className={`${styles.utilityLink} ${styles.utilityRush}`}>
            Rush Job
          </Link>
          <Link href="/quote" className={styles.quoteCta}>
            Request a Quote
          </Link>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.menuButton}
          aria-expanded={menuOpen}
          aria-controls="rem-mobile-menu"
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          <span className="visually-hidden">{menuOpen ? 'Close menu' : 'Open menu'}</span>
        </button>
      </div>

      <div
        id="rem-mobile-menu"
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}
        hidden={!menuOpen}
      >
        <nav aria-label="Mobile">
          <ul className={styles.mobileNavList} role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={closeMenu}
                  aria-current={pathname === link.href ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.mobileUtility}>
          <Link href="/quote" className={styles.mobileQuoteCta} onClick={closeMenu}>
            Request a Quote
          </Link>
          <Link href="/upload" className={styles.mobileUtilityLink} onClick={closeMenu}>
            Upload Artwork
          </Link>
          <Link href="/rush" className={styles.mobileUtilityLink} onClick={closeMenu}>
            Rush Job
          </Link>
          <a
            href={`tel:${business.phone}`}
            className={styles.mobileUtilityLink}
            onClick={() => {
              track('call_clicked', { location: 'header_mobile_menu' });
              closeMenu();
            }}
          >
            <Phone size={16} aria-hidden="true" />
            <span>
              Call REM {business.phoneDisplay}
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
