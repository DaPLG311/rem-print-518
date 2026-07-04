/**
 * Env-gated analytics layer. Safe no-op unless tracking IDs are configured.
 * Never throws, never blocks conversion, silent when unset.
 */

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export const trackingEnabled = Boolean(GTM_ID || GA4_ID || META_PIXEL_ID);

type TrackData = Record<string, string | number | boolean | undefined>;

interface TrackingWindow extends Window {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}

export function track(event: string, data?: TrackData): void {
  if (!trackingEnabled || typeof window === 'undefined') return;

  try {
    const w = window as TrackingWindow;

    if (GTM_ID && w.dataLayer) {
      w.dataLayer.push({ event, ...data });
    }
    if (GA4_ID && typeof w.gtag === 'function') {
      w.gtag('event', event, data ?? {});
    }
    if (META_PIXEL_ID && typeof w.fbq === 'function') {
      w.fbq('trackCustom', event, data ?? {});
    }
  } catch {
    // Analytics must never break the experience.
  }
}
