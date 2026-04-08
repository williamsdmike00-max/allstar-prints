import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  external?: boolean
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-red hover:bg-brand-red-dark text-white shadow-glow-red hover:-translate-y-px',
  secondary:
    'bg-brand-navy hover:bg-brand-navy-light text-white border border-brand-navy-light/40 hover:-translate-y-px',
  ghost:
    'bg-transparent hover:bg-white/8 text-white border border-white/20 hover:border-white/40',
  outline:
    'bg-transparent border border-brand-red text-brand-red hover:bg-brand-red hover:text-white',
}

const sizes: Record<Size, string> = {
  sm:  'text-xs px-4 py-2 rounded',
  md:  'text-sm px-5 py-2.5 rounded-md',
  lg:  'text-sm px-7 py-3.5 rounded-md',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  type = 'button',
  disabled,
  className = '',
  external,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={base}>
          {children}
        </a>
      )
    }
    return (
      <Link to={href} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} disabled:opacity-50 disabled:cursor-not-allowed`}>
      {children}
    </button>
  )
}
