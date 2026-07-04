import Reveal from '@/components/shared/Reveal';
import MediaMask from '@/components/shared/MediaMask';
import styles from './InHouseAdvantage.module.css';

interface Station {
  number: string;
  title: string;
  copy: string;
  mediaLabel: string;
}

const STATIONS: Station[] = [
  {
    number: '01',
    title: 'PRINT',
    copy: 'Your piece comes off the press here.',
    mediaLabel: 'PRESS — STATION 01',
  },
  {
    number: '02',
    title: 'FINISH',
    copy: 'Cut, folded, scored, bound — finished in the same building.',
    mediaLabel: 'BINDERY — STATION 02',
  },
  {
    number: '03',
    title: 'PREP',
    copy: 'Addressed, sorted, boxed, and staged.',
    mediaLabel: 'MAIL PREP — STATION 03',
  },
  {
    number: '04',
    title: 'MAIL OR OUTPUT',
    copy: 'Into the mail stream, or ready for pickup and delivery.',
    mediaLabel: 'OUTPUT — STATION 04',
  },
];

const MARQUEE_RUN = 'PRINT · FINISH · PREP · MAIL · REPEAT · ';

/**
 * ACT V — IN-HOUSE ADVANTAGE. Sparse warm-black act: PRINT → FINISH →
 * PREP → MAIL OR OUTPUT stations, each with a MediaMask slot ready for
 * real floor photography. Marquee row of production language beneath.
 */
export default function InHouseAdvantage() {
  return (
    <section
      className={`dark-section section-pad ${styles.section}`}
      aria-labelledby="advantage-heading"
    >
      <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />

      <div className="container">
        <Reveal>
          <p className="kicker kicker--light">
            ONE ROOF
            <span className="crimson-rule" aria-hidden="true" />
          </p>
          <h2 id="advantage-heading" className={styles.heading}>
            MORE OF THE JOB STAYS UNDER ONE ROOF.
          </h2>
          <p className={styles.support}>
            When printing, finishing, and mailing live in one building, your job
            doesn&rsquo;t wait in someone else&rsquo;s queue. Fewer handoffs. Fewer
            surprises. Faster answers.
          </p>
        </Reveal>

        <ol className={styles.stations} role="list">
          {STATIONS.map((station, i) => (
            <li key={station.number} className={styles.station}>
              <Reveal delay={i * 0.08}>
                <MediaMask ratio="16 / 11" label={station.mediaLabel} />
                <div className={styles.stationHead}>
                  <span className={styles.stationNumber} aria-hidden="true">
                    {station.number}
                  </span>
                  <h3 className={styles.stationTitle}>
                    <span className="visually-hidden">{station.number} — </span>
                    {station.title}
                  </h3>
                </div>
                <p className={styles.stationCopy}>{station.copy}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      {/* Production-language marquee — decorative swagger, rationed to this act */}
      <div className={styles.marquee} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          <span className={styles.marqueeRun}>
            {MARQUEE_RUN.repeat(3)}
          </span>
          <span className={styles.marqueeRun}>
            {MARQUEE_RUN.repeat(3)}
          </span>
        </div>
      </div>
    </section>
  );
}
