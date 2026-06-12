/**
 * DesignLab.tsx — Custom Ink-style design workspace.
 *
 * Layout: left icon rail with a slide-out tool panel, the live product canvas
 * in the middle, Front/Back view thumbnails + Zoom on the right, and a bottom
 * bar with the product summary, Save, and Get Price.
 *
 * Reuses the existing customizer panels (TextControls, UploadImage,
 * ArtPalette, ColorSwatches, PrintLocationPicker) — only the shell is new.
 */
import { useMemo, useState, type RefObject } from 'react'
import { Link } from 'react-router-dom'
import Konva from 'konva'
import {
  Sparkles, Upload, Type, Shapes, Users, Shirt,
  ZoomIn, X, Save, ArrowRight, ChevronLeft,
} from 'lucide-react'
import { useCustomizer } from '../customizer'
import { totals } from '../customizer/pricing'
import { products, materials, sizes, PHOTO_ASPECT_RATIO } from '../customizer/constants'
import StageCanvas from '../customizer/canvas/StageCanvas'
import TextControls from '../customizer/panels/TextControls'
import ColorSwatches from '../customizer/panels/ColorSwatches'
import UploadImage from './UploadImage'
import ArtPalette from './ArtPalette'
import PrintLocationPicker from './PrintLocationPicker'
import NamesPanel from './NamesPanel'

const ACCENT = '#EE2A24'

type Tool = 'upload' | 'text' | 'art' | 'names' | 'product'

const TOOLS: { key: Tool; label: string; icon: typeof Upload }[] = [
  { key: 'upload', label: 'Upload', icon: Upload },
  { key: 'text', label: 'Add Text', icon: Type },
  { key: 'art', label: 'Add Art', icon: Shapes },
  { key: 'names', label: 'Add Names', icon: Users },
  { key: 'product', label: 'Product', icon: Shirt },
]

export default function DesignLab({
  stageRef,
  onBack,
  onContinue,
}: {
  stageRef: RefObject<Konva.Stage>
  onBack: () => void
  onContinue: () => void
}) {
  const productKey = useCustomizer((s) => s.productKey)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const side = useCustomizer((s) => s.side)
  const setSide = useCustomizer((s) => s.setSide)
  const selectElement = useCustomizer((s) => s.selectElement)
  const elements = useCustomizer((s) => s.elements)
  const product = products[productKey]
  const color = product.colors.find((c) => c.hex === shirtColor) || product.colors[0]

  const [tool, setTool] = useState<Tool | null>('text')
  const [zoomShot, setZoomShot] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [priceOpen, setPriceOpen] = useState(false)

  const backCount = useMemo(
    () => elements.filter((el) => (el.side ?? 'front') === 'back').length,
    [elements],
  )

  const takeSnapshot = () => {
    selectElement(null)
    return new Promise<string>((resolve) => {
      requestAnimationFrame(() => {
        try {
          resolve(stageRef.current?.toDataURL({ pixelRatio: 2, mimeType: 'image/png' }) || '')
        } catch {
          resolve('')
        }
      })
    })
  }

  const onZoom = async () => {
    const url = await takeSnapshot()
    if (url) setZoomShot(url)
  }

  const onSave = async () => {
    // Design state auto-persists to this device; Save also hands the user a PNG.
    const url = await takeSnapshot()
    if (url) {
      const a = document.createElement('a')
      a.href = url
      a.download = `allstar-design-${side}.png`
      a.click()
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2600)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-3 items-stretch">

        {/* ──────────────── left: icon rail + tool panel ──────────────── */}
        <div className="flex flex-row lg:flex-row gap-0 rounded-2xl overflow-hidden border border-white/8 bg-brand-dark3 self-start max-lg:w-full">
          <div className="flex lg:flex-col flex-row bg-brand-dark2 max-lg:w-full max-lg:justify-around">
            <Link
              to="/design-generator"
              className="flex flex-col items-center gap-1 px-3 py-3.5 text-brand-silver hover:text-white hover:bg-white/5 transition-colors"
              title="Generate art with AI"
            >
              <span className="relative">
                <Sparkles size={19} />
                <span className="absolute -top-2 -right-3 text-[7px] font-black uppercase bg-brand-red text-white px-1 py-px rounded-full">AI</span>
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wide">AI Design</span>
            </Link>
            {TOOLS.map((t) => (
              <button
                key={t.key}
                type="button"
                onClick={() => setTool(tool === t.key ? null : t.key)}
                className={`flex flex-col items-center gap-1 px-3 py-3.5 transition-colors ${
                  tool === t.key
                    ? 'bg-brand-dark3 text-brand-red'
                    : 'text-brand-silver hover:text-white hover:bg-white/5'
                }`}
              >
                <t.icon size={19} />
                <span className="text-[9px] font-bold uppercase tracking-wide">{t.label}</span>
              </button>
            ))}
          </div>

          {tool && (
            <div className="w-full lg:w-[300px] p-4 max-lg:border-t lg:border-l border-white/8 max-h-[560px] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black uppercase tracking-wide text-white">
                  {TOOLS.find((t) => t.key === tool)?.label}
                </span>
                <button type="button" onClick={() => setTool(null)} className="text-brand-silver hover:text-white">
                  <X size={14} />
                </button>
              </div>
              {tool === 'upload' && <UploadImage />}
              {tool === 'text' && <TextControls accent={ACCENT} />}
              {tool === 'art' && <ArtPalette />}
              {tool === 'names' && <NamesPanel />}
              {tool === 'product' && (
                <div className="flex flex-col gap-5">
                  <ColorSwatches accent={ACCENT} />
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-2">Print locations</div>
                    <PrintLocationPicker />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* ──────────────── center: live canvas ──────────────── */}
        <div className="rounded-2xl bg-brand-dark3 border border-white/8 p-4 sm:p-6 relative overflow-hidden min-w-0">
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
              maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
            }}
          />
          <div className="relative z-10 flex items-center justify-center">
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 520,
                aspectRatio: PHOTO_ASPECT_RATIO,
                filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.45))',
              }}
            >
              <StageCanvas ref={stageRef} />
            </div>
          </div>
          <p className="relative z-10 text-xs text-brand-silver/70 text-center mt-3">
            Click your design to drag · corner handles resize · top handle rotates · Delete removes
          </p>
        </div>

        {/* ──────────────── right: view switcher + zoom ──────────────── */}
        <div className="flex lg:flex-col flex-row gap-2 self-start max-lg:w-full max-lg:justify-center">
          {(['front', 'back'] as const).map((v) => {
            const thumb = v === 'back' ? (color.photoBack || color.photo) : color.photo
            const active = side === v
            return (
              <button
                key={v}
                type="button"
                onClick={() => setSide(v)}
                className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 transition-colors ${
                  active ? 'border-brand-red bg-brand-red/10' : 'border-white/10 bg-brand-dark3 hover:border-brand-red/50'
                }`}
              >
                <img src={thumb} alt={`${v} view`} className="w-16 h-20 object-cover rounded-lg" />
                <span className={`text-[10px] font-black uppercase tracking-wide ${active ? 'text-brand-red' : 'text-brand-silver'}`}>
                  {v}
                  {v === 'back' && backCount > 0 && <span className="ml-1 text-white">•</span>}
                </span>
              </button>
            )
          })}
          <button
            type="button"
            onClick={onZoom}
            className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-brand-dark3 hover:border-brand-red/50 p-3 text-brand-silver hover:text-white transition-colors"
          >
            <ZoomIn size={20} />
            <span className="text-[10px] font-black uppercase tracking-wide">Zoom</span>
          </button>
        </div>
      </div>

      {/* ──────────────── bottom bar ──────────────── */}
      <div className="rounded-2xl border border-white/8 bg-brand-dark3 px-4 py-3 flex items-center gap-4 flex-wrap">
        <img src={color.photo} alt="" className="w-10 h-12 object-cover rounded-md hidden sm:block" />
        <div className="min-w-0">
          <div className="text-sm font-black text-white leading-tight">{product.name}</div>
          <div className="text-[11px] text-brand-silver">
            {product.sku} · {color.name} ·{' '}
            <button type="button" onClick={onBack} className="text-brand-blue hover:text-white font-bold inline-flex items-center gap-0.5">
              <ChevronLeft size={11} /> Change product
            </button>
          </div>
        </div>
        <div className="flex-1" />
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-white/15 text-xs font-bold uppercase tracking-wider text-brand-silver hover:text-white hover:border-brand-red/60 transition-colors"
        >
          <Save size={14} /> {saved ? 'Saved ✓' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setPriceOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-red text-white font-black text-sm uppercase tracking-wider hover:bg-brand-red-dark transition-colors shadow-glow-red"
        >
          Get Price <ArrowRight size={15} />
        </button>
      </div>

      {/* zoom modal */}
      {zoomShot && (
        <div
          className="fixed inset-0 z-[70] bg-black/85 flex items-center justify-center p-6 cursor-zoom-out"
          onClick={() => setZoomShot(null)}
        >
          <img src={zoomShot} alt="Zoomed design preview" className="max-h-[92vh] max-w-[92vw] object-contain rounded-xl" />
          <button type="button" className="absolute top-5 right-5 text-white/70 hover:text-white" aria-label="Close zoom">
            <X size={26} />
          </button>
        </div>
      )}

      {/* get price modal */}
      {priceOpen && <PriceModal onClose={() => setPriceOpen(false)} onContinue={onContinue} />}
    </div>
  )
}

/* ───────────────────────── Get Price modal ───────────────────────── */
function PriceModal({ onClose, onContinue }: { onClose: () => void; onContinue: () => void }) {
  const qty = useCustomizer((s) => s.qty)
  const setQty = useCustomizer((s) => s.setQty)
  const size = useCustomizer((s) => s.size)
  const setSize = useCustomizer((s) => s.setSize)
  const material = useCustomizer((s) => s.material)
  const setMaterial = useCustomizer((s) => s.setMaterial)
  const printLocations = useCustomizer((s) => s.printLocations)
  const roster = useCustomizer((s) => s.roster)
  const { each, total, locUp } = totals(qty, material, printLocations, roster.length)
  const extraLocations = printLocations.filter((l) => l !== 'front')

  return (
    <div className="fixed inset-0 z-[70] bg-black/70 flex items-start justify-center overflow-y-auto p-4 pt-14" onClick={onClose}>
      <div className="bg-brand-dark2 border border-white/10 rounded-2xl max-w-lg w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-white">Your price</h2>
          <button type="button" onClick={onClose} className="text-brand-silver hover:text-white"><X size={18} /></button>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-2">Material</div>
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

          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-2">Size</div>
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

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60">Quantity</span>
              <span className="text-sm font-black text-white tabular-nums">{qty}</span>
            </div>
            <input
              type="range" min={1} max={288} value={qty}
              onChange={(e) => setQty(+e.target.value)}
              style={{ accentColor: ACCENT }}
              className="w-full"
            />
            <div className="flex justify-between text-[10px] text-brand-silver/50 mt-1">
              <span>1</span><span>72</span><span>288+</span>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-brand-red/15 to-transparent border border-brand-red/30 p-4">
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
                  <>${each} <span className="opacity-70">each</span><br /><span className="opacity-70">{qty} × {material}</span></>
                ) : (
                  <>101+ shirts<br /><span className="opacity-70">Call (817) 507-4553</span></>
                )}
              </div>
            </div>
            <p className="text-[10px] text-brand-silver/70 mt-3 leading-relaxed">
              Front print included · 1 color per location.
              {extraLocations.length > 0 && <> Add-ons: {extraLocations.join(' + ')} (+${locUp.toFixed(2)}/shirt).</>}
              {roster.length > 0 && <> Names &amp; numbers: {roster.length} × $4.</>}
              {' '}No charge today — we confirm with a proof first. 50% deposit on 12+ shirts.
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="w-full px-5 py-4 rounded-full bg-brand-red text-white font-black text-sm uppercase tracking-wider hover:bg-brand-red-dark transition-colors flex items-center justify-center gap-2 shadow-glow-red"
          >
            Continue to checkout <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
