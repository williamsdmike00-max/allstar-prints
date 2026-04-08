import { ArrowRight, Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import SectionHeader from '../components/ui/SectionHeader'
import SEO from '../components/ui/SEO'

const contactInfo = [
  { icon: <Phone size={18} />, label: 'Phone / Text', value: 'Call or text for fast answers', sub: 'Fastest way to reach us' },
  { icon: <Mail size={18} />, label: 'Email', value: 'info@allstarprints.com', sub: 'We reply within a few hours' },
  { icon: <MapPin size={18} />, label: 'Location', value: 'Serving our local community', sub: 'Local pickup available' },
  { icon: <Clock size={18} />, label: 'Hours', value: 'Mon–Fri 9am–6pm', sub: 'Sat 10am–3pm | Closed Sun' },
]

const reasons = [
  { icon: '💬', label: 'Ask about an order' },
  { icon: '🎨', label: 'Design help' },
  { icon: '📦', label: 'Rush order availability' },
  { icon: '💰', label: 'Volume pricing' },
  { icon: '🤝', label: 'Partnership inquiries' },
  { icon: '❓', label: 'General questions' },
]

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Us — Get in Touch With Allstar Prints"
        description="Have a question or want to start an order? Contact Allstar Prints LLC by phone, email, or form. We respond fast — usually within a few hours."
        path="/contact"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-navy/20 blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Contact Us</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            We're Real People.<br />
            <span className="text-gradient-red">Let's Talk.</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed max-w-xl mx-auto">
            Have a question, need a quote, or just want to talk through your project? Reach out and we'll get back to you fast — no runaround, no auto-replies.
          </p>
        </div>
      </section>

      <section className="section-padding py-16 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact info sidebar */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4 p-4 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/20 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-brand-red flex-shrink-0 mt-0.5">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-silver/60 mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-white">{item.value}</p>
                    <p className="text-xs text-brand-silver">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-3">We Can Help With</h3>
              <div className="grid grid-cols-2 gap-2">
                {reasons.map((r) => (
                  <div key={r.label} className="flex items-center gap-2 p-2.5 rounded-lg bg-brand-dark4 border border-white/8">
                    <span className="text-base">{r.icon}</span>
                    <span className="text-xs font-semibold text-brand-silver">{r.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-red/10 to-brand-dark3 border border-brand-red/20">
              <div className="flex items-start gap-3">
                <MessageSquare size={18} className="text-brand-red flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1.5">Want a Quote Instead?</h4>
                  <p className="text-sm text-brand-silver mb-3 leading-relaxed">
                    If you're ready to start an order, use our quote form for faster pricing and a free mockup.
                  </p>
                  <a href="/pricing" className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide">
                    Go to Quote Form <ArrowRight size={11} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GHL Embed Form */}
          <div className="lg:col-span-3">
            <div className="bg-brand-dark3 border border-white/8 rounded-xl p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-black text-white mb-1">Get a Quote</h2>
                <p className="text-sm text-brand-silver">Fill out the form below and we'll get back to you quickly with pricing and a free mockup.</p>
              </div>
              <div style={{ width: '100%', maxWidth: '700px', margin: '0 auto' }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/LV2t1FEF3CZLOqzqHIjj"
                  style={{ width: '100%', height: '1000px', border: 'none', borderRadius: '8px' }}
                  id="inline-LV2t1FEF3CZLOqzqHIjj"
                  data-layout="{'id':'INLINE'}"
                  data-form-id="LV2t1FEF3CZLOqzqHIjj"
                  title="Get a Quote - Allstar Prints"
                />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Service area */}
      <section className="bg-brand-dark2 border-t border-white/8 py-14">
        <div className="container-xl section-padding text-center">
          <SectionHeader
            label="Where We Serve"
            title="Local First,"
            titleHighlight="Shipping Available"
            subtitle="We're rooted in our local community but can ship orders anywhere. Ask us about your area."
          />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {[
              { icon: '🏠', label: 'Local Pickup', desc: 'Pick up your finished order directly from us.' },
              { icon: '🚚', label: 'Local Delivery', desc: 'We can deliver nearby for larger orders.' },
              { icon: '📦', label: 'Nationwide Shipping', desc: "We ship to you wherever you are." },
            ].map((item) => (
              <div key={item.label} className="p-5 rounded-xl bg-brand-dark3 border border-white/8 text-center">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-white mb-1">{item.label}</h3>
                <p className="text-sm text-brand-silver">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
