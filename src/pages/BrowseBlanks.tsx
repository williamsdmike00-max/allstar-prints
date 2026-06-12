/**
 * BrowseBlanks.tsx — customer-facing SanMar blanks catalog at /blanks.
 *
 * Reads the `catalog_public` Supabase view (visible products, retail price
 * only — wholesale never reaches the browser). "Customize This Product"
 * stashes the style and sends the customer into the design flow; the style
 * number rides along on their quote so the shop knows exactly what to order.
 */
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'
import { storeBlankStyle } from '../lib/orders'
import SectionHeader from '../components/ui/SectionHeader'
import SEO from '../components/ui/SEO'

interface PublicProduct {
  style_number: string
  brand: string | null
  title: string | null
  description: string | null
  category: string | null
  subcategory: string | null
  colors: string[]
  sizes: string[]
  image_url: string | null
  retail_price: number | null
}

export default function BrowseBlanks() {
  const [items, setItems] = useState<PublicProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')
  const [category, setCategory] = useState('')
  const [brand, setBrand] = useState('')
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [youthOnly, setYouthOnly] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    supabase.from('catalog_public').select('*').order('style_number').limit(1000)
      .then(({ data }) => {
        setItems((data ?? []) as PublicProduct[])
        setLoading(false)
      })
  }, [])

  const categories = useMemo(() => uniq(items.map((i) => i.category)), [items])
  const brands = useMemo(() => uniq(items.map((i) => i.brand)), [items])
  const colors = useMemo(() => uniq(items.flatMap((i) => i.colors ?? [])), [items])
  const sizes = useMemo(() => uniq(items.flatMap((i) => i.sizes ?? [])), [items])

  const shown = useMemo(() => {
    const needle = q.toLowerCase().trim()
    const cap = Number(maxPrice) || Infinity
    return items.filter((i) =>
      (!needle || `${i.style_number} ${i.title} ${i.brand} ${i.description}`.toLowerCase().includes(needle)) &&
      (!category || i.category === category) &&
      (!brand || i.brand === brand) &&
      (!color || (i.colors ?? []).includes(color)) &&
      (!size || (i.sizes ?? []).includes(size)) &&
      (i.retail_price == null || i.retail_price <= cap) &&
      (!youthOnly || /youth|toddler|infant/i.test(`${i.title} ${i.category} ${i.subcategory}`)),
    )
  }, [items, q, category, brand, color, size, maxPrice, youthOnly])

  const customize = (p: PublicProduct) => {
    storeBlankStyle({
      styleNumber: p.style_number,
      brand: p.brand ?? undefined,
      title: p.title ?? undefined,
      retailPrice: p.retail_price,
    })
    navigate('/design-online')
  }

  return (
    <>
      <SEO
        title="Browse Blank Apparel — Name-Brand Blanks, Printed By Us"
        description="Shop blank shirts, hoodies, hats, bags, and safety wear from top brands. Pick your style and color, then customize it with All-Star Prints in Dallas/DeSoto, TX."
        path="/blanks"
      />
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark pt-28 pb-14">
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Browse Blanks</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Pick the Blank.<br /><span className="text-gradient-red">We Print the Rest.</span>
          </h1>
          <p className="text-brand-silver text-lg max-w-xl mx-auto">
            Name-brand blanks at our shop pricing — choose a style, then customize it and submit for a quote. We handle sourcing, printing, and quality.
          </p>
        </div>
      </section>

      <section className="section-padding py-12 container-xl mx-auto">
        {loading ? (
          <p className="text-brand-silver text-sm text-center py-20">Loading catalog…</p>
        ) : items.length === 0 ? (
          <div className="max-w-xl mx-auto text-center p-10 rounded-xl bg-brand-dark3 border border-white/8">
            <h2 className="text-xl font-black text-white mb-3">Catalog Coming Soon</h2>
            <p className="text-sm text-brand-silver leading-relaxed">
              We're loading our blank apparel catalog. In the meantime, browse the{' '}
              <a href="https://www.sanmar.com" target="_blank" rel="noopener" className="text-brand-blue hover:text-white underline">SanMar catalog</a>,
              grab the <span className="text-white font-bold">style number</span> of anything you like, and include it in your{' '}
              <a href="/upload-artwork" className="text-brand-blue hover:text-white underline">quote request</a> — we'll source it at our price.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters */}
            <aside className="flex flex-col gap-4">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search style #, brand…" className={inputCls} />
              <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />
              <FilterSelect label="Brand" value={brand} onChange={setBrand} options={brands} />
              <FilterSelect label="Color" value={color} onChange={setColor} options={colors} />
              <FilterSelect label="Size" value={size} onChange={setSize} options={sizes} />
              <div>
                <label className={labelCls}>Max price</label>
                <input value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} type="number" placeholder="$" className={inputCls} />
              </div>
              <label className="flex items-center gap-2 text-sm text-brand-silver">
                <input type="checkbox" checked={youthOnly} onChange={(e) => setYouthOnly(e.target.checked)} /> Youth only
              </label>
              <button
                onClick={() => { setQ(''); setCategory(''); setBrand(''); setColor(''); setSize(''); setMaxPrice(''); setYouthOnly(false) }}
                className="text-xs font-bold uppercase tracking-wide text-brand-silver hover:text-white text-left"
              >
                Reset filters
              </button>
            </aside>

            {/* Grid */}
            <div className="lg:col-span-3">
              <p className="text-xs text-brand-silver mb-4">{shown.length} product{shown.length === 1 ? '' : 's'}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {shown.map((p) => (
                  <div key={p.style_number} className="rounded-xl bg-brand-dark3 border border-white/8 overflow-hidden flex flex-col hover:border-brand-red/40 transition-colors">
                    {p.image_url ? (
                      <img src={p.image_url} alt={p.title ?? p.style_number} loading="lazy" className="w-full h-48 object-contain bg-white" />
                    ) : (
                      <div className="w-full h-48 bg-brand-dark4 flex items-center justify-center text-4xl">👕</div>
                    )}
                    <div className="p-4 flex flex-col gap-1 flex-1">
                      <p className="text-[11px] font-bold uppercase tracking-wide text-brand-silver/60">{p.brand} · {p.style_number}</p>
                      <p className="text-sm font-bold text-white leading-snug">{p.title}</p>
                      {p.retail_price != null && <p className="text-base font-black text-brand-red">From ${Number(p.retail_price).toFixed(2)}</p>}
                      <p className="text-[11px] text-brand-silver/60">{(p.colors ?? []).length} colors · {(p.sizes ?? []).join(', ')}</p>
                      <button
                        onClick={() => customize(p)}
                        className="mt-auto pt-3 w-full bg-brand-red hover:bg-brand-red-dark text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded-md transition-all"
                        style={{ marginTop: 'auto' }}
                      >
                        Customize This Product →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="section-padding pb-16 container-xl mx-auto">
        <SectionHeader label="How It Works" title="Blanks Sourced," titleHighlight="Printed In-House" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: '🛍️', t: 'Pick your blank', d: 'Browse name-brand styles at our pricing — no wholesale accounts needed.' },
            { icon: '🎨', t: 'Customize it', d: 'Add your design in the customizer or upload artwork with your quote.' },
            { icon: '🚚', t: 'We source & print', d: 'We order the blanks, print in-house in DFW, and you pick up or ship.' },
          ].map((s) => (
            <div key={s.t} className="text-center p-6 rounded-xl bg-brand-dark3 border border-white/8">
              <span className="text-3xl mb-3 block">{s.icon}</span>
              <h3 className="text-sm font-bold text-white mb-2">{s.t}</h3>
              <p className="text-sm text-brand-silver leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

const inputCls = 'w-full bg-white/4 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red [color-scheme:dark]'
const labelCls = 'block text-[11px] font-bold uppercase tracking-widest text-brand-silver/60 mb-1.5'

function uniq(arr: (string | null)[]): string[] {
  return [...new Set(arr.filter((x): x is string => !!x))].sort()
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
        <option value="">All</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}
