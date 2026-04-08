import { Star } from 'lucide-react'

interface TestimonialCardProps {
  quote: string
  name: string
  role: string
  initials: string
  rating?: number
}

export default function TestimonialCard({ quote, name, role, initials, rating = 5 }: TestimonialCardProps) {
  return (
    <div className="bg-brand-dark3 border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:border-brand-red/20 transition-colors">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} size={13} className="text-brand-red" fill="currentColor" />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-brand-silver leading-relaxed italic flex-1">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/8">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-red to-brand-navy flex items-center justify-center text-xs font-black text-white flex-shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white">{name}</p>
          <p className="text-xs text-brand-silver">{role}</p>
        </div>
      </div>
    </div>
  )
}
