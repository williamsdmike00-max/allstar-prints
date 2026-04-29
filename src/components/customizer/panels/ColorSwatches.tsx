import CustGroup from './CustGroup'
import { useCustomizer } from '../state'
import { shirtColors, inkColors } from '../constants'

// Visuals copied verbatim from the original inline customizer (Home.tsx:1317-1359).
export default function ColorSwatches({ accent }: { accent: string }) {
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const inkColor = useCustomizer((s) => s.inkColor)
  const setShirtColor = useCustomizer((s) => s.setShirtColor)
  const setInkColor = useCustomizer((s) => s.setInkColor)

  return (
    <>
      <CustGroup label="Shirt color">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {shirtColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setShirtColor(c.hex)}
              title={c.name}
              style={{
                width: 42,
                height: 42,
                borderRadius: 99,
                background: c.hex,
                border:
                  shirtColor === c.hex ? '2px solid white' : '2px solid rgba(255,255,255,.1)',
                boxShadow: shirtColor === c.hex ? `0 0 0 4px ${accent}55` : 'none',
                transition: 'all .2s',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </CustGroup>

      <CustGroup label="Ink color">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {inkColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setInkColor(c.hex)}
              title={c.name}
              style={{
                width: 42,
                height: 42,
                borderRadius: 99,
                background: c.hex,
                border:
                  inkColor === c.hex ? '2px solid white' : '2px solid rgba(255,255,255,.1)',
                boxShadow: inkColor === c.hex ? `0 0 0 4px ${accent}55` : 'none',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      </CustGroup>
    </>
  )
}
