import CustGroup from './CustGroup'
import { useCustomizer } from '../state'
import { sizes } from '../constants'

const C_INK_BLACK = '#0F1115'

export default function SizeQty({ accent }: { accent: string }) {
  const size = useCustomizer((s) => s.size)
  const qty = useCustomizer((s) => s.qty)
  const setSize = useCustomizer((s) => s.setSize)
  const setQty = useCustomizer((s) => s.setQty)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <CustGroup label="Size">
        <div style={{ display: 'flex', gap: 6 }}>
          {sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              style={{
                flex: 1,
                padding: '12px 0',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                background: size === s ? 'white' : 'transparent',
                color: size === s ? C_INK_BLACK : 'rgba(255,255,255,.7)',
                border: '1px solid rgba(255,255,255,.15)',
                cursor: 'pointer',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </CustGroup>
      <CustGroup label={`Qty: ${qty}`}>
        <input
          type="range"
          min={1}
          max={288}
          value={qty}
          onChange={(e) => setQty(+e.target.value)}
          style={{ width: '100%', accentColor: accent }}
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 11,
            color: 'rgba(255,255,255,.4)',
            marginTop: 4,
          }}
        >
          <span>1</span>
          <span>72</span>
          <span>288+</span>
        </div>
      </CustGroup>
    </div>
  )
}
