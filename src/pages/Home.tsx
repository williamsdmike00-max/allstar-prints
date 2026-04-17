import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Printer, Layers, Shirt,
  Package, Star, Zap, Users, Award, Clock, ShieldCheck,
  BadgeCheck,
} from 'lucide-react'
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
  {
    quote: "Local business that actually cares. They helped us design our company logo and printed it perfectly on 200 shirts. Worth every penny.",
    name: 'Jennifer R.',
    role: 'Small Business Owner',
    initials: 'JR',
    rating: 5,
  },
  {
    quote: "Fast, reliable, and the quality is outstanding. We've used them for three events now and they never disappoint. Highly recommend!",
    name: 'David L.',
    role: 'Event Coordinator',
    initials: 'DL',
    rating: 5,
  },
  {
    quote: "Great communication throughout the process. They kept us updated and delivered exactly what we wanted. Will definitely use again.",
    name: 'Maria G.',
    role: 'School Administrator',
    initials: 'MG',
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
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark">
        {/* Background layers */}
        <div className="absolute inset-0 opacity-35 pointer-events-none"
             style={{
               backgroundImage: `radial-gradient(ellipse 80% 70% at 20% 30%, rgba(26,51,91,0.8) 0%, transparent 70%),
                                 radial-gradient(ellipse 60% 60% at 80% 70%, rgba(238,42,36,0.15) 0%, transparent 70%)`,
             }}
        />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="text-[60vw] leading-none text-white/[0.012] font-black">★</span>
        </div>

        <div className="relative z-10 w-full container-xl section-padding py-32">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-8">
              {/* Urgency badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-red/15 to-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-widest px-5 py-3 rounded-full shadow-lg backdrop-blur-sm">
                <Zap size={14} fill="currentColor" />
                ⚡ Rush Orders Available — 48-Hour Turnaround
              </div>

              <div className="space-y-6">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
                  <span className="text-white block">Custom Apparel</span>
                  <span className="text-white block">Printed Local,</span>
                  <span className="text-gradient-red block">Delivered Fast.</span>
                </h1>

                <p className="text-brand-silver text-xl leading-relaxed max-w-xl mx-auto">
                  Your trusted local print shop for custom t-shirts, hoodies, and team apparel. Free mockups, quality guaranteed, and ready in 5-7 days. Serving [Your City] and surrounding areas.
                </p>
              </div>

              {/* Primary CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                <Link
                  to="/pricing"
                  className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-black uppercase tracking-wide text-sm px-10 py-5 rounded-xl shadow-2xl shadow-brand-red/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl hover:shadow-brand-red/40"
                >
                  Get Free Quote
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  to="/upload-artwork"
                  className="group inline-flex items-center justify-center gap-3 bg-white/5 backdrop-blur-sm border-2 border-white/20 hover:bg-white/10 hover:border-white/40 text-white font-bold uppercase tracking-wide text-sm px-10 py-5 rounded-xl transition-all duration-300 hover:-translate-y-1"
                >
                  Upload Design
                  <Package size={18} className="group-hover:scale-110 transition-transform" />
                </Link>
              </div>

              {/* Social proof micro-line */}
              <div className="flex items-center justify-center gap-6 pt-8">
                <div className="flex -space-x-3">
                  {['DW', 'SK', 'MT', 'JR', 'AB', 'DL'].map((init, i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-red to-brand-navy border-3 border-brand-dark flex items-center justify-center text-[11px] font-black text-white shadow-lg">
                      {init}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-brand-red" fill="currentColor" />)}
                  </div>
                  <span className="text-sm text-brand-silver font-semibold">500+ local orders • 5.0 stars</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent pointer-events-none" />
      </section>

      {/* ── TRUST BADGES ── */}
      <section className="bg-gradient-to-r from-brand-dark2 via-brand-dark to-brand-dark2 border-y border-white/5 py-16">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.title} className={`group flex items-center gap-5 p-6 rounded-2xl border backdrop-blur-sm ${badge.color} transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1`}>
                <div className={`flex-shrink-0 p-3 rounded-xl bg-white/5 ${badge.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                  {badge.icon}
                </div>
                <div>
                  <p className="text-base font-bold text-white leading-tight">{badge.title}</p>
                  <p className="text-sm text-brand-silver/80 mt-1">{badge.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="section-padding py-24 container-xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeader
            label="What We Do"
            title="Custom Printing"
            titleHighlight="Services"
            subtitle="One stop for every custom apparel need — from a single piece to large group orders."
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((s) => (
            <ServiceCard key={s.href} {...s} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/custom-apparel"
            className="group inline-flex items-center gap-3 text-base font-bold text-brand-red hover:text-white transition-all duration-300 uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-brand-red/10"
          >
            Browse all apparel types
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── LOCAL SERVICE ── */}
      <section className="bg-gradient-to-br from-brand-navy via-brand-dark3 to-brand-navy border-y border-white/5 py-20">
        <div className="container-xl section-padding">
          <div className="text-center mb-16">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red mb-4">Why Choose Local</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
              Your Neighborhood <span className="text-gradient-red">Print Experts</span>
            </h2>
            <p className="text-brand-silver text-xl max-w-3xl mx-auto leading-relaxed">
              We're not a faceless online service. We're your local print shop, committed to quality and community.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-red/20 to-brand-red/10 border-2 border-brand-red/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Users size={28} className="text-brand-red" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Personal Service</h3>
              <p className="text-brand-silver text-base leading-relaxed">Real conversations, not chatbots. We know your community and understand your needs.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-brand-blue/20 to-brand-blue/10 border-2 border-brand-blue/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Clock size={28} className="text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Local Pickup</h3>
              <p className="text-brand-silver text-base leading-relaxed">Most orders ready for pickup within 5-7 days. No shipping delays or extra costs.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg">
                <Award size={28} className="text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Quality Guarantee</h3>
              <p className="text-brand-silver text-base leading-relaxed">If it's not perfect, we'll fix it. Your satisfaction is our reputation in the community.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="bg-gradient-to-r from-brand-dark2 via-brand-dark to-brand-dark2 border-y border-white/5 py-20">
        <div className="container-xl section-padding">
          <p className="text-center text-sm font-bold uppercase tracking-[0.2em] text-brand-red mb-6">Who We Print For</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="group flex flex-col items-center gap-4 py-6 px-4 rounded-2xl bg-gradient-to-br from-brand-dark3 to-brand-dark4 border border-white/10 hover:border-brand-red/30 hover:-translate-y-2 transition-all duration-300 text-center cursor-default shadow-lg hover:shadow-2xl"
              >
                <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{cat.icon}</span>
                <span className="text-sm font-semibold text-brand-silver leading-tight group-hover:text-white transition-colors">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section-padding py-24 container-xl mx-auto">
        <div className="text-center mb-16">
          <SectionHeader
            label="The Process"
            title="Ordering Is Fast &"
            titleHighlight="Stress-Free"
            subtitle="Four simple steps from idea to finished apparel. No confusion, no phone tag, no guessing."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative flex flex-col gap-6 p-8 rounded-2xl bg-gradient-to-br from-brand-dark3 to-brand-dark4 border border-white/10 hover:border-brand-red/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group">
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[calc(100%+0px)] w-8 h-px bg-gradient-to-r from-brand-red/50 to-transparent z-0" />
              )}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-dark4 to-brand-dark border-2 border-brand-red flex items-center justify-center text-brand-red shadow-glow-red flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <div>
                <span className="text-sm font-black uppercase tracking-widest text-brand-red/60">Step {step.num}</span>
                <h3 className="text-lg font-bold text-white mt-2 mb-3 group-hover:text-brand-red transition-colors">{step.title}</h3>
                <p className="text-base text-brand-silver leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link
            to="/how-it-works"
            className="group inline-flex items-center gap-3 text-base font-bold text-brand-red hover:text-white transition-all duration-300 uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-brand-red/10"
          >
            See the full process
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* ── WHY CHOOSE US ── */}
      <section className="bg-gradient-to-r from-brand-dark2 via-brand-dark to-brand-dark2 border-y border-white/5 py-24">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red mb-4">Why Allstar Prints</p>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  Quality You Can See,<br />
                  <span className="text-gradient-red">Trust You Can Feel</span>
                </h2>
                <p className="text-brand-silver text-xl leading-relaxed">
                  Every piece we print represents our commitment to your success. From premium materials to flawless execution, we deliver results that exceed expectations.
                </p>
              </div>
              <ul className="space-y-6">
                {[
                  {
                    icon: <Award size={20} />,
                    title: 'Premium materials — guaranteed',
                    desc: "Top-quality blanks and inks that won't fade, crack, or peel. We test before we ship.",
                  },
                  {
                    icon: <Users size={20} />,
                    title: 'Real people answer your questions',
                    desc: 'No ticketing system. No chatbot. You talk directly to the people printing your order.',
                  },
                  {
                    icon: <Zap size={20} />,
                    title: 'We meet your deadlines',
                    desc: 'Standard orders in 5–7 days. Rush in 48 hours. We tell you upfront what\'s possible.',
                  },
                  {
                    icon: <CheckCircle size={20} />,
                    title: 'Free mockup before anything prints',
                    desc: 'You approve your digital proof first. No surprises. No prints you didn\'t sign off on.',
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-red/20 to-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red flex-shrink-0 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-base text-brand-silver leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <Link
                  to="/pricing"
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-black uppercase tracking-wide text-sm px-8 py-4 rounded-xl shadow-2xl shadow-brand-red/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl hover:shadow-brand-red/40"
                >
                  Get My Free Quote
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="aspect-[4/5] w-full rounded-2xl bg-gradient-to-br from-brand-red/20 via-brand-red/10 to-brand-navy/20 flex items-center justify-center shadow-2xl">
                <div className="text-center">
                  <div className="text-5xl mb-3">👕</div>
                  <p className="text-sm text-brand-silver font-semibold">Custom Team Shirts</p>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-brand-blue/20 via-brand-blue/10 to-brand-dark4 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <p className="text-sm text-brand-silver font-semibold">Business Uniforms</p>
                  </div>
                </div>
                <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-emerald-500/20 via-emerald-500/10 to-brand-dark4 flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🎉</div>
                    <p className="text-sm text-brand-silver font-semibold">Event Apparel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section-padding py-24 container-xl mx-auto">
        {/* Aggregate header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red mb-4">Real Reviews</p>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
            500+ Happy Customers — <span className="text-gradient-red">Here's What They Say</span>
          </h2>
          <div className="flex items-center justify-center gap-3 mt-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={18} className="text-brand-red" fill="currentColor" />)}
            </div>
            <span className="text-lg text-brand-silver font-semibold">5.0 average • Trusted locally</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
      </section>

      {/* ── INLINE CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-dark3 to-brand-dark2 border-y border-white/5 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-brand-red/6 blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-brand-blue/4 blur-3xl" />
        </div>
        <div className="relative container-xl section-padding flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="text-center md:text-left flex-1">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-red mb-3">Don't Wait</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Your deadline is closer than you think.<br />
              <span className="text-gradient-red">Let's get started today.</span>
            </h2>
            <p className="text-brand-silver text-lg leading-relaxed">Free quote. Free mockup. No commitment until you approve.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <Link
              to="/upload-artwork"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/8 backdrop-blur-sm border-2 border-white/20 hover:bg-white/12 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
            >
              Upload Design
              <Package size={18} className="group-hover:scale-110 transition-transform" />
            </Link>
            <Link
              to="/pricing"
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-xl shadow-2xl shadow-brand-red/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl hover:shadow-brand-red/40"
            >
              Get a Free Quote
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ PREVIEW ── */}
      <section className="section-padding py-24 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red mb-4">Quick Answers</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                Frequently Asked<br />
                <span className="text-gradient-red">Questions</span>
              </h2>
              <p className="text-brand-silver text-xl leading-relaxed">
                Answers to the most common questions we get. Don't see yours? We respond fast.
              </p>
            </div>
            <Link
              to="/faq"
              className="group inline-flex items-center gap-3 text-base font-bold text-brand-red hover:text-white transition-all duration-300 uppercase tracking-wide px-6 py-3 rounded-lg hover:bg-brand-red/10"
            >
              View all FAQs
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="space-y-4">
            <FAQAccordion items={faqs} />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="section-padding py-24 bg-gradient-to-r from-brand-dark2 via-brand-dark to-brand-dark2 border-t border-white/5">
        <div className="container-xl mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-red">Ready to Get Started?</p>
              <h2 className="text-5xl md:text-6xl font-black text-white leading-tight">
                Custom Apparel That<br />
                <span className="text-gradient-red">Makes You Proud</span>
              </h2>
              <p className="text-brand-silver text-xl leading-relaxed max-w-2xl mx-auto">
                Join hundreds of local teams, businesses, and organizations who trust Allstar Prints with their custom apparel needs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                to="/pricing"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-brand-red to-brand-red-dark hover:from-brand-red-dark hover:to-brand-red text-white font-black uppercase tracking-wider text-sm px-12 py-5 rounded-xl shadow-2xl shadow-brand-red/25 transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl hover:shadow-brand-red/40"
              >
                Get Free Quote
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/contact"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-transparent border-2 border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-12 py-5 rounded-xl transition-all duration-300 hover:bg-white/5 hover:-translate-y-1"
              >
                Call Us Today
                <Users size={18} className="group-hover:scale-110 transition-transform" />
              </Link>
            </div>
            <p className="text-brand-silver/80 text-base">
              Free mockup • Quality guaranteed • Local pickup available
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
