import Link from 'next/link';
import type { ReactNode } from 'react';
import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import RushPrompt from '@/components/shared/RushPrompt';
import styles from './ServicePageLayout.module.css';

interface Capability {
  title: string;
  desc: string;
}

interface ServicePageLayoutProps {
  number: string;
  title: string;
  kicker?: string;
  intro: string;
  capabilities: Capability[];
  outcomes?: string[];
  quoteService: string;
  children?: ReactNode;
}

/**
 * Reusable service-page architecture (per printing-bindery.png frame):
 * cinematic dark hero with giant crimson number + oversized serif title,
 * intro, capabilities translated to customer outcomes, MediaMask slot,
 * optional custom sections (children), RushPrompt, closing conversion
 * section into /quote?service=<quoteService>.
 */
export default function ServicePageLayout({
  number,
  title,
  kicker,
  intro,
  capabilities,
  outcomes,
  quoteService,
  children,
}: ServicePageLayoutProps) {
  const quoteHref = `/quote?service=${quoteService}`;

  return (
    <div className={styles.page}>
      {/* --- Cinematic service hero --- */}
      <section className={styles.hero}>
        <span className={styles.heroNumber} aria-hidden="true">
          {number}
        </span>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroCopy}>
            {kicker ? <p className={`kicker kicker--light ${styles.heroKicker}`}>{kicker}</p> : null}
            <h1 className={styles.heroTitle}>{title}</h1>
            <p className={styles.heroIntro}>{intro}</p>
            <div className={styles.heroActions}>
              <MagneticCTA href={quoteHref} variant="primary">
                Start a Project
              </MagneticCTA>
              <Link href="/upload" className={styles.uploadLink}>
                Upload Artwork →
              </Link>
            </div>
          </div>
          <div className={styles.heroMedia}>
            <MediaMask label={`Service ${number} — production photography`} ratio="4 / 5" />
          </div>
        </div>
        <span className={`reg-mark reg-mark--br ${styles.heroReg}`} aria-hidden="true" />
      </section>

      {/* --- Capabilities as customer outcomes --- */}
      <section className={`section-pad ${styles.capabilities}`} aria-labelledby="capabilities-heading">
        <div className="container">
          <Reveal>
            <p className="kicker">
              What REM handles
              <span className="crimson-rule" aria-hidden="true" />
            </p>
            <h2 id="capabilities-heading" className={styles.capabilitiesTitle}>
              Capability, translated to your outcome.
            </h2>
          </Reveal>
          <ul className={styles.capabilityGrid} role="list">
            {capabilities.map((cap, i) => (
              <li key={cap.title}>
                <Reveal delay={Math.min(i * 0.06, 0.3)}>
                  <div className={styles.capabilityCard}>
                    <span className={styles.capabilityIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.capabilityTitle}>{cap.title}</h3>
                    <p className={styles.capabilityDesc}>{cap.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>

          {outcomes && outcomes.length > 0 ? (
            <Reveal>
              <ul className={styles.outcomes} role="list">
                {outcomes.map((outcome) => (
                  <li key={outcome} className={styles.outcome}>
                    {outcome}
                  </li>
                ))}
              </ul>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* --- Page-specific sections --- */}
      {children}

      <RushPrompt dark />

      {/* --- Closing conversion --- */}
      <section className={`section-pad ${styles.closing}`} aria-labelledby="closing-heading">
        <div className={`container ${styles.closingInner}`}>
          <Reveal>
            <p className={`kicker kicker--light`}>
              Start your project
              <span className="crimson-rule" aria-hidden="true" />
            </p>
            <h2 id="closing-heading" className={styles.closingTitle}>
              Bring REM the job.
            </h2>
            <p className={styles.closingSupport}>
              Tell REM about the job. You&apos;ll hear back from a real person with real answers.
            </p>
            <div className={styles.closingActions}>
              <MagneticCTA href={quoteHref} variant="primary">
                Start Your Project
              </MagneticCTA>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
