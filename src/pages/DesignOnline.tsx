import { useEffect, useRef, useState } from 'react'
import Konva from 'konva'
import { useSearchParams } from 'react-router-dom'
import SEO from '../components/ui/SEO'
import StepIndicator, { type StepKey } from '../components/design-builder/StepIndicator'
import ProductPicker, { type DesignableProductKey } from '../components/design-builder/ProductPicker'
import DesignLab from '../components/design-builder/DesignLab'
import CheckoutStep from '../components/design-builder/CheckoutStep'
import { useCustomizer } from '../components/customizer'
import { readBlankStyle } from '../lib/orders'

export default function DesignOnline() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialStep = (searchParams.get('step') as StepKey | null) || 'product'
  const [step, setStep] = useState<StepKey>(initialStep)
  const [pngDataURL, setPngDataURL] = useState('')
  const [pngDataURLBack, setPngDataURLBack] = useState('')
  const stageRef = useRef<Konva.Stage>(null)
  const selectElement = useCustomizer((s) => s.selectElement)
  const setProduct = useCustomizer((s) => s.setProduct)
  const setSide = useCustomizer((s) => s.setSide)

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

  const handleSelectProduct = (key: DesignableProductKey) => {
    // Switch the canvas to render this product's mockup + print zone, then
    // advance. setProduct also re-clamps shirtColor to a valid swatch for the
    // new product's palette.
    setProduct(key)
    setStep('design')
  }

  const snapshot = () => {
    try {
      return stageRef.current?.toDataURL({ pixelRatio: 2, mimeType: 'image/png' }) || ''
    } catch (err) {
      console.warn('DesignOnline: stage.toDataURL failed', err)
      return ''
    }
  }

  const handleContinueToCheckout = async () => {
    // Deselect first so transformer handles aren't baked into the snapshot.
    selectElement(null)
    const { side, elements } = useCustomizer.getState()
    const hasBack = elements.some((el) => (el.side ?? 'front') === 'back')
    const hasFront = elements.some((el) => (el.side ?? 'front') !== 'back')

    // Capture each designed side; switching sides swaps the product photo, so
    // give the canvas a beat to load it before snapshotting.
    const settle = (ms: number) => new Promise((r) => setTimeout(r, ms))
    let front = ''
    let back = ''
    if (side !== 'front') { setSide('front'); await settle(700) } else { await settle(60) }
    front = snapshot()
    if (hasBack) {
      setSide('back')
      await settle(700)
      back = snapshot()
      setSide('front')
    }
    setPngDataURL(hasFront || !back ? front : '')
    setPngDataURLBack(back)
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
            <BlankStyleChip />
          </div>
          <StepIndicator current={step} onJump={goTo} />
        </div>
      </section>

      {/* Body */}
      <section className="container-xl section-padding py-10 md:py-14">
        {step === 'product' && <ProductPicker onSelect={handleSelectProduct} />}

        {step === 'design' && (
          <DesignLab
            stageRef={stageRef}
            onBack={() => setStep('product')}
            onContinue={handleContinueToCheckout}
          />
        )}

        {step === 'checkout' && (
          <CheckoutStep
            pngDataURL={pngDataURL}
            pngDataURLBack={pngDataURLBack}
            onBack={() => setStep('design')}
          />
        )}
      </section>
    </>
  )
}

/** Small banner shown when the customer arrived from Browse Blanks. */
function BlankStyleChip() {
  const blank = readBlankStyle()
  if (!blank) return null
  return (
    <p className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/30 text-xs font-bold text-white">
      <span className="text-brand-red">★</span>
      Designing on: {blank.brand} {blank.styleNumber}{blank.title ? ` — ${blank.title}` : ''}
      <span className="text-brand-silver font-normal">(rides along with your quote)</span>
    </p>
  )
}

