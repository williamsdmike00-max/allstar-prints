import { CheckCircle, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import CTABanner from '../components/ui/CTABanner'
import FAQAccordion from '../components/ui/FAQAccordion'
import SectionHeader from '../components/ui/SectionHeader'
import TrustBar from '../components/ui/TrustBar'

const shirtTypes = [
  { name: 'Classic Crew Neck', desc: 'The go-to for any print job. Available in hundreds of colors and a huge range of sizes.', icon: '👕' },
  { name: 'Long Sleeve', desc: 'Perfect for cooler weather, school spirit, or adding a little extra coverage to your design.', icon: '👔' },
  { name: 'Youth & Kids', desc: 'Same great quality scaled down for your youngest team members or event attendees.', icon: '🧒' },
  { name: 'Ladies Cut', desc: 'Fitted styles designed specifically for women — great for teams, events, and businesses.', icon: '👗' },
  { name: 'Tall & Big Sizes', desc: 'Inclusive sizing up to 6XL because every member of your group deserves a great shirt.', icon: '📏' },
  { name: 'Performance & Dry-Fit', desc: "Moisture-wicking athletic shirts for sports teams, gyms, and active organizations.", icon: '⚡' },
]

const printingMethods = [
  {
    method: 'Screen Printing',
    best: 'Bulk orders (12+ pieces)',
    pros: ['Extremely durable', 'Vibrant solid colors', 'Best price at volume', 'Soft hand feel'],
    icon: '🖨️',
  },
  {
    method: 'DTF (Direct-to-Film)',
    best: 'Small runs, full color designs',
    pros: ['No minimums', 'Photo-quality detail', 'Works on any fabric color', 'Fast production'],
    icon: '🎨',
  },
  {
    method: 'Heat Transfer Vinyl',
    best: 'Names, numbers, simple logos',
    pros: ['Crisp clean edges', 'Great for personalization', 'Excellent for sports jerseys', 'Durable finish'],
    icon: '✂️',
  },
]

const faqs = [
  {
    question: 'What is the minimum quantity for custom t-shirts?',
    answer: 'For screen printing the minimum is typically 12 pieces. For DTF printing there is no minimum — you can order as few as 1 shirt. Contact us and we\'ll match you to the right method for your quantity.',
  },
  {
    question: 'What sizes do you offer?',
    answer: 'We carry sizes from Youth XS through Adult 6XL depending on the garment style. Ladies cut, tall, and big sizes are also available. We\'ll confirm available sizes when you place your order.',
  },
  {
    question: 'Can I mix colors and sizes in one order?',
    answer: 'Yes. You can mix shirt colors and sizes within a single order. Our quote form lets you specify exactly what you need.',
  },
  {
    question: 'What file format should I submit my design in?',
    answer: 'The best formats are AI, EPS, SVG, or high-resolution PNG/PDF (300 DPI minimum). If you only have a low-res file, let us know — we can often clean it up for free.',
  },
  {
    question: 'Do you print on both sides of the shirt?',
    answer: 'Yes. Front, back, left chest, sleeve — we can print on most locations. Multi-location prints are priced accordingly. Include any location details in your quote request.',
  },
  {
    question: 'How long does it take to get my shirts?',
    answer: 'Standard turnaround is 5–7 business days after artwork approval. Rush orders (48-hour) are available for an additional fee — ask when you request your quote.',
  },
]

export default function CustomTshirts() {
  return (
    <>
      <SEO
        title="Custom T-Shirts — Screen Printing, DTF & More"
        description="Order custom t-shirts with screen printing, DTF, or heat transfer vinyl. Any quantity, any color. Fast turnaround and free mockups from Allstar Prints LLC."
        path="/custom-tshirts"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-24 md:py-32">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-navy/20 blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-red/8 blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="relative container-xl section-padding grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Custom T-Shirts</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Shirts That Make<br />
              <span className="text-gradient-red">Your Team Stand Out</span>
            </h1>
            <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-xl">
              High-quality custom t-shirts printed with your design, colors, and logo. Perfect for teams, events, businesses, schools, and anything in between. No compromises on quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                Get a Free Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/upload-artwork"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md transition-all hover:bg-white/5"
              >
                Upload Artwork
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img src="/images/tshirt-flatlay.jpg" alt="Custom t-shirt flat lay product shot" className="aspect-[3/4] w-full rounded-xl object-cover" />
            <div className="flex flex-col gap-4 pt-6">
              <img src="/images/tshirt-lifestyle.png" alt="Custom team shirts printed by Allstar Prints" className="aspect-square w-full rounded-xl object-cover" />
              <img src="/images/tshirt-event1.png" alt="Custom event apparel shirts" className="aspect-square w-full rounded-xl object-cover" />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Shirt Types */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="Shirt Styles"
          title="Find the Right"
          titleHighlight="Fit"
          subtitle="We carry a wide range of blanks so your design looks great on everyone."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {shirtTypes.map((shirt) => (
            <div key={shirt.name} className="flex items-start gap-4 p-5 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors">
              <span className="text-2xl flex-shrink-0">{shirt.icon}</span>
              <div>
                <h3 className="text-sm font-bold text-white mb-1">{shirt.name}</h3>
                <p className="text-sm text-brand-silver leading-relaxed">{shirt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Printing Methods */}
      <section className="bg-brand-dark2 border-y border-white/8 py-20">
        <div className="container-xl section-padding">
          <SectionHeader
            label="Printing Options"
            title="Choose the Right"
            titleHighlight="Print Method"
            subtitle="We'll help you pick the best technique for your design, quantity, and budget."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {printingMethods.map((m) => (
              <div key={m.method} className="p-6 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/30 transition-colors flex flex-col gap-4">
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <h3 className="text-base font-black text-white uppercase tracking-wide mb-1">{m.method}</h3>
                  <p className="text-xs font-semibold text-brand-red uppercase tracking-wider">Best for: {m.best}</p>
                </div>
                <ul className="flex flex-col gap-2">
                  {m.pros.map((pro) => (
                    <li key={pro} className="flex items-center gap-2 text-sm text-brand-silver">
                      <CheckCircle size={13} className="text-brand-red flex-shrink-0" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTABanner
        headline="Ready to Order Your Custom Shirts?"
        subtext="Get a free quote and digital mockup — no commitment, no pressure. Most orders ready in 5–7 days."
        primaryLabel="Start My Order"
        primaryHref="/pricing"
        secondaryLabel="Upload My Design"
        secondaryHref="/upload-artwork"
        icon="👕"
      />

      {/* FAQ */}
      <section className="section-padding py-20 container-xl mx-auto">
        <SectionHeader
          label="FAQ"
          title="T-Shirt Printing"
          titleHighlight="Questions"
          subtitle="Everything you need to know before placing your order."
        />
        <div className="max-w-3xl mx-auto">
          <FAQAccordion items={faqs} />
        </div>
        <div className="text-center mt-8">
          <Link to="/contact" className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide">
            Still have questions? Contact us <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </>
  )
}
