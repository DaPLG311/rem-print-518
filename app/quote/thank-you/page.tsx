import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import ThankYouPanel from '@/components/quote/ThankYouPanel';

export const metadata: Metadata = {
  ...pageMetadata({
    title: 'Request Received — The Job Is in REM’s Hands',
    description:
      'Your quote request is in. A real person reviews it and gets back to you — usually within one business day.',
    path: '/quote/thank-you',
  }),
  robots: { index: false, follow: true },
};

/**
 * /quote/thank-you — the measurable conversion page. Calm graphite stage,
 * stamped RECEIVED ticket, what-happens-next, urgent phone option.
 */
export default function QuoteThankYouPage() {
  return <ThankYouPanel />;
}
