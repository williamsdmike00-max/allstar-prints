/**
 * webhook.ts — GoHighLevel webhook submission service
 *
 * All forms on the site POST to a GoHighLevel webhook, which automatically
 * creates a contact, tags it by form type, and triggers your automations.
 *
 * HOW TO GET YOUR WEBHOOK URL IN GHL:
 * 1. Go to Automation → New Workflow
 * 2. Add trigger: "Webhook"
 * 3. Copy the webhook URL shown
 * 4. Paste it into your .env file as VITE_GHL_WEBHOOK_URL
 * 5. Add a "Create/Update Contact" action in the workflow
 * 6. Optionally add pipeline stage, notification, or SMS action
 *
 * GHL accepts any JSON payload — every field you send becomes
 * available inside the workflow as a custom value.
 */

export type FormType = 'quick_quote' | 'full_quote' | 'contact' | 'upload_artwork' | 'gang_sheet'

export interface WebhookPayload {
  form_type: FormType
  source: string          // page URL
  timestamp: string       // ISO string
  // Contact fields GHL recognises natively
  firstName?: string
  lastName?: string
  name?: string
  email: string
  phone?: string
  // Order / project detail fields (sent as custom data)
  [key: string]: unknown
}

function resolveWebhookUrl(formType: FormType): string {
  const perForm: Record<FormType, string | undefined> = {
    quick_quote:    import.meta.env.VITE_GHL_QUOTE_WEBHOOK_URL   || undefined,
    full_quote:     import.meta.env.VITE_GHL_QUOTE_WEBHOOK_URL   || undefined,
    contact:        import.meta.env.VITE_GHL_CONTACT_WEBHOOK_URL || undefined,
    upload_artwork: import.meta.env.VITE_GHL_UPLOAD_WEBHOOK_URL  || undefined,
    gang_sheet:     import.meta.env.VITE_GHL_GANGSHEET_WEBHOOK_URL|| undefined,
  }
  return (
    perForm[formType] ||
    import.meta.env.VITE_GHL_WEBHOOK_URL ||
    ''
  )
}

export async function submitToGHL(payload: WebhookPayload): Promise<void> {
  const url = resolveWebhookUrl(payload.form_type)

  if (!url || url.includes('REPLACE_WITH')) {
    // Dev / unconfigured — log to console instead of failing silently
    console.warn(
      '[Allstar Prints] GHL webhook URL not configured.\n' +
      'Set VITE_GHL_WEBHOOK_URL in your .env file.\n' +
      'Payload that would have been sent:',
      payload,
    )
    return
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error(`GHL webhook returned ${response.status}: ${response.statusText}`)
  }
}

/** Convenience: derive firstName/lastName from a full name string */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] ?? ''
  const lastName  = parts.slice(1).join(' ')
  return { firstName, lastName }
}
