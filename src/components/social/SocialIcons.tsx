import { ReactNode } from 'react'

// Social icon SVGs — extracted so the hero and footer share one source.
export function InstagramIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

export function FacebookIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

export function TikTokIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.25 8.25 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
    </svg>
  )
}

// Social link tile — shared between hero (light theme) and footer (dark theme).
// Idle: dashed ring slowly rotates, icon press-pulses staggered. Hover:
// ring spin speeds up, glow blooms, icon lifts. Animations honour
// prefers-reduced-motion via .animate-* keyframes defined in src/index.css.
export function SocialLink({
  href,
  label,
  delay,
  theme = 'dark',
  children,
}: {
  href: string
  label: string
  delay: string
  theme?: 'dark' | 'light'
  children: ReactNode
}) {
  const tile =
    theme === 'light'
      ? 'bg-white/85 border-black/15 text-brand-dark hover:text-white hover:border-brand-red hover:bg-brand-red'
      : 'bg-brand-dark3 border-white/10 text-brand-silver hover:text-white hover:border-brand-red hover:bg-brand-red/15'
  const ring =
    theme === 'light'
      ? 'border-brand-red/45 group-hover:border-brand-red'
      : 'border-brand-red/35 group-hover:border-brand-red/70'

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`group relative inline-flex items-center justify-center w-12 h-12 rounded-full border hover:shadow-glow-red transition-all duration-300 hover:-translate-y-0.5 ${tile}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-[-3px] rounded-full border border-dashed animate-ring-spin group-hover:animate-ring-spin-fast ${ring}`}
      />
      <span
        aria-hidden
        className="relative inline-flex items-center justify-center animate-press-pulse group-hover:animate-none transition-transform duration-150 group-hover:scale-110 group-active:scale-95"
        style={{ animationDelay: delay }}
      >
        {children}
      </span>
    </a>
  )
}

// Allstar Prints' three current handles. Centralised so updates only
// need to happen in one place.
export const SOCIAL_LINKS = [
  { href: 'https://instagram.com/allstarprintsllc', label: 'Allstar Prints on Instagram', Icon: InstagramIcon, delay: '0s' },
  { href: 'https://www.facebook.com/profile.php?id=61554364972208', label: 'Allstar Prints on Facebook', Icon: FacebookIcon, delay: '.4s' },
  { href: 'https://tiktok.com/@allstarprintsllc', label: 'Allstar Prints on TikTok', Icon: TikTokIcon, delay: '.8s' },
] as const
