import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import FAQAccordion from '../components/ui/FAQAccordion'
import CTABanner from '../components/ui/CTABanner'

const categories = [
  {
    label: 'Ordering & Minimums',
    icon: '📦',
    items: [
      {
        question: "What is your minimum order quantity?",
        answer: "It depends on the printing method. For DTF printing, there's no minimum — you can order a single piece. For screen printing, we typically start at 12 pieces to keep pricing reasonable. Contact us and we'll match you to the right method for your quantity.",
      },
      {
        question: "Can I mix sizes and colors in one order?",
        answer: "Yes. You can mix shirt colors and sizes within a single order. For screen printing, note that different shirt colors may require separate screen setups which can affect pricing. We'll break this down clearly in your quote.",
      },
      {
        question: "Can I place a rush order?",
        answer: "Yes. Rush orders with 48-hour turnaround are available on select products for an additional fee. Availability depends on current production load. Contact us as early as possible if you have a tight deadline and we'll do our best to accommodate you.",
      },
      {
        question: "Do you print for teams, businesses, and large organizations?",
        answer: "Absolutely. That's one of our specialties. We work with sports teams, schools, churches, businesses, nonprofits, and large event organizers regularly. Volume pricing is available for larger orders.",
      },
    ],
  },
  {
    label: 'Pricing & Payment',
    icon: '💰',
    items: [
      {
        question: "How is pricing calculated?",
        answer: "Pricing depends on the printing method, number of pieces, number of print locations, number of ink colors, and the type of garment. The more pieces you order, the lower the per-piece cost. We send you an itemized quote with no hidden fees before you commit to anything.",
      },
      {
        question: "Are there setup fees?",
        answer: "For screen printing, there may be a one-time screen setup fee depending on the design. For DTF and heat transfer vinyl, there are no setup fees. We include any applicable fees in your quote upfront.",
      },
      {
        question: "When do I pay?",
        answer: "We typically require a deposit before production begins, with the remaining balance due at pickup or before shipping. Payment methods accepted include credit/debit cards and other options — ask when you place your order.",
      },
    ],
  },
  {
    label: 'Artwork & Design',
    icon: '🎨',
    items: [
      {
        question: "Can I bring my own design?",
        answer: "Yes. Upload your design through our artwork portal or email it directly. We review every file before printing and will let you know if any adjustments are needed.",
      },
      {
        question: "What file formats do you accept?",
        answer: "We prefer vector formats: AI, EPS, SVG, and print-ready PDF files. For raster files, we accept PNG and JPG at 300 DPI or higher. If you're unsure about your file quality, send it anyway and we'll evaluate it.",
      },
      {
        question: "What if I don't have a design?",
        answer: "No problem. We offer free design assistance with every order. Share your concept, reference images, or just a description and we'll work with you to create something you love before we print anything.",
      },
      {
        question: "Do you send a proof before printing?",
        answer: "Always. We send a free digital mockup before any production begins. You'll see exactly how your design looks on the garment — placement, sizing, and color. We don't print until you approve.",
      },
      {
        question: "Can you recreate a logo I have in a photo or low-quality file?",
        answer: "Often yes. We can vectorize or clean up many logos that come in as low-resolution files or photos. It depends on the complexity. Share your file and we'll let you know what we can do.",
      },
    ],
  },
  {
    label: 'Production & Turnaround',
    icon: '⚡',
    items: [
      {
        question: "How long does it take to get my order?",
        answer: "Standard turnaround is 5–7 business days after you approve your mockup. Rush orders (48 hours) are available for an additional fee on select products. We'll always confirm your timeline when you place the order.",
      },
      {
        question: "When does the production clock start?",
        answer: "The production clock starts once you've approved your digital mockup and your deposit has been received. Delays in artwork approval or payment will delay your order, so we recommend approving proofs quickly.",
      },
      {
        question: "What printing methods do you offer?",
        answer: "We offer screen printing, DTF (Direct-to-Film) printing, and heat transfer vinyl (HTV). The best method depends on your design, quantity, and budget. We'll recommend the right option when you request a quote.",
      },
    ],
  },
  {
    label: 'Pickup, Shipping & Returns',
    icon: '🚚',
    items: [
      {
        question: "Can I pick up my order locally?",
        answer: "Yes. Local pickup is available and is the fastest way to receive your order. We'll contact you when your order is ready.",
      },
      {
        question: "Do you ship orders?",
        answer: "Yes. We ship orders nationwide. Shipping costs are calculated based on order size and destination and will be included in your final invoice.",
      },
      {
        question: "What if something is wrong with my order?",
        answer: "We stand behind every order. If there's a printing error or quality issue on our end, we'll reprint or refund — no hassle. Contact us within 7 days of receiving your order so we can make it right.",
      },
      {
        question: "Can I return or exchange shirts?",
        answer: "Custom printed items cannot be returned due to the nature of custom production. However, if we made an error, we will absolutely fix it. If you're unsatisfied with the quality of our work, please contact us and we'll work to resolve it.",
      },
    ],
  },
]

export default function FAQ() {
  return (
    <>
      <SEO
        title="FAQ — Custom Apparel Printing Questions Answered"
        description="Answers to common questions about ordering custom apparel from Allstar Prints LLC — minimums, turnaround, file types, rush orders, pickup, and more."
        path="/faq"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 w-[500px] h-[400px] rounded-full bg-brand-navy/15 blur-3xl -translate-x-1/2 -translate-y-1/2" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">FAQ</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Frequently Asked<br />
            <span className="text-gradient-red">Questions</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed max-w-xl mx-auto">
            Find answers to the most common questions about ordering, pricing, artwork, and turnaround. Still have questions? We're one message away.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section-padding py-16 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Jump links */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-3">Jump To</h3>
              <ul className="flex flex-col gap-1">
                {categories.map((cat) => (
                  <li key={cat.label}>
                    <a
                      href={`#${cat.label.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--/g, '-')}`}
                      className="flex items-center gap-2.5 py-2 px-3 rounded-lg text-sm font-semibold text-brand-silver hover:text-white hover:bg-white/5 transition-colors"
                    >
                      <span>{cat.icon}</span>
                      {cat.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/8">
                <p className="text-xs text-brand-silver/60 mb-2">Can't find your answer?</p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
                >
                  Contact us <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ content */}
          <div className="lg:col-span-3 flex flex-col gap-12">
            {categories.map((cat) => {
              const id = cat.label.toLowerCase().replace(/\s+/g, '-').replace(/[&]/g, '').replace(/--/g, '-')
              return (
                <div key={cat.label} id={id} className="scroll-mt-24">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="text-2xl">{cat.icon}</span>
                    <h2 className="text-xl font-black text-white">{cat.label}</h2>
                  </div>
                  <FAQAccordion items={cat.items} />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <CTABanner
        headline="Still Have Questions?"
        subtext="Our team is happy to answer anything. Reach out and we'll get back to you fast."
        primaryLabel="Contact Us"
        primaryHref="/contact"
        secondaryLabel="Get a Quote"
        secondaryHref="/pricing"
        icon="💬"
      />
    </>
  )
}
