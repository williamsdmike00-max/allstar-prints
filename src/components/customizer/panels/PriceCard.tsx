import { Link } from 'react-router-dom'
import { useCustomizer } from '../state'
import { totals } from '../pricing'

// Visuals copied from Home.tsx:1410-1499. Triggers `onLockIn` (which runs the
// PNG handoff) instead of the old no-op apply().
export default function PriceCard({
  accent,
  onLockIn,
}: {
  accent: string
  onLockIn: () => void
}) {
  const qty = useCustomizer((s) => s.qty)
  const material = useCustomizer((s) => s.material)
  const { each, total } = totals(qty, material)

  return (
    <div
      style={{
        border: `1px solid ${accent}55`,
        borderRadius: 18,
        padding: 20,
        background: `linear-gradient(135deg, ${accent}18, transparent)`,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,.5)',
            }}
          >
            {total != null ? 'Estimated' : '101+ shirts'}
          </div>
          <div
            style={{
              fontFamily: 'Archivo Black, sans-serif',
              fontSize: total != null ? 48 : 32,
              lineHeight: 1,
              letterSpacing: '-.02em',
              marginTop: 4,
            }}
          >
            {total != null ? `$${total}` : 'Custom Quote'}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
          {each != null ? (
            <>
              ${each} <span style={{ opacity: 0.5 }}>each</span>
              <br />
              <span style={{ opacity: 0.5 }}>{qty} × {material}</span>
            </>
          ) : (
            <>
              Bulk pricing<br />
              <span style={{ opacity: 0.5 }}>Call (817) 507-4553</span>
            </>
          )}
        </div>
      </div>
      <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,.45)', lineHeight: 1.5 }}>
        Front print included · 1 color, 1 location. Add-ons: back +$5 · sleeve +$3 · name/number +$4. 50% deposit on 12+ shirts.
      </div>
      <button
        onClick={onLockIn}
        style={{
          width: '100%',
          marginTop: 16,
          padding: '18px',
          background: accent,
          color: 'white',
          borderRadius: 99,
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: '.04em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Lock in this design <span>★</span>
      </button>
      <Link
        to="/upload-artwork"
        style={{
          display: 'block',
          textAlign: 'center',
          marginTop: 12,
          fontSize: 12,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,.6)',
          textDecoration: 'underline',
        }}
      >
        Or upload your own artwork
      </Link>
    </div>
  )
}
