import { ArrowRight, Check, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'

export type DesignableProductKey =
  | 'tshirt-gildan-64000'
  | 'hoodie'
  | 'longsleeve'
  | 'polo'
  | 'jersey'
  | 'hat'

interface Product {
  key: DesignableProductKey
  name: string
  sku?: string
  description: string
  photo: string
  designable: boolean   // can the user use the canvas designer for this?
}

const PRODUCTS: Product[] = [
  {
    key: 'tshirt-gildan-64000',
    name: 'Classic Crew T-Shirt',
    sku: 'Gildan 64000',
    description: 'Ringspun cotton, 8 colors. Front + back print. Starts at $12/each.',
    photo: '/mockups/customizer/64000-black.jpg',
    designable: true,
  },
  {
    key: 'longsleeve',
    name: 'Long Sleeve Tee',
    sku: 'Gildan G2400',
    description: 'Heavyweight long-sleeve. Black mockup. Quote first, design after.',
    photo: '/mockups/gildan-g2400-black.jpg',
    designable: false,
  },
  {
    key: 'hoodie',
    name: 'Pullover Hoodie',
    sku: 'Gildan 18500',
    description: 'Heavy cotton hoodie. Navy mockup. Quote first, we mock it up.',
    photo: '/mockups/gildan-18500-navy.jpg',
    designable: false,
  },
  {
    key: 'jersey',
    name: 'Heavyweight Tee',
    sku: 'Gildan 2000',
    description: 'Heavy 6 oz cotton, long-lasting. Quote first.',
    photo: '/mockups/gildan-2000-black.jpg',
    designable: false,
  },
  {
    key: 'polo',
    name: 'Embroidered Polo',
    sku: 'BC3413',
    description: 'Business polo. Embroidery preferred. Quote first.',
    photo: '/mockups/bc3413-charcoal.jpg',
    designable: false,
  },
  {
    key: 'hat',
    name: 'Structured Cap',
    sku: 'C112',
    description: 'Trucker style. Quote first — embroidery or patch.',
    photo: '/mockups/portauthority-c112-grey-black.jpg',
    designable: false,
  },
]

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
          Our online designer is fully wired up for the Classic Crew T-Shirt today. Other items run through the same shop — we just mock them up by hand.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.key} product={p} onSelect={onSelect} />
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  onSelect,
}: {
  product: Product
  onSelect: (key: DesignableProductKey) => void
}) {
  const cardCommon =
    'group relative flex flex-col rounded-2xl border bg-brand-dark3 overflow-hidden transition-all'

  if (product.designable) {
    return (
      <button
        type="button"
        onClick={() => onSelect(product.key)}
        className={`${cardCommon} border-brand-red/30 hover:border-brand-red/80 hover:shadow-glow-red text-left cursor-pointer`}
      >
        <div className="aspect-[4/5] bg-brand-dark2 overflow-hidden">
          <img
            src={product.photo}
            alt={product.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wide rounded-full bg-brand-red/15 text-brand-red border border-brand-red/30 inline-flex items-center gap-1">
              <Check size={10} strokeWidth={3} /> Design now
            </span>
            {product.sku && (
              <span className="text-[10px] text-brand-silver/70 truncate">{product.sku}</span>
            )}
          </div>
          <h3 className="text-base font-black text-white">{product.name}</h3>
          <p className="text-xs text-brand-silver leading-relaxed">{product.description}</p>
          <div className="flex items-center gap-1 text-xs font-bold text-brand-red mt-1 group-hover:gap-2 transition-all">
            Start designing <ArrowRight size={12} />
          </div>
        </div>
      </button>
    )
  }

  return (
    <div className={`${cardCommon} border-white/8 opacity-95`}>
      <div className="aspect-[4/5] bg-brand-dark2 overflow-hidden relative">
        <img
          src={product.photo}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
      </div>
      <div className="p-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wide rounded-full bg-white/8 text-brand-silver border border-white/15 inline-flex items-center gap-1">
            <Mail size={10} /> Quote first
          </span>
          {product.sku && (
            <span className="text-[10px] text-brand-silver/70 truncate">{product.sku}</span>
          )}
        </div>
        <h3 className="text-base font-black text-white">{product.name}</h3>
        <p className="text-xs text-brand-silver leading-relaxed">{product.description}</p>
        <Link
          to="/upload-artwork"
          className="flex items-center gap-1 text-xs font-bold text-brand-blue mt-1 hover:gap-2 transition-all"
        >
          Send us your artwork <ArrowRight size={12} />
        </Link>
      </div>
    </div>
  )
}
