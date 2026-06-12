/**
 * orders.ts — writes an order/quote record to Supabase so the /admin panel
 * has a reviewable history with statuses and file links.
 *
 * This runs ALONGSIDE the existing GHL webhook / web3forms submission (which
 * stays the lead-capture + notification channel). It is strictly best-effort:
 * if the insert fails, the customer's form submission still succeeds.
 */
import { supabase } from './supabaseClient'

export interface OrderFileLink {
  name: string
  url: string
  label?: string
}

export interface CreateOrderInput {
  type?: 'quote' | 'order'
  source: string // upload-artwork | design-online | gang-sheet | blanks | contact
  customerName: string
  email: string
  phone?: string
  deadline?: string
  notes?: string
  details?: Record<string, unknown>
  files?: OrderFileLink[]
  estimatedTotal?: number | null
}

export async function createOrderRecord(input: CreateOrderInput): Promise<string | null> {
  try {
    // Generate the reference client-side: anon role can INSERT orders but
    // (by design) can never SELECT them back, so a returning clause would fail.
    const ref = 'ASP-' + Math.random().toString(36).slice(2, 8).toUpperCase()
    const { error } = await supabase.from('orders').insert({
      ref,
      type: input.type ?? 'quote',
      source: input.source,
      customer_name: input.customerName,
      email: input.email,
      phone: input.phone ?? null,
      deadline: input.deadline ?? null,
      notes: input.notes ?? null,
      details: input.details ?? {},
      files: input.files ?? [],
      estimated_total: input.estimatedTotal ?? null,
      status_history: [{ at: new Date().toISOString(), event: 'submitted' }],
    })
    if (error) throw error
    return ref
  } catch (err) {
    console.warn('[orders] could not save order record (form still submitted):', err)
    return null
  }
}

/** Session key used by Browse Blanks → customizer/quote handoff. */
export const BLANK_STYLE_KEY = 'asp-blank-style'

export interface BlankStyleHandoff {
  styleNumber: string
  brand?: string
  title?: string
  retailPrice?: number | null
}

export function readBlankStyle(): BlankStyleHandoff | null {
  try {
    const raw = sessionStorage.getItem(BLANK_STYLE_KEY)
    return raw ? (JSON.parse(raw) as BlankStyleHandoff) : null
  } catch {
    return null
  }
}

export function storeBlankStyle(handoff: BlankStyleHandoff) {
  try {
    sessionStorage.setItem(BLANK_STYLE_KEY, JSON.stringify(handoff))
  } catch {
    /* private browsing — ignore */
  }
}

export function clearBlankStyle() {
  try {
    sessionStorage.removeItem(BLANK_STYLE_KEY)
  } catch {
    /* ignore */
  }
}
