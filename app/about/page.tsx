import type { Metadata } from 'next';
import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import ProofMetric from '@/components/shared/ProofMetric';
import Reveal from '@/components/shared/Reveal';
import RushPrompt from '@/components/shared/RushPrompt';
import { business, proof } from '@/lib/config';
import { pageMetadata, localBusinessJsonLd, JsonLd } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'About REM — Founded Here. Built Over Decades.',
  description: `Founded by the Remmert family in ${proof[0].value}, REM has grown from a neighborhood print shop into a full-service production partner for businesses, campaigns, schools, and organizations across the Capital Region.`,
  path: '/about',
});

const pillars = [
  {
    label: `Established ${proof[0].value}`,
    line: 'Decades of Capital Region production.',
  },
  {
    label: 'Speed',
    line: 'Deadlines are a reason to call, not a problem.',
  },
  {
    label: 'Capability',
    line: 'Print, apparel, mail, promo, political — one roof.',
  },
  {
    label: 'In-House Control',
    line: `${proof[1].value} of production stays in the building.`,
  },
  {
    label: 'Human Service',
    line: 'Real people behind the machines.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd()} />

      {/* ACT 1 — HERITAGE STATEMENT (paper, editorial) */}
      <section className={`light-section ${styles.hero}`} aria-labelledby="about-headline">
        <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
        <span className={styles.ghostYear} aria-hidden="true">
          {proof[0].value}
        </span>
        <div className={`container ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={`kicker ${styles.kicker}`}>
              About REM
              <span className="crimson-rule" aria-hidden="true" />
            </p>
            <h1 id="about-headline" className={styles.headline}>
              Founded <em>here</em>
              <span className={styles.period}>.</span>
              <br />
              Built over
              <br />
              <em>decades</em>
              <span className={styles.period}>.</span>
            </h1>
            <p className={styles.lede}>
              Founded by the Remmert family in {proof[0].value}, REM has grown from a
              neighborhood print shop into a full-service production partner for businesses,
              campaigns, schools, and organizations across the Capital Region.
            </p>
            <p className={`ticket-line ${styles.ticket}`}>
              Est. {proof[0].value} · {business.city}, {business.region} · Run continuous
            </p>
          </div>
          <div className={styles.heroMedia}>
            <Reveal>
              <MediaMask
                label="FACILITY — PRESS FLOOR (REAL PHOTO PENDING)"
                ratio="4 / 3"
              />
            </Reveal>
            <Reveal delay={0.12} className={styles.heroMediaOffset}>
              <MediaMask
                label="THE WORK IN HAND (REAL PHOTO PENDING)"
                ratio="1 / 1"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACT 2 — GROWTH LINE (dark, from traditional to digital) */}
      <section className={`dark-section section-pad ${styles.growth}`} aria-labelledby="growth-heading">
        <div className={`container ${styles.growthInner}`}>
          <p className="kicker kicker--light">
            The Long Run
            <span className="crimson-rule" aria-hidden="true" />
          </p>
          <Reveal>
            <h2 id="growth-heading" className={styles.growthHeadline}>
              From a neighborhood <em>print shop</em> to a full-service{' '}
              <em>production floor</em><span className={styles.period}>.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={styles.growthSupport}>
              What started as traditional printing grew, decade by decade, into modern
              digital production — printing, finishing, apparel, sublimation, mail, promo,
              and political work handled under one roof in {business.city}.
            </p>
          </Reveal>
          <div className={styles.proofRow} role="list" aria-label="Proof of production">
            {proof.map((m) => (
              <div role="listitem" key={m.value} className={styles.proofItem}>
                <ProofMetric value={m.value} label={m.label} />
              </div>
            ))}
          </div>
          <p className={`ticket-line ${styles.growthTicket}`}>
            One building · Fewer handoffs · Faster answers
          </p>
        </div>
      </section>

      {/* ACT 3 — HUMAN SERVICE (soft white) */}
      <section className={`light-section--soft section-pad ${styles.people}`} aria-labelledby="people-heading">
        <div className={`container ${styles.peopleGrid}`}>
          <div className={styles.peopleMedia}>
            <Reveal>
              <MediaMask
                label="THE REM TEAM (REAL PHOTO PENDING)"
                ratio="4 / 5"
              />
            </Reveal>
          </div>
          <div className={styles.peopleCopy}>
            <p className="kicker">
              The People Part
              <span className="crimson-rule" aria-hidden="true" />
            </p>
            <Reveal>
              <h2 id="people-heading" className={styles.peopleHeadline}>
                All this capability still has <em>people</em> behind it
                <span className={styles.period}>.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className={styles.peopleSupport}>
                Machines don&apos;t answer questions. People do. When you call REM, you
                talk to someone who can walk out onto the floor and check your job.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className={styles.peopleSub}>
                Real people answer the phone. Real hands run the machines.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ACT 4 — PILLARS BAND (graphite manifest) */}
      <section className={`dark-section--graphite section-pad ${styles.pillars}`} aria-labelledby="pillars-heading">
        <div className="container">
          <p className="kicker kicker--light">
            What REM Runs On
            <span className="crimson-rule" aria-hidden="true" />
          </p>
          <h2 id="pillars-heading" className={styles.pillarsHeadline}>
            Five things that don&apos;t change<span className={styles.period}>.</span>
          </h2>
          <ol className={styles.pillarList}>
            {pillars.map((p, i) => (
              <li key={p.label} className={styles.pillarRow}>
                <span className={styles.pillarNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.pillarLabel}>{p.label}</span>
                <span className={styles.pillarLine}>{p.line}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ACT 5 — CONVERSION CLOSE (crimson) */}
      <section className={`crimson-section section-pad ${styles.close}`} aria-labelledby="close-heading">
        <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />
        <div className={`container ${styles.closeInner}`}>
          <p className="kicker kicker--light">Bring REM the job</p>
          <h2 id="close-heading" className={styles.closeHeadline}>
            What are we <em>making</em>?
          </h2>
          <p className={styles.closeSupport}>
            Tell REM about the job. You&apos;ll hear back from a real person with real
            answers.
          </p>
          <div className={styles.closeActions}>
            <MagneticCTA href="/quote" variant="dark">
              Start Your Project
            </MagneticCTA>
            <MagneticCTA href={`tel:${business.phone}`} variant="ghost">
              Call REM
            </MagneticCTA>
          </div>
        </div>
      </section>

      <RushPrompt />
    </>
  );
}
