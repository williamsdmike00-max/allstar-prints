import { ReactNode } from 'react'
import Button from './Button'

interface CTABannerProps {
  headline: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  icon?: ReactNode
}

export default function CTABanner({
  headline,
  subtext,
  primaryLabel = 'Get a Free Quote',
  primaryHref = '/pricing',
  secondaryLabel,
  secondaryHref,
  icon,
}: CTABannerProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-dark3 to-brand-dark2 border-y border-white/8">
      {/* Glow accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-brand-red/8 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-brand-blue/8 blur-3xl" />
      </div>

      <div className="relative container-xl section-padding py-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex items-center gap-5">
          {icon && <div className="hidden md:block text-5xl flex-shrink-0">{icon}</div>}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
              {headline}
            </h2>
            {subtext && <p className="text-brand-silver mt-2 text-sm md:text-base max-w-xl">{subtext}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-shrink-0">
          {secondaryLabel && secondaryHref && (
            <Button href={secondaryHref} variant="ghost" size="lg">
              {secondaryLabel}
            </Button>
          )}
          <Button href={primaryHref} size="lg">
            {primaryLabel}
          </Button>
        </div>
      </div>
    </section>
  )
}
