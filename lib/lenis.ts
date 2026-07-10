import type Lenis from 'lenis';

/**
 * Shared handle to the app's Lenis smooth-scroll instance.
 *
 * Lenis virtualizes scrolling, so native `window.scrollTo` /
 * `Element.scrollIntoView` are no-ops while it's active. Anything that needs
 * to move the page programmatically (scroll-to-error, step-change scroll)
 * must go through the live instance. SmoothScroll registers it here; it's
 * null under prefers-reduced-motion (Lenis disabled → native scroll works).
 */
let instance: Lenis | null = null;

export function setLenis(l: Lenis | null): void {
  instance = l;
}

export function getLenis(): Lenis | null {
  return instance;
}
