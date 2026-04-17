/**
 * web3forms.ts — Form submission service using Web3Forms
 * Submissions are emailed directly to the address tied to the access key.
 * Docs: https://web3forms.com
 */

const WEB3FORMS_KEY = '75800229-122a-4a3f-858e-97cea5809fe5'

export async function submitForm(payload: Record<string, unknown>): Promise<void> {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      ...payload,
    }),
  })

  const data = await response.json()
  if (!data.success) {
    throw new Error(data.message || 'Form submission failed')
  }
}

/** Derive firstName/lastName from a full name string */
export function splitName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/)
  const firstName = parts[0] ?? ''
  const lastName = parts.slice(1).join(' ')
  return { firstName, lastName }
}
