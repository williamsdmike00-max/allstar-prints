import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, FileCheck, AlertCircle } from 'lucide-react'
import { useCustomizer, type PrintLocation } from '../customizer'
import { totals } from '../customizer/pricing'
import { products } from '../customizer/constants'
import { firstTextElement } from '../customizer/state'
import { submitForm, splitName } from '../../lib/web3forms'
import { uploadFilesToStorage } from '../../lib/storage'
import { dataURLToFile } from '../customizer'

export default function CheckoutStep({
  pngDataURL,
  onBack,
}: {
  pngDataURL: string
  onBack: () => void
}) {
  const productKey = useCustomizer((s) => s.productKey)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const inkColor = useCustomizer((s) => s.inkColor)
  const material = useCustomizer((s) => s.material)
  const size = useCustomizer((s) => s.size)
  const qty = useCustomizer((s) => s.qty)
  const printLocations = useCustomizer((s) => s.printLocations)
  const elements = useCustomizer((s) => s.elements)
  const product = products[productKey]
  const locationsLabel = useMemo(
    () => printLocations.join(' + ') || 'front',
    [printLocations],
  )

  const shirtName = useMemo(
    () => product.colors.find((c) => c.hex === shirtColor)?.name || 'Custom',
    [product, shirtColor],
  )
  const designText = useMemo(() => firstTextElement(elements)?.text || '', [elements])
  const imgCount = useMemo(() => elements.filter((e) => e.type === 'image').length, [elements])

  const defaultNotes = useMemo(() => {
    const lines = [
      'Designed in the online builder:',
      `• Product: ${product.name} (${product.sku})`,
      `• Blank color: ${shirtName} (${shirtColor.toUpperCase()})`,
      `• Ink: ${inkColor.toUpperCase()}`,
      `• Material: ${material}`,
      `• Size: ${size}, Qty: ${qty}`,
      `• Print locations: ${locationsLabel}`,
      designText ? `• Text: "${designText}"` : null,
      imgCount > 0 ? `• Images on canvas: ${imgCount}` : null,
      '',
      'See attached preview. We\'ll redraw final art if needed and send a proof for approval.',
    ].filter(Boolean) as string[]
    return lines.join('\n')
  }, [product, shirtName, shirtColor, inkColor, material, size, qty, locationsLabel, designText, imgCount])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState(defaultNotes)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Re-sync default notes if any spec changes between back/forward.
  useEffect(() => {
    setNotes((prev) => (prev && prev !== defaultNotes && prev.trim().length > 0 ? prev : defaultNotes))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultNotes])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setError(null)
    try {
      const file = pngDataURL ? await dataURLToFile(pngDataURL) : null
      const fileUrls = file ? await uploadFilesToStorage([file]) : []
      const { firstName, lastName } = splitName(name)
      await submitForm({
        subject: 'New Design Online submission — Allstar Prints',
        from_name: name,
        replyto: email,
        name,
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        notes: notes || defaultNotes,
        product_name: product.name,
        product_sku: product.sku,
        shirt_color: shirtName,
        shirt_hex: shirtColor,
        ink_hex: inkColor,
        material,
        size,
        quantity: qty,
        print_locations: printLocations.join(', '),
        design_text: designText,
        files_uploaded: file ? file.name : 'No files — see attached preview',
        download_links: fileUrls.length ? fileUrls.join('\n') : 'No file URLs',
        source: window.location.href,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Design Online submit failed', err)
      setError('Could not submit. Try again or email contact@allstarprintsllc.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center text-center py-16 px-6 rounded-2xl bg-brand-dark3 border border-brand-red/30 max-w-2xl mx-auto">
        <FileCheck size={56} className="text-brand-red mb-5" />
        <h2 className="text-3xl font-black text-white mb-3">Got it — we're on it.</h2>
        <p className="text-brand-silver leading-relaxed max-w-md mb-6">
          Your design and project details just hit our inbox. Expect a proof and a final quote within a few hours.
        </p>
        <div className="text-xs text-brand-silver/70">Reference: {email || 'no email provided'}</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
      {/* Summary card */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 flex flex-col gap-4 p-5 rounded-2xl bg-brand-dark3 border border-white/10">
          <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60">
            Your design
          </div>
          {pngDataURL ? (
            <img
              src={pngDataURL}
              alt="Your design preview"
              className="w-full rounded-lg border border-white/8 bg-brand-dark2"
            />
          ) : (
            <div className="aspect-[4/5] rounded-lg bg-brand-dark2 flex items-center justify-center text-xs text-brand-silver/50">
              No preview captured
            </div>
          )}
          <SpecRow label="Product" value={product.name} />
          <SpecRow label="Blank color" value={`${shirtName} (${shirtColor.toUpperCase()})`} />
          <SpecRow label="Ink" value={inkColor.toUpperCase()} />
          <SpecRow label="Material" value={material} />
          <SpecRow label="Size / Qty" value={`${size} · ${qty}`} />
          <SpecRow label="Locations" value={locationsLabel} />
          <PriceRow qty={qty} material={material} printLocations={printLocations} />
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-5 p-5 lg:p-7 rounded-2xl bg-brand-dark3 border border-white/8">
        <button
          type="button"
          onClick={onBack}
          className="self-start inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-silver hover:text-white transition-colors"
        >
          <ArrowLeft size={14} /> Edit design
        </button>

        <div>
          <h2 className="text-xl md:text-2xl font-black text-white mb-1">Final details</h2>
          <p className="text-sm text-brand-silver">
            We'll send a proof + final quote. No charge yet — 50% deposit only after you approve.
          </p>
        </div>

        <fieldset className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <legend className="sr-only">Contact info</legend>
          <Field
            label="Your Name"
            value={name}
            onChange={setName}
            placeholder="Full name"
            required
          />
          <Field
            label="Email Address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="you@example.com"
            required
          />
          <Field
            label="Phone (optional)"
            type="tel"
            value={phone}
            onChange={setPhone}
            placeholder="(555) 000-0000"
            className="sm:col-span-2"
          />
        </fieldset>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-black uppercase tracking-widest text-brand-silver/70">
            Project Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={9}
            className="bg-brand-dark4 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 resize-y transition-colors [color-scheme:dark]"
          />
          <p className="text-[10px] text-brand-silver/60">
            Pre-filled from your design — edit freely.
          </p>
        </div>

        {error && (
          <div className="flex items-start gap-2 p-3 rounded-lg bg-brand-red/10 border border-brand-red/30">
            <AlertCircle size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full px-6 py-4 rounded-full bg-brand-red text-white font-black text-sm uppercase tracking-wider hover:bg-brand-red-dark transition-colors disabled:opacity-50 shadow-glow-red"
        >
          {submitting ? 'Sending…' : 'Send my design + request quote'}
        </button>
      </form>
    </div>
  )
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-brand-silver/70 uppercase tracking-wider">{label}</span>
      <span className="text-white font-bold capitalize">{value}</span>
    </div>
  )
}

function PriceRow({
  qty,
  material,
  printLocations,
}: {
  qty: number
  material: 'Standard' | 'Tri-Blend' | 'Heavy Cotton'
  printLocations: PrintLocation[]
}) {
  const { each, total } = totals(qty, material, printLocations)
  return (
    <div className="pt-3 mt-1 border-t border-white/10">
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-black uppercase tracking-wider text-brand-silver/70">
          {total != null ? 'Estimated' : 'Bulk quote'}
        </span>
        <span className="text-2xl font-black text-white">
          {total != null ? `$${total}` : 'Custom'}
        </span>
      </div>
      {each != null && (
        <div className="text-[11px] text-brand-silver/70 text-right mt-0.5">
          ${each} each
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  className = '',
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  className?: string
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-black uppercase tracking-widest text-brand-silver/70">
        {label}{required && <span className="text-brand-red ml-1">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="bg-brand-dark4 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors"
      />
    </div>
  )
}
