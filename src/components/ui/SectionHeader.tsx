interface SectionHeaderProps {
  label?: string
  title: string
  titleHighlight?: string
  subtitle?: string
  centered?: boolean
}

export default function SectionHeader({
  label,
  title,
  titleHighlight,
  subtitle,
  centered = true,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {label && (
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">
          {label}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
        {title}{' '}
        {titleHighlight && (
          <span className="text-gradient-red">{titleHighlight}</span>
        )}
      </h2>
      {subtitle && (
        <p className={`text-brand-silver mt-4 text-base md:text-lg leading-relaxed ${centered ? 'max-w-2xl mx-auto' : 'max-w-xl'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
