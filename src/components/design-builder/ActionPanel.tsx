import {
  Type,
  Image as ImageIcon,
  Palette,
  Sparkles,
  MapPin,
  Package,
  ArrowRight,
  ChevronLeft,
} from 'lucide-react'
import { useCustomizer } from '../customizer'
import { totals } from '../customizer/pricing'
import { materials, sizes } from '../customizer/constants'
import PanelGroup from './PanelGroup'
import UploadImage from './UploadImage'
import ArtPalette from './ArtPalette'
import PrintLocationPicker from './PrintLocationPicker'
import TextControls from '../customizer/panels/TextControls'
import ColorSwatches from '../customizer/panels/ColorSwatches'

const ACCENT = '#EE2A24' // brand-red

export default function ActionPanel({
  onBack,
  onContinue,
}: {
  onBack: () => void
  onContinue: () => void
}) {
  const qty = useCustomizer((s) => s.qty)
  const material = useCustomizer((s) => s.material)
  const setMaterial = useCustomizer((s) => s.setMaterial)
  const size = useCustomizer((s) => s.size)
  const setSize = useCustomizer((s) => s.setSize)
  const setQty = useCustomizer((s) => s.setQty)
  const printLocations = useCustomizer((s) => s.printLocations)
  const { each, total, locUp } = totals(qty, material, printLocations)
  const extraLocations = printLocations.filter((l) => l !== 'front')

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={onBack}
        className="self-start inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-silver hover:text-white transition-colors"
      >
        <ChevronLeft size={14} /> Change product
      </button>

      <PanelGroup label="Add Text" icon={<Type size={14} />} defaultOpen>
        <TextControls accent={ACCENT} />
      </PanelGroup>

      <PanelGroup label="Upload Image" icon={<ImageIcon size={14} />}>
        <UploadImage />
      </PanelGroup>

      <PanelGroup label="Add Art" icon={<Sparkles size={14} />}>
        <ArtPalette />
      </PanelGroup>

      <PanelGroup label="Shirt & Ink Color" icon={<Palette size={14} />} defaultOpen>
        <div className="flex flex-col gap-4">
          <ColorSwatches accent={ACCENT} />
        </div>
      </PanelGroup>

      <PanelGroup label="Print Location" icon={<MapPin size={14} />}>
        <PrintLocationPicker />
      </PanelGroup>

      <PanelGroup label="Material, Size, Quantity" icon={<Package size={14} />}>
        <div className="flex flex-col gap-4">
          {/* Material chips */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-2">
              Material
            </div>
            <div className="flex flex-wrap gap-1.5">
              {materials.map((m) => (
                <button
                  key={m.key}
                  type="button"
                  onClick={() => setMaterial(m.key)}
                  className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors ${
                    material === m.key
                      ? 'bg-brand-red text-white border-brand-red'
                      : 'bg-brand-dark4 text-brand-silver border-white/10 hover:border-brand-red/60'
                  }`}
                >
                  {m.label} <span className="opacity-70 ml-1">{m.hint}</span>
                </button>
              ))}
            </div>
          </div>
          {/* Size buttons */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-2">
              Size
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={`py-2 rounded-lg text-xs font-black border transition-colors ${
                    size === s
                      ? 'bg-white text-brand-dark border-white'
                      : 'bg-transparent text-brand-silver border-white/15 hover:border-brand-red/60'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {/* Qty slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60">
                Quantity
              </span>
              <span className="text-sm font-black text-white tabular-nums">{qty}</span>
            </div>
            <input
              type="range"
              min={1}
              max={288}
              value={qty}
              onChange={(e) => setQty(+e.target.value)}
              style={{ accentColor: ACCENT }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-brand-silver/50 mt-1">
              <span>1</span><span>72</span><span>288+</span>
            </div>
          </div>
        </div>
      </PanelGroup>

      {/* Pricing card */}
      <div className="rounded-xl bg-gradient-to-br from-brand-red/15 to-transparent border border-brand-red/30 p-4 mt-1">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] font-black uppercase tracking-wider text-brand-silver">
              {total != null ? 'Estimated total' : 'Bulk quote'}
            </div>
            <div className="text-3xl font-black text-white leading-none mt-1">
              {total != null ? `$${total}` : 'Custom'}
            </div>
          </div>
          <div className="text-right text-xs text-brand-silver">
            {each != null ? (
              <>
                ${each} <span className="opacity-70">each</span>
                <br />
                <span className="opacity-70">{qty} × {material}</span>
              </>
            ) : (
              <>101+ shirts<br /><span className="opacity-70">Call (817) 507-4553</span></>
            )}
          </div>
        </div>
        <p className="text-[10px] text-brand-silver/70 mt-3 leading-relaxed">
          Front print included · 1 color per location.
          {extraLocations.length > 0 && (
            <>
              {' '}Add-ons: {extraLocations.map((l) => l).join(' + ')} (+${locUp.toFixed(2)}/shirt).
            </>
          )}
          {' '}50% deposit on 12+ shirts.
        </p>
      </div>

      {/* Continue CTA */}
      <button
        type="button"
        onClick={onContinue}
        className="w-full mt-2 px-5 py-4 rounded-full bg-brand-red text-white font-black text-sm uppercase tracking-wider hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 shadow-glow-red"
      >
        Continue to checkout <ArrowRight size={16} />
      </button>
    </div>
  )
}
