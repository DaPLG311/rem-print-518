import Reveal from '@/components/shared/Reveal';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import { JsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo';
import styles from './page.module.css';

export const metadata = pageMetadata({
  title: 'Printing & Bindery in Albany, NY | REM Digital Print & Mail Center',
  description:
    'Business cards, flyers, brochures, envelopes, posters, and booklets — printed and finished in-house in Albany. Cutting, folding, scoring, laminating, die cutting, saddle stitching, wire binding.',
  path: '/printing-bindery',
});

const capabilities = [
  {
    title: 'Digital printing',
    desc: 'Short runs and fast reprints without plate setup delays.',
  },
  {
    title: 'Cutting & folding',
    desc: 'Pieces arrive finished, not as flat sheets you have to deal with.',
  },
  {
    title: 'Scoring',
    desc: 'Clean folds on heavy stock, no cracked ink lines.',
  },
  {
    title: 'Laminating & dry mounting',
    desc: 'Pieces that survive handling, weather, and time.',
  },
  {
    title: 'Numbering & die cutting',
    desc: 'Tickets, forms, and custom shapes done in-house.',
  },
  {
    title: 'Drilling',
    desc: 'Ready for binders and posts the day you pick it up.',
  },
  {
    title: 'Saddle stitching & wire binding',
    desc: 'Booklets and manuals bound and boxed, ready to hand out.',
  },
];

const outcomes = [
  'Finished, not just printed',
  'One vendor from file to done',
  'Rush options when the date is real',
];

/**
 * Finishing-floor wall — capability-wall.png translation for the bindery lane.
 * Jargon term → what the customer actually gets.
 */
const finishing = [
  {
    term: 'Die cutting',
    speaks: 'Custom shapes',
    outcome: 'Your piece cut to any shape — not stuck at rectangle.',
  },
  {
    term: 'Saddle stitch',
    speaks: 'Stapled booklets',
    outcome: 'Programs and booklets that open flat and hand out clean.',
  },
  {
    term: 'Wire binding',
    speaks: 'Wire-bound manuals',
    outcome: 'Manuals that lie flat on a desk and fold back on themselves.',
  },
  {
    term: 'Laminating',
    speaks: 'Sealed surfaces',
    outcome: 'Menus, signs, and cards that shrug off spills and handling.',
  },
  {
    term: 'Scoring',
    speaks: 'Pre-creased folds',
    outcome: 'Heavy stock that folds crisp instead of cracking the ink.',
  },
  {
    term: 'Numbering',
    speaks: 'Sequential numbers',
    outcome: 'Tickets and forms numbered in order, ready to track.',
  },
  {
    term: 'Drilling',
    speaks: 'Clean punched holes',
    outcome: 'Pages that drop straight into binders and posts.',
  },
  {
    term: 'Dry mounting',
    speaks: 'Rigid backing',
    outcome: 'Prints and posters mounted stiff, ready to display.',
  },
];

export default function PrintingBinderyPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Printing & Bindery',
          description:
            'Digital printing and in-house bindery: cutting, folding, scoring, laminating, dry mounting, numbering, die cutting, drilling, saddle stitching, and wire binding in Albany, NY.',
          path: '/printing-bindery',
        })}
      />
      <ServicePageLayout
        number="01"
        kicker="Service 01"
        title="Printing that moves with your deadline."
        intro="Business cards, flyers, brochures, envelopes, posters, booklets. From file to finished piece — cut, folded, bound, and out the door."
        capabilities={capabilities}
        outcomes={outcomes}
        quoteService="printing"
      >
        {/* --- Finishing floor: bindery jargon → customer outcomes --- */}
        <section
          className={`section-pad ${styles.finishing}`}
          aria-labelledby="finishing-heading"
        >
          <span className={styles.ghostWord} aria-hidden="true">
            BINDERY
          </span>
          <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
          <div className={`container ${styles.finishingInner}`}>
            <Reveal>
              <div className={styles.finishingHead}>
                <div>
                  <p className="kicker kicker--light">
                    The finishing floor
                    <span className="crimson-rule" aria-hidden="true" />
                  </p>
                  <h2 id="finishing-heading" className={styles.finishingTitle}>
                    The bindery speaks jargon.
                    <br />
                    <em className={styles.finishingItalic}>You get outcomes.</em>
                  </h2>
                </div>
                <p className={`ticket-line ${styles.ticketChip}`}>
                  Finishing register · 01–08 · In-house
                </p>
              </div>
            </Reveal>
            <ul className={styles.wall} role="list">
              {finishing.map((item, i) => (
                <li key={item.term} className={styles.wallItem}>
                  <Reveal delay={Math.min(i * 0.05, 0.3)}>
                    <div className={styles.wallCard}>
                      <span className={styles.wallNumber} aria-hidden="true">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className={styles.wallFoot}>
                        <h3 className={styles.wallTerm}>{item.term}</h3>
                        <p className={styles.wallSpeak}>{item.speaks}</p>
                        <p className={styles.wallOutcome}>{item.outcome}</p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
            <Reveal>
              <p className={styles.wallClose}>
                Say it in plain English. REM translates it to the machine.
              </p>
            </Reveal>
          </div>
        </section>
      </ServicePageLayout>
    </>
  );
}
