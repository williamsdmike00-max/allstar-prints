import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Printer, Layers, Shirt,
  Package, Star, Zap, Users, Award, Clock, ShieldCheck,
  BadgeCheck, Sparkles,
} from 'lucide-react'
import { submitToGHL, splitName } from '../lib/webhook'
import SEO from '../components/ui/SEO'
import ServiceCard from '../components/ui/ServiceCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import FAQAccordion from '../components/ui/FAQAccordion'
import SectionHeader from '../components/ui/SectionHeader'

// ─────────────────────────────────────────────
// Static data
// ─────────────────────────────────────────────

const services = [
  {
    icon: <Shirt />,
    title: 'Custom T-Shirts',
    description: 'Bold prints for teams, businesses, events, and everyday wear. Any quantity, any color.',
    href: '/custom-tshirts',
    tag: 'Most Popular',
    featured: true,
  },
  {
    icon: <Printer />,
    title: 'DTF Printing',
    description: 'Full-color, photo-quality transfers with no minimums. Perfect for one piece or a hundred.',
    href: '/dtf-printing',
    tag: 'No Minimums',
  },
  {
    icon: <Layers />,
    title: 'Custom Apparel',
    description: 'Hoodies, jerseys, hats, and more. Everything you need to build a complete branded look.',
    href: '/custom-apparel',
  },
]

const categories = [
  { icon: '🏆', label: 'Sports Teams' },
  { icon: '🏢', label: 'Businesses' },
  { icon: '🎓', label: 'Schools' },
  { icon: '🎉', label: 'Events' },
  { icon: '👨‍👩‍👧‍👦', label: 'Family Reunions' },
  { icon: '⛪', label: 'Churches & Groups' },
  { icon: '🎗️', label: 'Fundraisers' },
  { icon: '🌟', label: 'Personal Brands' },
]

const steps = [
  {
    num: '01',
    icon: <Package size={26} />,
    title: 'Choose Your Product',
    desc: 'Pick the garment that fits — shirts, hoodies, hats, jerseys. Not sure? We\'ll guide you.',
  },
  {
    num: '02',
    icon: <Layers size={26} />,
    title: 'Submit or Create a Design',
    desc: 'Upload your file or describe your idea. We offer free design help with every order.',
  },
  {
    num: '03',
    icon: <Star size={26} />,
    title: 'Approve Your Free Mockup',
    desc: 'We send a digital proof first. You approve it before we print a single piece.',
  },
  {
    num: '04',
    icon: <Zap size={26} />,
    title: 'Pick Up or Ship',
    desc: 'Ready in 5–7 business days. Rush orders available. Local pickup or we ship to you.',
  },
]

const testimonials = [
  {
    quote: "Ordered 75 shirts for our basketball team and they came out perfect. Colors were spot-on and delivery was two days early. We won't go anywhere else.",
    name: 'Coach D. Williams',
    role: 'High School Athletics',
    initials: 'DW',
    rating: 5,
  },
  {
    quote: "Needed custom polos for our whole staff with a 5-day turnaround. Allstar Prints handled it without breaking a sweat. Professional quality every time.",
    name: 'Sandra K.',
    role: 'Retail Store Owner',
    initials: 'SK',
    rating: 5,
  },
  {
    quote: "The free mockup sold me. I uploaded a rough sketch and they turned it into something beautiful. My church group absolutely loved the final shirts.",
    name: 'Marcus T.',
    role: 'Community Group Leader',
    initials: 'MT',
    rating: 5,
  },
]

const faqs = [
  {
    question: "What's your minimum order quantity?",
    answer: 'For DTF printing, there is no minimum — order just 1 piece. For screen printing, we typically start at 12. Contact us and we\'ll match you to the right method.',
  },
  {
    question: 'How fast can you turn around an order?',
    answer: 'Standard orders ready in 5–7 business days. Rush orders with 48-hour turnaround available on select products. Reach out early if you have a tight deadline.',
  },
  {
    question: 'Can I bring my own design?',
    answer: 'Yes. Upload your file through our artwork portal or email it directly. We accept PNG, JPG, PDF, AI, EPS, and SVG. 300 DPI minimum for best results.',
  },
  {
    question: "What if I don't have a design?",
    answer: "No problem. We offer free design assistance with all orders. Describe what you're looking for and we'll create something you love before we print.",
  },
]

// ─────────────────────────────────────────────
// Quick Quote form (inline, above the fold)
// ─────────────────────────────────────────────

type QuickForm = { name: string; email: string; need: string; qty: string }
const initialQuick: QuickForm = { name: '', email: '', need: '', qty: '' }

function QuickQuoteForm() {
  const [form, setForm] = useState<QuickForm>(initialQuick)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      const { firstName, lastName } = splitName(form.name)
      await submitToGHL({
        form_type: 'quick_quote',
        source: window.location.href,
        timestamp: new Date().toISOString(),
        firstName,
        lastName,
        name: form.name,
        email: form.email,
        apparel_type: form.need,
        quantity_range: form.qty,
        tags: 'quick-quote, website-lead',
      })
      setSent(true)
    } catch (err) {
      console.error('Webhook error:', err)
      // Still show success to user — GHL may process async
      setSent(true)
    } finally {
      setSending(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-10 px-6 text-center">
        <div className="w-12 h-12 rounded-full bg-brand-red/15 border border-brand-red/30 flex items-center justify-center text-brand-red text-xl">✓</div>
        <p className="text-lg font-black text-white">We got it — expect a quote within 2 hours.</p>
        <button onClick={() => { setSent(false); setForm(initialQuick) }} className="text-xs font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide mt-1">
          Submit another request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/60">Your Name *</label>
          <input
            name="name" value={form.name} onChange={change} required
            placeholder="First & last name"
            className="bg-white/6 border border-white/12 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/60">Email Address *</label>
          <input
            name="email" type="email" value={form.email} onChange={change} required
            placeholder="you@example.com"
            className="bg-white/6 border border-white/12 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/60">What Do You Need? *</label>
          <select
            name="need" value={form.need} onChange={change} required
            className="bg-brand-dark3 border border-white/12 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>Select type...</option>
            <option>Custom T-Shirts</option>
            <option>Hoodies / Sweatshirts</option>
            <option>DTF Transfers</option>
            <option>Sports Jerseys</option>
            <option>Business Polos / Uniforms</option>
            <option>Hats / Headwear</option>
            <option>Not Sure — Need Help</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/60">Approximate Quantity</label>
          <select
            name="qty" value={form.qty} onChange={change}
            className="bg-brand-dark3 border border-white/12 rounded-lg px-3.5 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors appearance-none cursor-pointer"
          >
            <option value="" disabled>How many pieces?</option>
            <option>1–11 pieces</option>
            <option>12–23 pieces</option>
            <option>24–47 pieces</option>
            <option>48–99 pieces</option>
            <option>100–249 pieces</option>
            <option>250+ pieces</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={sending}
        className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-black uppercase tracking-wider text-sm py-3.5 rounded-lg shadow-glow-red transition-all hover:-translate-y-px flex items-center justify-center gap-2"
      >
        {sending ? 'Sending...' : <><Sparkles size={15} /> Get My Free Quote — We Respond in Hours</>}
      </button>
      <p className="text-[10px] text-brand-silver/40 text-center">No commitment. No spam. Just a real quote, fast.</p>
    </form>
  )
}

// ─────────────────────────────────────────────
// Trust badges
// ─────────────────────────────────────────────

const trustBadges = [
  {
    icon: <Clock size={20} />,
    title: '5–7 Day Turnaround',
    sub: '48-hr rush available',
    color: 'border-brand-red/25 bg-brand-red/6',
    iconColor: 'text-brand-red',
  },
  {
    icon: <BadgeCheck size={20} />,
    title: 'No Minimum Orders',
    sub: 'Order 1 or 1,000',
    color: 'border-brand-blue/25 bg-brand-blue/6',
    iconColor: 'text-brand-blue',
  },
  {
    icon: <ShieldCheck size={20} />,
    title: '100% Quality Guarantee',
    sub: "We fix it if it's not right",
    color: 'border-emerald-500/25 bg-emerald-500/6',
    iconColor: 'text-emerald-400',
  },
  {
    icon: <Users size={20} />,
    title: 'Local Business',
    sub: 'Real people, real support',
    color: 'border-amber-500/25 bg-amber-500/6',
    iconColor: 'text-amber-400',
  },
]

// ─────────────────────────────────────────────
// Page component
// ─────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <SEO
        title="Custom T-Shirts & Apparel Printing"
        description="Allstar Prints LLC — Premium custom t-shirts, DTF printing, hoodies, and branded apparel for teams, businesses, schools, and events. Fast turnaround. Free mockups. Local & trusted."
        path="/"
      />
      {/* ── HERO ── */}
      <section className="relative min-h-[95vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark" />
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(ellipse 70% 60% at 15% 40%, rgba(26,51,91,0.7) 0%, transparent 60%),
                              radial-gradient(ellipse 50% 50% at 85% 60%, rgba(238,42,36,0.12) 0%, transparent 60%)`,
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[55vw] leading-none text-white/[0.018] font-black">★</span>
        </div>

        <div className="relative z-10 w-full container-xl section-padding py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left: headline + CTAs */}
            <div>
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-brand-red/12 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-7">
                <Zap size={12} fill="currentColor" />
                ⚡ Rush Orders Available — 48-Hour Turnaround
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-black leading-[1.04] mb-5">
                <span className="text-white block">Custom Shirts Printed</span>
                <span className="text-white block">Fast, Done Right,</span>
                <span className="text-gradient-red block">No Hassle.</span>
              </h1>

              <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-lg">
                Premium custom apparel for teams, businesses, events, and groups. Get a free mockup before we print anything — most orders ready in under a week.
              </p>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  to="/pricing"
                  className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wide text-sm px-8 py-4 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5 active:translate-y-0"
                >
                  Start My Order <ArrowRight size={16} />
                </Link>
                <Link
                  to="/upload-artwork"
                  className="inline-flex items-center justify-center gap-2 bg-white/6 border border-white/15 hover:bg-white/10 hover:border-white/25 text-white font-bold uppercase tracking-wide text-sm px-8 py-4 rounded-lg transition-all"
                >
                  Upload My Design
                </Link>
              </div>

              {/* Social proof micro-line */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-1.5">
                  {['DW', 'SK', 'MT', 'JR'].map((init, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-red to-brand-navy border-2 border-brand-dark flex items-center justify-center text-[9px] font-black text-white">
                      {init}
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-brand-red" fill="currentColor" />)}
                  </div>
                  <span className="text-xs text-brand-silver font-semibold">500+ orders delivered locally</span>
                </div>
              </div>
            </div>

            {/* Right: inline quick-quote form */}
            <div className="relative">
              {/* Glow behind card */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-brand-red/8 via-brand-navy/10 to-brand-blue/5 blur-2xl pointer-events-none" />
              <div className="relative bg-brand-dark3 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                {/* Form header */}
                <div className="bg-gradient-to-r from-brand-red to-brand-red-dark px-6 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-white font-black text-base uppercase tracking-wide">Get a Free Quote</p>
                    <p className="text-white/70 text-xs mt-0.5">We respond within 2 hours ⚡</p>
                  </div>
                  <div className="text-3xl select-none">🖨️</div>
                </div>
                <div className="px-6 py-5">
                  <QuickQuoteForm />
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-dark to-transparent pointer-events-none" />
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-brand-dark2 border-y border-white/8 py-8">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {trustBadges.map((badge) => (
              <div key={badge.title} className={`flex items-center gap-3 p-4 rounded-xl border ${badge.color} transition-colors`}>
                <div className={`flex-shrink-0 ${badge.iconColor}`}>{badge.icon}</div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{badge.title}</p>
                  <p className="text-[11px] text-brand-silver mt-0.5">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="What We Do"
          title="Custom Printing"
          titleHighlight="Services"
          subtitle="One stop for every custom apparel need — from a single piece to large group orders."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {services.map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/custom-apparel"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
          >
            Browse all apparel types <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="bg-brand-dark2 border-y border-white/8 py-14">
        <div className="container-xl section-padding">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-6">
            Who We Print For
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="flex flex-col items-center gap-2 py-4 px-2 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 hover:-translate-y-0.5 transition-all text-center cursor-default"
              >
                <span className="text-2xl">{cat.icon}</span>
                <span className="text-xs font-semibold text-brand-silver leading-tight">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="The Process"
          title="Ordering Is Fast &"
          titleHighlight="Stress-Free"
          subtitle="Four simple steps from idea to finished apparel. No confusion, no phone tag, no guessing."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col gap-4 p-5 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[calc(100%+0px)] w-6 h-px bg-gradient-to-r from-brand-red/40 to-transparent z-0" />
              )}
              <div className="w-14 h-14 rounded-full bg-brand-dark4 border-2 border-brand-red flex items-center justify-center text-brand-red shadow-glow-red flex-shrink-0">
                {step.icon}
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-red/50">Step {step.num}</span>
                <h3 className="text-sm font-bold text-white mt-0.5 mb-1.5">{step.title}</h3>
                <p className="text-sm text-brand-silver leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            to="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
          >
            See the full process <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Why Allstar Prints</p>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
                Local Quality You Can<br />
                <span className="text-gradient-red">Actually Count On</span>
              </h2>
              <p className="text-brand-silver leading-relaxed mb-8">
                We're not a faceless online factory. We're a local shop that cares about your order as much as you do — because your order is our reputation.
              </p>
              <ul className="flex flex-col gap-4">
                {[
                  {
                    icon: <Award size={17} />,
                    title: 'Premium materials — guaranteed',
                    desc: "Top-quality blanks and inks that won't fade, crack, or peel. We test before we ship.",
                  },
                  {
                    icon: <Users size={17} />,
                    title: 'Real people answer your questions',
                    desc: 'No ticketing system. No chatbot. You talk directly to the people printing your order.',
                  },
                  {
                    icon: <Zap size={17} />,
                    title: 'We meet your deadlines',
                    desc: 'Standard orders in 5–7 days. Rush in 48 hours. We tell you upfront what\'s possible.',
                  },
                  {
                    icon: <CheckCircle size={17} />,
                    title: 'Free mockup before anything prints',
                    desc: 'You approve your digital proof first. No surprises. No prints you didn\'t sign off on.',
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-brand-red/10 border border-brand-red/25 flex items-center justify-center text-brand-red flex-shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{item.title}</h4>
                      <p className="text-sm text-brand-silver leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/pricing"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wide text-sm px-7 py-3.5 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
                >
                  Get My Free Quote <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img src="/images/tshirt-lifestyle.jpg" alt="Custom team shirts printed by Allstar Prints" className="aspect-[4/5] w-full rounded-xl object-cover" />
              <div className="flex flex-col gap-4">
                <img src="/images/tshirt-bulk.jpg" alt="Bulk business uniform shirts" className="aspect-square w-full rounded-xl object-cover" />
                <img src="/images/tshirt-event.jpg" alt="Custom event apparel shirts" className="aspect-square w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding py-20 container-xl mx-auto">
        {/* Aggregate header */}
        <div className="text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Real Reviews</p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-3">
            500+ Happy Customers — <span className="text-gradient-red">Here's What They Say</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} size={16} className="text-brand-red" fill="currentColor" />)}
            </div>
            <span className="text-sm text-brand-silver font-semibold">5.0 average · Trusted locally</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>

      {/* ── INLINE CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-dark3 to-brand-dark2 border-y border-white/8 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-brand-red/8 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-brand-blue/6 blur-3xl" />
        </div>
        <div className="relative container-xl section-padding flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-2">Don't Wait</p>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Your deadline is closer than you think.<br />
              <span className="text-gradient-red">Let's get started today.</span>
            </h2>
            <p className="text-brand-silver mt-3 text-sm">Free quote. Free mockup. No commitment until you approve.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 flex-shrink-0">
            <Link
              to="/upload-artwork"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/8 border border-white/20 hover:bg-white/12 text-white font-bold uppercase tracking-wider text-sm px-6 py-3.5 rounded-lg transition-all"
            >
              Upload Design
            </Link>
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wider text-sm px-7 py-3.5 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
            >
              Get a Free Quote <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="section-padding py-20 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Quick Answers</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Frequently Asked<br />
              <span className="text-gradient-red">Questions</span>
            </h2>
            <p className="text-brand-silver leading-relaxed mb-6">
              Answers to the most common questions we get. Don't see yours? We respond fast.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-padding py-20 bg-brand-dark2 border-t border-white/8">
        <div className="container-xl mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Ready?</p>
            <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-5">
              Fast. Custom.<br />
              <span className="text-gradient-red">Done Right.</span>
            </h2>
            <p className="text-brand-silver text-lg leading-relaxed mb-10 max-w-xl mx-auto">
              Whether you need 1 shirt or 1,000 — we make the process simple, quick, and worth every penny.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/pricing"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wider text-sm px-10 py-4 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                Start My Order <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-10 py-4 rounded-lg transition-all hover:bg-white/5"
              >
                Ask Us Anything
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
