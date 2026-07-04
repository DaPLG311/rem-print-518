'use client';

import Link from 'next/link';
import { FileText, Phone, Upload } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './MobileUtilityBar.module.css';

/**
 * Fixed bottom utility bar, mobile only: CALL · QUOTE · UPLOAD.
 * Body bottom padding for clearance is handled in styles/globals.css.
 */
export default function MobileUtilityBar() {
  return (
    <nav className={styles.bar} aria-label="Quick actions">
      <a
        href={`tel:${business.phone}`}
        className={styles.action}
        onClick={() => track('call_clicked', { location: 'mobile_utility_bar' })}
      >
        <Phone size={18} aria-hidden="true" />
        <span>Call</span>
      </a>
      <Link href="/quote" className={`${styles.action} ${styles.quote}`}>
        <FileText size={18} aria-hidden="true" />
        <span>Quote</span>
      </Link>
      <Link href="/upload" className={styles.action}>
        <Upload size={18} aria-hidden="true" />
        <span>Upload</span>
      </Link>
    </nav>
  );
}
