import { useState } from 'react'
import { CheckCircle, ArrowRight, Info, Clock, Zap, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import TrustBar from '../components/ui/TrustBar'
import { submitForm } from '../lib/web3forms'
import SEO from '../components/ui/SEO'

// ─────────────────────────────────────────────
// Types & constants
// ─────────────────────────────────────────────

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  apparelType: string
  quantity: string
  sizes: string
  colors: string
  deadline: string
  artworkStatus: string
  notes: string
}

const initialForm: FormData = {
  firstName: '', lastName: '', email: '', phone: '',
  service: '', apparelType: '', quantity: '', sizes: '',
  colors: '', deadline: '', artworkStatus: '', notes: '',
}

const pricingTiers = [
  { range: '1–11', label: 'Small Run', note: 'DTF recommended', highlight: false },
  { range: '12–23', label: 'Starter', note: 'Screen print eligible', highlight: false },
  { range: '24–47', label: 'Standard', note: 'Best mid-range value', highlight: false },
  { range: '48–99', label: '🔥 Popular', note: 'Great bulk savings', highlight: true },
  { range: '100+', label: 'Volume', note: 'Best price per piece', highlight: false },
]

const included = [
  'Free digital mockup before production',
  'Free design cleanup on most files',
  'No hidden setup fees',
  'Bulk discounts automatically applied',
  'Rush orders available on request',
  '100% satisfaction guarantee',
]

// ─────────────────────────────────────────────
// Reusable field components
// ─────────────────────────────────────────────

interface FieldProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

function Field({ label, name, value, onChange, placeholder, type = 'text', required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">
        {label}{required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      <input
        id={name} name={name} type={type} value={value}
        onChange={onChange} placeholder={placeholder} required={required}
        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 transition-colors"
      />
    </div>
  )
}

interface SelectProps {
  label: string
  name: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  options: { value: string; label: string }[]
  required?: boolean
  placeholder?: string
}

function SelectField({ label, name, value, onChange, options, required, placeholder = 'Select an option...' }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">
        {label}{required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      <div className="relative">
        <select
          id={name} name={name} value={value}
          onChange={onChange} required={required}
          className="w-full bg-brand-dark4 border border-white/10 rounded-lg pl-4 pr-8 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 transition-colors appearance-none cursor-pointer"
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        {/* Custom chevron */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-silver/40">
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Step indicator
// ─────────────────────────────────────────────

function StepBadge({ num, label, active }: { num: number; label: string; active: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide transition-colors ${active ? 'text-white' : 'text-brand-silver/40'}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors ${active ? 'bg-brand-red text-white' : 'bg-white/8 text-brand-silver/40'}`}>
        {num}
      </div>
      {label}
    </div>
  )
}

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function Pricing() {
  const [form, setForm] = useState<FormData>(initialForm)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitForm({
        subject: 'New Quote Request — Allstar Prints',
        from_name: `${form.firstName} ${form.lastName}`,
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        service: form.service,
        apparel_type: form.apparelType,
        quantity: form.quantity,
        sizes: form.sizes,
        deadline: form.deadline,
        artwork_status: form.artworkStatus,
        notes: form.notes,
        source: window.location.href,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Webhook error:', err)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Get a Free Quote — Custom Apparel Pricing"
        description="Request a free custom apparel quote from Allstar Prints LLC. Get pricing, a free mockup, and a response within 2 hours. No commitment required."
        path="/pricing"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-red/7 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-xl section-padding">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Free Quote</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight">
                Get a Free Quote &<br />
                <span className="text-gradient-red">Free Mockup Today</span>
              </h1>
              <p className="text-brand-silver mt-3 max-w-lg leading-relaxed">
                Fill this out in under 2 minutes. We send back pricing and a digital proof — no commitment, no pressure.
              </p>
            </div>
            {/* Response time badge */}
            <div className="flex-shrink-0 flex items-center gap-3 bg-brand-dark3 border border-brand-red/20 rounded-xl px-5 py-3.5">
              <Clock size={20} className="text-brand-red flex-shrink-0" />
              <div>
                <p className="text-sm font-black text-white">We respond within 2 hours</p>
                <p className="text-xs text-brand-silver">During business hours, Mon–Sat</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <section className="section-padding py-14 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── LEFT SIDEBAR ── */}
          <div className="flex flex-col gap-5 lg:sticky lg:top-24 lg:self-start">

            {/* Urgency */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-brand-red/12 to-brand-red/5 border border-brand-red/25">
              <Zap size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white mb-0.5">48-Hour Rush Available</p>
                <p className="text-xs text-brand-silver">Have a tight deadline? Mention it in your request and we'll do everything we can to make it work.</p>
              </div>
            </div>

            {/* What's included */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-4">Every Quote Includes</h3>
              <ul className="flex flex-col gap-2.5">
                {included.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-brand-silver">
                    <CheckCircle size={13} className="text-brand-red flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Pricing tiers */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-xs font-black uppercase tracking-widest text-white mb-1">Volume Pricing</h3>
              <p className="text-xs text-brand-silver mb-4">More pieces = lower per-piece cost.</p>
              <div className="flex flex-col gap-2">
                {pricingTiers.map((tier) => (
                  <div
                    key={tier.range}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-colors ${
                      tier.highlight
                        ? 'bg-brand-red/10 border-brand-red/30 text-white'
                        : 'bg-brand-dark4 border-white/8 text-brand-silver'
                    }`}
                  >
                    <div>
                      <span className="font-bold">{tier.range} pcs</span>
                      <span className="text-xs ml-2 opacity-60">{tier.note}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wide px-2 py-0.5 rounded-full ${tier.highlight ? 'bg-brand-red/20 text-brand-red border border-brand-red/30' : 'border border-white/15'}`}>
                      {tier.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex items-start gap-2 mt-3 p-3 bg-brand-dark4 rounded-lg">
                <Info size={11} className="text-brand-silver/50 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-brand-silver/50 leading-relaxed">
                  Exact pricing depends on print method, garment type, and design complexity. Your quote will itemize everything.
                </p>
              </div>
            </div>

            {/* Testimonial snippet */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-brand-red" fill="currentColor" />)}
              </div>
              <p className="text-sm text-brand-silver italic leading-relaxed mb-3">
                "Got a quote in 90 minutes, mockup the same day, shirts in my hands by Friday. Insane turnaround."
              </p>
              <p className="text-xs font-bold text-white">James P. — Youth Football League</p>
            </div>

            {/* Alternative CTA */}
            <div className="p-4 rounded-xl bg-brand-navy/20 border border-brand-navy/40">
              <h4 className="text-sm font-bold text-white mb-1.5">Already Have Artwork?</h4>
              <p className="text-sm text-brand-silver mb-3 leading-relaxed">Skip the form — upload your file directly and we'll build a quote around it.</p>
              <Link to="/upload-artwork" className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-white transition-colors uppercase tracking-wide">
                Upload Design <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* ── QUOTE FORM ── */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="min-h-[560px] flex flex-col items-center justify-center text-center p-12 rounded-2xl bg-brand-dark3 border border-brand-red/25">
                <div className="w-16 h-16 rounded-full bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red text-3xl mb-6 shadow-glow-red">
                  ✓
                </div>
                <h2 className="text-2xl font-black text-white mb-3">Quote Request Received!</h2>
                <p className="text-brand-silver leading-relaxed max-w-md mb-2">
                  We've got your request and will respond with pricing and a free mockup — usually within 2 hours during business hours.
                </p>
                <p className="text-xs text-brand-silver/50 mb-8">Check your email, including spam, just in case.</p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialForm) }}
                  className="text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-brand-dark3 border border-white/8 rounded-2xl overflow-hidden"
              >
                {/* Form header */}
                <div className="bg-gradient-to-r from-brand-navy/60 to-brand-dark3 border-b border-white/8 px-7 py-5">
                  <h2 className="text-lg font-black text-white mb-0.5">Request a Free Quote</h2>
                  <p className="text-sm text-brand-silver">2 minutes to fill out. Free quote back within hours.</p>
                  {/* Step indicators */}
                  <div className="flex items-center gap-5 mt-4">
                    <StepBadge num={1} label="Your Info" active />
                    <div className="h-px flex-1 bg-white/10" />
                    <StepBadge num={2} label="Order Details" active />
                    <div className="h-px flex-1 bg-white/10" />
                    <StepBadge num={3} label="Artwork" active />
                  </div>
                </div>

                <div className="p-7 flex flex-col gap-7">

                  {/* Step 1: Contact info */}
                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-black uppercase tracking-widest text-brand-silver/50 flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-white text-[9px] font-black">1</span>
                      Contact Info
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="First Name" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First name" required />
                      <Field label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last name" required />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" required />
                      <Field label="Phone (optional)" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" />
                    </div>
                  </fieldset>

                  <div className="h-px bg-white/6" />

                  {/* Step 2: Order details */}
                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-black uppercase tracking-widest text-brand-silver/50 flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-white text-[9px] font-black">2</span>
                      Order Details
                    </legend>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectField
                        label="Service Needed"
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        placeholder="What type of printing?"
                        options={[
                          { value: 'Screen Printing', label: 'Screen Printing' },
                          { value: 'DTF Printing', label: 'DTF / Direct-to-Film Printing' },
                          { value: 'Heat Transfer Vinyl', label: 'Heat Transfer Vinyl (Names & Numbers)' },
                          { value: 'Not Sure', label: "Not Sure — Help Me Choose" },
                        ]}
                      />
                      <SelectField
                        label="Apparel Type"
                        name="apparelType"
                        value={form.apparelType}
                        onChange={handleChange}
                        required
                        placeholder="What are we printing on?"
                        options={[
                          { value: 'T-Shirts', label: 'T-Shirts' },
                          { value: 'Hoodies', label: 'Hoodies / Sweatshirts' },
                          { value: 'Sports Jerseys', label: 'Sports Jerseys / Athletic Wear' },
                          { value: 'Polos', label: 'Polos / Business Shirts' },
                          { value: 'Hats', label: 'Hats / Caps' },
                          { value: 'Bags', label: 'Bags & Accessories' },
                          { value: 'Mixed', label: 'Mixed / Multiple Types' },
                          { value: 'Not Sure', label: "Not Sure Yet" },
                        ]}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <SelectField
                        label="Quantity Needed"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleChange}
                        required
                        placeholder="Approximate quantity?"
                        options={[
                          { value: '1-11', label: '1–11 pieces (small run)' },
                          { value: '12-23', label: '12–23 pieces' },
                          { value: '24-47', label: '24–47 pieces' },
                          { value: '48-99', label: '48–99 pieces (popular)' },
                          { value: '100-249', label: '100–249 pieces' },
                          { value: '250+', label: '250+ pieces (volume)' },
                          { value: 'Not Sure', label: "Not sure yet" },
                        ]}
                      />
                      <SelectField
                        label="When Do You Need It?"
                        name="deadline"
                        value={form.deadline}
                        onChange={handleChange}
                        placeholder="What's your deadline?"
                        options={[
                          { value: 'ASAP', label: '⚡ ASAP — Rush order (48 hrs)' },
                          { value: '1 week', label: 'Within 1 week' },
                          { value: '2 weeks', label: 'Within 2 weeks' },
                          { value: '1 month', label: 'Within a month' },
                          { value: 'Flexible', label: "Flexible — no rush" },
                        ]}
                      />
                    </div>
                    <Field
                      label="Sizes & Colors (optional)"
                      name="sizes"
                      value={form.sizes}
                      onChange={handleChange}
                      placeholder="e.g. S×5, M×10, L×8, XL×5 — Black shirts, white ink"
                    />
                  </fieldset>

                  <div className="h-px bg-white/6" />

                  {/* Step 3: Artwork */}
                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-xs font-black uppercase tracking-widest text-brand-silver/50 flex items-center gap-2 mb-1">
                      <span className="w-4 h-4 rounded-full bg-brand-red flex items-center justify-center text-white text-[9px] font-black">3</span>
                      Your Artwork
                    </legend>
                    <SelectField
                      label="What's Your Artwork Status?"
                      name="artworkStatus"
                      value={form.artworkStatus}
                      onChange={handleChange}
                      placeholder="Where are you with the design?"
                      options={[
                        { value: 'Print ready', label: '✅ I have print-ready artwork (AI / PDF / PNG)' },
                        { value: 'Logo cleanup', label: '🔧 I have a logo but it needs cleanup' },
                        { value: 'Rough idea', label: '💡 I have a rough idea — need design help' },
                        { value: 'From scratch', label: '🎨 I need a design created from scratch' },
                      ]}
                    />
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">
                        Project Notes <span className="normal-case text-brand-silver/35 font-normal">(optional but helpful)</span>
                      </label>
                      <textarea
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        rows={3}
                        placeholder="Team name, event details, print colors, special requests — anything that helps us quote accurately..."
                        className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 resize-none transition-colors"
                      />
                    </div>
                  </fieldset>

                  {/* Submit */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-black uppercase tracking-wide text-sm py-4 rounded-xl shadow-glow-red transition-all hover:-translate-y-px flex items-center justify-center gap-2.5 text-base"
                    >
                      {submitting
                        ? 'Sending Your Request...'
                        : <><Zap size={16} /> Get My Free Quote &amp; Mockup <ArrowRight size={16} /></>
                      }
                    </button>
                    {/* Response promise */}
                    <div className="flex items-center justify-center gap-2 text-xs text-brand-silver/50">
                      <Clock size={11} />
                      <span>We typically respond within 2 hours · No spam · No commitment required</span>
                    </div>
                  </div>

                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
