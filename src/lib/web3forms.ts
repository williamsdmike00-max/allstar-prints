/**
 * web3forms.ts — form submission service.
 *
 * Every form on the site (contact, quote, artwork upload, design builder)
 * calls submitForm(). The data is POSTed as JSON to the GoHighLevel (GHL)
 * webhook, which creates/updates a contact and triggers Mike's automations.
 *
 * The webhook URL comes from VITE_GHL_WEBHOOK_URL (set in .env / Vercel).
 * A hardcoded fallback keeps forms working even if the env var is missing.
 */

export type FormPayload = {
  email: string
  [key: string]: unknown
}

const FALLBACK_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/9Q2FZWe88ng4QFaejG5G/webhook-trigger/9ef217d6-375e-429e-8d95-26557503f12a'

function getWebhookUrl(): string {
  return (import.meta.env.VITE_GHL_WEBHOOK_URL as string) || FALLBACK_WEBHOOK_URL
}

/**
 * Sends a form payload to the lead webhook. Resolves on success,
 * throws on a network error or a non-2xx response so the caller can
 * show a friendly error message.
 */
export async function submitForm(payload: FormPayload): Promise<void> {
  const url = getWebhookUrl()

  const body = {
    ...payload,
    timestamp: new Date().toISOString(),
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status} ${response.statusText}`)
  }
}

/** Split a full name into first / last for systems that expect both. */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}
