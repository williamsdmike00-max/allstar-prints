import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, Star } from 'lucide-react'

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  )
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  )
}

function TikTokIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.25 8.25 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z" />
    </svg>
  )
}

const services = [
  { label: 'Custom T-Shirts', href: '/custom-tshirts' },
  { label: 'DTF Printing', href: '/dtf-printing' },
  { label: 'Gang Sheet Builder', href: '/gang-sheet-builder' },
  { label: 'Custom Apparel', href: '/custom-apparel' },
]

const company = [
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Pricing & Quotes', href: '/pricing' },
  { label: 'Upload Artwork', href: '/upload-artwork' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
]

export default function Footer() {
  return (
    <footer className="bg-brand-dark2 border-t border-white/8">
      {/* Top CTA bar */}
      <div className="bg-gradient-to-r from-brand-red/20 via-brand-navy/30 to-brand-red/20 border-b border-white/8">
        <div className="container-xl section-padding py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-semibold text-brand-silver">
            Ready to get started?{' '}
            <span className="text-white">We turn around most orders in 5–7 business days.</span>
          </p>
          <Link
            to="/pricing"
            className="flex-shrink-0 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-md shadow-glow-red transition-all hover:-translate-y-px"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-xl section-padding py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand column */}
        <div className="lg:col-span-1">
          <Link to="/">
            <img
              src="/brand_assets/openart-image_1775569332019_55a69ae4_1775569332054_46e7f565.png"
              alt="Allstar Prints LLC"
              className="h-12 w-auto drop-shadow-[0_0_8px_rgba(238,42,36,0.45)] mb-4"
            />
          </Link>
          <p className="text-sm text-brand-silver leading-relaxed mb-4">
            Premium custom apparel for teams, businesses, schools, and events. Local, fast, and done right — every time.
          </p>
          <div className="flex items-center gap-1 text-brand-red">
            {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
            <span className="text-brand-silver text-xs ml-1">Trusted locally</span>
          </div>
          <div className="flex items-center gap-3 mt-5">
            <a
              href="https://instagram.com/allstarprintsllc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Allstar Prints on Instagram"
              className="text-brand-silver/50 hover:text-brand-red transition-colors"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://facebook.com/allstarprintsllc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Allstar Prints on Facebook"
              className="text-brand-silver/50 hover:text-brand-red transition-colors"
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href="https://tiktok.com/@allstarprintsllc"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Allstar Prints on TikTok"
              className="text-brand-silver/50 hover:text-brand-red transition-colors"
            >
              <TikTokIcon size={18} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-4">Services</h4>
          <ul className="flex flex-col gap-2.5">
            {services.map((s) => (
              <li key={s.href}>
                <Link to={s.href} className="text-sm text-brand-silver hover:text-white transition-colors">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-4">Company</h4>
          <ul className="flex flex-col gap-2.5">
            {company.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="text-sm text-brand-silver hover:text-white transition-colors">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-4">Contact</h4>
          <ul className="flex flex-col gap-3">
            <li className="flex items-start gap-2.5 text-sm text-brand-silver">
              <Phone size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <a href="tel:8175074553" className="hover:text-white transition-colors">(817) 507-4553</a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-brand-silver">
              <Mail size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <a href="mailto:contact@allstarprintsllc.com" className="hover:text-white transition-colors">contact@allstarprintsllc.com</a>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-brand-silver">
              <MapPin size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <span>400 Las Colinas Blvd East, Suite 300<br />Irving, TX 75039</span>
            </li>
            <li className="flex items-start gap-2.5 text-sm text-brand-silver">
              <Clock size={14} className="text-brand-red mt-0.5 flex-shrink-0" />
              <span>Mon–Fri 9am–6pm<br />Sat 10am–3pm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="container-xl section-padding py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-brand-silver/40">
            &copy; {new Date().getFullYear()} Allstar Prints LLC. All rights reserved.
          </p>
          <p className="text-xs text-brand-silver/40 italic">
            Fast, Custom Apparel. Done Right.
          </p>
        </div>
      </div>
    </footer>
  )
}
