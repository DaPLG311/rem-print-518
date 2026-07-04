'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './MediaMask.module.css';

interface MediaMaskProps {
  src?: string;
  alt?: string;
  label?: string;
  ratio?: string;
  className?: string;
}

/**
 * Structured media slot. With src: masked photo reveal on scroll.
 * Without src: tactile CSS placeholder composition (paper stack, ink
 * field, registration graphics) with a small production label — every
 * slot is ready to accept a real photo later.
 */
export default function MediaMask({
  src,
  alt = '',
  label,
  ratio = '4 / 3',
  className,
}: MediaMaskProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: frame,
          start: 'top 85%',
          once: true,
        },
      });
      tl.fromTo(
        frame,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power4.inOut' },
      ).fromTo(
        inner,
        { scale: 1.12 },
        { scale: 1, duration: 1.4, ease: 'power3.out' },
        '<',
      );
    });

    return () => mm.revert();
  }, []);

  const classes = [styles.frame, className].filter(Boolean).join(' ');

  return (
    <div ref={frameRef} className={classes} style={{ aspectRatio: ratio }}>
      <div ref={innerRef} className={styles.inner}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className={styles.photo} loading="lazy" />
        ) : (
          <div className={styles.placeholder} role="img" aria-label={label ?? 'Production photography slot'}>
            <span className={styles.sheetBack} aria-hidden="true" />
            <span className={styles.sheetMid} aria-hidden="true" />
            <span className={styles.sheetFront} aria-hidden="true" />
            <span className={styles.inkBar} aria-hidden="true" />
            <span className={`reg-mark reg-mark--tl ${styles.regTl}`} aria-hidden="true" />
            <span className={`reg-mark reg-mark--br ${styles.regBr}`} aria-hidden="true" />
          </div>
        )}
      </div>
      {label ? <span className={styles.label}>{label}</span> : null}
    </div>
  );
}
