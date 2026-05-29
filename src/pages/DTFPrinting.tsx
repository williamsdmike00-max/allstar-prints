import { CheckCircle, ArrowRight, Upload, Palette, Shield, Droplets, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import FAQAccordion from '../components/ui/FAQAccordion'
import SectionHeader from '../components/ui/SectionHeader'
import TrustBar from '../components/ui/TrustBar'

const benefits = [
  { icon: '🎨', title: 'Full Color, No Limits', desc: 'Print gradients, photos, and complex artwork without color count restrictions or setup fees.' },
  { icon: '🔢', title: 'No Minimum Order', desc: 'Order 1 or 100. DTF is perfect when you need a small quantity without paying for bulk.' },
  { icon: '⚡', title: 'Fast Turnaround', desc: 'DTF is one of the quickest methods we offer — most orders ready in 3–5 business days, with 48-hour rush available.' },
  { icon: '👕', title: 'Works on Any Color', desc: 'Light or dark fabric — DTF looks vivid and sharp regardless of the garment color.' },
  { icon: '🧺', title: 'Wash Durable', desc: 'Properly applied DTF transfers are wash-resistant and hold up through regular use.' },
  { icon: '📐', title: 'Gang Sheet Orders', desc: 'Submit multiple designs on a single sheet to maximize value on larger DTF transfer orders.' },
]

const useCases = [
  { label: 'One-off custom pieces', icon: '1️⃣' },
  { label: 'Sample orders before bulk', icon: '🔬' },
  { label: 'Complex multi-color logos', icon: '🌈' },
  { label: 'Photorealistic artwork', icon: '📷' },
  { label: 'Dark garment printing', icon: '🖤' },
  { label: 'Gang sheet transfers', icon: '📄' },
]

// Official Allstar Prints DTF transfer pricing.
// Tier is based on TOTAL order quantity, mix sizes freely.
// Source: Allstar Prints DTF Heat Transfers rate card (allstarprints2019@gmail.com).
const dtfPricing = [
  { qty: '1–9',   pocket: 4.00, infant: 4.75, toddler: 5.50, youth: 6.00, adult: 7.50, adultXxl: 10.00 },
  { qty: '10–19', pocket: 3.75, infant: 4.50, toddler: 5.25, youth: 5.75, adult: 7.25, adultXxl:  9.75 },
  { qty: '20–29', pocket: 3.25, infant: 4.00, toddler: 4.75, youth: 5.25, adult: 6.75, adultXxl:  9.25 },
  { qty: '30–49', pocket: 2.50, infant: 3.25, toddler: 4.00, youth: 4.50, adult: 6.00, adultXxl:  8.50 },
]

const dtfSizes = [
  { label: 'Pocket',     longest: '3.5"' },
  { label: 'Infant',     longest: '5"'   },
  { label: 'Toddler',    longest: '7"'   },
  { label: 'Youth',      longest: '8.5"' },
  { label: 'Adult S-XL', longest: '11.5"' },
  { label: 'Adult 2XL+', longest: '12-14"' },
]

const faqs = [
  {
    question: 'What is DTF printing?',
    answer: 'DTF (Direct-to-Film) printing is a process where your design is printed onto a special film, then heat-pressed onto the garment. It produces full-color, photo-quality prints with no minimum order requirement.',
  },
  {
    question: 'Is DTF printing durable?',
    answer: 'Yes. When applied correctly, DTF transfers are very durable. Wash cold, inside out, and avoid harsh dryers for the longest-lasting results.',
  },
  {
    question: 'What file types do you accept for DTF?',
    answer: 'We prefer PNG files with a transparent background at 300 DPI or higher. We also accept PDF, AI, and EPS formats. If you have a JPG or lower-res file, send it anyway — we\'ll let you know if it\'s usable or if we need to clean it up.',
  },
  {
    question: 'What is a gang sheet?',
    answer: 'A gang sheet is a large single sheet of film with multiple designs printed on it. If you have several different designs or need multiple sizes of the same design, combining them on one sheet reduces cost significantly.',
  },
  {
    question: 'Can I order just the transfers, not the garments?',
    answer: 'Yes. We sell DTF transfers on their own. You can supply your own garments or apply them yourself. Just let us know when placing your order.',
  },
  {
    question: 'What sizes can DTF prints be?',
    answer: 'We offer DTF prints from small 2-inch patches all the way up to full back prints. Standard sizes like left chest (3"–4") and full front (12"–14") are the most common.',
  },
]

// Quick-hit feature badges from the DTF rate card.
const features = [
  { icon: Palette,  title: 'Vibrant Colors',           sub: 'Full color prints' },
  { icon: Shield,   title: 'Durable & Stretchable',    sub: 'Built to last' },
  { icon: Droplets, title: 'Wash Safe',                sub: '100% polyester compatible' },
  { icon: Zap,      title: 'No Weeding. No Masking.',  sub: 'Just press & go!' },
]

// Press steps from the rate card — for customers applying transfers themselves.
const applicationSteps = [
  'Preheat the garment for 15 seconds to remove excess moisture. Let the garment cool before adding the transfer.',
  'Place the transfer on the shirt white side down, image facing up.',
  'Press at 325°F for 20 seconds under very firm pressure.',
  'Remove the garment from the press and let it stand until it is warm enough to peel. (Peel COLD)',
  'Cover the image with parchment paper and press again for 15 seconds. You can use a Teflon sheet, butcher paper, or Teflon pillow.',
  'If the image does not come off completely, repress with the image in place, let it cool, and re-peel the film.',
]

const careInstructions = [
  'Turn the garment inside out before washing.',
  'Machine wash cold.',
  'No bleach. No fabric softener.',
  'Do not dry clean or iron directly on the print.',
  'Tumble dry low.',
]

export default function DTFPrinting() {
  return (
    <>
      <SEO
        title="DTF Printing — Full Color Transfers, No Minimums"
        description="Direct-to-Film (DTF) printing with no minimum orders. Full-color, photo-quality transfers on any garment. Gang sheets available. Fast turnaround from Allstar Prints LLC."
        path="/dtf-printing"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-blue/10 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-navy/25 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">DTF Printing</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Full-Color Prints.<br />
              <span className="text-gradient-red">Zero Minimums.</span>
            </h1>
            <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-xl">
              Direct-to-Film printing gives you photographic-quality results on any garment, any color, any quantity. Every order is designed, color-matched, and quality-checked by Allstar before it ships. One piece or a hundred — the quality is always the same.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/upload-artwork"
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                <Upload size={16} /> Upload Artwork
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md transition-all hover:bg-white/5"
              >
                Get a Quote
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/dtf-closeup.jpg" alt="DTF full color print close-up on a shirt" className="aspect-[3/4] w-full rounded-xl object-cover" />
            <div className="flex flex-col gap-4 pt-6">
              <img src="/images/dtf-gangsheet.jpg" alt="DTF gang sheet with multiple designs" className="aspect-square w-full rounded-xl object-cover" />
              <img src="/images/dtf-dark-garment.jpg" alt="DTF print on dark garment" className="aspect-square w-full rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Feature badges — from the DTF rate card */}
      <section className="bg-brand-dark2 border-b border-white/8">
        <div className="container-xl section-padding py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-3 p-4 rounded-xl bg-brand-dark3 border border-white/8">
                <div className="w-10 h-10 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red flex-shrink-0">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-black text-white leading-tight">{title}</p>
                  <p className="text-[11px] text-brand-red font-semibold uppercase tracking-wide">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Why DTF"
          title="Why Choose"
          titleHighlight="DTF Printing?"
          subtitle="The most versatile printing method we offer — ideal for complex designs and flexible order sizes."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors flex flex-col gap-3">
              <span className="text-3xl">{b.icon}</span>
              <h3 className="text-sm font-bold text-white">{b.title}</h3>
              <p className="text-sm text-brand-silver leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Perfect For</p>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                When Is DTF the<br />
                <span className="text-gradient-red">Right Choice?</span>
              </h2>
              <p className="text-brand-silver leading-relaxed mb-8">
                DTF shines in situations where screen printing isn't cost-effective or technically possible. Here's when we recommend it.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {useCases.map((u) => (
                  <li key={u.label} className="flex items-center gap-3 p-3 rounded-lg bg-brand-dark3 border border-white/8">
                    <span className="text-xl">{u.icon}</span>
                    <span className="text-sm font-semibold text-white">{u.label}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-6 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-navy/10 border border-brand-red/20">
                <h3 className="text-base font-black text-white uppercase tracking-wide mb-3">Gang Sheet Orders</h3>
                <p className="text-sm text-brand-silver leading-relaxed mb-4">
                  Have multiple designs? Submit them together on a single gang sheet to maximize value. Great for businesses with rotating designs or shops that need multiple sizes of the same logo.
                </p>
                <ul className="flex flex-col gap-2">
                  {['Submit your artwork files', 'We optimize the sheet layout for you', 'You get all transfers at once', 'Apply to any garment yourself or ask us about application'].map((step) => (
                    <li key={step} className="flex items-center gap-2 text-sm text-brand-silver">
                      <CheckCircle size={13} className="text-brand-red flex-shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <img src="/images/dtf-gangsheet.jpg" alt="Example DTF gang sheet layout with multiple print designs" className="aspect-video w-full rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Transparent DTF Pricing */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Transparent Pricing"
          title="DTF Transfer"
          titleHighlight="Price Sheet"
          subtitle="Per-transfer pricing — the more you order, the less each transfer costs. Mix sizes freely; tier is based on total order quantity."
        />

        {/* Pricing matrix */}
        <div className="max-w-5xl mx-auto overflow-x-auto rounded-2xl border border-white/10 bg-brand-dark3">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-gradient-to-r from-brand-red/12 to-brand-navy/12 border-b border-white/10">
                <th className="text-left p-4 text-[10px] font-bold uppercase tracking-widest text-brand-silver">Order Qty</th>
                {dtfSizes.map((s) => (
                  <th key={s.label} className="p-4 text-[10px] font-bold uppercase tracking-widest text-brand-silver">
                    {s.label}<br />
                    <span className="text-[9px] font-normal normal-case tracking-normal opacity-55">{s.longest}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dtfPricing.map((row, idx) => (
                <tr
                  key={row.qty}
                  className={`border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors ${idx === dtfPricing.length - 1 ? 'bg-brand-red/[0.04]' : ''}`}
                >
                  <td className="p-4 font-black text-brand-red text-sm">{row.qty}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.pocket.toFixed(2)}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.infant.toFixed(2)}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.toddler.toFixed(2)}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.youth.toFixed(2)}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.adult.toFixed(2)}</td>
                  <td className="p-4 text-center text-white font-semibold">${row.adultXxl.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick notes */}
        <div className="max-w-5xl mx-auto mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-brand-dark3 border border-white/8 flex items-start gap-3">
            <CheckCircle size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
            <p className="text-sm text-brand-silver leading-relaxed">
              <strong className="text-white">Mix sizes freely.</strong> Tier is based on your <em>total</em> order quantity, not individual sizes.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-brand-dark3 border border-white/8 flex items-start gap-3">
            <CheckCircle size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
            <p className="text-sm text-brand-silver leading-relaxed">
              <strong className="text-white">No setup fees.</strong> Full-color, ready-to-press transfers — no minimums.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-brand-dark3 border border-white/8 flex items-start gap-3">
            <CheckCircle size={18} className="text-brand-red mt-0.5 flex-shrink-0" />
            <p className="text-sm text-brand-silver leading-relaxed">
              <strong className="text-white">50+ transfers?</strong> Contact us for custom volume pricing.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <Link
            to="/upload-artwork"
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
          >
            <Upload size={16} /> Upload Artwork & Get Started
          </Link>
        </div>
      </section>

      {/* Application + Care — from the DTF rate card */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <SectionHeader
            label="How To Apply"
            title="Application &"
            titleHighlight="Care Guide"
            subtitle="Ordering transfers to press yourself? Follow these steps for a clean, long-lasting result."
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Application steps */}
            <div className="lg:col-span-2 p-6 md:p-8 rounded-2xl bg-brand-dark3 border border-white/8">
              <h3 className="text-base font-black text-white uppercase tracking-wide mb-5">Application Instructions</h3>
              <ol className="flex flex-col gap-4">
                {applicationSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-brand-red text-white text-xs font-black flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-sm text-brand-silver leading-relaxed">{step}</p>
                  </li>
                ))}
              </ol>
              <p className="text-xs text-brand-silver/60 mt-5 italic">Press: 325°F · 20 seconds · firm pressure · peel cold.</p>
            </div>
            {/* Care card */}
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-red/10 to-brand-navy/10 border border-brand-red/20">
              <h3 className="text-base font-black text-white uppercase tracking-wide mb-5">Care Instructions</h3>
              <ul className="flex flex-col gap-3">
                {careInstructions.map((c) => (
                  <li key={c} className="flex items-start gap-2 text-sm text-brand-silver">
                    <CheckCircle size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Print? Upload Your Artwork Now."
        subtext="Send us your design and we'll get you a quote within hours. No minimums, no setup fees."
        primaryLabel="Upload Artwork"
        primaryHref="/upload-artwork"
        secondaryLabel="Request a Quote"
        secondaryHref="/pricing"
        icon="🎨"
      />

      {/* FAQ */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="FAQ"
          title="DTF Printing"
          titleHighlight="Questions"
          subtitle="Everything you need to know about our DTF printing service."
        />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
        <div className="text-center mt-8">
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide">
            More questions? Contact us <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
