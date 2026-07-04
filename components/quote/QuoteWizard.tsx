'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Phone } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import { gsap, prefersReducedMotion } from '@/lib/gsap';
import UploadZone from './UploadZone';
import {
  SERVICE_OPTIONS,
  FIELD_MATRIX,
  ARTWORK_OPTIONS,
  serviceLabel,
  artworkLabel,
  todayStr,
  isRushWindow,
  type ServiceSlug,
  type FileMeta,
} from './types';
import forms from './forms.module.css';
import styles from './QuoteWizard.module.css';

/* ------------------------------------------------------------------ */
/* State shapes                                                        */
/* ------------------------------------------------------------------ */

interface Details {
  productType: string;
  quantity: string;
  size: string;
  colors: string;
  neededBy: string;
  mailing: '' | 'yes' | 'no';
  finishing: '' | 'yes' | 'no';
}

interface Contact {
  name: string;
  company: string;
  phone: string;
  email: string;
  preferred: 'phone' | 'email' | 'either';
}

const EMPTY_DETAILS: Details = {
  productType: '',
  quantity: '',
  size: '',
  colors: '',
  neededBy: '',
  mailing: '',
  finishing: '',
};

const STEP_HEADLINES: Record<number, string> = {
  1: 'What are we making?',
  2: 'Tell us about the job.',
  3: 'Where are you with the artwork?',
  4: 'Who’s this for?',
};

/* ------------------------------------------------------------------ */
/* Small presentational helpers                                        */
/* ------------------------------------------------------------------ */

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className={`${forms.field} ${error ? forms.fieldInvalid : ''}`}>
      <label className={forms.fieldLabel} htmlFor={id}>
        {label}
        {optional ? <span className={forms.optionalTag}> · optional</span> : null}
      </label>
      {children}
      {error ? (
        <p className={forms.error} id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SegmentedField({
  name,
  label,
  optional,
  options,
  value,
  onChange,
  error,
}: {
  name: string;
  label: string;
  optional?: boolean;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  error?: string;
}) {
  return (
    <fieldset
      className={`${forms.field} ${forms.segmentedSet} ${error ? forms.fieldInvalid : ''}`}
      aria-describedby={error ? `${name}-error` : undefined}
    >
      <legend className={forms.fieldLabel}>
        {label}
        {optional ? <span className={forms.optionalTag}> · optional</span> : null}
      </legend>
      <div className={forms.segmented}>
        {options.map((opt) => (
          <span key={opt.value} className={forms.segment}>
            <input
              type="radio"
              className={forms.segmentInput}
              id={`${name}-${opt.value}`}
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
            />
            <label className={forms.segmentLabel} htmlFor={`${name}-${opt.value}`}>
              {opt.label}
            </label>
          </span>
        ))}
      </div>
      {error ? (
        <p className={forms.error} id={`${name}-error`}>
          {error}
        </p>
      ) : null}
    </fieldset>
  );
}

/* ------------------------------------------------------------------ */
/* Wizard                                                              */
/* ------------------------------------------------------------------ */

export default function QuoteWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(1);
  const [service, setService] = useState<ServiceSlug | ''>(() => {
    const s = searchParams.get('service');
    return s && SERVICE_OPTIONS.some((o) => o.slug === s) ? (s as ServiceSlug) : '';
  });
  const [details, setDetails] = useState<Details>(EMPTY_DETAILS);
  const [artworkStatus, setArtworkStatus] = useState('');
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [notes, setNotes] = useState('');
  const [contact, setContact] = useState<Contact>({
    name: '',
    company: '',
    phone: '',
    email: '',
    preferred: 'either',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const startedRef = useRef(false);
  const firstRenderRef = useRef(true);
  const contentRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  const cfg = service ? FIELD_MATRIX[service] : null;
  const minDate = useMemo(() => todayStr(), []);
  const rushWindow = isRushWindow(details.neededBy);

  /* Morph + focus on step change (reduced motion = instant, fully visible) */
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    const el = contentRef.current;
    if (el && !prefersReducedMotion()) {
      gsap.fromTo(
        el,
        { autoAlpha: 0, y: 26 },
        { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power3.out' },
      );
    }
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  /* ------------------------------------------------------------------ */
  /* Validation (per BUILD_SPEC §2)                                      */
  /* ------------------------------------------------------------------ */

  function validateStep(current: number): Record<string, string> {
    const errs: Record<string, string> = {};

    if (current === 1) {
      if (!service) errs.service = 'Pick the closest fit — you can change it later.';
    }

    if (current === 2 && cfg) {
      if (cfg.productType === 'required' && !details.productType.trim()) {
        errs.productType = 'Pick the closest option — “Other” is fine.';
      }
      if (cfg.quantity === 'required') {
        const qty = details.quantity.trim();
        if (!/^\d+$/.test(qty) || parseInt(qty, 10) < 1) {
          errs.quantity = 'Enter a quantity — a rough number is fine.';
        }
      }
      if (cfg.neededBy !== 'hidden') {
        const val = details.neededBy;
        if (cfg.neededBy === 'required' && !val) {
          errs.neededBy = 'Campaigns run on dates — pick the day this is needed by.';
        } else if (val && val < minDate) {
          errs.neededBy = 'Pick today or a future date.';
        }
      }
      if (cfg.mailing === 'required' && !details.mailing) {
        errs.mailing = 'Tell REM whether this needs to hit the mail stream.';
      }
    }

    if (current === 3) {
      if (!artworkStatus) {
        errs.artworkStatus = 'Pick the option closest to where you are — no wrong answers.';
      }
    }

    if (current === 4) {
      if (!contact.name.trim()) errs.name = 'Add a name so REM knows who to reach.';
      const phoneDigits = contact.phone.replace(/\D/g, '');
      if (phoneDigits.length < 10) errs.phone = 'Enter a phone number with area code.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email.trim())) {
        errs.email = 'Enter an email address REM can reply to.';
      }
    }

    return errs;
  }

  function focusFirstError(errs: Record<string, string>) {
    const first = Object.keys(errs)[0];
    if (!first) return;
    requestAnimationFrame(() => {
      const el = document.getElementById(`q-${first}`);
      if (el) {
        el.focus();
      } else {
        // radio-group errors (service / artwork / mailing) — focus first input in group
        const radio = document.querySelector<HTMLInputElement>(`input[name="${first}"]`);
        radio?.focus();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Navigation + submit                                                 */
  /* ------------------------------------------------------------------ */

  function handleContinue(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;
    const errs = validateStep(step);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      focusFirstError(errs);
      return;
    }

    if (step === 1 && !startedRef.current) {
      startedRef.current = true;
      track('quote_started', { service });
    }
    track('quote_step_completed', { service, step });

    if (step < 4) {
      setStep(step + 1);
    } else {
      void submit();
    }
  }

  function handleBack() {
    if (step > 1) {
      setErrors({});
      setStep(step - 1);
    }
  }

  /* Direct Mail presets mailing = Yes (still editable at step 2) — covers
     both card selection and ?service=direct-mail URL preselection. */
  useEffect(() => {
    if (service === 'direct-mail') {
      setDetails((d) => (d.mailing === '' ? { ...d, mailing: 'yes' } : d));
    }
  }, [service]);

  function selectService(slug: ServiceSlug) {
    setService(slug);
    setErrors({});
  }

  function visibleDetailRows(): { label: string; value: string }[] {
    if (!cfg) return [];
    const rows: { label: string; value: string }[] = [];
    if (cfg.productType !== 'hidden' && details.productType.trim()) {
      rows.push({ label: 'Product', value: details.productType.trim() });
    }
    if (cfg.quantity !== 'hidden' && details.quantity.trim()) {
      rows.push({ label: 'Quantity', value: details.quantity.trim() });
    }
    if (cfg.size !== 'hidden' && details.size.trim()) {
      rows.push({ label: cfg.sizeLabel, value: details.size.trim() });
    }
    if (cfg.colors !== 'hidden' && details.colors.trim()) {
      rows.push({ label: 'Colors', value: details.colors.trim() });
    }
    if (cfg.neededBy !== 'hidden' && details.neededBy) {
      rows.push({ label: 'Needed by', value: details.neededBy });
    }
    if (cfg.mailing !== 'hidden' && details.mailing) {
      rows.push({ label: 'Mailing', value: details.mailing === 'yes' ? 'Yes' : 'No' });
    }
    if (cfg.finishing !== 'hidden' && details.finishing) {
      rows.push({ label: 'Finishing', value: details.finishing === 'yes' ? 'Yes' : 'No' });
    }
    return rows;
  }

  async function submit() {
    setSubmitting(true);
    const rows = visibleDetailRows();

    const payload = {
      kind: 'quote' as const,
      service,
      serviceLabel: serviceLabel(service),
      details: Object.fromEntries(rows.map((r) => [r.label, r.value])),
      artwork: {
        status: artworkStatus,
        statusLabel: artworkLabel(artworkStatus),
        files,
        notes: notes.trim(),
      },
      contact: {
        name: contact.name.trim(),
        company: contact.company.trim(),
        phone: contact.phone.trim(),
        email: contact.email.trim(),
        preferredContact: contact.preferred,
      },
      submittedAt: new Date().toISOString(),
    };

    // The API always succeeds for the user; a network hiccup must not kill the conversion.
    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fail-safe: continue to confirmation regardless */
    }

    track('quote_submitted', {
      service,
      has_artwork: files.length > 0,
      rush_window: rushWindow,
    });

    try {
      sessionStorage.setItem(
        'rem:quote-summary',
        JSON.stringify({
          serviceLabel: serviceLabel(service),
          rows,
          artwork: artworkLabel(artworkStatus),
          fileCount: files.length,
          name: contact.name.trim(),
        }),
      );
    } catch {
      /* summary is a nicety, never a blocker */
    }

    router.push('/quote/thank-you');
  }

  /* ------------------------------------------------------------------ */
  /* Render                                                              */
  /* ------------------------------------------------------------------ */

  const stage = step === 3 ? 'crimson' : 'dark';
  const isFinalStep = step === 4;

  return (
    <section className={styles.stage} data-stage={stage} aria-label="Quote request wizard">
      <span className="reg-mark reg-mark--tl" style={{ top: '1.25rem', left: '1.25rem' }} aria-hidden="true" />
      <span className="reg-mark reg-mark--br" style={{ bottom: '1.25rem', right: '1.25rem' }} aria-hidden="true" />
      <span className={styles.ghostNumeral} aria-hidden="true">
        0{step}
      </span>

      <div className={`container ${styles.inner}`}>
        {/* Progress chrome */}
        <header className={styles.chrome}>
          <div className={styles.chromeSide}>
            {step > 1 ? (
              <button type="button" className={styles.backBtn} onClick={handleBack}>
                <ArrowLeft size={16} aria-hidden="true" />
                <span>Back</span>
              </button>
            ) : null}
          </div>
          <p className={styles.chromeKicker}>
            Start your project
            <span className={`crimson-rule crimson-rule--center ${styles.kickerRule}`} aria-hidden="true" />
          </p>
          <p className={styles.stepLabel} aria-live="polite">
            Step {step} of 4
          </p>
        </header>

        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={4}
          aria-valuenow={step}
          aria-label="Quote progress"
        >
          <span className={styles.progressFill} style={{ width: `${(step / 4) * 100}%` }} />
        </div>

        <form onSubmit={handleContinue} noValidate>
          <div ref={contentRef} className={styles.content}>
            <h1 ref={headingRef} tabIndex={-1} className={styles.headline}>
              {STEP_HEADLINES[step]}
            </h1>

            {/* ---------------- STEP 1 — SERVICE ---------------- */}
            {step === 1 ? (
              <fieldset className={styles.optionSet} aria-describedby={errors.service ? 'service-error' : undefined}>
                <legend className="visually-hidden">Choose a service</legend>
                <div className={styles.optionGrid}>
                  {SERVICE_OPTIONS.map((opt) => (
                    <span key={opt.slug} className={styles.option}>
                      <input
                        type="radio"
                        className={styles.optionInput}
                        id={`service-${opt.slug}`}
                        name="service"
                        value={opt.slug}
                        checked={service === opt.slug}
                        onChange={() => selectService(opt.slug)}
                      />
                      <label className={styles.optionCard} htmlFor={`service-${opt.slug}`}>
                        {opt.label}
                      </label>
                    </span>
                  ))}
                </div>
                {errors.service ? (
                  <p className={`${forms.error} ${styles.centerError}`} id="service-error" role="alert">
                    {errors.service}
                  </p>
                ) : null}
              </fieldset>
            ) : null}

            {/* ---------------- STEP 2 — DYNAMIC DETAILS ---------------- */}
            {step === 2 && cfg ? (
              <div className={styles.detailCol}>
                <p className={styles.subline}>
                  {service === 'not-sure'
                    ? cfg.statement
                    : 'Only what matters for this kind of project. Skip anything you’re not sure about.'}
                </p>
                <div className={forms.formStack}>
                  {cfg.productType !== 'hidden' ? (
                    <Field
                      id="q-productType"
                      label={cfg.productLabel}
                      optional={cfg.productType === 'optional'}
                      error={errors.productType}
                    >
                      {cfg.productInput === 'select' ? (
                        <select
                          id="q-productType"
                          className={forms.select}
                          value={details.productType}
                          onChange={(e) => setDetails({ ...details, productType: e.target.value })}
                          aria-describedby={errors.productType ? 'q-productType-error' : undefined}
                          aria-invalid={Boolean(errors.productType)}
                        >
                          <option value="">Choose one…</option>
                          {cfg.productOptions?.map((o) => (
                            <option key={o} value={o}>
                              {o}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id="q-productType"
                          className={forms.input}
                          type="text"
                          value={details.productType}
                          onChange={(e) => setDetails({ ...details, productType: e.target.value })}
                          placeholder="Mugs? Pens? Totes? A hunch is enough."
                        />
                      )}
                    </Field>
                  ) : null}

                  {cfg.quantity !== 'hidden' ? (
                    <Field id="q-quantity" label="How many?" error={errors.quantity}>
                      <input
                        id="q-quantity"
                        className={forms.input}
                        type="text"
                        inputMode="numeric"
                        autoComplete="off"
                        value={details.quantity}
                        onChange={(e) => setDetails({ ...details, quantity: e.target.value })}
                        placeholder="A rough number is fine — 250, 5000…"
                        aria-describedby={errors.quantity ? 'q-quantity-error' : undefined}
                        aria-invalid={Boolean(errors.quantity)}
                      />
                    </Field>
                  ) : null}

                  {cfg.size !== 'hidden' ? (
                    <Field id="q-size" label={cfg.sizeLabel} optional>
                      <input
                        id="q-size"
                        className={forms.input}
                        type="text"
                        value={details.size}
                        onChange={(e) => setDetails({ ...details, size: e.target.value })}
                        placeholder={service === 'apparel' ? 'e.g. mostly M–XL, a few 2XL' : 'e.g. 4×6, 8.5×11'}
                      />
                    </Field>
                  ) : null}

                  {cfg.colors !== 'hidden' ? (
                    <Field id="q-colors" label="Color requirements" optional>
                      <input
                        id="q-colors"
                        className={forms.input}
                        type="text"
                        value={details.colors}
                        onChange={(e) => setDetails({ ...details, colors: e.target.value })}
                        placeholder="Full color, one color, black only…"
                      />
                    </Field>
                  ) : null}

                  {cfg.neededBy !== 'hidden' ? (
                    <>
                      <Field
                        id="q-neededBy"
                        label="Needed by"
                        optional={cfg.neededBy === 'optional'}
                        error={errors.neededBy}
                      >
                        <input
                          id="q-neededBy"
                          className={forms.input}
                          type="date"
                          min={minDate}
                          value={details.neededBy}
                          onChange={(e) => setDetails({ ...details, neededBy: e.target.value })}
                          aria-describedby={errors.neededBy ? 'q-neededBy-error' : undefined}
                          aria-invalid={Boolean(errors.neededBy)}
                        />
                      </Field>
                      {rushWindow ? (
                        <p className={forms.rushNotice}>
                          <span>That’s a tight window — calling is the fastest way to confirm it.</span>
                          <a
                            href={`tel:${business.phone}`}
                            onClick={() => track('rush_call_clicked', { location: 'quote_rush_notice' })}
                          >
                            <Phone size={14} aria-hidden="true" />
                            Call {business.phoneDisplay}
                          </a>
                        </p>
                      ) : (
                        <p className={forms.hint}>
                          Tight date? You can also just{' '}
                          <a
                            className={forms.hintLink}
                            href={`tel:${business.phone}`}
                            onClick={() => track('rush_call_clicked', { location: 'quote_step2_hint' })}
                          >
                            call
                          </a>{' '}
                          — REM will tell you what’s possible.
                        </p>
                      )}
                    </>
                  ) : null}

                  {cfg.mailing !== 'hidden' ? (
                    <SegmentedField
                      name="mailing"
                      label="Mailing needed?"
                      optional={cfg.mailing === 'optional'}
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                      ]}
                      value={details.mailing}
                      onChange={(v) => setDetails({ ...details, mailing: v as Details['mailing'] })}
                      error={errors.mailing}
                    />
                  ) : null}

                  {cfg.finishing !== 'hidden' ? (
                    <SegmentedField
                      name="finishing"
                      label="Finishing needed? (folding, binding, laminating…)"
                      optional
                      options={[
                        { value: 'yes', label: 'Yes' },
                        { value: 'no', label: 'No' },
                      ]}
                      value={details.finishing}
                      onChange={(v) => setDetails({ ...details, finishing: v as Details['finishing'] })}
                    />
                  ) : null}
                </div>
              </div>
            ) : null}

            {/* ---------------- STEP 3 — ARTWORK (crimson interlude) ---------------- */}
            {step === 3 ? (
              <div className={styles.detailCol}>
                <fieldset
                  className={styles.optionSet}
                  aria-describedby={errors.artworkStatus ? 'artworkStatus-error' : undefined}
                >
                  <legend className="visually-hidden">Artwork status</legend>
                  <div className={`${styles.optionGrid} ${styles.optionGridArtwork}`}>
                    {ARTWORK_OPTIONS.map((opt) => (
                      <span key={opt.value} className={styles.option}>
                        <input
                          type="radio"
                          className={styles.optionInput}
                          id={`artwork-${opt.value}`}
                          name="artworkStatus"
                          value={opt.value}
                          checked={artworkStatus === opt.value}
                          onChange={() => setArtworkStatus(opt.value)}
                        />
                        <label
                          className={`${styles.optionCard} ${styles.optionCardCrimson}`}
                          htmlFor={`artwork-${opt.value}`}
                        >
                          {opt.label}
                        </label>
                      </span>
                    ))}
                  </div>
                  {errors.artworkStatus ? (
                    <p className={`${forms.error} ${styles.centerError} ${styles.errorOnCrimson}`} id="artworkStatus-error" role="alert">
                      {errors.artworkStatus}
                    </p>
                  ) : null}
                </fieldset>

                <UploadZone
                  files={files}
                  onAdd={(added) => setFiles((f) => [...f, ...added])}
                  onRemove={(i) => setFiles((f) => f.filter((_, idx) => idx !== i))}
                  context="quote"
                  tone="crimson"
                />

                <div className={`${forms.field} ${styles.fieldOnCrimson}`}>
                  <label className={forms.fieldLabel} htmlFor="q-notes">
                    Anything else REM should know?
                    <span className={forms.optionalTag}> · optional</span>
                  </label>
                  <textarea
                    id="q-notes"
                    className={forms.textarea}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Deadlines, past jobs, the story behind it — anything helps."
                    rows={3}
                  />
                </div>
              </div>
            ) : null}

            {/* ---------------- STEP 4 — CONTACT ---------------- */}
            {step === 4 ? (
              <div className={styles.detailCol}>
                <div className={forms.formStack}>
                  <Field id="q-name" label="Name" error={errors.name}>
                    <input
                      id="q-name"
                      className={forms.input}
                      type="text"
                      autoComplete="name"
                      value={contact.name}
                      onChange={(e) => setContact({ ...contact, name: e.target.value })}
                      aria-describedby={errors.name ? 'q-name-error' : undefined}
                      aria-invalid={Boolean(errors.name)}
                    />
                  </Field>
                  <Field id="q-company" label="Company / organization" optional>
                    <input
                      id="q-company"
                      className={forms.input}
                      type="text"
                      autoComplete="organization"
                      value={contact.company}
                      onChange={(e) => setContact({ ...contact, company: e.target.value })}
                    />
                  </Field>
                  <Field id="q-phone" label="Phone" error={errors.phone}>
                    <input
                      id="q-phone"
                      className={forms.input}
                      type="tel"
                      autoComplete="tel"
                      value={contact.phone}
                      onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                      aria-describedby={errors.phone ? 'q-phone-error' : undefined}
                      aria-invalid={Boolean(errors.phone)}
                    />
                  </Field>
                  <Field id="q-email" label="Email" error={errors.email}>
                    <input
                      id="q-email"
                      className={forms.input}
                      type="email"
                      autoComplete="email"
                      value={contact.email}
                      onChange={(e) => setContact({ ...contact, email: e.target.value })}
                      aria-describedby={errors.email ? 'q-email-error' : undefined}
                      aria-invalid={Boolean(errors.email)}
                    />
                  </Field>
                  <SegmentedField
                    name="preferred"
                    label="Preferred contact method"
                    options={[
                      { value: 'phone', label: 'Phone' },
                      { value: 'email', label: 'Email' },
                      { value: 'either', label: 'Either' },
                    ]}
                    value={contact.preferred}
                    onChange={(v) => setContact({ ...contact, preferred: v as Contact['preferred'] })}
                  />
                </div>
                <p className={forms.reassure}>No spam, no pressure. A real person reviews every request.</p>
              </div>
            ) : null}

            {/* ---------------- Continue ---------------- */}
            <div className={styles.continueRow}>
              <button
                type="submit"
                className={`${forms.continue} ${stage === 'crimson' ? forms.continueGhost : ''}`}
                disabled={submitting}
              >
                <span>{isFinalStep ? (submitting ? 'Sending…' : 'Send it to REM') : 'Continue'}</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </form>

        <p className={`ticket-line ${styles.ticketLine}`} aria-hidden="true">
          Quote intake · Step 0{step} / 04 · Reviewed by a real person
        </p>
      </div>
    </section>
  );
}
