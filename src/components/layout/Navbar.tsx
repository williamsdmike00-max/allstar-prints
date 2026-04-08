import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const services = [
  { label: 'Custom T-Shirts', href: '/custom-tshirts' },
  { label: 'DTF Printing', href: '/dtf-printing' },
  { label: 'Gang Sheet Builder', href: '/gang-sheet-builder' },
  { label: 'Custom Apparel', href: '/custom-apparel' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold uppercase tracking-wide transition-colors ${
      isActive ? 'text-brand-red' : 'text-brand-silver hover:text-white'
    }`

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-dark/95 backdrop-blur-md border-b border-white/8 shadow-lg'
          : 'bg-brand-dark/80 backdrop-blur-sm'
      }`}
    >
      <nav className="container-xl section-padding flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0" onClick={() => setOpen(false)}>
          <img
            src="/brand_assets/openart-image_1775569332019_55a69ae4_1775569332054_46e7f565.png"
            alt="Allstar Prints LLC"
            className="h-10 md:h-12 w-auto drop-shadow-[0_0_8px_rgba(238,42,36,0.5)]"
          />
        </Link>

        {/* Desktop nav */}
        <ul className="hidden lg:flex items-center gap-7">
          {/* Services dropdown */}
          <li className="relative">
            <button
              className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-brand-silver hover:text-white transition-colors"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              Services <ChevronDown size={14} />
            </button>
            {servicesOpen && (
              <div
                className="absolute top-full left-0 mt-1 w-52 bg-brand-dark3 border border-white/10 rounded-lg shadow-xl overflow-hidden"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                {services.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm font-semibold text-brand-silver hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {s.label}
                    {s.href === '/gang-sheet-builder' && (
                      <span className="text-[9px] font-black uppercase tracking-wide bg-brand-red text-white px-1.5 py-0.5 rounded-full flex-shrink-0">New</span>
                    )}
                  </Link>
                ))}
              </div>
            )}
          </li>
          <li><NavLink to="/how-it-works" className={linkClass}>How It Works</NavLink></li>
          <li><NavLink to="/pricing" className={linkClass}>Pricing</NavLink></li>
          <li><NavLink to="/about" className={linkClass}>About</NavLink></li>
          <li><NavLink to="/faq" className={linkClass}>FAQ</NavLink></li>
        </ul>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/upload-artwork"
            className="text-sm font-semibold text-brand-silver hover:text-white transition-colors"
          >
            Upload Art
          </Link>
          <Link
            to="/pricing"
            className="bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold uppercase tracking-wider px-5 py-2.5 rounded-md shadow-glow-red transition-all hover:-translate-y-px"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-brand-dark2 border-t border-white/8 px-5 py-4 flex flex-col gap-1">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-silver/50 mb-2">Services</p>
          {services.map((s) => (
            <Link
              key={s.href}
              to={s.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold text-brand-silver hover:text-white transition-colors flex items-center justify-between"
            >
              {s.label}
              {s.href === '/gang-sheet-builder' && (
                <span className="text-[9px] font-black uppercase tracking-wide bg-brand-red text-white px-1.5 py-0.5 rounded-full ml-2">New</span>
              )}
            </Link>
          ))}
          <div className="h-px bg-white/8 my-2" />
          {[
            { label: 'How It Works', href: '/how-it-works' },
            { label: 'Pricing', href: '/pricing' },
            { label: 'Upload Artwork', href: '/upload-artwork' },
            { label: 'About', href: '/about' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Contact', href: '/contact' },
          ].map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setOpen(false)}
              className="py-2.5 text-sm font-semibold text-brand-silver hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <div className="h-px bg-white/8 my-2" />
          <Link
            to="/pricing"
            onClick={() => setOpen(false)}
            className="mt-1 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold uppercase tracking-wider px-5 py-3 rounded-md text-center transition-colors"
          >
            Get a Free Quote
          </Link>
        </div>
      )}
    </header>
  )
}
