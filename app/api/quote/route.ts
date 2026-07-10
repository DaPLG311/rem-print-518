import { NextResponse } from 'next/server';
import { business } from '@/lib/config';
import { buildQuoteEmail } from '@/lib/quoteEmail';

/**
 * /api/quote — V1 intake endpoint for the quote wizard, /rush, and /upload.
 *
 * Delivery (best-effort, in priority order — a lead is NEVER lost to a
 * plumbing failure, so the user always gets success):
 *   1. Email to REM via Resend, when RESEND_API_KEY is set.
 *   2. Forward the JSON to QUOTE_WEBHOOK_URL, when set.
 *   3. Otherwise, log the submission server-side.
 *
 * Env:
 *   RESEND_API_KEY    — Resend API key (enables email delivery).
 *   QUOTE_TO_EMAIL    — where leads land (default: business.email).
 *   QUOTE_FROM_EMAIL  — verified sender (default: onboarding@resend.dev for testing).
 *   QUOTE_WEBHOOK_URL — optional extra webhook forward.
 */

export const runtime = 'nodejs';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

async function sendEmail(payload: unknown): Promise<'sent' | 'skipped' | 'failed'> {
  const key = process.env.RESEND_API_KEY;
  if (!key) return 'skipped';

  const to = process.env.QUOTE_TO_EMAIL || business.email;
  const from = process.env.QUOTE_FROM_EMAIL || 'REM Quote Intake <onboarding@resend.dev>';
  const { subject, html, text, replyTo } = buildQuoteEmail(payload);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
        ...(replyTo ? { reply_to: [replyTo] } : {}),
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[quote] Resend responded ${res.status}: ${detail}`);
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('[quote] Resend request failed.', err);
    return 'failed';
  }
}

async function forwardWebhook(record: unknown): Promise<'sent' | 'skipped' | 'failed'> {
  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;
  if (!webhookUrl) return 'skipped';
  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) {
      console.error(`[quote] webhook responded ${res.status}.`);
      return 'failed';
    }
    return 'sent';
  } catch (err) {
    console.error('[quote] webhook forward failed.', err);
    return 'failed';
  }
}

export async function POST(request: Request): Promise<NextResponse> {
  let payload: unknown = null;

  try {
    payload = await request.json();
  } catch {
    // Malformed body — still record what we can and succeed for the user.
    payload = { parseError: true };
  }

  const record = {
    receivedAt: new Date().toISOString(),
    source: 'rem-print-mail',
    payload,
  };

  // Deliver via every configured channel; none of these may throw to the user.
  const [emailResult, webhookResult] = await Promise.all([sendEmail(payload), forwardWebhook(record)]);

  // If nothing delivered the lead, make sure it's at least captured in logs.
  if (emailResult !== 'sent' && webhookResult !== 'sent') {
    console.log(
      `[quote] submission not delivered (email:${emailResult}, webhook:${webhookResult}) — logging:`,
      JSON.stringify(record),
    );
  }

  return NextResponse.json({ ok: true });
}
