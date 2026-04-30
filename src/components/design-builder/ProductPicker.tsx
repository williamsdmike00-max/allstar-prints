import { ArrowRight, Check } from 'lucide-react'
import { productList, type ProductKey } from '../customizer'

export type DesignableProductKey = ProductKey

interface CardCopy {
  /** One-line teaser shown under the product name. */
  description: string
}

// Marketing copy keyed to the canonical product list. Keeping it in this
// component means tweaking the wording is a one-file change for the whole
// product picker.
const COPY: Record<ProductKey, CardCopy> = {
  'tshirt-gildan-64000': {
    description: 'Ringspun cotton, 8 colors. Front, back, and sleeve print available. Starts at $12/each.',
  },
  'longsleeve-gildan-g2400': {
    description: 'Heavyweight long-sleeve. Black mockup — ask for any other color in your project notes.',
  },
  'hoodie-gildan-18500': {
    description: 'Heavy cotton pullover hoodie. Print sits between the V-neck and the front pouch.',
  },
  'heavytee-gildan-2000': {
    description: 'Heavy 6 oz cotton tee. Built to last, easy to print.',
  },
}

export default function ProductPicker({
  onSelect,
}: {
  onSelect: (key: DesignableProductKey) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
          Pick what you're putting your design on
        </h2>
        <p className="text-sm text-brand-silver max-w-xl">
          Every product below opens the live designer. Drop in your art or text, position it, and we'll print it.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {productList.map((p) => (
          <button
            key={p.key}
            type="button"
            onClick={() => onSelect(p.key)}
            className="group relative flex flex-col rounded-2xl border border-brand-red/30 bg-brand-dark3 overflow-hidden hover:border-brand-red/80 hover:shadow-glow-red text-left cursor-pointer transition-all"
          >
            <div className="aspect-[4/5] bg-brand-dark2 overflow-hidden">
              <img
                src={p.colors[0].photo}
                alt={p.name}
                className="w-full h-full object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="p-4 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wide rounded-full bg-brand-red/15 text-brand-red border border-brand-red/30 inline-flex items-center gap-1">
                  <Check size={10} strokeWidth={3} /> Design now
                </span>
                <span className="text-[10px] text-brand-silver/70 truncate">{p.sku}</span>
              </div>
              <h3 className="text-base font-black text-white">{p.name}</h3>
              <p className="text-xs text-brand-silver leading-relaxed">
                {COPY[p.key].description}
              </p>
              <div className="flex items-center gap-1 text-xs font-bold text-brand-red mt-1 group-hover:gap-2 transition-all">
                Start designing <ArrowRight size={12} />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
