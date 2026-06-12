/**
 * Admin.tsx — back-office panel at /admin (not linked from public nav).
 *
 * Auth: Supabase email OTP. Only the emails allowed by the database's
 * is_asp_admin() function can actually read/write anything — anyone else who
 * logs in sees empty data, enforced by RLS, not by this UI.
 *
 * Tabs:
 *  - Orders: every quote/order record with files, details, and status actions
 *  - SanMar Catalog: CSV import (parsed in-browser), visibility, overrides
 *  - Markup: pricing rules that compute customer-facing retail prices
 */
import { useEffect, useMemo, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabaseClient'
import { csvToProducts, computeRetail, type CatalogProduct, type MarkupSettings } from '../lib/sanmar'
import SEO from '../components/ui/SEO'

type OrderRow = {
  id: string
  ref: string
  created_at: string
  type: string
  source: string
  status: string
  customer_name: string
  email: string
  phone: string | null
  deadline: string | null
  notes: string | null
  details: Record<string, unknown>
  files: { name?: string; url: string; label?: string }[]
  estimated_total: number | null
  admin_notes: string | null
  status_history: { at: string; event: string; message?: string }[]
}

const STATUS_STYLES: Record<string, string> = {
  'new': 'bg-brand-blue/15 text-brand-blue',
  'approved': 'bg-green-500/15 text-green-400',
  'completed': 'bg-green-500/15 text-green-400',
  'rejected': 'bg-brand-red/15 text-brand-red',
  'changes-requested': 'bg-yellow-500/15 text-yellow-400',
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null)
  const [tab, setTab] = useState<'orders' | 'catalog' | 'markup'>('orders')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => sub.subscription.unsubscribe()
  }, [])

  return (
    <>
      <SEO title="Admin" description="All-Star Prints admin" path="/admin" noIndex />
      <section className="min-h-screen pt-28 pb-20 section-padding container-xl mx-auto">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
          <h1 className="text-3xl font-black text-white">
            Shop <span className="text-brand-red">Admin</span>
          </h1>
          {session && (
            <div className="flex items-center gap-3">
              <span className="text-xs text-brand-silver">{session.user.email}</span>
              <button onClick={() => supabase.auth.signOut()} className="text-xs font-bold uppercase tracking-wide text-brand-silver hover:text-brand-red transition-colors">
                Sign out
              </button>
            </div>
          )}
        </div>

        {!session ? (
          <Login />
        ) : (
          <>
            <div className="flex gap-2 mb-6 flex-wrap">
              {([['orders', '📋 Orders'], ['catalog', '🏷️ SanMar Catalog'], ['markup', '💲 Markup Rules']] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                    tab === key ? 'bg-brand-red text-white' : 'bg-brand-dark3 text-brand-silver hover:text-white border border-white/8'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            {tab === 'orders' && <OrdersTab />}
            {tab === 'catalog' && <CatalogTab />}
            {tab === 'markup' && <MarkupTab />}
          </>
        )}
      </section>
    </>
  )
}

/* ------------------------------------------------------------------ login */
function Login() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [stage, setStage] = useState<'email' | 'code'>('email')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState('')

  const sendCode = async () => {
    setBusy(true); setMsg('')
    const { error } = await supabase.auth.signInWithOtp({ email: email.trim() })
    setBusy(false)
    if (error) return setMsg(error.message)
    setStage('code')
    setMsg('Check your email for a 6-digit code.')
  }

  const verify = async () => {
    setBusy(true); setMsg('')
    const { error } = await supabase.auth.verifyOtp({ email: email.trim(), token: code.trim(), type: 'email' })
    setBusy(false)
    if (error) setMsg(error.message)
  }

  return (
    <div className="max-w-sm mx-auto p-7 rounded-xl bg-brand-dark3 border border-white/8">
      <h2 className="text-lg font-black text-white mb-1">Owner login</h2>
      <p className="text-xs text-brand-silver mb-5">We'll email you a one-time code — no password to remember.</p>
      {stage === 'email' ? (
        <>
          <input
            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red mb-3"
            onKeyDown={(e) => e.key === 'Enter' && sendCode()}
          />
          <button onClick={sendCode} disabled={busy || !email.includes('@')}
            className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold uppercase tracking-wider text-sm py-3 rounded-md transition-all">
            {busy ? 'Sending…' : 'Email me a code'}
          </button>
        </>
      ) : (
        <>
          <input
            value={code} onChange={(e) => setCode(e.target.value)}
            placeholder="6-digit code" inputMode="numeric"
            className="w-full bg-white/4 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red mb-3 tracking-[0.4em] text-center"
            onKeyDown={(e) => e.key === 'Enter' && verify()}
          />
          <button onClick={verify} disabled={busy || code.trim().length < 6}
            className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-bold uppercase tracking-wider text-sm py-3 rounded-md transition-all">
            {busy ? 'Checking…' : 'Log in'}
          </button>
          <button onClick={() => setStage('email')} className="w-full text-xs text-brand-silver hover:text-white mt-3">Use a different email</button>
        </>
      )}
      {msg && <p className="text-xs text-brand-silver mt-4">{msg}</p>}
    </div>
  )
}

/* ----------------------------------------------------------------- orders */
function OrdersTab() {
  const [orders, setOrders] = useState<OrderRow[]>([])
  const [active, setActive] = useState<OrderRow | null>(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('orders').select('*')
      .order('created_at', { ascending: false }).limit(300)
    setLoading(false)
    if (!error && data) setOrders(data as OrderRow[])
  }
  useEffect(() => { load() }, [])

  const setStatus = async (status: string) => {
    if (!active) return
    const history = [...(active.status_history ?? []), { at: new Date().toISOString(), event: status, message: statusMsg || undefined }]
    const { error } = await supabase.from('orders')
      .update({ status, status_history: history, admin_notes: statusMsg || active.admin_notes })
      .eq('id', active.id)
    if (!error) { setActive(null); setStatusMsg(''); load() }
  }

  if (loading) return <p className="text-brand-silver text-sm">Loading orders…</p>
  if (!orders.length) {
    return (
      <div className="p-8 rounded-xl bg-brand-dark3 border border-white/8 text-center">
        <p className="text-brand-silver text-sm">
          No orders yet. New quote requests from the site (upload artwork, customizer, gang sheet builder) will appear here automatically.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm bg-brand-dark3">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-brand-silver/60 border-b border-white/8">
              <th className="px-4 py-3">Date</th><th className="px-4 py-3">Ref</th><th className="px-4 py-3">Source</th>
              <th className="px-4 py-3">Customer</th><th className="px-4 py-3">Est.</th><th className="px-4 py-3">Status</th><th />
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-4 py-3 text-brand-silver whitespace-nowrap">{new Date(o.created_at).toLocaleDateString()} <span className="opacity-50">{new Date(o.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></td>
                <td className="px-4 py-3 font-bold text-white">{o.ref}</td>
                <td className="px-4 py-3 text-brand-silver">{o.source}</td>
                <td className="px-4 py-3"><span className="text-white font-semibold">{o.customer_name || '—'}</span><br /><span className="text-xs text-brand-silver">{o.email}</span></td>
                <td className="px-4 py-3 text-white">{o.estimated_total != null ? `$${Number(o.estimated_total).toFixed(2)}` : '—'}</td>
                <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-[11px] font-bold ${STATUS_STYLES[o.status] ?? 'bg-white/10 text-white'}`}>{o.status}</span></td>
                <td className="px-4 py-3"><button onClick={() => setActive(o)} className="text-xs font-bold uppercase text-brand-blue hover:text-white">Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {active && (
        <div className="fixed inset-0 z-[60] bg-black/70 flex items-start justify-center overflow-y-auto p-4 pt-16" onClick={() => setActive(null)}>
          <div className="bg-brand-dark2 border border-white/10 rounded-xl max-w-2xl w-full p-7" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-black text-white">{active.ref} <span className={`ml-2 px-2 py-1 rounded-full text-[11px] font-bold ${STATUS_STYLES[active.status]}`}>{active.status}</span></h2>
              <button onClick={() => setActive(null)} className="text-brand-silver hover:text-white">✕</button>
            </div>
            <div className="text-sm text-brand-silver flex flex-col gap-2">
              <p><span className="text-white font-bold">{active.customer_name}</span> · {active.email} {active.phone ? `· ${active.phone}` : ''}</p>
              {active.deadline && <p>Deadline: <span className="text-white">{active.deadline}</span></p>}
              {active.notes && <p className="p-3 rounded-lg bg-brand-dark4 whitespace-pre-wrap">{active.notes}</p>}
              {Object.keys(active.details ?? {}).length > 0 && (
                <pre className="p-3 rounded-lg bg-brand-dark4 text-xs overflow-x-auto">{JSON.stringify(active.details, null, 2)}</pre>
              )}
              {(active.files ?? []).length > 0 && (
                <div>
                  <p className="font-bold text-white mb-1">Files</p>
                  {(active.files ?? []).map((f, i) => (
                    <a key={i} href={f.url} target="_blank" rel="noopener" className="block text-brand-blue hover:text-white text-xs truncate">
                      {f.label ? `${f.label}: ` : ''}{f.name || f.url}
                    </a>
                  ))}
                </div>
              )}
              {(active.status_history ?? []).length > 0 && (
                <p className="text-xs opacity-60">{(active.status_history ?? []).map((h) => `${h.event} ${new Date(h.at).toLocaleString()}${h.message ? ` — "${h.message}"` : ''}`).join(' → ')}</p>
              )}
            </div>
            <input
              value={statusMsg} onChange={(e) => setStatusMsg(e.target.value)}
              placeholder="Internal note / message (optional)"
              className="w-full mt-4 bg-white/4 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red"
            />
            <div className="flex gap-2 mt-4 justify-end flex-wrap">
              <button onClick={() => setStatus('changes-requested')} className="px-4 py-2 rounded-md text-sm font-bold bg-yellow-500/15 text-yellow-400 hover:bg-yellow-500/25">Request changes</button>
              <button onClick={() => setStatus('rejected')} className="px-4 py-2 rounded-md text-sm font-bold bg-brand-red/15 text-brand-red hover:bg-brand-red/25">Reject</button>
              <button onClick={() => setStatus('completed')} className="px-4 py-2 rounded-md text-sm font-bold bg-white/10 text-white hover:bg-white/20">Mark completed</button>
              <button onClick={() => setStatus('approved')} className="px-4 py-2 rounded-md text-sm font-bold bg-green-500/20 text-green-400 hover:bg-green-500/30">Approve</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------------------------------------------------------------- catalog */
function CatalogTab() {
  const [items, setItems] = useState<CatalogProduct[]>([])
  const [filter, setFilter] = useState('')
  const [busy, setBusy] = useState('')
  const [selected, setSelected] = useState<Set<string>>(new Set())

  const load = async () => {
    const { data } = await supabase.from('catalog_products').select('*').order('style_number').limit(2000)
    if (data) setItems(data as CatalogProduct[])
  }
  useEffect(() => { load() }, [])

  const importCsv = async (file: File) => {
    setBusy('Reading CSV…')
    try {
      const text = await file.text()
      const products = csvToProducts(text)
      setBusy(`Pricing ${products.length} styles…`)
      const { data: settingsRow } = await supabase.from('app_settings').select('value').eq('key', 'sanmar_markup').single()
      const settings = (settingsRow?.value ?? { defaultMarkupPercent: 100, roundTo: 0.99, markupRules: [] }) as MarkupSettings
      for (const p of products) p.retail_price = computeRetail(p, settings)

      // keep existing visibility/overrides on re-import
      const { data: existing } = await supabase.from('catalog_products').select('style_number, visible, price_override')
      const keep = new Map((existing ?? []).map((e: { style_number: string; visible: boolean; price_override: number | null }) => [e.style_number, e]))
      for (const p of products) {
        const prev = keep.get(p.style_number)
        p.visible = prev?.visible ?? false
        p.price_override = prev?.price_override ?? null
      }

      for (let i = 0; i < products.length; i += 400) {
        setBusy(`Saving ${Math.min(i + 400, products.length)} / ${products.length}…`)
        const { error } = await supabase.from('catalog_products').upsert(products.slice(i, i + 400))
        if (error) throw error
      }
      setBusy(`✔ Imported ${products.length} styles. New products start hidden — tick Visible to publish.`)
      load()
    } catch (err) {
      setBusy('✗ ' + (err instanceof Error ? err.message : String(err)))
    }
  }

  const setVisible = async (styles: string[], visible: boolean) => {
    await supabase.from('catalog_products').update({ visible }).in('style_number', styles)
    load()
  }

  const setOverride = async (style: string, value: string) => {
    await supabase.from('catalog_products').update({ price_override: value === '' ? null : Number(value) }).eq('style_number', style)
    load()
  }

  const remove = async (style: string) => {
    if (!confirm(`Remove ${style} from the catalog?`)) return
    await supabase.from('catalog_products').delete().eq('style_number', style)
    load()
  }

  const shown = useMemo(() => {
    const q = filter.toLowerCase()
    return items.filter((p) => !q || `${p.style_number} ${p.brand} ${p.title} ${p.category}`.toLowerCase().includes(q))
  }, [items, filter])

  const toggleSel = (style: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(style)) next.delete(style); else next.add(style)
      return next
    })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
        <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">Import SanMar Data Library CSV</h3>
        <p className="text-xs text-brand-silver mb-3">
          sanmar.com → Resources → Data Library → download CSV → drop it here. Parsed in your browser, so big files are fine.
          Wholesale prices only ever show on this page — customers see your marked-up retail.
        </p>
        <input
          type="file" accept=".csv,.txt"
          onChange={(e) => e.target.files?.[0] && importCsv(e.target.files[0])}
          className="text-xs text-brand-silver file:mr-3 file:px-4 file:py-2 file:rounded-md file:border-0 file:bg-brand-red file:text-white file:font-bold file:text-xs file:uppercase file:cursor-pointer"
        />
        {busy && <p className="text-xs text-brand-silver mt-3">{busy}</p>}
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <input
          value={filter} onChange={(e) => setFilter(e.target.value)} placeholder="Filter styles…"
          className="bg-white/4 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red"
        />
        <span className="text-xs text-brand-silver">{shown.length} of {items.length} styles · {selected.size} selected</span>
        <button onClick={() => setVisible([...selected], true)} disabled={!selected.size} className="px-3 py-1.5 rounded-md text-xs font-bold bg-green-500/15 text-green-400 disabled:opacity-40">Show selected</button>
        <button onClick={() => setVisible([...selected], false)} disabled={!selected.size} className="px-3 py-1.5 rounded-md text-xs font-bold bg-white/10 text-brand-silver disabled:opacity-40">Hide selected</button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full text-sm bg-brand-dark3">
          <thead>
            <tr className="text-left text-[11px] uppercase tracking-wide text-brand-silver/60 border-b border-white/8">
              <th className="px-3 py-3" /><th className="px-3 py-3">Style</th><th className="px-3 py-3">Brand</th><th className="px-3 py-3">Product</th>
              <th className="px-3 py-3">Wholesale</th><th className="px-3 py-3">Retail</th><th className="px-3 py-3">Override</th><th className="px-3 py-3">Visible</th><th />
            </tr>
          </thead>
          <tbody>
            {shown.slice(0, 400).map((p) => (
              <tr key={p.style_number} className="border-b border-white/5 hover:bg-white/3">
                <td className="px-3 py-2"><input type="checkbox" checked={selected.has(p.style_number)} onChange={() => toggleSel(p.style_number)} /></td>
                <td className="px-3 py-2 font-bold text-white">{p.style_number}</td>
                <td className="px-3 py-2 text-brand-silver">{p.brand}</td>
                <td className="px-3 py-2 text-brand-silver">{p.title}<br /><span className="text-[11px] opacity-60">{p.category} · {(p.colors ?? []).length} colors</span></td>
                <td className="px-3 py-2 text-brand-silver whitespace-nowrap">{p.wholesale_min != null ? `$${Number(p.wholesale_min).toFixed(2)}` : '—'}{p.wholesale_max != null && p.wholesale_max !== p.wholesale_min ? `–$${Number(p.wholesale_max).toFixed(2)}` : ''}</td>
                <td className="px-3 py-2 text-white font-bold whitespace-nowrap">{(p.price_override ?? p.retail_price) != null ? `$${Number(p.price_override ?? p.retail_price).toFixed(2)}` : '—'}</td>
                <td className="px-3 py-2">
                  <input
                    defaultValue={p.price_override ?? ''} placeholder="auto" type="number" step="0.01"
                    onBlur={(e) => e.target.value !== String(p.price_override ?? '') && setOverride(p.style_number, e.target.value)}
                    className="w-20 bg-white/4 border border-white/10 rounded px-2 py-1 text-xs text-white outline-none focus:border-brand-red"
                  />
                </td>
                <td className="px-3 py-2"><input type="checkbox" checked={!!p.visible} onChange={(e) => setVisible([p.style_number], e.target.checked)} /></td>
                <td className="px-3 py-2"><button onClick={() => remove(p.style_number)} className="text-brand-red/70 hover:text-brand-red text-xs font-bold">✕</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {shown.length > 400 && <p className="text-xs text-brand-silver">Showing first 400 — use the filter to narrow down.</p>}
    </div>
  )
}

/* ----------------------------------------------------------------- markup */
function MarkupTab() {
  const [json, setJson] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    supabase.from('app_settings').select('value').eq('key', 'sanmar_markup').single()
      .then(({ data }) => setJson(JSON.stringify(data?.value ?? {}, null, 2)))
  }, [])

  const save = async () => {
    setMsg('')
    try {
      const value = JSON.parse(json) as MarkupSettings
      const { error } = await supabase.from('app_settings').upsert({ key: 'sanmar_markup', value })
      if (error) throw error
      // re-price the whole catalog with the new rules
      setMsg('Saved — re-pricing catalog…')
      const { data: products } = await supabase.from('catalog_products').select('style_number, brand, category, wholesale_min')
      if (products) {
        for (let i = 0; i < products.length; i += 200) {
          await Promise.all(products.slice(i, i + 200).map((p: { style_number: string; brand: string; category: string; wholesale_min: number | null }) =>
            supabase.from('catalog_products')
              .update({ retail_price: computeRetail(p, value) })
              .eq('style_number', p.style_number)
          ))
        }
      }
      setMsg(`✔ Saved and re-priced ${products?.length ?? 0} styles.`)
    } catch (err) {
      setMsg('✗ ' + (err instanceof SyntaxError ? 'Invalid JSON: ' + err.message : err instanceof Error ? err.message : String(err)))
    }
  }

  return (
    <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8 max-w-3xl">
      <h3 className="text-sm font-black uppercase tracking-wide text-white mb-2">Markup rules</h3>
      <p className="text-xs text-brand-silver mb-4 leading-relaxed">
        Rules are checked top to bottom — first match wins, otherwise <code className="text-brand-blue">defaultMarkupPercent</code> applies to the style's lowest wholesale price.
        Rule types: <code className="text-brand-blue">percent</code> (cost + %), <code className="text-brand-blue">fixed</code> (cost + $), <code className="text-brand-blue">price</code> (flat $).
        Example rule: <code className="text-brand-blue">{'{"match":{"brand":"Carhartt"},"type":"percent","value":60}'}</code>.
        Saving re-prices every style in the catalog.
      </p>
      <textarea
        value={json} onChange={(e) => setJson(e.target.value)} rows={14} spellCheck={false}
        className="w-full bg-brand-dark4 border border-white/10 rounded-lg px-4 py-3 text-xs text-white font-mono outline-none focus:border-brand-red"
      />
      <div className="flex items-center gap-3 mt-3">
        <button onClick={save} className="px-5 py-2.5 rounded-md text-sm font-bold bg-brand-red hover:bg-brand-red-dark text-white uppercase tracking-wide">Save & re-price</button>
        <span className="text-xs text-brand-silver">{msg}</span>
      </div>
    </div>
  )
}
