import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  href: string
  tag?: string
  featured?: boolean
}

export default function ServiceCard({ icon, title, description, href, tag, featured }: ServiceCardProps) {
  return (
    <Link
      to={href}
      className={`group relative flex flex-col gap-4 p-6 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
        featured
          ? 'bg-gradient-to-br from-brand-red/15 to-brand-navy/15 border-brand-red/30 hover:border-brand-red/50 hover:shadow-glow-red'
          : 'bg-brand-dark3 border-white/8 hover:border-brand-red/30 hover:shadow-[0_8px_30px_rgba(238,42,36,0.1)]'
      }`}
    >
      {tag && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-brand-red border border-brand-red/35 px-2 py-0.5 rounded-full">
          {tag}
        </span>
      )}
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="text-base font-bold uppercase tracking-wide text-white mb-1.5 group-hover:text-brand-red transition-colors">
          {title}
        </h3>
        <p className="text-sm text-brand-silver leading-relaxed">{description}</p>
      </div>
      <div className="mt-auto flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-brand-red/70 group-hover:text-brand-red transition-colors">
        Learn More <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  )
}
