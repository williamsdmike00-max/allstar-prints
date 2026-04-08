interface ImagePlaceholderProps {
  label?: string
  icon?: string
  aspectRatio?: string
  className?: string
}

export default function ImagePlaceholder({
  label = 'Photo coming soon',
  icon = '📸',
  aspectRatio = 'aspect-square',
  className = '',
}: ImagePlaceholderProps) {
  return (
    <div
      className={`${aspectRatio} ${className} bg-brand-dark3 border border-white/8 rounded-xl flex flex-col items-center justify-center gap-3 text-center overflow-hidden`}
    >
      <span className="text-3xl opacity-40">{icon}</span>
      <span className="text-xs font-semibold uppercase tracking-widest text-brand-silver/40">{label}</span>
    </div>
  )
}
