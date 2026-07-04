import type { Metadata } from 'next';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import Reveal from '@/components/shared/Reveal';
import { business } from '@/lib/config';
import { pageMetadata, serviceJsonLd, JsonLd } from '@/lib/seo';
import styles from './page.module.css';

export const metadata: Metadata = pageMetadata({
  title: `Custom Apparel & Screen Printing — Albany, NY | ${business.shortName}`,
  description:
    'T-shirts, tanks, hoodies, and bags — screen printed in Albany for teams, events, brands, and campaigns. Fast turnaround. Tell REM the item, the count, and the date.',
  path: '/apparel',
});

const capabilities = [
  {
    title: 'Screen printing',
    desc: 'The classic method for bold, saturated color.',
  },
  {
    title: 'T-shirts, tanks & hoodies',
    desc: 'One order covers the whole roster, every size.',
  },
  {
    title: 'Bags & soft goods',
    desc: 'The same print quality on totes and carry pieces.',
  },
  {
    title: 'Order guidance',
    desc: "REM helps you answer: what item, how many, where's the artwork, when is it needed.",
  },
];

const fourQuestions = [
  {
    q: 'WHAT ITEM?',
    line: 'Tees, tanks, hoodies, or bags.',
    detail: 'Pick the piece the print lives on. Mixing items in one run is normal.',
  },
  {
    q: 'HOW MANY?',
    line: 'A rough number is fine.',
    detail: 'A dozen for the crew or a run for the whole event — the count shapes the answer.',
  },
  {
    q: 'ARTWORK?',
    line: 'Final, started, or nothing yet.',
    detail: "Bring what you have. REM meets the artwork where it is.",
  },
  {
    q: 'WHEN?',
    line: 'The date drives the plan.',
    detail: 'Tight window? Call — a real person will tell you what can happen by your date.',
  },
];

export default function ApparelPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Custom Apparel & Screen Printing',
          description:
            'Screen-printed t-shirts, tanks, hoodies, and bags for teams, events, brands, and campaigns in Albany and the Capital Region.',
          path: '/apparel',
        })}
      />
      <ServicePageLayout
        number="02"
        kicker="SERVICE 02 — APPAREL"
        title="Your brand. Your team. Your run."
        intro="T-shirts, tanks, hoodies, bags — screen printed for teams, events, brands, and campaigns. Fast turnaround."
        capabilities={capabilities}
        outcomes={[
          'One run, every size on the roster',
          'Screen printing handled in-house',
          'A straight answer on the date, from a person',
        ]}
        quoteService="apparel"
      >
        {/* --- Specimen job ticket (decorative sample, per apparel-service.png) --- */}
        <section className={`section-pad ${styles.ticketAct}`} aria-labelledby="ticket-heading">
          <span className={styles.ghostWord} aria-hidden="true">
            APPAREL
          </span>
          <div className={`container ${styles.ticketInner}`}>
            <Reveal>
              <p className={`kicker kicker--light`}>
                How an order reads
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="ticket-heading" className={styles.ticketHeading}>
                Four answers.
                <br />
                <em>That&rsquo;s the whole job.</em>
              </h2>
              <p className={styles.ticketSupport}>
                Every apparel run at REM starts from the same four lines. Here&rsquo;s what a
                ticket looks like — yours will read differently.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <div className={styles.ticket} role="img" aria-label="Sample apparel job ticket: item t-shirts, quantity 250, artwork ready to upload, needed by Friday, two weeks out.">
                <div className={styles.ticketHead} aria-hidden="true">
                  <span className={styles.ticketStamp}>SPECIMEN</span>
                  <span className={styles.ticketNo}>JOB №0518 · SAMPLE TICKET</span>
                </div>
                <dl className={styles.ticketRows} aria-hidden="true">
                  <div className={styles.ticketRow}>
                    <dt>ITEM</dt>
                    <dd>T-Shirts</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>QTY</dt>
                    <dd>250</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>ARTWORK</dt>
                    <dd>Ready to upload</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>NEEDED BY</dt>
                    <dd>Friday, two weeks out</dd>
                  </div>
                </dl>
                <div className={styles.ticketFoot} aria-hidden="true">
                  <span className={styles.cmykStrip}>
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>SCREEN PRINT · {business.serviceArea}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- The four questions, guided --- */}
        <section className={`section-pad ${styles.questionsAct}`} aria-labelledby="questions-heading">
          <div className="container">
            <Reveal>
              <p className="kicker">
                Order guidance
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="questions-heading" className={styles.questionsHeading}>
                Don&rsquo;t know shirts? <em>You don&rsquo;t have to.</em>
              </h2>
            </Reveal>
            <ol className={styles.questionGrid} role="list">
              {fourQuestions.map((item, i) => (
                <li key={item.q} className={styles.questionCard}>
                  <Reveal delay={Math.min(i * 0.08, 0.32)}>
                    <span className={styles.questionIndex} aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className={styles.questionTitle}>{item.q}</h3>
                    <p className={styles.questionLine}>{item.line}</p>
                    <p className={styles.questionDetail}>{item.detail}</p>
                  </Reveal>
                </li>
              ))}
            </ol>
            <Reveal>
              <p className={styles.questionsClose}>
                Answer what you can. <strong>REM fills in the rest.</strong>
              </p>
            </Reveal>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
