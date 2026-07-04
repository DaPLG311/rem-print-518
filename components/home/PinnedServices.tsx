'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { gsap } from '@/lib/gsap';
import { services } from '@/lib/config';
import styles from './PinnedServices.module.css';

const PANEL_COUNT = services.length;

/**
 * ACT IV — SERVICE SPECTACLE. THE one pinned ScrollTrigger sequence of the
 * site. Numbered panels 01–06 mechanically replace each other on the crimson
 * stage (previous peels left, next slides in, typography locking into
 * registration). Vertical serif title crops off the right edge.
 *
 * Fallback (mobile < 768px OR prefers-reduced-motion): simple stacked
 * panels, no pinning, everything visible.
 */
export default function PinnedServices() {
  const sectionRef = useRef<HTMLElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
      section.classList.add(styles.pinned);

      const panels = gsap.utils.toArray<HTMLElement>('[data-panel]', section);
      const vtitles = gsap.utils.toArray<HTMLElement>('[data-vtitle]', section);
      const dots = gsap.utils.toArray<HTMLElement>('[data-dot]', section);
      const counter = counterRef.current;
      const steps = panels.length - 1;
      let active = 0;

      const setActive = (idx: number) => {
        if (idx === active) return;
        active = idx;
        if (counter) {
          counter.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(panels.length).padStart(2, '0')}`;
        }
        dots.forEach((dot, i) => dot.classList.toggle(styles.dotActive, i === idx));
      };

      gsap.set(panels.slice(1), { xPercent: 114, rotate: 3 });
      gsap.set(vtitles.slice(1), { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${steps * 100}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / steps,
            duration: { min: 0.2, max: 0.5 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => setActive(Math.round(self.progress * steps)),
        },
      });

      panels.forEach((panel, i) => {
        if (i === 0) return;
        const at = i - 1;
        tl.to(
          panels[i - 1],
          { xPercent: -114, rotate: -4, autoAlpha: 0.7, duration: 1, ease: 'power2.inOut' },
          at,
        )
          .to(panel, { xPercent: 0, rotate: 0, duration: 1, ease: 'power2.inOut' }, at)
          .to(vtitles[i - 1], { autoAlpha: 0, duration: 0.3 }, at)
          .to(vtitles[i], { autoAlpha: 1, duration: 0.4 }, at + 0.55);
      });

      return () => {
        section.classList.remove(styles.pinned);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`crimson-section ${styles.section}`}
      data-stage="crimson"
      aria-labelledby="services-heading"
    >
      <div className={`container ${styles.inner}`}>
        <div className={styles.kickerWrap}>
          <h2 id="services-heading" className={`kicker ${styles.kicker}`}>
            SERVICE REGISTER
          </h2>
          <span className={`crimson-rule crimson-rule--center ${styles.rule}`} aria-hidden="true" />
        </div>

        <div className={styles.stack}>
          {services.map((service, i) => (
            <article key={service.slug} className={styles.panel} data-panel={i}>
              <span className={styles.panelNumber} aria-hidden="true">
                {service.number}
              </span>
              <h3 className={styles.panelTitle}>
                <span className="visually-hidden">{service.number} — </span>
                {service.title}
              </h3>
              <p className={styles.panelPromise}>{service.short}</p>
              <Link href={`/${service.slug}`} className={styles.panelCta}>
                EXPLORE {service.number}
                <ArrowRight size={16} aria-hidden="true" />
                <span className="visually-hidden"> — {service.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Vertical serif titles cropping off the right edge (pinned mode only) */}
      <div className={styles.vtitles} aria-hidden="true">
        {services.map((service, i) => (
          <span key={service.slug} className={styles.vtitle} data-vtitle={i}>
            {service.title.toUpperCase()}
          </span>
        ))}
      </div>

      {/* Progress dots + panel counter (pinned mode only) */}
      <div className={styles.progress} aria-hidden="true">
        <div className={styles.dots}>
          {services.map((service, i) => (
            <span
              key={service.slug}
              className={`${styles.dot} ${i === 0 ? styles.dotActive : ''}`}
              data-dot={i}
            />
          ))}
        </div>
        <span ref={counterRef} className={`ticket-line ${styles.counter}`}>
          01 / {String(PANEL_COUNT).padStart(2, '0')}
        </span>
      </div>
    </section>
  );
}
