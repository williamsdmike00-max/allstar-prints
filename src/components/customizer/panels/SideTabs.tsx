import { useCustomizer } from '../state'

const C_INK_BLACK = '#0F1115'

// Front/Back tabs + the live "shirtHex · inkHex" readout. Layout copied
// from Home.tsx:1166-1200.
export default function SideTabs() {
  const side = useCustomizer((s) => s.side)
  const setSide = useCustomizer((s) => s.setSide)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const inkColor = useCustomizer((s) => s.inkColor)

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div style={{ display: 'flex', gap: 6 }}>
        {(['front', 'back'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setSide(s)}
            style={{
              padding: '8px 14px',
              borderRadius: 99,
              fontSize: 12,
              fontWeight: 600,
              background: side === s ? 'white' : 'transparent',
              color: side === s ? C_INK_BLACK : 'rgba(255,255,255,.6)',
              border: side === s ? '1px solid white' : '1px solid rgba(255,255,255,.15)',
              textTransform: 'uppercase',
              letterSpacing: '.06em',
              cursor: 'pointer',
            }}
          >
            {s}
          </button>
        ))}
      </div>
      <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
        {shirtColor.toUpperCase()} · {inkColor.toUpperCase()}
      </div>
    </div>
  )
}
