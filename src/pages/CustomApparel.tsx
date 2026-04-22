import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import SectionHeader from '../components/ui/SectionHeader'
import TrustBar from '../components/ui/TrustBar'

const categories = [
  {
    icon: '🧥',
    title: 'Hoodies & Sweatshirts',
    desc: 'Pullover and zip-up hoodies, crewneck sweatshirts — all available with your custom print or embroidery.',
    tags: ['Screen Print', 'Embroidery', 'DTF'],
  },
  {
    icon: '⚽',
    title: 'Team & Sports Apparel',
    desc: 'Jerseys, practice shirts, warm-ups, and athletic gear. Built for performance and team identity.',
    tags: ['Jerseys', 'Heat Transfer', 'Numbers & Names'],
  },
  {
    icon: '🏢',
    title: 'Business Uniforms',
    desc: 'Polos, button-downs, work shirts, and staff apparel. Make every customer interaction look professional.',
    tags: ['Embroidery', 'Screen Print', 'Polos'],
  },
  {
    icon: '🎉',
    title: 'Event Shirts',
    desc: 'Reunions, races, fundraisers, concerts, and community events. Create a shirt everyone keeps forever.',
    tags: ['Custom Design', 'Bulk Pricing', 'Fast Turnaround'],
  },
  {
    icon: '👨‍👩‍👧‍👦',
    title: 'Family Reunion Apparel',
    desc: 'Bring the whole family together with matching shirts that celebrate your history and your bond.',
    tags: ['All Sizes', 'Custom Colors', 'Group Pricing'],
  },
  {
    icon: '⛪',
    title: 'Church & Group Shirts',
    desc: 'Custom apparel for ministries, youth groups, clubs, and organizations of every size.',
    tags: ['Low Minimums', 'Custom Design', 'Group Rates'],
  },
  {
    icon: '🧢',
    title: 'Hats & Headwear',
    desc: 'Structured caps, beanies, and trucker hats with embroidered or printed logos that complete any look.',
    tags: ['Embroidery', 'Snapback', 'Beanies'],
  },
  {
    icon: '🎒',
    title: 'Bags & Accessories',
    desc: 'Tote bags, drawstring bags, and branded accessories to round out your merchandise or uniform package.',
    tags: ['Totes', 'Drawstring', 'Branded'],
  },
]

const audience = [
  { label: 'Sports Teams', desc: 'Jerseys, warm-ups, practice gear, and fan shirts for every level of competition.' },
  { label: 'Small Businesses', desc: 'Staff uniforms, branded merch, and promotional apparel that markets itself.' },
  { label: 'Schools & Universities', desc: 'Spirit wear, club shirts, graduation tees, and athletic uniforms.' },
  { label: 'Events & Organizations', desc: 'Volunteer shirts, race day tees, fundraiser apparel, and more.' },
]

export default function CustomApparel() {
  return (
    <>
      <SEO
        title="Custom Apparel — Hoodies, Jerseys, Hats & More"
        description="Custom hoodies, sweatshirts, sports jerseys, business uniforms, hats, and event apparel. Allstar Prints LLC outfits teams, schools, churches, and businesses of every size."
        path="/custom-apparel"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-brand-navy/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Custom Apparel</p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 max-w-4xl mx-auto">
            Everything Your Group Needs to<br />
            <span className="text-gradient-red">Look the Part</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
            From hoodies to hats, jerseys to business uniforms — we outfit teams, organizations, businesses, and families with premium custom apparel. One order, one shop.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
            <Link
              to="/how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md transition-all hover:bg-white/5"
            >
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Apparel Categories */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Apparel Types"
          title="What We"
          titleHighlight="Print On"
          subtitle="We outfit all types of groups with all types of garments. Browse what's available."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => (
            <div key={cat.title} className="group flex flex-col gap-4 p-5 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-3xl">{cat.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-white mb-1.5 group-hover:text-brand-red transition-colors">{cat.title}</h3>
                <p className="text-sm text-brand-silver leading-relaxed mb-3">{cat.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-wide text-brand-blue bg-brand-navy/30 border border-brand-blue/20 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Serve */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Who We Serve</p>
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                Built for Groups<br />
                <span className="text-gradient-red">of Every Size</span>
              </h2>
              <p className="text-brand-silver leading-relaxed mb-8">
                Whether you're outfitting 5 people or 500, we work with groups at every scale and budget. Tell us what you need and we'll make it happen.
              </p>
              <div className="flex flex-col gap-4">
                {audience.map((a) => (
                  <div key={a.label} className="flex items-start gap-4 p-4 rounded-xl bg-brand-dark3 border border-white/8">
                    <div className="w-2 h-2 rounded-full bg-brand-red mt-1.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-white mb-0.5">{a.label}</h4>
                      <p className="text-sm text-brand-silver">{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="/images/jerseys.jpg" alt="Custom sports jerseys printed by Allstar Prints" className="aspect-[4/5] w-full rounded-xl object-cover" />
              <div className="flex flex-col gap-4 pt-6">
                <img src="/images/business-polo.jpg" alt="Custom business polo shirts" className="aspect-square w-full rounded-xl object-cover" />
                <img src="/images/tshirt-bulk.png" alt="Bulk business uniform shirts" className="aspect-square w-full rounded-xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABanner
        headline="Need Custom Apparel for Your Group?"
        subtext="Tell us what you need and we'll handle the rest — from design to delivery."
        primaryLabel="Get a Free Quote"
        primaryHref="/pricing"
        secondaryLabel="Upload Artwork"
        secondaryHref="/upload-artwork"
        icon="🧥"
      />
    </>
  )
}
