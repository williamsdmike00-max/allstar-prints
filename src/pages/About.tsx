import { ArrowRight, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import TestimonialCard from '../components/ui/TestimonialCard'
import SectionHeader from '../components/ui/SectionHeader'

const values = [
  { icon: '🏆', title: 'Quality First, Always', desc: "We use premium blanks and professional-grade inks. Every piece that leaves our shop has been checked. We'd rather redo a job than send something we're not proud of." },
  { icon: '⚡', title: 'Fast Without Cutting Corners', desc: 'Speed matters when you have a deadline. We move fast on every order without sacrificing the quality of the final product.' },
  { icon: '🤝', title: 'Straightforward to Work With', desc: "No runaround, no confusion. You'll get clear answers, honest quotes, and a team that respects your time." },
  { icon: '❤️', title: 'Community Is Why We Do This', desc: "We're local. We print for the teams, churches, schools, and businesses in our own backyard. Supporting this community isn't just business — it's personal." },
]

const testimonials = [
  {
    quote: "We've ordered from Allstar Prints three times now — for our company launch, our summer event, and team shirts. Every time they deliver exactly what we need.",
    name: 'Tanya R.',
    role: 'Small Business Owner',
    initials: 'TR',
    rating: 5,
  },
  {
    quote: "Best experience I've had ordering custom shirts. They fixed my logo, gave me a mockup in two hours, and had everything ready in less than a week.",
    name: 'Jordan M.',
    role: 'Event Organizer',
    initials: 'JM',
    rating: 5,
  },
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
            <img src="/images/shop-front.jpg" alt="Allstar Prints shop front" className="aspect-[4/5] w-full rounded-xl object-cover" />
            <div className="flex flex-col gap-4 pt-6">
              <img src="/images/team-photo.jpg" alt="The Allstar Prints team" className="aspect-square w-full rounded-xl object-cover" />
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

      {/* Testimonials */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="What People Say"
          title="Don't Take Our"
          titleHighlight="Word for It"
          subtitle="Real feedback from real customers who ordered with Allstar Prints."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} {...t} />
          ))}
        </div>
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
