import type { Metadata } from 'next';
import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import { pageMetadata, serviceJsonLd, JsonLd } from '@/lib/seo';
import { business } from '@/lib/config';
import styles from './page.module.css';

const DESCRIPTION =
  'REM prints it, preps it, and gets it into the mail stream. EDDM, variable data, folding, sealing, tabbing, sorting, and campaign mailing — one Albany partner, start to finish.';

export const metadata: Metadata = pageMetadata({
  title: `Direct Mail — From Printed Piece to Mailbox | ${business.name}`,
  description: DESCRIPTION,
  path: '/direct-mail',
});

const capabilities = [
  {
    title: 'EDDM',
    desc: 'Reach every door in the neighborhoods you choose.',
  },
  {
    title: 'Variable data',
    desc: 'Every piece addressed to a real name, not "Resident."',
  },
  {
    title: 'Folding & sealing',
    desc: 'Mail-ready pieces, done to postal spec.',
  },
  {
    title: 'Tabbing & sorting',
    desc: 'Prepared the way the mail stream requires.',
  },
  {
    title: 'Campaign mailing',
    desc: 'Timed drops that leave on schedule.',
  },
];

const pipeline = [
  {
    number: '01',
    title: 'Printed',
    desc: 'Your piece comes off the press in the same building it gets mailed from.',
  },
  {
    number: '02',
    title: 'Addressed',
    desc: 'Variable data puts a real name on every piece — or EDDM maps the routes.',
  },
  {
    number: '03',
    title: 'Prepped',
    desc: 'Folded, sealed, tabbed, and sorted to postal spec. No second vendor.',
  },
  {
    number: '04',
    title: 'Mailed',
    desc: 'Into the mail stream on schedule. The drop leaves when it’s supposed to.',
  },
];

export default function DirectMailPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Direct Mail',
          description: DESCRIPTION,
          path: '/direct-mail',
        })}
      />
      <ServicePageLayout
        number="04"
        kicker="Service 04"
        title="From printed piece to mailbox."
        intro="REM prints it, preps it, and gets it into the mail stream. Variable data, folding, tabbing, sorting — one partner, start to finish."
        capabilities={capabilities}
        outcomes={[
          'One partner from press to postal drop',
          'Prepared to spec, not bounced back',
          'Drops scheduled into the mail stream on time',
        ]}
        quoteService="direct-mail"
      >
        {/* --- The pipeline: piece → mailbox --- */}
        <section
          className={`section-pad dark-section ${styles.pipeline}`}
          aria-labelledby="pipeline-heading"
        >
          <span className={styles.ghostWord} aria-hidden="true">
            MAILBOX
          </span>
          <div className={`container ${styles.pipelineInner}`}>
            <Reveal>
              <p className="kicker kicker--light">
                The mail stream
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="pipeline-heading" className={styles.pipelineTitle}>
                One roof. <em>Zero</em> handoffs.
              </h2>
              <p className={styles.pipelineSupport}>
                Most mailings die in the gap between the printer and the mail house. At REM
                there is no gap — the piece never leaves the building until it leaves for the
                mailbox.
              </p>
            </Reveal>

            <ol className={styles.stations} role="list">
              {pipeline.map((step, i) => (
                <li key={step.number} className={styles.station}>
                  <Reveal delay={Math.min(i * 0.08, 0.32)}>
                    <div className={styles.stationCard}>
                      <span className={styles.stationNumber} aria-hidden="true">
                        {step.number}
                      </span>
                      <h3 className={styles.stationTitle}>{step.title}</h3>
                      <p className={styles.stationDesc}>{step.desc}</p>
                    </div>
                  </Reveal>
                  {i < pipeline.length - 1 ? (
                    <span className={styles.stationArrow} aria-hidden="true">
                      →
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>

            <Reveal>
              <p className={`ticket-line ${styles.ticketLine}`}>
                PIECE IN · PIECE ADDRESSED · PIECE PREPPED · PIECE MAILED — SAME BUILDING,
                SAME JOB TICKET
              </p>
            </Reveal>
          </div>
          <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
          <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />
        </section>

        {/* --- Mail-stream moment: trays, sorted, staged --- */}
        <section className={`section-pad light-section ${styles.trays}`} aria-labelledby="trays-heading">
          <div className={`container ${styles.traysInner}`}>
            <div className={styles.traysMedia}>
              <MediaMask
                label="Mail trays — sorted postcards, staged for the stream"
                ratio="16 / 11"
              />
            </div>
            <div className={styles.traysCopy}>
              <Reveal>
                <p className="kicker">
                  Postal spec, handled
                  <span className="crimson-rule" aria-hidden="true" />
                </p>
                <h2 id="trays-heading" className={styles.traysTitle}>
                  The post office has rules. REM speaks them fluently.
                </h2>
                <p className={styles.traysSupport}>
                  Tabbing placement, fold direction, sort order, tray prep — the details that
                  decide whether your mailing moves or gets kicked back. REM prepares every
                  piece the way the mail stream requires, so your job goes in once and keeps
                  going.
                </p>
                <ul className={styles.traysList} role="list">
                  <li>Every-door and addressed campaigns, both handled in-house</li>
                  <li>Pieces folded, sealed, and tabbed to postal spec</li>
                  <li>Sorted and trayed so the mailing enters the stream clean</li>
                </ul>
              </Reveal>
            </div>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
