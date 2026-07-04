'use client';

import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './RushPrompt.module.css';

interface RushPromptProps {
  dark?: boolean;
}

/**
 * Deadline band placed at decision points. No guaranteed-turnaround
 * language — rush is a conversation, not a checkout.
 */
export default function RushPrompt({ dark = false }: RushPromptProps) {
  return (
    <aside className={`${styles.band} ${dark ? styles.dark : styles.light}`} aria-label="Rush job deadline help">
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className={`kicker ${dark ? 'kicker--light' : ''}`}>Deadline</p>
          <p className={styles.headline}>Working against a deadline?</p>
          <p className={styles.support}>
            Call about a rush job. A real person will tell you what&apos;s possible.
          </p>
        </div>
        <div className={styles.actions}>
          <a
            href={`tel:${business.phone}`}
            className={styles.callBtn}
            onClick={() => track('rush_call_clicked', { location: 'rush_prompt' })}
          >
            <Phone size={16} aria-hidden="true" />
            <span>Call REM</span>
          </a>
          <Link href="/rush" className={styles.detailsLink}>
            <span>Rush details</span>
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </aside>
  );
}
