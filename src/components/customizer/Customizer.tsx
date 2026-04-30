import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Konva from 'konva'
import { useCustomizer } from './state'
import { PHOTO_ASPECT_RATIO, shirtColors } from './constants'
import { buildHandoff } from './handoff'
import StageCanvas from './canvas/StageCanvas'
import SideTabs from './panels/SideTabs'
import TextControls from './panels/TextControls'
import ColorSwatches from './panels/ColorSwatches'
import SizeQty from './panels/SizeQty'
import MaterialPicker from './panels/MaterialPicker'
import PriceCard from './panels/PriceCard'

const C_INK_BLACK = '#0F1115'
const C_PAPER = '#FFFFFE'

// Compact local copy of SectionLabel — keeps Customizer self-contained so it
// can be imported from anywhere without dragging Home.tsx along.
function SectionLabel({ n, l, accent }: { n: string; l: string; accent: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: 28, height: 28, borderRadius: 99,
          background: accent, color: 'white',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11,
        }}
      >
        {n}
      </span>
      {l}
    </div>
  )
}

interface Tweaks {
  shirtColor: string
  inkColor: string
  accent: string
  motion: number
  design: string
  shirtModel: 'heavy' | 'classic'
}

export default function Customizer({
  tweaks,
  setTweaks,
}: {
  tweaks: Tweaks
  setTweaks: (next: Partial<Tweaks>) => void
}) {
  const navigate = useNavigate()
  const stageRef = useRef<Konva.Stage>(null)

  const side = useCustomizer((s) => s.side)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const inkColor = useCustomizer((s) => s.inkColor)
  const elements = useCustomizer((s) => s.elements)
  const selectElement = useCustomizer((s) => s.selectElement)
  const hydrate = useCustomizer((s) => s.hydrate)

  // First-mount hydration from parent defaults; later edits stay in the store.
  useEffect(() => {
    hydrate({
      shirtColor: tweaks.shirtColor,
      inkColor: tweaks.inkColor,
      design: tweaks.design,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Mirror store -> parent so the rest of Home (hero parallax, accent tint)
  // keeps reading the live customizer choices, just like the old `apply()`.
  const [bridged, setBridged] = useState({ shirt: shirtColor, ink: inkColor, design: '' })
  useEffect(() => {
    const firstText = elements.find((e) => e.type === 'text')
    const designText = firstText && firstText.type === 'text' ? firstText.text : tweaks.design
    if (
      bridged.shirt === shirtColor &&
      bridged.ink === inkColor &&
      bridged.design === designText
    ) return
    setBridged({ shirt: shirtColor, ink: inkColor, design: designText })
    setTweaks({ shirtColor, inkColor, design: designText })
  }, [shirtColor, inkColor, elements, bridged, setTweaks, tweaks.design])

  const handleLockIn = async () => {
    // Hide Transformer handles before snapshot, then restore.
    const prevSelection = useCustomizer.getState().selectedId
    selectElement(null)
    // Wait one frame so Konva re-renders without the transformer.
    await new Promise((r) => requestAnimationFrame(() => r(null)))

    await buildHandoff(stageRef.current, useCustomizer.getState())

    if (prevSelection) selectElement(prevSelection)

    navigate('/upload-artwork', { state: { fromCustomizer: true } })
  }

  const radial = `radial-gradient(800px 500px at 30% 50%, ${inkColor}22, transparent 70%)`

  return (
    <section
      id="customizer"
      style={{
        position: 'relative',
        background: C_INK_BLACK,
        color: C_PAPER,
        padding: '120px 28px',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: radial,
        }}
      />
      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
        <SectionLabel n="01" l="Live customizer" accent={tweaks.accent} />
        <h2
          style={{
            fontFamily: 'Archivo Black, sans-serif',
            fontSize: 'clamp(44px, 6vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-.03em',
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          Design it. <span style={{ color: tweaks.accent }}>See it.</span> Order it.
        </h2>
        <p
          style={{
            maxWidth: 540,
            marginTop: 16,
            color: 'rgba(255,255,255,.7)',
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          Pick a blank, drop in art or type, drag it into place, and set your quantity. Every change re-renders on the shirt in real time.
        </p>
        <div style={{ marginTop: 18 }}>
          <Link
            to="/design-online"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 18px',
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: 'white',
              background: 'rgba(255,255,255,.08)',
              border: `1px solid ${tweaks.accent}55`,
              textDecoration: 'none',
            }}
          >
            Open the full Design Online tool →
          </Link>
        </div>

        <div
          className="ap-cust-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginTop: 64 }}
        >
          {/* Canvas card */}
          <div
            style={{
              background: '#16191F',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,.08)',
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 460,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
              }}
            />
            <SideTabs />

            <div
              style={{
                height: 'min(56vh, 520px)',
                position: 'relative',
                zIndex: 2,
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  aspectRatio: PHOTO_ASPECT_RATIO,
                  maxWidth: '100%',
                  filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.45))',
                }}
              >
                <StageCanvas ref={stageRef} disabled={side === 'back'} />

                {side === 'back' && (
                  <div
                    style={{
                      position: 'absolute',
                      inset: '20% 10%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      pointerEvents: 'none',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        letterSpacing: '.16em',
                        textTransform: 'uppercase',
                        color: tweaks.accent,
                        fontWeight: 700,
                      }}
                    >
                      Coming soon
                    </div>
                    <div
                      style={{
                        fontFamily: 'Archivo Black, sans-serif',
                        fontSize: 'clamp(22px, 3vw, 36px)',
                        lineHeight: 1.05,
                        color: 'white',
                        maxWidth: 420,
                      }}
                    >
                      Back-side print
                    </div>
                    <div
                      style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,.7)',
                        maxWidth: 380,
                        lineHeight: 1.5,
                      }}
                    >
                      Adds +$5 per shirt. We're still photographing back-side mockups — for now, design the front and add a back-print note when you upload.
                    </div>
                  </div>
                )}
              </div>
            </div>

            <MaterialPicker accent={tweaks.accent} />
          </div>

          {/* Side panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <TextControls accent={tweaks.accent} />
            <ColorSwatches accent={tweaks.accent} />
            <SizeQty accent={tweaks.accent} />
            <PriceCard accent={tweaks.accent} onLockIn={handleLockIn} />
          </div>
        </div>

        {/* Tip line */}
        <div
          style={{
            marginTop: 24,
            fontSize: 12,
            color: 'rgba(255,255,255,.45)',
            textAlign: 'center',
            letterSpacing: '.04em',
          }}
        >
          Tip · Click the design to drag · grab a corner to resize · top handle rotates · Delete removes · {currentShirtName(shirtColor)} selected
        </div>
      </div>
    </section>
  )
}

function currentShirtName(hex: string) {
  return shirtColors.find((c) => c.hex === hex)?.name || 'Custom'
}
