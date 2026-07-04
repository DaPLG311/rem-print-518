import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Reveal from '@/components/shared/Reveal';
import MediaMask from '@/components/shared/MediaMask';
import styles from './NeedNavigation.module.css';

interface NeedCard {
  label: string;
  statement: string;
  href: string;
  mediaLabel?: string;
}

const CARDS: NeedCard[] = [
  { label: 'PRINTING', statement: 'I NEED SOMETHING PRINTED.', href: '/printing-bindery' },
  { label: 'APPAREL', statement: 'I NEED SHIRTS OR APPAREL.', href: '/apparel' },
  { label: 'DIRECT MAIL', statement: 'I NEED TO REACH PEOPLE BY MAIL.', href: '/direct-mail' },
  {
    label: 'PROMOTIONAL',
    statement: 'I NEED BRANDED PROMOTIONAL ITEMS.',
    href: '/promotional-products',
  },
  {
    label: 'POLITICAL',
    statement: 'I NEED POLITICAL MATERIALS FAST.',
    href: '/political-printing',
    mediaLabel: 'SIGNS & BANNERS',
  },
  {
    label: 'NOT SURE',
    statement: "I'M NOT SURE WHAT I NEED.",
    href: '/quote?service=not-sure',
    mediaLabel: 'STATIONERY FLAT-LAY',
  },
];

/**
 * ACT II — CUSTOMER RECOGNITION. Task-based entry paths on the paper field.
 * Six statement cards; hover/focus inverts to warm-black with a crimson ring.
 */
export default function NeedNavigation() {
  return (
    <section
      className={`light-section section-pad ${styles.section}`}
      aria-labelledby="need-heading"
    >
      <div className="container">
        <Reveal>
          <h2 id="need-heading" className={styles.heading}>
            WHAT ARE YOU TRYING TO GET DONE?
          </h2>
        </Reveal>

        <ul className={styles.grid} role="list">
          {CARDS.map((card, i) => (
            <li key={card.href} className={styles.cell}>
              <Reveal delay={i * 0.06} className={styles.revealFill}>
                <Link href={card.href} className={styles.card}>
                  <span className={styles.label}>{card.label}</span>
                  {card.mediaLabel ? (
                    <span className={styles.media}>
                      <MediaMask ratio="16 / 7" label={card.mediaLabel} />
                    </span>
                  ) : null}
                  <span className={styles.statement}>{card.statement}</span>
                  <span className={styles.footer}>
                    <span className={styles.explore} aria-hidden="true">
                      EXPLORE
                      <ArrowRight size={15} />
                    </span>
                    <ArrowRight className={styles.arrow} size={26} aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
