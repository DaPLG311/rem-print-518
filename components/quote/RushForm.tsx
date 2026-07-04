'use client';

import { useMemo, useState, type FormEvent } from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { business } from '@/lib/config';
import { track } from '@/lib/track';
import { todayStr } from './types';
import forms from './forms.module.css';
import styles from './RushForm.module.css';

/**
 * /rush micro-flow: huge tap-to-call + a short after-hours fallback form.
 * Needed-by date is ALWAYS required here. No guaranteed-turnaround language —
 * rush is a conversation, not a checkout.
 */
export default function RushForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [need, setNeed] = useState('');
  const [neededBy, setNeededBy] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const minDate = useMemo(() => todayStr(), []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Add a name so REM knows who to call back.';
    if (phone.replace(/\D/g, '').length < 10) errs.phone = 'Enter a phone number with area code.';
    if (!neededBy) errs.neededBy = 'Rush means a date — pick the day this is needed by.';
    else if (neededBy < minDate) errs.neededBy = 'Pick today or a future date.';

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      document.getElementById(`rush-${first}`)?.focus();
      return;
    }

    setSubmitting(true);
    const payload = {
      kind: 'rush' as const,
      rush: true,
      contact: { name: name.trim(), phone: phone.trim() },
      need: need.trim(),
      neededBy,
      submittedAt: new Date().toISOString(),
    };

    try {
      await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } catch {
      /* fail-safe: the user still gets confirmation */
    }

    track('quote_submitted', { service: 'rush', has_artwork: false, rush_window: true });
    setSubmitting(false);
    setSent(true);
  }

  return (
    <div className={styles.wrap}>
      {/* Giant tap-to-call — the primary rush action */}
      <a
        href={`tel:${business.phone}`}
        className={styles.bigCall}
        onClick={() => track('rush_call_clicked', { location: 'rush_page' })}
      >
        <span className={styles.bigCallKicker}>
          <Phone size={18} aria-hidden="true" />
          Tap to call
        </span>
        <span className={styles.bigCallNumber}>Call REM {business.phoneDisplay}</span>
        <span className={styles.bigCallSub}>A real person will tell you what’s possible.</span>
      </a>

      <p className={styles.divider} aria-hidden="true">
        <span className={styles.dividerRule} />
        <span className={styles.dividerLabel}>Or send the details</span>
        <span className={styles.dividerRule} />
      </p>

      {sent ? (
        <div className={forms.success} role="status">
          <p className={forms.successStamp}>Rush request in</p>
          <p className={forms.successTitle}>REM has the details.</p>
          <p className={forms.successBody}>
            A real person will call you back about your date. If the clock is really running,{' '}
            <a
              href={`tel:${business.phone}`}
              onClick={() => track('rush_call_clicked', { location: 'rush_form_success' })}
            >
              call {business.phoneDisplay}
            </a>{' '}
            — it’s still the fastest way.
          </p>
        </div>
      ) : (
        <form className={forms.formStack} onSubmit={handleSubmit} noValidate>
          <div className={`${forms.field} ${errors.name ? forms.fieldInvalid : ''}`}>
            <label className={forms.fieldLabel} htmlFor="rush-name">
              Name
            </label>
            <input
              id="rush-name"
              className={forms.input}
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-describedby={errors.name ? 'rush-name-error' : undefined}
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name ? (
              <p className={forms.error} id="rush-name-error">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={`${forms.field} ${errors.phone ? forms.fieldInvalid : ''}`}>
            <label className={forms.fieldLabel} htmlFor="rush-phone">
              Phone
            </label>
            <input
              id="rush-phone"
              className={forms.input}
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-describedby={errors.phone ? 'rush-phone-error' : undefined}
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone ? (
              <p className={forms.error} id="rush-phone-error">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <div className={forms.field}>
            <label className={forms.fieldLabel} htmlFor="rush-need">
              What do you need?
              <span className={forms.optionalTag}> · optional</span>
            </label>
            <textarea
              id="rush-need"
              className={forms.textarea}
              rows={3}
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              placeholder="500 postcards, folded programs, yard signs — whatever it is."
            />
          </div>

          <div className={`${forms.field} ${errors.neededBy ? forms.fieldInvalid : ''}`}>
            <label className={forms.fieldLabel} htmlFor="rush-neededBy">
              Needed by
            </label>
            <input
              id="rush-neededBy"
              className={forms.input}
              type="date"
              min={minDate}
              value={neededBy}
              onChange={(e) => setNeededBy(e.target.value)}
              aria-describedby={errors.neededBy ? 'rush-neededBy-error' : undefined}
              aria-invalid={Boolean(errors.neededBy)}
            />
            {errors.neededBy ? (
              <p className={forms.error} id="rush-neededBy-error">
                {errors.neededBy}
              </p>
            ) : null}
          </div>

          <button type="submit" className={forms.continue} disabled={submitting}>
            <span>{submitting ? 'Sending…' : 'Send the rush request'}</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <p className={forms.reassure}>Calling is faster. The form works after hours.</p>
        </form>
      )}
    </div>
  );
}
