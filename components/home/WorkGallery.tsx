import MediaMask from '@/components/shared/MediaMask';
import Reveal from '@/components/shared/Reveal';
import styles from './WorkGallery.module.css';

interface WorkTile {
  category: string;
  caption: string;
  featured?: boolean;
  ratio: string;
}

/**
 * ACT VI — FEATURED WORK / PRODUCTION WALL + CAPABILITY WALL.
 * A moving production wall (drifting marquee rows of category-labeled
 * MediaMask compositions — NOT a portfolio grid), followed by the
 * REM IS EQUIPPED capability manifest. Category labels only; no named
 * clients or invented projects.
 */

const TILES: WorkTile[] = [
  {
    category: 'Campaign Launch',
    caption: 'Postcards / Yard Signs / EDDM Mailing / Posters',
    featured: true,
    ratio: '5 / 4',
  },
  { category: 'Business Printing', caption: 'Cards / Letterhead / Envelopes', ratio: '4 / 3' },
  { category: 'School Apparel', caption: 'Spirit Wear / Team Shirts', ratio: '4 / 3' },
  { category: 'Direct Mail', caption: 'Variable Data / Tabbed / Sorted', ratio: '5 / 4' },
  { category: 'Event Materials', caption: 'Programs / Signage / Banners', ratio: '4 / 3' },
  { category: 'Branded Merchandise', caption: 'Mugs / Promo Items', ratio: '4 / 3' },
];

const ROW_TWO: WorkTile[] = [TILES[3], TILES[5], TILES[1], TILES[4], TILES[2], TILES[0]].map(
  (t) => ({ ...t, featured: false }),
);

const CAPABILITIES = [
  'Digital Printing',
  'Bindery',
  'Large Format',
  'Screen Printing',
  'Sublimation',
  'Direct Mail',
  'Promotional Products',
  'Political Production',
];

function TileCard({ tile }: { tile: WorkTile }) {
  return (
    <article className={`${styles.tile} ${tile.featured ? styles.tileFeatured : ''}`}>
      {tile.featured ? (
        <span className={styles.stamp} aria-hidden="true">
          Specimen
        </span>
      ) : null}
      <MediaMask ratio={tile.ratio} className={styles.tileMedia} />
      <div className={styles.tileMeta}>
        <p className={styles.tileCategory}>{tile.category}</p>
        <p className={styles.tileCaption}>{tile.caption}</p>
      </div>
    </article>
  );
}

function TileGroup({ tiles, hidden }: { tiles: WorkTile[]; hidden?: boolean }) {
  return (
    <div className={styles.group} aria-hidden={hidden || undefined}>
      {tiles.map((tile, i) => (
        <TileCard key={`${tile.category}-${i}`} tile={tile} />
      ))}
    </div>
  );
}

export default function WorkGallery() {
  return (
    <section
      className={`dark-section ${styles.section}`}
      data-stage="dark"
      aria-labelledby="work-gallery-title"
    >
      <div className={`container ${styles.head}`}>
        <Reveal>
          <p className={`kicker kicker--light ${styles.kicker}`}>
            Featured Work
            <span className="crimson-rule crimson-rule--center" aria-hidden="true" />
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id="work-gallery-title" className={styles.title}>
            What comes <em>off the floor.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.14}>
          <p className={styles.support}>
            A moving wall of the kinds of jobs REM runs &mdash; printed, pressed, and mailed in
            Albany.
          </p>
        </Reveal>
      </div>

      <div className={styles.wall}>
        <div className={styles.marquee}>
          <div className={styles.track}>
            <TileGroup tiles={TILES} />
            <TileGroup tiles={TILES} hidden />
          </div>
        </div>
        <div className={styles.marquee}>
          <div className={`${styles.track} ${styles.trackReverse}`}>
            <TileGroup tiles={ROW_TWO} />
            <TileGroup tiles={ROW_TWO} hidden />
          </div>
        </div>
        <p className={`ticket-line ${styles.ticket}`}>
          Run log &middot; Printed &middot; Pressed &middot; Mailed &mdash; Albany, NY
        </p>
      </div>

      <div className={`container ${styles.capWrap}`}>
        <Reveal>
          <div className={styles.capBanner}>
            <MediaMask
              ratio="21 / 9"
              label="Production floor — press row"
              className={styles.capMedia}
            />
            <h3 className={styles.capTitle}>
              REM is <em>equipped.</em>
            </h3>
          </div>
        </Reveal>
        <ol className={styles.capGrid} role="list">
          {CAPABILITIES.map((label, i) => (
            <li key={label} className={styles.capCard}>
              <Reveal delay={(i % 4) * 0.07} className={styles.capInner}>
                <span className={styles.capNum} aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={styles.capLabel}>{label}</span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
