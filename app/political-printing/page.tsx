import type { Metadata } from 'next';
import DeadlineCall from '@/components/political-printing/DeadlineCall';
import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import { business } from '@/lib/config';
import { JsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo';
import styles from './page.module.css';

const DESCRIPTION =
  'Political printing in Albany and the Capital Region: postcards, brochures, literature, mailings, posters, banners, yard signs, buttons, bumper stickers, and magnets — with design and mailing support under one roof. Every party, every race, printed neutral and fast.';

export const metadata: Metadata = pageMetadata({
  title: `Political Printing — Campaign Materials at Campaign Speed | ${business.name}`,
  description: DESCRIPTION,
  path: '/political-printing',
});

const capabilities = [
  {
    title: 'Campaign literature & postcards',
    desc: 'Walk pieces and mailers produced together, matched.',
  },
  {
    title: 'Yard signs, posters & banners',
    desc: 'Visibility that goes up when the race heats up.',
  },
  {
    title: 'Buttons, stickers & magnets',
    desc: 'Handout items ready for the next event.',
  },
  {
    title: 'Mailing support',
    desc: 'Printed and into the mail stream without a second vendor.',
  },
  {
    title: 'Design support',
    desc: 'Files fixed and finished when the clock is running.',
  },
];

/** Full offer list from the brief — the campaign arsenal wall. */
const arsenal = [
  'Postcards',
  'Brochures',
  'Campaign literature',
  'Mailings',
  'Posters',
  'Banners',
  'Yard signs',
  'Buttons',
  'Bumper stickers',
  'Magnets',
  'Campaign items',
  'Design support',
  'Mailing support',
];

export default function PoliticalPrintingPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Political Printing',
          description: DESCRIPTION,
          path: '/political-printing',
        })}
      />
      <ServicePageLayout
        number="06"
        title="Campaigns move on deadlines. So does REM."
        kicker="Service 06 — Established shop. Still fast."
        intro="Postcards, brochures, literature, mailings, posters, banners, yard signs, buttons, bumper stickers, magnets, and campaign items — with design support and mailing support under the same roof. Every party. Every race. Printed neutral, printed fast."
        capabilities={capabilities}
        outcomes={[
          'One roof: printed, finished, and into the mail stream',
          'Neutral shop — every party, every race, same urgency',
          'Deadline-first intake: tell REM the date, REM tells you what is possible',
        ]}
        quoteService="political"
      >
        {/* --- Election-date deadline module --- */}
        <section
          className={`section-pad ${styles.deadline} dark-section`}
          aria-labelledby="deadline-heading"
        >
          <span className={styles.deadlineGhost} aria-hidden="true">
            DEADLINE
          </span>
          <div className={`container ${styles.deadlineInner}`}>
            <Reveal>
              <p className={`kicker kicker--light`}>
                Election-day math
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="deadline-heading" className={styles.deadlineTitle}>
                Count <em>backward</em> from election day.
              </h2>
              <p className={styles.deadlineSupport}>
                Mail pieces need time in the mail stream. Walk pieces need to be in hands
                before the doors get knocked. Signs need to be up while the race is live.
                Bring REM the date the piece has to land — REM works the production schedule
                backward from there and tells you, straight, what&apos;s possible.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ol className={styles.countdown} role="list">
                <li className={styles.countdownStep}>
                  <span className={styles.countdownIndex} aria-hidden="true">
                    01
                  </span>
                  <h3 className={styles.countdownTitle}>The date it must land</h3>
                  <p className={styles.countdownDesc}>
                    Election day, early voting, a debate, a door-knock weekend — name it.
                  </p>
                </li>
                <li className={styles.countdownStep}>
                  <span className={styles.countdownIndex} aria-hidden="true">
                    02
                  </span>
                  <h3 className={styles.countdownTitle}>Mail-stream &amp; production time</h3>
                  <p className={styles.countdownDesc}>
                    REM schedules print, finishing, and mailing backward from your date.
                  </p>
                </li>
                <li className={styles.countdownStep}>
                  <span className={styles.countdownIndex} aria-hidden="true">
                    03
                  </span>
                  <h3 className={styles.countdownTitle}>A straight answer, fast</h3>
                  <p className={styles.countdownDesc}>
                    A real person reviews the job and tells you what&apos;s possible — before
                    anything is promised.
                  </p>
                </li>
              </ol>
            </Reveal>
            <Reveal delay={0.15}>
              <div className={styles.deadlineTicket}>
                <span className={styles.ticketChip}>URGENT?</span>
                <DeadlineCall className={styles.deadlineCallLink}>
                  Call About a Deadline → {business.phoneDisplay}
                </DeadlineCall>
              </div>
            </Reveal>
          </div>
        </section>

        {/* --- Campaign arsenal: full offer wall --- */}
        <section className={`section-pad ${styles.arsenal}`} aria-labelledby="arsenal-heading">
          <div className="container">
            <Reveal>
              <p className="kicker">
                The full slate
                <span className="crimson-rule" aria-hidden="true" />
              </p>
              <h2 id="arsenal-heading" className={styles.arsenalTitle}>
                Everything a campaign puts in the field.
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <ul className={styles.arsenalList} role="list">
                {arsenal.map((item) => (
                  <li key={item} className={styles.arsenalItem}>
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className={styles.arsenalMedia}>
              <Reveal delay={0.1}>
                <MediaMask
                  label="Campaign materials — production photography"
                  ratio="16 / 9"
                />
              </Reveal>
            </div>
          </div>
        </section>

        {/* --- Neutrality + crimson takeover conversion band (per frame) --- */}
        <section className={styles.takeover} aria-labelledby="takeover-heading">
          <span className={`reg-mark reg-mark--tl ${styles.takeoverReg}`} aria-hidden="true" />
          <div className={`container ${styles.takeoverInner}`}>
            <Reveal>
              <p className={`kicker ${styles.takeoverKicker}`}>Printed neutral. Printed fast.</p>
              <h2 id="takeover-heading" className={styles.takeoverTitle}>
                Every party. Every race. <em>Same deadline energy.</em>
              </h2>
              <p className={styles.takeoverSupport}>
                REM is a production shop, not a position. Your materials get the same urgency,
                the same press time, and the same straight answers — whoever&apos;s name is on
                the piece.
              </p>
              <div className={styles.takeoverActions}>
                <MagneticCTA href="/quote?service=political" variant="dark">
                  Start a Political Project
                </MagneticCTA>
                <DeadlineCall className={styles.takeoverCall}>
                  Call About a Deadline →
                </DeadlineCall>
              </div>
            </Reveal>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
