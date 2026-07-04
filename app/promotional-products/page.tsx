import type { Metadata } from 'next';
import MagneticCTA from '@/components/shared/MagneticCTA';
import Reveal from '@/components/shared/Reveal';
import ServicePageLayout from '@/components/shared/ServicePageLayout';
import { business } from '@/lib/config';
import { JsonLd, pageMetadata, serviceJsonLd } from '@/lib/seo';
import styles from './page.module.css';

const DESCRIPTION =
  `Promotional products without the catalog scroll. Tell ${business.shortName} what you're promoting, ` +
  `who it's for, how many, the budget range, and the date — ${business.shortName} narrows the field. ` +
  `${business.serviceArea}.`;

export const metadata: Metadata = pageMetadata({
  title: `Promotional Products | ${business.name}`,
  description: DESCRIPTION,
  path: '/promotional-products',
});

const discoveryQuestions = [
  {
    title: 'What are you promoting?',
    desc: 'A launch, an event, a hire, a season — the goal decides the item, not the other way around.',
  },
  {
    title: 'Who is it for?',
    desc: 'Customers, staff, students, donors, attendees. The audience rules out half the catalog instantly.',
  },
  {
    title: 'How many do you need?',
    desc: 'Quantity changes what makes sense. A run of 50 and a run of 5,000 are different conversations.',
  },
  {
    title: "What's the budget range?",
    desc: 'A range is enough. It sets the lane so nobody wastes time on items that were never in play.',
  },
  {
    title: 'When does it need to be in hand?',
    desc: 'The date is a filter, not a footnote. It narrows the field to what can actually arrive on time.',
  },
];

const outcomes = [
  'A shortlist, not a hundred-thousand-item catalog',
  'One conversation instead of a week of browsing',
  'Items matched to the goal, audience, and date',
];

export default function PromotionalProductsPage() {
  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: 'Promotional Products',
          description: DESCRIPTION,
          path: '/promotional-products',
        })}
      />
      <ServicePageLayout
        number="05"
        kicker="Service 05"
        title="Stop scrolling catalogs. Start with the goal."
        intro="There are a hundred thousand promo items. You don't need a catalog — you need an answer. Tell REM what you're promoting, who it's for, how many, the budget range, and the date. REM narrows the field."
        capabilities={discoveryQuestions}
        outcomes={outcomes}
        quoteService="promotional-products"
      >
        {/* --- NO CATALOG. ON PURPOSE. — guided discovery statement --- */}
        <section className={`section-pad ${styles.noCatalog}`} aria-labelledby="no-catalog-heading">
          <span className={styles.ghostWord} aria-hidden="true">
            PROMO
          </span>
          <div className={`container ${styles.noCatalogInner}`}>
            <div className={styles.noCatalogCopy}>
              <Reveal>
                <p className="kicker kicker--light">
                  Guided discovery
                  <span className="crimson-rule" aria-hidden="true" />
                </p>
                <h2 id="no-catalog-heading" className={styles.noCatalogTitle}>
                  No catalog.
                  <br />
                  <em>On purpose.</em>
                </h2>
                <p className={styles.noCatalogSupport}>
                  Endless product grids put the work on you. REM works the other way: you bring
                  the goal, REM brings the answer. Five questions in, the field is already
                  narrow — and a real person walks you through what&apos;s left.
                </p>
                <div className={styles.noCatalogActions}>
                  <MagneticCTA href="/quote?service=promotional-products" variant="primary">
                    Start a Promo Project
                  </MagneticCTA>
                </div>
              </Reveal>
            </div>

            {/* Specimen brief ticket — decorative example, clearly not a live job */}
            <Reveal delay={0.15} className={styles.ticketWrap}>
              <aside className={styles.ticket} aria-label="Example project brief — specimen only">
                <div className={styles.ticketHead}>
                  <span className={styles.ticketStamp}>SPECIMEN</span>
                  <span className={styles.ticketNo}>PROJECT BRIEF · №05</span>
                </div>
                <dl className={styles.ticketRows}>
                  <div className={styles.ticketRow}>
                    <dt>PROMOTING</dt>
                    <dd>Grand opening</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>AUDIENCE</dt>
                    <dd>Walk-in customers</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>QUANTITY</dt>
                    <dd>500</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>BUDGET RANGE</dt>
                    <dd>To be discussed</dd>
                  </div>
                  <div className={styles.ticketRow}>
                    <dt>IN HAND BY</dt>
                    <dd>Opening week</dd>
                  </div>
                </dl>
                <p className={styles.ticketFoot}>
                  FIVE ANSWERS IN. FIELD NARROWED. <span aria-hidden="true">///</span>
                </p>
              </aside>
            </Reveal>
          </div>
          <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
        </section>
      </ServicePageLayout>
    </>
  );
}
