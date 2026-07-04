import type { Metadata } from 'next';
import { business } from '@/lib/config';
import { pageMetadata } from '@/lib/seo';
import RushForm from '@/components/quote/RushForm';
import styles from './rush.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Rush Jobs — Working Against a Deadline?',
  description:
    'Working against a deadline? Call REM about a rush job. Rush work is a conversation, not a checkout — a real person will tell you honestly what can happen by your date.',
  path: '/rush',
});

/**
 * /rush — deadline micro-flow. Calling is the product; the short form is the
 * after-hours fallback. NO guaranteed-turnaround language anywhere.
 */
export default function RushPage() {
  return (
    <section className={styles.stage} aria-label="Rush job">
      <span className="reg-mark reg-mark--tl" style={{ top: '1.5rem', left: '1.5rem' }} aria-hidden="true" />
      <span className={styles.ghostWord} aria-hidden="true">
        RUSH
      </span>

      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <p className="kicker kicker--light">
            Rush
            <span className="crimson-rule" aria-hidden="true" />
          </p>
          <h1 className={styles.headline}>
            Working against a deadline? <em className={styles.em}>Call</em> about a rush job.
          </h1>
          <p className={styles.body}>
            Rush work is a conversation, not a checkout. Call and REM will tell you — honestly —
            what can happen by your date.
          </p>
          <p className={`ticket-line ${styles.ticket}`} aria-hidden="true">
            Deadline intake · Answered by a person · {business.city}, {business.region}
          </p>
        </div>

        <RushForm />
      </div>
    </section>
  );
}
