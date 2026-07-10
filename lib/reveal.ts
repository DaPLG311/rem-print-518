/**
 * revealFieldError — bring a validation-errored field into view, then focus it.
 *
 * Why this exists: calling `element.focus()` alone does NOT reliably scroll a
 * field into view when it sits above the current scroll position — especially
 * under a sticky header on mobile. The result is a "nothing happened / it
 * errored out" feeling: the user taps Continue at the bottom of a long step and
 * the (off-screen, above) error never comes into view. Scrolling explicitly and
 * centering the field fixes that. Focus uses preventScroll so it doesn't fight
 * the smooth scroll we just started.
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
    el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    (el as HTMLElement).focus({ preventScroll: true });
  });
}
