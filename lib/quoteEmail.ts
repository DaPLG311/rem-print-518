/**
 * Formats an intake submission (quote wizard / rush / upload) into a clean
 * email for REM. Defensive by design — the payload arrives as `unknown` from
 * the client, so every field is optional and safely coerced.
 */

type Dict = Record<string, unknown>;

interface FileRef {
  name?: string;
  size?: number;
}

export interface QuoteEmail {
  subject: string;
  html: string;
  text: string;
  /** Customer email, if provided — set as Reply-To so REM just hits Reply. */
  replyTo?: string;
}

function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function asDict(v: unknown): Dict {
  return v && typeof v === 'object' ? (v as Dict) : {};
}

function fileList(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.map((f) => {
    const file = asDict(f) as FileRef;
    const kb = typeof file.size === 'number' ? ` (${Math.max(1, Math.round(file.size / 1024))} KB)` : '';
    return `${file.name ?? 'file'}${kb}`;
  });
}

/** [label, value] rows, skipping empties. */
function rowsFrom(pairs: [string, unknown][]): [string, string][] {
  return pairs
    .map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v == null ? '' : String(v)] as [string, string])
    .filter(([, v]) => v !== '');
}

export function buildQuoteEmail(payloadUnknown: unknown): QuoteEmail {
  const p = asDict(payloadUnknown);
  const kind = String(p.kind ?? 'submission');
  const contact = asDict(p.contact);
  const name = String(contact.name ?? '').trim();
  const email = String(contact.email ?? '').trim();

  // ---- subject + heading per kind ----
  let heading: string;
  let subject: string;
  if (kind === 'rush') {
    heading = 'RUSH JOB REQUEST';
    subject = `RUSH job request${name ? ` — ${name}` : ''}`;
  } else if (kind === 'upload') {
    heading = 'ARTWORK INTAKE';
    subject = `Artwork intake${name ? ` — ${name}` : ''}`;
  } else {
    const svc = String(p.serviceLabel ?? p.service ?? '').trim();
    heading = 'NEW QUOTE REQUEST';
    subject = `New quote request${svc ? ` — ${svc}` : ''}${name ? ` · ${name}` : ''}`;
  }

  // ---- contact rows ----
  const contactRows = rowsFrom([
    ['Name', contact.name],
    ['Company', contact.company],
    ['Phone', contact.phone],
    ['Email', contact.email],
    ['Preferred contact', contact.preferredContact],
  ]);

  // ---- detail rows per kind ----
  const detailRows: [string, string][] = [];
  if (kind === 'quote') {
    const svc = String(p.serviceLabel ?? p.service ?? '').trim();
    if (svc) detailRows.push(['Service', svc]);
    for (const [k, v] of Object.entries(asDict(p.details))) {
      if (typeof v === 'string' && v.trim()) detailRows.push([k, v.trim()]);
    }
    const art = asDict(p.artwork);
    const artLabel = String(art.statusLabel ?? art.status ?? '').trim();
    if (artLabel) detailRows.push(['Artwork', artLabel]);
    const files = fileList(art.files);
    if (files.length) detailRows.push(['Files listed', files.join(', ')]);
    if (typeof art.notes === 'string' && art.notes.trim()) detailRows.push(['Notes', art.notes.trim()]);
  } else if (kind === 'rush') {
    if (typeof p.need === 'string' && p.need.trim()) detailRows.push(['What they need', p.need.trim()]);
    if (typeof p.neededBy === 'string' && p.neededBy) detailRows.push(['Needed by', String(p.neededBy)]);
  } else if (kind === 'upload') {
    if (typeof p.job === 'string' && p.job.trim()) detailRows.push(['Job', p.job.trim()]);
    const files = fileList(p.files);
    if (files.length) detailRows.push(['Files listed', files.join(', ')]);
    if (typeof p.fileIntent === 'string' && p.fileIntent.trim()) detailRows.push(['File note', p.fileIntent.trim()]);
  }

  const submittedAt = String(p.submittedAt ?? '').trim();

  // ---- plain text ----
  const textLines: string[] = [heading, ''];
  if (contactRows.length) {
    textLines.push('CONTACT');
    contactRows.forEach(([k, v]) => textLines.push(`  ${k}: ${v}`));
    textLines.push('');
  }
  if (detailRows.length) {
    textLines.push('DETAILS');
    detailRows.forEach(([k, v]) => textLines.push(`  ${k}: ${v}`));
    textLines.push('');
  }
  if (kind === 'upload') {
    textLines.push('NOTE: files are not transmitted in V1 — follow up with the customer to collect them.', '');
  }
  if (submittedAt) textLines.push(`Submitted: ${submittedAt}`);
  const text = textLines.join('\n');

  // ---- html ----
  const rowHtml = (rows: [string, string][]) =>
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 14px 6px 0;color:#8a8a8a;font-size:13px;vertical-align:top;white-space:nowrap">${esc(
            k,
          )}</td><td style="padding:6px 0;color:#111;font-size:15px;font-weight:600">${esc(v)}</td></tr>`,
      )
      .join('');

  const html = `<!doctype html><html><body style="margin:0;background:#f4f4f5;font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
  <div style="max-width:560px;margin:0 auto;padding:24px">
    <div style="background:#fff;border:1px solid #e5e5e5;border-radius:10px;overflow:hidden">
      <div style="background:#C8102E;color:#fff;padding:18px 24px;font-weight:800;letter-spacing:.04em;font-size:14px">
        REM · ${esc(heading)}
      </div>
      <div style="padding:22px 24px">
        ${contactRows.length ? `<table style="border-collapse:collapse;width:100%;margin-bottom:16px">${rowHtml(contactRows)}</table>` : ''}
        ${detailRows.length ? `<div style="border-top:1px solid #eee;padding-top:14px"><table style="border-collapse:collapse;width:100%">${rowHtml(detailRows)}</table></div>` : ''}
        ${kind === 'upload' ? `<p style="margin:16px 0 0;padding:10px 12px;background:#fff5f5;border-left:3px solid #C8102E;color:#7a1420;font-size:13px">Files are not transmitted in V1 — follow up with the customer to collect them.</p>` : ''}
        ${email ? `<p style="margin:18px 0 0"><a href="mailto:${esc(email)}" style="display:inline-block;background:#111;color:#fff;text-decoration:none;padding:11px 20px;border-radius:6px;font-weight:700;font-size:14px">Reply to ${esc(name || 'customer')}</a></p>` : ''}
      </div>
      ${submittedAt ? `<div style="padding:12px 24px;border-top:1px solid #eee;color:#9a9a9a;font-size:12px">Submitted ${esc(submittedAt)}</div>` : ''}
    </div>
  </div>
  </body></html>`;

  return { subject, html, text, replyTo: email || undefined };
}
