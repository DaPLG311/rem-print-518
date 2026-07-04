import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import { proof } from '@/lib/config';
import styles from './HumanTrust.module.css';

/**
 * ACT VIII — HUMAN TRUST. The light exhale after the crimson takeover:
 * heritage + people on warm paper. Oversized serif statement with the
 * support paragraph overlapping its last line (per approved frame),
 * two stacked people/craft MediaMask slots on the right.
 */
export default function HumanTrust() {
  return (
    <section
      className={`light-section ${styles.section}`}
      aria-labelledby="human-trust-title"
    >
      <div className={`container ${styles.grid}`}>
        <div className={styles.copyCol}>
          <Reveal>
            <p className={`kicker ${styles.kicker}`}>
              About REM
              <span className="crimson-rule" aria-hidden="true" />
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 id="human-trust-title" className={styles.headline}>
              <span className={styles.line}>Founded here.</span>
              <span className={styles.line}>Built over</span>
              <span className={`${styles.line} ${styles.lineItalic}`}>decades.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className={styles.support}>
              Founded by the Remmert family in {proof[0].value}, REM has grown from a
              neighborhood print shop into a full-service production partner for businesses,
              campaigns, schools, and organizations across the Capital Region.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className={styles.statement}>
              All this capability still has <em>people</em> behind it.
            </h3>
          </Reveal>
          <Reveal delay={0.16}>
            <div className={styles.ctaRow}>
              <MagneticCTA href="/about" variant="dark">
                Meet REM
              </MagneticCTA>
            </div>
          </Reveal>
          <p className={`ticket-line ${styles.subline}`}>
            Real people answer the phone. Real hands run the machines.
          </p>
        </div>

        <div className={styles.mediaCol}>
          <MediaMask
            ratio="16 / 11"
            label="Press check — production floor"
            className={styles.mediaLarge}
          />
          <MediaMask ratio="4 / 5" label="Hand finishing" className={styles.mediaSmall} />
        </div>
      </div>
    </section>
  );
}
