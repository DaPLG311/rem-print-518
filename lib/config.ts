/**
 * Central business config — the ONLY place business facts live.
 * Pages and components consume this; nothing is inlined elsewhere.
 * Source-backed public facts are research-verified from REM's public business
 * listings (Yelp, North American Association, saratoga.com): 55 Railroad Ave,
 * Ste 1 and established 1985. Launch-only secrets still live in env vars.
 */

export const business = {
  name: 'REM Digital Print & Mail Center',
  shortName: 'REM',
  tagline: 'BRING REM THE JOB. THEY KNOW HOW TO GET IT DONE.',
  phone: '+15184387338',
  phoneDisplay: '(518) 438-7338',
  addressLine: '55 Railroad Ave, Ste 1, Albany, NY 12205',
  streetAddress: '55 Railroad Ave, Ste 1',
  city: 'Albany',
  region: 'NY',
  postalCode: '12205',
  serviceArea: 'Albany · Capital Region · 518',
  email: 'orders@remdigitalprint.com',
  officialSite: 'https://www.remdigitalprint.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://rem-print-518.vercel.app',
} as const;

export const proof = [
  { value: '1985', label: 'Family Printing Roots' },
  { value: '99%', label: 'In-House Production' },
  { value: '3–5', label: 'Day Digital Turnaround' },
  { value: 'Next Day', label: 'Printing Available' },
] as const;

export interface ServiceLane {
  slug: string;
  number: string;
  title: string;
  short: string;
}

export const services: ServiceLane[] = [
  {
    slug: 'printing-bindery',
    number: '01',
    title: 'Printing & Bindery',
    short: 'From file to finished piece — cut, folded, bound, and out the door.',
  },
  {
    slug: 'apparel',
    number: '02',
    title: 'Apparel',
    short: 'Shirts, tanks, hoodies, and bags, screen printed for teams, events, and brands.',
  },
  {
    slug: 'mugs-sublimation',
    number: '03',
    title: 'Mugs & Sublimation',
    short: 'Full-color mugs and sublimated goods, one at a time or by the case.',
  },
  {
    slug: 'direct-mail',
    number: '04',
    title: 'Direct Mail',
    short: 'From printed piece to mailbox — one partner, start to finish.',
  },
  {
    slug: 'promotional-products',
    number: '05',
    title: 'Promotional Products',
    short: "Tell REM what you're promoting. REM narrows the field.",
  },
  {
    slug: 'political-printing',
    number: '06',
    title: 'Political Printing',
    short: 'Campaign materials produced at campaign speed. Every side, every race.',
  },
];
