import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, Star } from 'lucide-react'

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
              <span>info@allstarprints.com</span>
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
