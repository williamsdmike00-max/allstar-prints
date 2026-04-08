import { CheckCircle, ArrowRight, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import FAQAccordion from '../components/ui/FAQAccordion'
import SectionHeader from '../components/ui/SectionHeader'
import TrustBar from '../components/ui/TrustBar'

const benefits = [
  { icon: '🎨', title: 'Full Color, No Limits', desc: 'Print gradients, photos, and complex artwork without color count restrictions or setup fees.' },
  { icon: '🔢', title: 'No Minimum Order', desc: 'Order 1 or 100. DTF is perfect when you need a small quantity without paying for bulk.' },
  { icon: '⚡', title: 'Fast Production', desc: 'DTF transfers print fast, making it one of our quickest turnaround methods.' },
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
    answer: 'We can produce DTF prints from small 2-inch patches all the way up to full back prints. Standard sizes like left chest (3"–4") and full front (12"–14") are the most common.',
  },
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
              Direct-to-Film printing gives you photographic-quality results on any garment, any color, any quantity. One piece or a hundred — the quality is always the same.
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
                  {['Submit your artwork files', 'We arrange them on the sheet', 'You get all transfers at once', 'Apply to any garment yourself or let us handle it'].map((step) => (
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
