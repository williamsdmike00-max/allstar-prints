import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

// Single source of truth for the four audience marketing tiles. Both the
// homepage and /custom-apparel render this — change the cards in one place
// and both pages update.
export const AUDIENCE_CARDS = [
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
] as const

export default function AudienceGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
      {AUDIENCE_CARDS.map((card) => (
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
  )
}
