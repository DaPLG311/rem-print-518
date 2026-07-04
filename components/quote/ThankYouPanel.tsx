'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import styles from './ThankYouPanel.module.css';

interface SummaryRow {
  label: string;
  value: string;
}

interface QuoteSummary {
  serviceLabel: string;
  rows: SummaryRow[];
  artwork: string;
  fileCount: number;
  name: string;
}

/**
 * /quote/thank-you confirmation — a stamped production ticket on a calm
 * graphite stage (quote-confirmation.png). Echoes the submission summary
 * from sessionStorage; degrades gracefully to a generic confirmation.
 */
export default function ThankYouPanel() {
  const [summary, setSummary] = useState<QuoteSummary | null>(null);
  const stampRef = useRef<HTMLParagraphElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem('rem:quote-summary');
      if (raw) setSummary(JSON.parse(raw) as QuoteSummary);
    } catch {
      /* generic confirmation still renders */
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const tl = gsap.timeline();
    if (panelRef.current) {
      tl.fromTo(
        panelRef.current,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      );
    }
    if (stampRef.current) {
      tl.fromTo(
        stampRef.current,
        { scale: 1.6, autoAlpha: 0, rotate: -10 },
        { scale: 1, autoAlpha: 1, rotate: -3, duration: 0.45, ease: 'power4.out' },
        '-=0.25',
      );
    }
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section className={styles.stage} aria-label="Quote request received">
      <span className="reg-mark reg-mark--tl" style={{ top: '1.5rem', left: '1.5rem' }} aria-hidden="true" />
      <span className="reg-mark reg-mark--br" style={{ bottom: '1.5rem', right: '1.5rem' }} aria-hidden="true" />

      <div ref={panelRef} className={`container ${styles.inner}`}>
        <p ref={stampRef} className={styles.stamp}>
          Received
        </p>

        <h1 className={styles.headline}>The job is in REM’s hands.</h1>

        <p className={styles.next}>
          {summary?.name ? `Thanks, ${summary.name}. ` : ''}A real person reviews your request and
          gets back to you with questions or a quote — usually within one business day.
        </p>

        {summary ? (
          <dl className={styles.ticket} aria-label="Project summary">
            <div className={styles.ticketRow}>
              <dt>Service</dt>
              <dd>{summary.serviceLabel}</dd>
            </div>
            {summary.rows.map((row) => (
              <div className={styles.ticketRow} key={row.label}>
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
            {summary.artwork ? (
              <div className={styles.ticketRow}>
                <dt>Artwork</dt>
                <dd>
                  {summary.artwork}
                  {summary.fileCount > 0
                    ? ` · ${summary.fileCount} file${summary.fileCount === 1 ? '' : 's'} listed`
                    : ''}
                </dd>
              </div>
            ) : null}
          </dl>
        ) : null}

        <p className={styles.urgent}>
          Can’t wait?{' '}
          <a
            href={`tel:${business.phone}`}
            className={styles.urgentLink}
            onClick={() => track('call_clicked', { location: 'quote_thank_you' })}
          >
            <Phone size={15} aria-hidden="true" />
            Call REM {business.phoneDisplay}
          </a>{' '}
          — mention you just sent a quote request.
        </p>

        <Link href="/quote" className={styles.anotherBtn}>
          <span>Start another project</span>
          <ArrowRight size={16} aria-hidden="true" />
        </Link>

        <p className={`ticket-line ${styles.ticketLine}`} aria-hidden="true">
          Intake confirmed · {business.city}, {business.region} · A real person reads this
        </p>
      </div>
    </section>
  );
}
