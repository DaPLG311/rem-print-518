'use client';

import { useEffect, useRef } from 'react';
import { Phone } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import MagneticCTA from '@/components/shared/MagneticCTA';
import MediaMask from '@/components/shared/MediaMask';
import styles from './Hero.module.css';

const WORDS = ['PRINT.', 'APPAREL.', 'MAIL.', 'PROMO.'];

/**
 * ACT I — HERO COLD OPEN. Full crimson field, zero photography (desktop).
 * Fragmented oversized serif stack with staggered split-type entrance,
 * resolve statement, support copy, CTAs, deadline utility.
 * Reduced motion: everything visible instantly, no animation.
 */
export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        q('[data-hero-line]'),
        { yPercent: 112 },
        { yPercent: 0, duration: 1.05, stagger: 0.14 },
        0.15,
      )
        .fromTo(
          q('[data-hero-ghost]'),
          { autoAlpha: 0, x: 60 },
          { autoAlpha: 1, x: 0, duration: 1.4, ease: 'power3.out' },
          0.5,
        )
        .fromTo(
          q('[data-hero-resolve]'),
          { autoAlpha: 0, y: 26 },
          { autoAlpha: 1, y: 0, duration: 0.75 },
          '-=0.9',
        )
        .fromTo(
          q('[data-hero-support]'),
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          '-=0.5',
        )
        .fromTo(
          q('[data-hero-ctas]'),
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          '-=0.45',
        )
        .fromTo(
          q('[data-hero-util]'),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          '-=0.3',
        );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className={`crimson-section ${styles.hero}`}
      data-stage="crimson"
      aria-labelledby="hero-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.mobileMedia}>
          <MediaMask ratio="4 / 3" label="STATIONERY FLAT-LAY" />
        </div>

        <p className={styles.kicker}>
          {business.name} — {business.city}, {business.region}
        </p>

        <h1 id="hero-heading" className={styles.headline}>
          {WORDS.map((word) => (
            <span key={word} className={styles.lineWrap}>
              <span className={styles.line} data-hero-line>
                {word}
              </span>
            </span>
          ))}
        </h1>

        <p className={styles.resolve} data-hero-resolve>
          HANDLED IN-HOUSE. DONE FAST.
        </p>

        <p className={styles.support} data-hero-support>
          Albany businesses, campaigns, schools, organizations, and communities
          trust REM for fast-turnaround production backed by decades of local
          experience.
        </p>

        <div className={styles.ctas} data-hero-ctas>
          <MagneticCTA href="/quote" variant="primary" className={styles.lightCta}>
            Start Your Project
          </MagneticCTA>
          <MagneticCTA href="/#services" variant="dark">
            Explore Services
          </MagneticCTA>
        </div>

        <p className={styles.utility} data-hero-util>
          <span>Working against a deadline?</span>{' '}
          <a
            href={`tel:${business.phone}`}
            className={styles.callLink}
            onClick={() => track('rush_call_clicked', { location: 'hero' })}
          >
            <Phone size={14} aria-hidden="true" />
            Call {business.shortName}
          </a>
        </p>
      </div>

      <span className={styles.ghost} data-hero-ghost aria-hidden="true">
        {business.shortName}.
      </span>
      <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />
    </section>
  );
}
