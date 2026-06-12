/**
 * sanmar.ts — SanMar Data Library CSV import + markup pricing.
 *
 * The CSV is parsed entirely in the browser on the admin page (SanMar exports
 * can be huge — no server round-trip needed), grouped into one product per
 * style, priced via the markup rules, and upserted to Supabase in batches.
 *
 * Wholesale cost lives only in the `catalog_products` table, which RLS locks
 * to the admin. Customers read the `catalog_public` view (retail only).
 */

export interface CatalogProduct {
  style_number: string
  brand: string
  title: string
  description: string
  category: string
  subcategory: string
  colors: string[]
  sizes: string[]
  skus: Record<string, string>
  image_url: string
  weight: number | null
  wholesale_min: number | null
  wholesale_max: number | null
  retail_price: number | null
  price_override?: number | null
  visible?: boolean
}

export interface MarkupRule {
  match: { brand?: string; category?: string; styleNumber?: string }
  type: 'percent' | 'fixed' | 'price'
  value: number
}

export interface MarkupSettings {
  defaultMarkupPercent: number
  roundTo: number | null
  markupRules: MarkupRule[]
}

// ------------------------------------------------------------------ CSV
export function parseCsv(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++ } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') { row.push(field); field = '' }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++
      row.push(field); field = ''
      if (row.length > 1 || row[0] !== '') rows.push(row)
      row = []
    } else field += c
  }
  if (field !== '' || row.length) { row.push(field); rows.push(row) }
  return rows
}

function colFinder(headers: string[]) {
  const norm = headers.map((h) => h.toLowerCase().replace(/[^a-z0-9]/g, ''))
  return (...names: string[]) => {
    for (const n of names) {
      const idx = norm.indexOf(n.toLowerCase().replace(/[^a-z0-9]/g, ''))
      if (idx !== -1) return idx
    }
    return -1
  }
}

/** Parse a SanMar Data Library CSV into grouped products (one per style). */
export function csvToProducts(text: string): CatalogProduct[] {
  const rows = parseCsv(text)
  if (rows.length < 2) throw new Error('CSV appears to be empty')
  const find = colFinder(rows[0])
  const cols = {
    style: find('STYLE#', 'Style', 'StyleNumber', 'STYLE_NUMBER', 'UNIQUE_KEY_STYLE'),
    brand: find('MILL', 'Brand', 'BRAND_NAME', 'MILL_NAME'),
    title: find('PRODUCT_TITLE', 'Title', 'ProductName', 'STYLE_NAME'),
    desc: find('PRODUCT_DESCRIPTION', 'Description', 'SHORT_DESCRIPTION'),
    category: find('CATEGORY_NAME', 'Category', 'PRODUCT_CATEGORY'),
    subcategory: find('SUBCATEGORY_NAME', 'Subcategory'),
    color: find('COLOR_NAME', 'Color', 'CATALOG_COLOR'),
    size: find('SIZE', 'Size', 'SIZE_NAME'),
    sku: find('UNIQUE_KEY', 'SKU', 'INVENTORY_KEY'),
    price: find('PIECE_PRICE', 'Price', 'CASE_PRICE', 'WHOLESALE', 'CUSTOMER_PRICE'),
    weight: find('PIECE_WEIGHT', 'Weight', 'PRODUCT_WEIGHT'),
    image: find('FRONT_MODEL_IMAGE_URL', 'PRODUCT_IMAGE', 'FRONT_FLAT_IMAGE', 'THUMBNAIL_IMAGE', 'PRODUCT_IMAGE_URL', 'COLOR_PRODUCT_IMAGE'),
  }
  if (cols.style === -1) throw new Error('No style number column found (looked for STYLE#, Style, StyleNumber…)')

  const val = (r: string[], i: number) => (i === -1 ? '' : String(r[i] ?? '').trim())
  const byStyle = new Map<string, CatalogProduct>()

  for (let i = 1; i < rows.length; i++) {
    const r = rows[i]
    const style = val(r, cols.style)
    if (!style) continue
    let p = byStyle.get(style)
    if (!p) {
      p = {
        style_number: style,
        brand: val(r, cols.brand),
        title: val(r, cols.title) || style,
        description: val(r, cols.desc),
        category: val(r, cols.category),
        subcategory: val(r, cols.subcategory),
        colors: [],
        sizes: [],
        skus: {},
        image_url: val(r, cols.image),
        weight: parseFloat(val(r, cols.weight)) || null,
        wholesale_min: null,
        wholesale_max: null,
        retail_price: null,
      }
      byStyle.set(style, p)
    }
    const color = val(r, cols.color)
    const size = val(r, cols.size)
    if (color && !p.colors.includes(color)) p.colors.push(color)
    if (size && !p.sizes.includes(size)) p.sizes.push(size)
    if (!p.image_url) p.image_url = val(r, cols.image)
    const price = parseFloat(val(r, cols.price))
    if (!isNaN(price)) {
      if (p.wholesale_min === null || price < p.wholesale_min) p.wholesale_min = price
      if (p.wholesale_max === null || price > p.wholesale_max) p.wholesale_max = price
    }
    const sku = val(r, cols.sku)
    if (sku && color && size) p.skus[`${color}|${size}`] = sku
  }
  return [...byStyle.values()]
}

// ------------------------------------------------------------------ markup
/** First matching rule wins; falls back to defaultMarkupPercent. */
export function computeRetail(p: Pick<CatalogProduct, 'style_number' | 'brand' | 'category' | 'wholesale_min'>, s: MarkupSettings): number | null {
  const cost = p.wholesale_min
  if (cost == null) return null
  const eq = (a?: string, b?: string) =>
    (a ?? '').toLowerCase().trim() === (b ?? '').toLowerCase().trim()

  let rule: MarkupRule | null = null
  for (const r of s.markupRules ?? []) {
    const m = r.match ?? {}
    if (m.styleNumber && m.styleNumber !== p.style_number) continue
    if (m.brand && !eq(m.brand, p.brand)) continue
    if (m.category && !eq(m.category, p.category)) continue
    rule = r
    break
  }

  let price: number
  if (!rule) price = cost * (1 + (s.defaultMarkupPercent ?? 100) / 100)
  else if (rule.type === 'percent') price = cost * (1 + rule.value / 100)
  else if (rule.type === 'fixed') price = cost + rule.value
  else price = rule.value

  const ending = s.roundTo
  if (typeof ending === 'number' && ending > 0 && ending < 1) {
    // round UP to the nearest x.99-style ending
    price = Math.floor(price) + ending
    if (price < (p.wholesale_min ?? 0)) price += 1
  }
  return Math.round(price * 100) / 100
}
