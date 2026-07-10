import { getLenis } from '@/lib/lenis';

/** Clearance (px) below the sticky header when scrolling a field into view. */
const HEADER_OFFSET = 160;

/**
 * revealFieldError — bring a validation-errored field into view, then focus it.
 *
 * Why this exists: calling `element.focus()` alone does NOT scroll a field into
 * view when it sits above the current scroll position (esp. under the sticky
 * header on mobile), so the user taps Continue/Send at the bottom of a long
 * step and the off-screen error never appears — it reads as "nothing happened /
 * it errored out."
 *
 * Critically, this app runs Lenis smooth-scroll, which virtualizes scrolling —
 * native `scrollIntoView` / `window.scrollTo` are no-ops while it's active. So
 * we route through the live Lenis instance when present, and fall back to
 * native scrolling only when Lenis is off (prefers-reduced-motion).
 *
 * @param elementId  The id of the errored control (e.g. "q-productType").
 * @param fallbackName  For radio groups with no single id — the input `name`.
 */
export function revealFieldError(elementId: string, fallbackName?: string): void {
  if (typeof document === 'undefined') return;
  requestAnimationFrame(() => {
    const el =
      document.getElementById(elementId) ??
      (fallbackName
        ? document.querySelector<HTMLElement>(`[name="${fallbackName}"]`)
        : null);
    if (!el) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const lenis = getLenis();
    if (lenis && !reduce) {
      // Lenis owns the scroll; native APIs won't move the page.
      lenis.scrollTo(el, { offset: -HEADER_OFFSET, duration: 0.6 });
    } else {
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
    (el as HTMLElement).focus({ preventScroll: true });
  });
}
