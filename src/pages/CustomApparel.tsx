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
    desc: 'Pullover and zip-up hoodies, crewneck sweatshirts — printed with screen print or DTF for a long-lasting finish.',
    tags: ['Screen Print', 'DTF', 'Heavy Cotton'],
  },
  {
    icon: '⚽',
    title: 'Team & Sports Apparel',
    desc: 'Jerseys, practice shirts, warm-ups, and athletic gear. Built for performance and team identity.',
    tags: ['Jerseys', 'Heat Transfer', 'Numbers & Names'],
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

// Image-led audience tiles — each one is a full-bleed marketing graphic
// (already has its own headline + brand styling baked in) that links to
// the most relevant next step.
const audienceCards = [
  {
    image: '/marketing/marketing-teams.jpg',
    alt: 'Allstar Prints for teams, schools, and leagues — custom apparel for every team, every season',
    href: '/design-online',
    cta: 'Get team pricing',
  },
  {
    image: '/marketing/marketing-family.jpg',
    alt: 'Allstar Prints for family reunions and group trips — matching shirts, made memorable',
    href: '/upload-artwork',
    cta: 'Get family quote',
  },
  {
    image: '/marketing/marketing-bulk.jpg',
    alt: 'Allstar Prints for bulk orders — volume discounts, on-time delivery, consistent quality',
    href: '/pricing',
    cta: 'Get volume quote',
  },
  {
    image: '/marketing/marketing-business.jpg',
    alt: 'Allstar Prints for businesses — custom uniforms, branded apparel, and promo items',
    href: '/pricing',
    cta: 'Get business quote',
  },
]

export default function CustomApparel() {
  return (
    <>
      <SEO
        title="Custom Apparel — Hoodies, Jerseys, Hats & More"
        description="Custom hoodies, sweatshirts, sports jerseys, event tees, and group apparel. Allstar Prints LLC outfits teams, schools, churches, and organizations across Dallas–Fort Worth."
        path="/custom-apparel"
      />
      {/* Hero — image-led poster + bottom CTA strip. The overview image
          already contains headline + features + brand voice, so we let it
          carry visual weight and overlay only an elevated CTA row. */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-12 md:py-16">
        <div className="container-xl section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 items-center">
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-glow-red bg-brand-dark2">
              <img
                src="/marketing/marketing-overview.jpg"
                alt="Allstar Prints — Custom Apparel Done Right. Premium quality, fast turnaround, made just for you."
                className="w-full h-auto block"
                loading="eager"
              />
            </div>
            <div className="text-center lg:text-left">
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Custom Apparel</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-5">
                Everything your group needs to{' '}
                <span className="text-gradient-red">look the part.</span>
              </h1>
              <p className="text-brand-silver text-base md:text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0">
                From hoodies to jerseys to event tees — we outfit teams, organizations, businesses, and families with premium custom apparel. One order, one shop.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3">
                <Link
                  to="/pricing"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-7 py-3.5 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
                >
                  Get a Free Quote <ArrowRight size={16} />
                </Link>
                <Link
                  to="/design-online"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-7 py-3.5 rounded-md transition-all hover:bg-white/5"
                >
                  Design Online
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Built for every kind of group — image-led audience cards. Each
          tile clicks through to the most relevant next step. */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Who We Make Apparel For"
          title="Built for every"
          titleHighlight="kind of group"
          subtitle="Teams, families, businesses, bulk runs — same shop, same quality. Click any tile to start your quote."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {audienceCards.map((card) => (
            <Link
              key={card.image}
              to={card.href}
              className="group relative block rounded-2xl overflow-hidden border border-white/10 bg-brand-dark3 hover:border-brand-red transition-all hover:shadow-glow-red hover:-translate-y-0.5"
              aria-label={card.alt}
            >
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-red text-white text-[11px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                {card.cta} <ArrowRight size={12} />
              </span>
            </Link>
          ))}
        </div>
      </section>

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
