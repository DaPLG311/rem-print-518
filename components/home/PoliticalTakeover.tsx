'use client';

import { ArrowRight, Phone } from 'lucide-react';
import MagneticCTA from '@/components/shared/MagneticCTA';
import Reveal from '@/components/shared/Reveal';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import styles from './PoliticalTakeover.module.css';

/**
 * ACT VII — POLITICAL TAKEOVER. Full-bleed crimson act mirroring the hero.
 * Dramatic, strictly NEUTRAL campaign-material wall — abstract placards
 * only, no party colors beyond REM crimson, no candidate names, no words
 * on the signs.
 */
export default function PoliticalTakeover() {
  return (
    <section
      className={`crimson-section ${styles.section}`}
      data-stage="crimson"
      aria-labelledby="political-takeover-title"
    >
      <span className={styles.ghostNum} aria-hidden="true">
        06
      </span>

      {/* Abstract neutral campaign-material wall */}
      <div className={styles.wall} aria-hidden="true">
        <span className={`${styles.sign} ${styles.signA}`}>
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles.barWide}`} />
          <span className={`${styles.bar} ${styles.barAccent}`} />
        </span>
        <span className={`${styles.sign} ${styles.signB} ${styles.signDark}`}>
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles.barWide}`} />
        </span>
        <span className={`${styles.sign} ${styles.signC}`}>
          <span className={`${styles.bar} ${styles.barWide}`} />
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles.barAccent}`} />
        </span>
        <span className={`${styles.sign} ${styles.signD}`}>
          <span className={styles.bar} />
          <span className={`${styles.bar} ${styles.barAccent}`} />
        </span>
        <span className={`${styles.sign} ${styles.signE} ${styles.signDark}`}>
          <span className={`${styles.bar} ${styles.barWide}`} />
          <span className={styles.bar} />
        </span>
      </div>

      <div className={`container ${styles.inner}`}>
        <Reveal>
          <p className={`kicker ${styles.kicker}`}>
            Service 06 &mdash; Political
            <span className={styles.rule} aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="political-takeover-title" className={styles.title}>
            <span className={styles.titleLine}>
              Campaigns move on <em>deadlines.</em>
            </span>
            <span className={styles.titleLine}>So does REM.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.16}>
          <p className={styles.support}>
            Postcards, literature, yard signs, banners, buttons, mailings &mdash; produced and
            moved at campaign speed. Every party, every race, printed with the same urgency.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className={styles.actions}>
            <MagneticCTA
              href="/quote?service=political"
              variant="dark"
              className={styles.invertCta}
            >
              Start a Political Project
            </MagneticCTA>
            <a
              href={`tel:${business.phone}`}
              className={styles.deadlineLink}
              onClick={() => track('rush_call_clicked', { location: 'political_takeover' })}
            >
              <Phone size={15} aria-hidden="true" />
              <span>Call About a Deadline</span>
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
        <p className={`ticket-line ${styles.ticket}`}>
          Every party &middot; Every race &mdash; printed neutral, printed fast
        </p>
      </div>

      <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
      <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />
    </section>
  );
}
