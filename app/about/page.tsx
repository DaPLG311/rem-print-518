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
  title: 'About REM — Local Albany Print, Mail, Apparel & Promo.',
  description: `The Remmert family has been in printing since ${proof[0].value}. REM serves Albany from ${business.addressLine} with print, bindery, mail, apparel, sublimation, and promotional product work.`,
  path: '/about',
});

const pillars = [
  {
    label: `Printing roots ${proof[0].value}`,
    line: 'The Remmert family has been in the printing industry for decades.',
  },
  {
    label: 'Speed',
    line: 'Most digital print jobs are positioned around a 3-5 business day window.',
  },
  {
    label: 'Capability',
    line: 'Digital printing, bindery, mailing, wearables, sublimation, and promo.',
  },
  {
    label: 'In-House Control',
    line: `${proof[1].value} of jobs can be completed in-house, according to REM's services page.`,
  },
  {
    label: 'Human Service',
    line: 'A local printer with a staff that knows its customers.',
  },
];

const localFacts = [
  {
    label: 'Call',
    value: business.phoneDisplay,
    href: `tel:${business.phone}`,
  },
  {
    label: 'Email',
    value: business.email,
    href: `mailto:${business.email}`,
  },
  {
    label: 'Visit',
    value: business.officialSite.replace('https://www.', ''),
    href: business.officialSite,
  },
  {
    label: 'Find REM',
    value: business.addressLine,
    href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.addressLine)}`,
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
              The Remmert family has been in the printing industry since {proof[0].value}.
              Today REM is a local Albany production shop for digital print, bindery,
              mailing, wearables, sublimation, promotional products, and political work.
            </p>
            <p className={`ticket-line ${styles.ticket}`}>
              {proof[0].value} roots · {business.addressLine} · {business.phoneDisplay}
            </p>
            <div className={styles.factGrid} aria-label="REM contact facts">
              {localFacts.map((fact) => (
                <a key={fact.label} href={fact.href} className={styles.factCard}>
                  <span className={styles.factLabel}>{fact.label}</span>
                  <span className={styles.factValue}>{fact.value}</span>
                </a>
              ))}
            </div>
          </div>
          <div className={styles.heroMedia}>
            <Reveal>
              <MediaMask
                label="Digital print + bindery floor"
                ratio="4 / 3"
              />
            </Reveal>
            <Reveal delay={0.12} className={styles.heroMediaOffset}>
              <MediaMask
                label="Mail, apparel, promo"
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
              REM's own services list covers digital printing, in-house bindery, wearables,
              sublimation, screen printing, mailing services, and promotional products.
              The practical promise is simple: fewer handoffs, clearer answers, and more
              of the job managed from Albany.
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
                label="Local Albany production shop"
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
                The Capital Region Chamber describes REM as a local printer with a caring,
                professional staff. That is the point of this site: get customers to a real
                person fast, with enough job detail to make the next conversation useful.
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
