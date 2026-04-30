import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import StepIndicator, { type StepKey } from '../components/design-builder/StepIndicator'
import ProductPicker, { type DesignableProductKey } from '../components/design-builder/ProductPicker'
import ActionPanel from '../components/design-builder/ActionPanel'
import CheckoutStep from '../components/design-builder/CheckoutStep'
import StageCanvas from '../components/customizer/canvas/StageCanvas'
import { PHOTO_ASPECT_RATIO } from '../components/customizer/constants'
import { useCustomizer } from '../components/customizer'

export default function DesignOnline() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialStep = (searchParams.get('step') as StepKey | null) || 'product'
  const [step, setStep] = useState<StepKey>(initialStep)
  const [pngDataURL, setPngDataURL] = useState('')
  const stageRef = useRef<Konva.Stage>(null)
  const selectElement = useCustomizer((s) => s.selectElement)

  // Keep ?step=… in the URL so back/forward + share-links work.
  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (step === 'product') params.delete('step')
    else params.set('step', step)
    setSearchParams(params, { replace: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step])

  // Smooth scroll to top when changing steps.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  const goTo = (next: StepKey) => setStep(next)

  const handleSelectProduct = (_key: DesignableProductKey) => {
    // Today only the t-shirt (Gildan 64000) is canvas-designable; the picker
    // disables Continue for the others. So if we got here, it's the t-shirt.
    setStep('design')
  }

  const handleContinueToCheckout = async () => {
    // Deselect first so transformer handles aren't baked into the snapshot.
    selectElement(null)
    await new Promise((r) => requestAnimationFrame(() => r(null)))
    let url = ''
    try {
      url = stageRef.current?.toDataURL({ pixelRatio: 2, mimeType: 'image/png' }) || ''
    } catch (err) {
      console.warn('DesignOnline: stage.toDataURL failed', err)
    }
    setPngDataURL(url)
    setStep('checkout')
  }

  return (
    <>
      <SEO
        title="Design Online — Custom Apparel Builder | Allstar Prints"
        description="Design your custom shirt online: pick a product, drop in art or text, drag it onto the shirt, and submit a quote — all in one place."
        path="/design-online"
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-12 md:py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-red/10 blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding">
          <div className="text-center mb-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">
              Design Online
            </p>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">
              Build your custom shirt in three steps.
            </h1>
            <p className="text-brand-silver text-base md:text-lg max-w-xl mx-auto leading-relaxed">
              Pick a product, drop in your art or type, and request a quote — we handle proofing, printing, and shipping.
            </p>
          </div>
          <StepIndicator current={step} onJump={goTo} />
        </div>
      </section>

      {/* Body */}
      <section className="container-xl section-padding py-10 md:py-14">
        {step === 'product' && <ProductPicker onSelect={handleSelectProduct} />}

        {step === 'design' && (
          <DesignStep
            stageRef={stageRef}
            onBack={() => setStep('product')}
            onContinue={handleContinueToCheckout}
          />
        )}

        {step === 'checkout' && (
          <CheckoutStep pngDataURL={pngDataURL} onBack={() => setStep('design')} />
        )}
      </section>
    </>
  )
}

function DesignStep({
  stageRef,
  onBack,
  onContinue,
}: {
  stageRef: React.RefObject<Konva.Stage>
  onBack: () => void
  onContinue: () => void
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px] gap-6 lg:gap-8 items-start">
      {/* Preview */}
      <div className="rounded-2xl bg-brand-dark3 border border-white/8 p-4 sm:p-6 relative overflow-hidden">
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
        <div className="relative z-10">
          <div className="text-[11px] font-black uppercase tracking-wider text-brand-silver/60 mb-3">
            Live preview
          </div>
          <div className="flex items-center justify-center">
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
          <p className="text-xs text-brand-silver/70 text-center mt-4">
            Click your design to drag · grab a corner to resize · top handle rotates · Delete removes
          </p>
        </div>
      </div>

      {/* Action panel */}
      <div>
        <ActionPanel onBack={onBack} onContinue={onContinue} />
      </div>
    </div>
  )
}
