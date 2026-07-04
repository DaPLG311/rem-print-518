import { Suspense } from 'react';
import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import QuoteWizard from '@/components/quote/QuoteWizard';
import styles from './quote.module.css';

export const metadata: Metadata = pageMetadata({
  title: 'Request a Quote — Start Your Project',
  description:
    'Tell REM about the job — printing, apparel, mugs, direct mail, promo, or political work. A real person reviews every request and gets back to you with real answers.',
  path: '/quote',
});

/**
 * /quote — the core product. A 5-beat wizard (service → details → artwork →
 * contact → confirmation) rendered by the QuoteWizard client component.
 * Wrapped in Suspense because the wizard reads ?service= via useSearchParams.
 */
export default function QuotePage() {
  return (
    <Suspense fallback={<div className={styles.fallback} aria-hidden="true" />}>
      <QuoteWizard />
    </Suspense>
  );
}
