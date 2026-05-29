import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import SectionHeader from '../components/ui/SectionHeader'

const values = [
  { icon: '🏆', title: 'Quality First, Always', desc: "We use premium blanks and professional-grade printing. Every order is quality-checked before it leaves our hands. We'd rather redo a job than send something we're not proud of." },
  { icon: '⚡', title: 'Fast Without Cutting Corners', desc: 'Speed matters when you have a deadline. We move fast on every order without sacrificing the quality of the final product.' },
  { icon: '🤝', title: 'Straightforward to Work With', desc: "No runaround, no confusion. You'll get clear answers, honest quotes, and a team that respects your time." },
  { icon: '❤️', title: 'Community Is Why We Do This', desc: "We're local. We print for the teams, churches, schools, and businesses in our own backyard. Supporting this community isn't just business — it's personal." },
]

// Real customers we've printed for. Names only — third-party contact details
// are intentionally not published here.
const customers = [
  { category: 'Public Safety',  name: 'DeSoto Police Patrol' },
  { category: 'Youth Sports',   name: 'DJYA Football & Cheer' },
  { category: 'Local Business', name: 'A&W A/C and Heating' },
  { category: 'Streetwear',     name: 'Heartless Brand' },
]

export default function About() {
  return (
    <>
      <SEO
        title="About Us — Local Custom Apparel Shop"
        description="Allstar Prints LLC is a local custom apparel shop committed to quality, fast turnaround, and real customer service. Learn our story and what makes us different."
        path="/about"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-brand-navy/15 blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-red/8 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <span className="text-[40vw] leading-none text-white/[0.015] font-black">★</span>
          </div>
        </div>
        <div className="relative container-xl section-padding grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">About Us</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Local Shop.<br />
              <span className="text-gradient-red">Serious Quality.</span>
            </h1>
            <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-xl">
              Allstar Prints LLC was built to give local teams, businesses, schools, and families access to premium custom apparel without the hassle. We care about every order because your order represents us.
            </p>
            <div className="flex items-center gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-7 py-3.5 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                Work With Us <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-bold text-brand-silver hover:text-white transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/tshirt-bulk.png" alt="Bulk custom shirts printed by Allstar Prints" className="aspect-[4/5] w-full rounded-xl object-cover" />
            <div className="flex flex-col gap-4 pt-6">
              <img src="/images/tshirt-lifestyle.png" alt="Custom team shirts printed by Allstar Prints" className="aspect-square w-full rounded-xl object-cover" />
              <div className="p-4 rounded-xl bg-brand-dark3 border border-white/8 text-center flex flex-col items-center gap-1">
                <div className="flex gap-0.5 mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-brand-red" fill="currentColor" />)}
                </div>
                <p className="text-sm font-black text-white">Trusted Locally</p>
                <p className="text-xs text-brand-silver">500+ orders delivered</p>
                <p className="text-xs font-bold text-brand-red mt-1">In Business Since 2017</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20 container-xl mx-auto">
        <div className="max-w-3xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Our Story</p>
          <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-6">
            Built on <span className="text-gradient-red">Real Relationships</span>
          </h2>
          <div className="flex flex-col gap-5 text-brand-silver leading-relaxed">
            <p>
              <strong className="text-white">In business since 2017</strong>, Allstar Prints was built with one goal: make it easy for people in our community to get high-quality custom apparel without jumping through hoops or dealing with impersonal, slow-moving print factories.
            </p>
            <p>
              We've printed for youth basketball leagues, local restaurants, church groups, school graduations, family reunions, and everything in between. No job is too small and no deadline is too tight for us to try.
            </p>
            <p>
              What sets us apart isn't just the quality of our prints — it's the way we work. We respond quickly, we're upfront about pricing, we send a free mockup before printing anything, and we stand behind every order we produce. If something isn't right, we fix it.
            </p>
            <p>
              That's the Allstar Prints promise. Fast, custom apparel. Done right.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <SectionHeader
            label="What We Stand For"
            title="Our Core"
            titleHighlight="Values"
            subtitle="The principles that guide every order, every interaction, and every print."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-5 p-6 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors">
                <span className="text-3xl flex-shrink-0">{v.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-brand-silver leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By — real customers, no fabricated quotes */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Real Customers"
          title="Trusted By Local"
          titleHighlight="Teams & Brands"
          subtitle="A selection of the people we've printed for across Dallas–Fort Worth."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {customers.map((c) => (
            <div key={c.name} className="p-5 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors text-center flex flex-col gap-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-brand-red">{c.category}</p>
              <p className="text-base font-bold text-white leading-snug">{c.name}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-brand-silver mt-8">
          See more work on Instagram{' '}
          <a
            href="https://www.instagram.com/allstarprintsllc/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-red hover:text-white transition-colors font-bold"
          >
            @allstarprintsllc
          </a>
        </p>
      </section>

      <CTABanner
        headline="Ready to Work With Us?"
        subtext="Get a free quote in minutes. We'll handle everything else."
        primaryLabel="Get a Free Quote"
        primaryHref="/pricing"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
        icon="🤝"
      />
    </>
  )
}
