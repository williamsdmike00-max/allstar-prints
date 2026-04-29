import { useCustomizer } from '../state'
import { materials } from '../constants'

// Floating chips overlaid on the bottom of the canvas card. Visuals match
// Home.tsx:1250-1290 verbatim.
export default function MaterialPicker({ accent }: { accent: string }) {
  const material = useCustomizer((s) => s.material)
  const setMaterial = useCustomizer((s) => s.setMaterial)

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        zIndex: 3,
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}
    >
      {materials.map((m) => (
        <button
          key={m.key}
          onClick={() => setMaterial(m.key)}
          style={{
            padding: '10px 16px',
            borderRadius: 99,
            fontSize: 12,
            fontWeight: 600,
            background: material === m.key ? accent : 'rgba(255,255,255,.06)',
            color: material === m.key ? 'white' : 'rgba(255,255,255,.7)',
            border: '1px solid rgba(255,255,255,.1)',
            backdropFilter: 'blur(8px)',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {m.label}
          <span style={{ opacity: 0.7, fontWeight: 700 }}>{m.hint}</span>
        </button>
      ))}
    </div>
  )
}
