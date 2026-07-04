'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { track } from '@/lib/track';
import UploadZone from './UploadZone';
import type { FileMeta } from './types';
import forms from './forms.module.css';
import styles from './UploadForm.module.css';

/**
 * /upload — the artwork-first intake path (quote step-3 mindset, standalone).
 * Files are listed client-side and DESCRIBED in the payload; no storage in V1.
 */
export default function UploadForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [job, setJob] = useState('');
  const [files, setFiles] = useState<FileMeta[]>([]);
  const [fileIntent, setFileIntent] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = 'Add a name so REM knows whose files these are.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Enter an email address REM can reply to.';
    }
    if (files.length === 0 && !fileIntent.trim()) {
      errs.files = 'List a file, or tell REM what you still need to send.';
    }

    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      const first = Object.keys(errs)[0];
      const targetId = first === 'files' ? 'up-fileIntent' : `up-${first}`;
      document.getElementById(targetId)?.focus();
      return;
    }

    setSubmitting(true);
    const payload = {
      kind: 'upload' as const,
      contact: { name: name.trim(), email: email.trim(), phone: phone.trim() },
      job: job.trim(),
      files,
      fileIntent: fileIntent.trim(),
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

    setSubmitting(false);
    setSent(true);
  }

  if (sent) {
    return (
      <div className={forms.success} role="status">
        <p className={forms.successStamp}>{files.length > 0 ? 'Files noted' : 'Artwork noted'}</p>
        <p className={forms.successTitle}>
          REM has {files.length > 0 ? 'the file list.' : 'the artwork note.'}
        </p>
        <p className={forms.successBody}>
          REM has {files.length > 0 ? 'the file list' : 'your artwork note'}. A real person will
          follow up about {job.trim() ? `“${job.trim()}”` : 'your job'} with a way to send the
          files themselves — usually within one business day. Starting something new?{' '}
          <Link href="/quote">Request a quote</Link>.
        </p>
      </div>
    );
  }

  return (
    <form className={forms.formStack} onSubmit={handleSubmit} noValidate>
      <div className={`${forms.field} ${errors.name ? forms.fieldInvalid : ''}`}>
        <label className={forms.fieldLabel} htmlFor="up-name">
          Name
        </label>
        <input
          id="up-name"
          className={forms.input}
          type="text"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-describedby={errors.name ? 'up-name-error' : undefined}
          aria-invalid={Boolean(errors.name)}
        />
        {errors.name ? (
          <p className={forms.error} id="up-name-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className={`${forms.field} ${errors.email ? forms.fieldInvalid : ''}`}>
        <label className={forms.fieldLabel} htmlFor="up-email">
          Email
        </label>
        <input
          id="up-email"
          className={forms.input}
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-describedby={errors.email ? 'up-email-error' : undefined}
          aria-invalid={Boolean(errors.email)}
        />
        {errors.email ? (
          <p className={forms.error} id="up-email-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div className={forms.field}>
        <label className={forms.fieldLabel} htmlFor="up-phone">
          Phone
          <span className={forms.optionalTag}> · optional</span>
        </label>
        <input
          id="up-phone"
          className={forms.input}
          type="tel"
          autoComplete="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className={forms.field}>
        <label className={forms.fieldLabel} htmlFor="up-job">
          What job is this for?
          <span className={forms.optionalTag}> · optional</span>
        </label>
        <input
          id="up-job"
          className={forms.input}
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          placeholder="New order, a reprint, a quote you already sent…"
        />
      </div>

      <div id="up-files" tabIndex={-1} className={styles.zoneBlock}>
        <UploadZone
          files={files}
          onAdd={(added) => {
            setFiles((f) => [...f, ...added]);
            setErrors((e) => {
              const { files: _dropped, ...rest } = e;
              return rest;
            });
          }}
          onRemove={(i) => setFiles((f) => f.filter((_, idx) => idx !== i))}
          context="upload"
          tone="dark"
          sublabel="Final artwork, a work in progress, or just references — anything that shows the job."
        />
        <div className={`${forms.field} ${errors.files ? forms.fieldInvalid : ''}`}>
          <label className={forms.fieldLabel} htmlFor="up-fileIntent">
            File note
            <span className={forms.optionalTag}> · if files are not ready</span>
          </label>
          <textarea
            id="up-fileIntent"
            className={forms.textarea}
            rows={3}
            value={fileIntent}
            onChange={(e) => {
              setFileIntent(e.target.value);
              if (e.target.value.trim()) {
                setErrors((current) => {
                  const { files: _dropped, ...rest } = current;
                  return rest;
                });
              }
            }}
            placeholder="Logo file coming later, photos on my phone, old order to match…"
            aria-describedby={errors.files ? 'up-files-error' : undefined}
            aria-invalid={Boolean(errors.files)}
          />
          {errors.files ? (
            <p className={forms.error} id="up-files-error" role="alert">
              {errors.files}
            </p>
          ) : null}
        </div>
      </div>

      <button type="submit" className={forms.continue} disabled={submitting}>
        <span>{submitting ? 'Sending…' : files.length > 0 ? 'Send the file list' : 'Send the artwork note'}</span>
        <ArrowRight size={18} aria-hidden="true" />
      </button>

      <p className={forms.reassure}>
        Starting from scratch?{' '}
        <Link href="/quote" className={forms.hintLink}>
          Request a quote
        </Link>{' '}
        instead.
      </p>
    </form>
  );
}
