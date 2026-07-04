import Reveal from '@/components/shared/Reveal';
import ProofMetric from '@/components/shared/ProofMetric';
import { business, proof } from '@/lib/config';
import styles from './ProofStrip.module.css';

/**
 * ACT III — PROOF STRIP. Warm-black band, four enormous serif numerals
 * breathing on the dark field. Production-ticket treatment, not stat cards.
 * All values render from lib/config proof.
 */
export default function ProofStrip() {
  const ticketLine = `JOB NO. 001 / ${business.city.toUpperCase()}, ${business.region} / RUN CONTINUOUS SINCE ${proof[0].value}`;

  return (
    <section
      className={`dark-section section-pad ${styles.section}`}
      aria-labelledby="proof-heading"
    >
      <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
      <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />

      <div className="container">
        <Reveal>
          <div className={styles.kickerWrap}>
            <h2 id="proof-heading" className={`kicker kicker--light ${styles.kicker}`}>
              PROOF OF PRODUCTION
            </h2>
            <span className="crimson-rule crimson-rule--center" aria-hidden="true" />
          </div>
        </Reveal>

        <ul className={styles.grid} role="list">
          {proof.map((metric, i) => (
            <li key={metric.label} className={styles.cell}>
              <Reveal delay={i * 0.08} y={36}>
                <ProofMetric value={metric.value} label={metric.label} />
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal delay={0.2}>
          <p className={`ticket-line ${styles.ticket}`}>{ticketLine}</p>
        </Reveal>
      </div>
    </section>
  );
}
