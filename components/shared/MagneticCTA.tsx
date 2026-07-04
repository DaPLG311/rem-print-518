'use client';

import Link from 'next/link';
import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import styles from './MagneticCTA.module.css';

interface MagneticCTAProps {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'ghost' | 'dark';
  className?: string;
  onClick?: () => void;
}

/**
 * Primary CTA button with magnetic hover (fine pointers only) and press
 * feedback. Reduced motion / touch devices get a plain, fully functional
 * button. External hrefs (tel:, mailto:, http) render a plain anchor.
 */
export default function MagneticCTA({
  href,
  children,
  variant = 'primary',
  className,
  onClick,
}: MagneticCTAProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const canMagnet = () =>
    !prefersReducedMotion() &&
    typeof window !== 'undefined' &&
    window.matchMedia('(pointer: fine)').matches;

  const handleMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || !canMagnet()) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(el, {
      x: dx * 0.22,
      y: dy * 0.28,
      duration: 0.4,
      ease: 'power3.out',
    });
  }, []);

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el || !canMagnet()) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.55, ease: 'elastic.out(1, 0.45)' });
  }, []);

  const classes = [styles.cta, styles[variant], className].filter(Boolean).join(' ');
  const isInternal = href.startsWith('/');

  if (isInternal) {
    return (
      <Link
        ref={ref}
        href={href}
        className={classes}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={onClick}
      >
        <span className={styles.label}>{children}</span>
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      className={classes}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <span className={styles.label}>{children}</span>
    </a>
  );
}
