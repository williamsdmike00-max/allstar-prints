import { Material } from './types'

// Per Allstar Prints LLC price sheet — t-shirts, front print included.
// Returns null for 101+ shirts (custom quote).
export function tierPrice(n: number): number | null {
  if (n >= 101) return null
  if (n >= 51)  return 12
  if (n >= 25)  return 14
  if (n >= 12)  return 16
  if (n >= 6)   return 18
  if (n >= 2)   return 22
  return 25
}

export function upgradeFor(material: Material): number {
  if (material === 'Heavy Cotton') return 5
  if (material === 'Tri-Blend') return 3
  return 0
}

export function totals(qty: number, material: Material) {
  const base = tierPrice(qty)
  const upgrade = upgradeFor(material)
  if (base == null) return { each: null as string | null, total: null as string | null, base: null }
  const each = (base + upgrade).toFixed(2)
  const total = (parseFloat(each) * qty).toFixed(0)
  return { each, total, base }
}
