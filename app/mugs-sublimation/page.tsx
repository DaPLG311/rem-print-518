import type { Metadata } from 'next';
import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import { business } from '@/lib/config';
import { JsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo';
import styles from './page.module.css';

const DESCRIPTION =
  'Full-color sublimated mugs and goods in Albany NY. No minimums. No setup fees. No fading. No flaking. One mug or a hundred — same answer: yes.';

export const metadata: Metadata = pageMetadata({
  title: `Mugs & Sublimation — ${business.name}`,
  description: DESCRIPTION,
  path: '/mugs-sublimation',
});

const capabilities = [
  {
    title: 'No minimums',
    desc: 'Order exactly what you need, even a single piece.',
  },
  {
    title: 'No setup fees',
    desc: 'Small runs make sense here.',
  },
  {
    title: 'Full-color sublimation',
    desc: 'Photographic color baked into the surface.',
  },
  {
    title: 'No fading, no flaking',
    desc: 'The image is in the coating, not on top of it.',
  },
];

/** The sublimation process, told as a tactile production sequence. */
const processSteps = [
  {
    stage: 'INK',
    title: 'Printed in full color',
    desc: 'Your artwork prints edge to edge — photos, gradients, fine detail. Sublimation is not a sticker or a screen; the whole image goes down at once.',
  },
  {
    stage: 'HEAT',
    title: 'Pressed under heat',
    desc: 'Heat and pressure turn the ink to gas and drive it into the coating itself. This is the part your hands will never feel — because there is no layer on top.',
  },
  {
    stage: 'SURFACE',
    title: 'Part of the piece',
    desc: 'The image is in the coating, not on top of it. Daily handling meets a surface, not a print sitting on one.',
  },
];

const runSizes = [
  { qty: '1', label: 'A single mug', desc: 'A gift, a proof, a one-off. Still yes.' },
  { qty: '12', label: 'The whole team', desc: 'A dozen for the office, the crew, the booth table.' },
  { qty: '100+', label: 'By the case', desc: 'Event favors, client gifts, merch runs — cased and ready.' },
];

export default function MugsSublimationPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Mugs & Sublimation',
          description: DESCRIPTION,
          path: '/mugs-sublimation',
        })}
      />
      <ServicePageLayout
        number="03"
        title="One mug or a hundred. Same answer: yes."
        kicker="Service 03 — Mugs & Sublimation"
        intro="Full-color sublimated mugs and goods. No minimums. No setup fees. No fading. No flaking."
        capabilities={capabilities}
        outcomes={[
          'Order one. Order a case.',
          'Photographic color, edge to edge',
          'The image is in the coating',
        ]}
        quoteService="mugs-sublimation"
      >
        {/* --- INK → HEAT → SURFACE: how sublimation earns its claims --- */}
        <section className={`section-pad ${styles.process}`} aria-labelledby="process-heading">
          <span className={styles.processGhost} aria-hidden="true">
            HEAT
          </span>
          <div className="container">
            <Reveal>
              <p className={`kicker kicker--light ${styles.processKicker}`}>
                How sublimation works
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="process-heading" className={styles.processTitle}>
                Ink. <em className={styles.titleItalic}>Heat.</em> Surface<span className={styles.crimsonDot}>.</span>
              </h2>
              <p className={styles.processSupport}>
                Why sublimation holds up: the color becomes part of the coating instead of sitting on it.
              </p>
            </Reveal>
            <ol className={styles.processSteps} role="list">
              {processSteps.map((step, i) => (
                <li key={step.stage} className={styles.processStep}>
                  <Reveal delay={Math.min(i * 0.08, 0.24)}>
                    <span className={styles.stepIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.stepStage}>{step.stage}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepDesc}>{step.desc}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <p className={styles.ticketChip} aria-hidden="true">
                JOB №03 · RUN 1 — YES, ONE · FULL COLOR
              </p>
            </Reveal>
          </div>
        </section>

        {/* --- Runs of any size: warm, tactile, product-forward --- */}
        <section className={`section-pad ${styles.runs}`} aria-labelledby="runs-heading">
          <div className="container">
            <div className={styles.runsHeader}>
              <Reveal>
                <p className="kicker">
                  Any run size
                  <span className="crimson-rule" aria-hidden="true" />
                </p>
                <h2 id="runs-heading" className={styles.runsTitle}>
                  No minimums means <em className={styles.titleItalic}>no minimums.</em>
                </h2>
                <p className={styles.runsSupport}>
                  Most shops make small orders feel like a favor. With no setup fees, a run of one is a
                  real job here — and a run of a hundred is just a longer press day.
                </p>
              </Reveal>
            </div>
            <div className={styles.runsGrid}>
              <ul className={styles.runList} role="list">
                {runSizes.map((run, i) => (
                  <li key={run.qty} className={styles.runRow}>
                    <Reveal delay={Math.min(i * 0.08, 0.24)}>
                      <div className={styles.runRowInner}>
                        <span className={styles.runQty} aria-hidden="true">
                          {run.qty}
                        </span>
                        <div className={styles.runCopy}>
                          <h3 className={styles.runLabel}>
                            <span className="visually-hidden">Quantity {run.qty} — </span>
                            {run.label}
                          </h3>
                          <p className={styles.runDesc}>{run.desc}</p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                ))}
              </ul>
              <div className={styles.runsMedia}>
                <MediaMask label="Sublimated mugs — product photography" ratio="4 / 5" />
              </div>
            </div>
            <Reveal>
              <div className={styles.runsAction}>
                <MagneticCTA href="/quote?service=mugs-sublimation" variant="primary">
                  Start a Mug Project
                </MagneticCTA>
                <p className={styles.runsActionNote}>
                  Tell REM the item, the artwork, and the date. A real person answers.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
