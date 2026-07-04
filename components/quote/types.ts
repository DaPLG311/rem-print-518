/**
 * Quote funnel domain types + the BUILD_SPEC §2 field matrix.
 * The wizard renders ONLY from this config — one source of truth
 * for which fields show, which are required, and their options.
 */

export type ServiceSlug =
  | 'printing'
  | 'apparel'
  | 'mugs-sublimation'
  | 'direct-mail'
  | 'promotional-products'
  | 'political'
  | 'not-sure';

export interface ServiceOption {
  slug: ServiceSlug;
  label: string;
}

export const SERVICE_OPTIONS: ServiceOption[] = [
  { slug: 'printing', label: 'Printing' },
  { slug: 'apparel', label: 'Apparel' },
  { slug: 'mugs-sublimation', label: 'Mugs & Sublimation' },
  { slug: 'direct-mail', label: 'Direct Mail' },
  { slug: 'promotional-products', label: 'Promotional Products' },
  { slug: 'political', label: 'Political' },
  { slug: 'not-sure', label: 'Not Sure' },
];

export function serviceLabel(slug: ServiceSlug | ''): string {
  return SERVICE_OPTIONS.find((o) => o.slug === slug)?.label ?? '';
}

export type FieldMode = 'required' | 'optional' | 'hidden';

export interface ServiceFieldConfig {
  /** Product type field */
  productType: FieldMode;
  productInput: 'select' | 'text';
  productLabel: string;
  productOptions?: string[];
  /** Remaining matrix fields */
  quantity: FieldMode;
  size: FieldMode;
  sizeLabel: string;
  colors: FieldMode;
  neededBy: FieldMode;
  mailing: FieldMode;
  mailingDefault?: 'yes';
  finishing: FieldMode;
  /** Optional lane statement (NOT SURE lane) */
  statement?: string;
}

/** Field legend: required ● · optional ○ · hidden — (BUILD_SPEC §2) */
export const FIELD_MATRIX: Record<ServiceSlug, ServiceFieldConfig> = {
  printing: {
    productType: 'required',
    productInput: 'select',
    productLabel: 'What are we printing?',
    productOptions: ['Business cards', 'Flyers', 'Brochures', 'Posters', 'Envelopes', 'Booklets', 'Other'],
    quantity: 'required',
    size: 'optional',
    sizeLabel: 'Size',
    colors: 'optional',
    neededBy: 'optional',
    mailing: 'optional',
    finishing: 'optional',
  },
  apparel: {
    productType: 'required',
    productInput: 'select',
    productLabel: 'What item?',
    productOptions: ['T-shirts', 'Tanks', 'Hoodies', 'Bags', 'Other'],
    quantity: 'required',
    size: 'optional',
    sizeLabel: 'Size mix',
    colors: 'optional',
    neededBy: 'optional',
    mailing: 'hidden',
    finishing: 'hidden',
  },
  'mugs-sublimation': {
    productType: 'required',
    productInput: 'select',
    productLabel: 'What item?',
    productOptions: ['Mugs', 'Other sublimated item'],
    quantity: 'required',
    size: 'hidden',
    sizeLabel: 'Size',
    colors: 'optional',
    neededBy: 'optional',
    mailing: 'hidden',
    finishing: 'hidden',
  },
  'direct-mail': {
    productType: 'required',
    productInput: 'select',
    productLabel: 'What kind of piece?',
    productOptions: ['Postcard', 'Letter', 'Self-mailer', 'EDDM piece', 'Other'],
    quantity: 'required',
    size: 'optional',
    sizeLabel: 'Size',
    colors: 'optional',
    neededBy: 'optional',
    mailing: 'required',
    mailingDefault: 'yes',
    finishing: 'optional',
  },
  'promotional-products': {
    productType: 'optional',
    productInput: 'text',
    productLabel: 'What kind of item are you imagining?',
    quantity: 'required',
    size: 'hidden',
    sizeLabel: 'Size',
    colors: 'optional',
    neededBy: 'optional',
    mailing: 'hidden',
    finishing: 'hidden',
  },
  political: {
    productType: 'required',
    productInput: 'select',
    productLabel: 'What does the campaign need?',
    productOptions: [
      'Postcards',
      'Literature',
      'Mailing',
      'Posters',
      'Banners',
      'Yard signs',
      'Buttons',
      'Bumper stickers',
      'Magnets',
      'Other campaign item',
    ],
    quantity: 'required',
    size: 'optional',
    sizeLabel: 'Size',
    colors: 'optional',
    neededBy: 'required',
    mailing: 'optional',
    finishing: 'optional',
  },
  'not-sure': {
    productType: 'hidden',
    productInput: 'text',
    productLabel: 'Product type',
    quantity: 'hidden',
    size: 'hidden',
    sizeLabel: 'Size',
    colors: 'hidden',
    neededBy: 'optional',
    mailing: 'hidden',
    finishing: 'hidden',
    statement:
      'Not sure is a fine answer — describe it at the next step and REM will figure out the rest.',
  },
};

export interface ArtworkOption {
  value: 'final' | 'started' | 'need-help';
  label: string;
}

export const ARTWORK_OPTIONS: ArtworkOption[] = [
  { value: 'final', label: 'I have final artwork' },
  { value: 'started', label: 'I have something started' },
  { value: 'need-help', label: 'I need help figuring it out' },
];

export function artworkLabel(value: string): string {
  return ARTWORK_OPTIONS.find((o) => o.value === value)?.label ?? '';
}

/** Client-side file descriptor — files are DESCRIBED in the payload (no storage backend in V1). */
export interface FileMeta {
  name: string;
  size: number;
  type: string;
}

export const ACCEPTED_EXTENSIONS = ['pdf', 'ai', 'eps', 'png', 'jpg', 'jpeg', 'tif', 'tiff', 'svg', 'zip'];
export const ACCEPT_ATTR = ACCEPTED_EXTENSIONS.map((e) => `.${e}`).join(',');
export const MAX_FILE_MB = 25;
export const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;

/** Local (not UTC) YYYY-MM-DD — for date input `min` and comparisons. */
export function todayStr(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

/** True when a needed-by date lands within the next 5 calendar days. */
export function isRushWindow(dateStr: string): boolean {
  if (!dateStr) return false;
  const target = new Date(`${dateStr}T00:00:00`);
  if (Number.isNaN(target.getTime())) return false;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffDays = (target.getTime() - startOfToday.getTime()) / 86400000;
  return diffDays >= 0 && diffDays <= 5;
}

export function formatFileSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  if (bytes >= 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${bytes} B`;
}
