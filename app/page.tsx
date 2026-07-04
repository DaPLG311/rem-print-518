import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/seo';
import { business } from '@/lib/config';

import Hero from '@/components/home/Hero';
import NeedNavigation from '@/components/home/NeedNavigation';
import ProofStrip from '@/components/home/ProofStrip';
import PinnedServices from '@/components/home/PinnedServices';
import InHouseAdvantage from '@/components/home/InHouseAdvantage';
import WorkGallery from '@/components/home/WorkGallery';
import PoliticalTakeover from '@/components/home/PoliticalTakeover';
import HumanTrust from '@/components/home/HumanTrust';
import ProjectProcess from '@/components/home/ProjectProcess';
import ConversionCTA from '@/components/home/ConversionCTA';

const HOME_TITLE = `${business.name} — Print, Apparel, Mail & Promo. Handled In-House.`;
const HOME_DESCRIPTION =
  'Albany businesses, campaigns, schools, organizations, and communities trust REM for fast-turnaround production backed by decades of local experience.';

const base = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
});

export const metadata: Metadata = {
  ...base,
  // Homepage title stands alone — no "| REM" template suffix.
  title: { absolute: HOME_TITLE },
};

/**
 * Homepage — 10-act cinematic progression per docs/BRIEF.md.
 * Stage rhythm: crimson → paper → warm-black → crimson stage → warm-black →
 * warm-black (photographic) → crimson → paper → warm-black → close.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <NeedNavigation />
      <ProofStrip />
      <PinnedServices />
      <InHouseAdvantage />
      <WorkGallery />
      <PoliticalTakeover />
      <HumanTrust />
      <ProjectProcess />
      <ConversionCTA />
    </>
  );
}
