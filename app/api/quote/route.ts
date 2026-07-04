import { NextResponse } from 'next/server';

/**
 * /api/quote — V1 intake endpoint for the quote wizard, /rush, and /upload.
 *
 * Behavior (per BRIEF §QUOTE FUNNEL):
 * - Forwards the JSON payload to QUOTE_WEBHOOK_URL when the env var is set.
 * - Otherwise logs the submission server-side.
 * - ALWAYS returns success to the user — intake must never lose a lead to
 *   a plumbing failure. Delivery problems are logged for the operator.
 */

export const runtime = 'nodejs';

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

  const webhookUrl = process.env.QUOTE_WEBHOOK_URL;

  if (webhookUrl) {
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record),
      });
      if (!res.ok) {
        console.error(`[quote] webhook responded ${res.status}; logging submission instead.`);
        console.log('[quote] submission:', JSON.stringify(record));
      }
    } catch (err) {
      console.error('[quote] webhook forward failed; logging submission instead.', err);
      console.log('[quote] submission:', JSON.stringify(record));
    }
  } else {
    console.log('[quote] submission (QUOTE_WEBHOOK_URL not set):', JSON.stringify(record, null, 2));
  }

  return NextResponse.json({ ok: true });
}
