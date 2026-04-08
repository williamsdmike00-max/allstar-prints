import { ArrowRight, Package, Layers, Eye, Printer, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import SectionHeader from '../components/ui/SectionHeader'
import TrustBar from '../components/ui/TrustBar'

const steps = [
  {
    num: '01',
    icon: <Package size={32} />,
    title: 'Choose Your Product',
    desc: "Browse our services and pick the garment type that fits your project — t-shirts, hoodies, hats, jerseys, or anything else we carry. Not sure what you need? Just describe your vision and we'll guide you to the right option.",
    details: ['Custom T-Shirts', 'Hoodies & Sweatshirts', 'Sports Jerseys', 'Hats & Accessories', 'Business Uniforms'],
  },
  {
    num: '02',
    icon: <Layers size={32} />,
    title: 'Submit or Build Your Design',
    desc: 'Upload your own artwork through our secure file upload portal, or tell us what you have in mind and our team will help create something from scratch. We accept all major file formats and offer free design assistance.',
    details: ['Upload PNG, AI, PDF, SVG, EPS', 'Describe your idea in words', 'Send a reference image', 'We clean up low-res files when possible', 'Free design help with every order'],
  },
  {
    num: '03',
    icon: <Eye size={32} />,
    title: 'Review Your Free Mockup',
    desc: "Before we print a single item, we send you a digital proof showing exactly how your design looks on the garment. Colors, placement, sizing — it's all there. You approve, request changes, or we start over. No charge, no commitment.",
    details: ['Digital proof sent within 24 hours', 'See exact placement and sizing', 'Request unlimited revisions', 'Approve with confidence', 'No printing until you say go'],
  },
  {
    num: '04',
    icon: <Printer size={32} />,
    title: 'We Print Your Order',
    desc: "Once you approve the mockup, we get to work. Your order is printed using the right method for your design and quantity — screen printing, DTF, embroidery, or HTV. We use top-quality materials every time.",
    details: ['Production starts same day as approval', 'Premium garments and inks', 'Quality checked before packing', 'Standard: 5–7 business days', 'Rush: 48 hours available'],
  },
  {
    num: '05',
    icon: <Truck size={32} />,
    title: 'Pickup or Delivery',
    desc: "Your finished order is ready for local pickup or can be shipped directly to you. We'll notify you as soon as it's ready. Open boxes, inspect your order, and if anything isn't right — we make it right.",
    details: ['Local pickup available', 'Shipping to your door', 'Order notification when ready', '100% satisfaction guarantee', 'We fix any issues, period'],
  },
]

const whyEasy = [
  { icon: '⚡', title: 'Fast response times', desc: 'We respond to quotes and questions within hours, not days.' },
  { icon: '🎨', title: 'Free design help', desc: 'You don\'t need a professional file. We help turn your idea into artwork.' },
  { icon: '👁️', title: 'Free mockup every time', desc: 'See your design before paying. No blind orders.' },
  { icon: '🤝', title: 'Real people behind every order', desc: 'You\'re talking to us directly — not a ticket system or chatbot.' },
]

export default function HowItWorks() {
  return (
    <>
      <SEO
        title="How It Works — Simple 5-Step Ordering Process"
        description="Ordering custom apparel from Allstar Prints is simple. Choose your product, submit your design, approve a free mockup, we print it, and you pick it up. See the full process."
        path="/how-it-works"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-24 md:py-28">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-navy/20 blur-3xl translate-x-1/3 -translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">The Process</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Ordering Custom Apparel<br />
            <span className="text-gradient-red">Has Never Been Easier</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            From idea to finished product in five clear steps. No confusion, no surprises, no stress. We handle the hard parts so you can focus on wearing your gear.
          </p>
          <Link
            to="/pricing"
            className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
          >
            Start Your Order <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <TrustBar />

      {/* Steps */}
      <section className="section-padding py-20 container-xl mx-auto">
        <div className="flex flex-col gap-0">
          {steps.map((step, i) => (
            <div key={step.num} className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14 ${i < steps.length - 1 ? 'border-b border-white/8' : ''}`}>
              {/* Text — alternate sides */}
              <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-brand-dark3 border-2 border-brand-red flex items-center justify-center text-brand-red shadow-glow-red flex-shrink-0">
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-brand-red/15 leading-none select-none">{step.num}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-4">{step.title}</h2>
                <p className="text-brand-silver leading-relaxed mb-6">{step.desc}</p>
                <ul className="flex flex-col gap-2">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-center gap-2.5 text-sm text-brand-silver">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Visual */}
              <div className={`${i % 2 === 1 ? 'lg:order-1' : ''} rounded-2xl overflow-hidden bg-gradient-to-br from-brand-dark3 to-brand-dark4 border border-white/8 flex items-center justify-center py-16 px-10`}>
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-brand-red/10 border border-brand-red/25 flex items-center justify-center text-brand-red mx-auto mb-4 shadow-glow-red">
                    {step.icon}
                  </div>
                  <p className="text-2xl font-black text-brand-red/20 uppercase tracking-widest">Step {step.num}</p>
                  <p className="text-lg font-bold text-white/40 mt-1">{step.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Easy */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <SectionHeader
            label="Why It's Simple"
            title="We Built This Process"
            titleHighlight="For You"
            subtitle="We've streamlined every step to make sure ordering custom apparel is stress-free from start to finish."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {whyEasy.map((item) => (
              <div key={item.title} className="text-center p-6 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-brand-silver leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Ready to Place Your Order?"
        subtext="The first step is a free quote. Takes less than 2 minutes to fill out and we'll respond fast."
        primaryLabel="Get a Free Quote"
        primaryHref="/pricing"
        secondaryLabel="Upload Artwork"
        secondaryHref="/upload-artwork"
        icon="🚀"
      />
    </>
  )
}
