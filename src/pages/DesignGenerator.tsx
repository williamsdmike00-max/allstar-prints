import { ArrowRight, Sparkles, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

export default function DesignGenerator() {
  return (
    <>
      <SEO
        title="AI Shirt Design Generator — Create Your Custom Design"
        description="Use our free AI-powered shirt design generator to create custom apparel designs instantly. Then let Allstar Prints LLC bring your design to life with professional printing."
        path="/design-generator"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-brand-red/8 blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-brand-navy/20 blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <div className="inline-flex items-center gap-2 bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-5">
            <Sparkles size={13} />
            AI-Powered Design Tool
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
            Design Your Custom Shirt<br />
            <span className="text-gradient-red">In Seconds With AI</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed max-w-2xl mx-auto mb-6">
            Choose your event, style, and colors — our AI generates a print-ready design instantly.
            Love what you see? We'll print it for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-brand-silver/60">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> Free to use</span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> DTF print-ready output</span>
            <span className="hidden sm:block">·</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> No account needed</span>
          </div>
        </div>
      </section>

      {/* Embedded app */}
      <section className="bg-brand-dark2 py-10">
        <div className="container-xl section-padding">
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white">
            <iframe
              src="https://shirt-design-gen.vercel.app/"
              title="AI Shirt Design Generator"
              className="w-full"
              style={{ height: '820px', border: 'none' }}
              allow="clipboard-write"
            />
          </div>
        </div>
      </section>

      {/* CTA — after generating, order it */}
      <section className="bg-gradient-to-r from-brand-red/15 via-brand-dark2 to-brand-red/15 border-y border-white/8 py-16">
        <div className="container-xl section-padding text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Love Your Design? <span className="text-gradient-red">We'll Print It.</span>
          </h2>
          <p className="text-brand-silver text-lg max-w-xl mx-auto mb-8">
            Download your design from the tool above, then upload it here and we'll handle the rest — free mockup, fast turnaround, and quality guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/upload-artwork"
              className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-0.5"
            >
              <Upload size={16} /> Upload My Design
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center justify-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-md transition-all hover:bg-white/5"
            >
              Get a Free Quote <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
