'use client';

import { Phone } from 'lucide-react';
import MagneticCTA from '@/components/shared/MagneticCTA';
import Reveal from '@/components/shared/Reveal';
import RushPrompt from '@/components/shared/RushPrompt';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './ConversionCTA.module.css';

/**
 * ACT X — CONVERSION. Crimson-accented close that bookends the hero:
 * one giant question, one primary path into /quote, a human phone
 * fallback, and the RushPrompt band directly below.
 */
export default function ConversionCTA() {
  return (
    <>
      <section
        className={`crimson-section ${styles.section}`}
        data-stage="crimson"
        aria-labelledby="conversion-cta-title"
      >
        <div className={`container ${styles.inner}`}>
          <Reveal>
            <p className={`kicker ${styles.kicker}`}>
              Job Intake
              <span className={styles.rule} aria-hidden="true" />
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="conversion-cta-title" className={styles.title}>
              What are we <em>making?</em>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className={styles.support}>
              Tell REM about the job. You&apos;ll hear back from a real person with real
              answers.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className={styles.actions}>
              <MagneticCTA href="/quote" variant="dark" className={styles.invertCta}>
                Start Your Project
              </MagneticCTA>
              <p className={styles.talk}>
                <span className={styles.talkLead}>Prefer to talk it through?</span>
                <a
                  href={`tel:${business.phone}`}
                  className={styles.callLink}
                  onClick={() => track('call_clicked', { location: 'home_conversion' })}
                >
                  <Phone size={15} aria-hidden="true" />
                  <span>Call REM</span>
                </a>
              </p>
            </div>
          </Reveal>
          <p className={`ticket-line ${styles.ticket}`}>
            Production ticket &middot; Job &#8470; next &middot; Name: your job here
          </p>
        </div>
        <span className={`reg-mark reg-mark--tr ${styles.regTr}`} aria-hidden="true" />
        <span className={`reg-mark reg-mark--bl ${styles.regBl}`} aria-hidden="true" />
      </section>
      <RushPrompt dark />
    </>
  );
}
