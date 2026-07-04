import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: '404 — Misregistered | REM Digital Print & Mail Center',
  description: 'This page slipped off the press sheet. Head back home or start a quote.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className={styles.wrap}>
      <span className={styles.ghost} aria-hidden="true">
        404
      </span>
      <svg
        className={styles.reg}
        aria-hidden="true"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <circle cx="14" cy="14" r="9" stroke="currentColor" strokeWidth="1" />
        <path d="M14 0v28M0 14h28" stroke="currentColor" strokeWidth="1" />
      </svg>

      <p className={styles.ticket}>
        JOB №0404 · STATUS: <em>OFF THE SHEET</em> · REPRINT REQUIRED
      </p>

      <h1 className={styles.headline}>
        MIS<i>REGISTERED</i>
        <span className={styles.period}>.</span>
      </h1>

      <p className={styles.copy}>
        This page didn&rsquo;t line up on the press sheet. The plates shifted, the
        crop marks missed &mdash; but the rest of the run is clean. Pick a path and
        we&rsquo;ll get you back in registration.
      </p>

      <nav className={styles.actions} aria-label="Recovery options">
        <Link href="/" className={styles.btnGhost}>
          Back to the Floor
        </Link>
        <Link href="/quote" className={styles.btnPrimary}>
          Request a Quote
        </Link>
      </nav>
    </main>
  );
}
