import CustGroup from './CustGroup'
import { useCustomizer } from '../state'
import { products, inkColors } from '../constants'

// Visuals copied verbatim from the original inline customizer (Home.tsx:1317-1359).
// Shirt-color swatches are scoped to the currently selected product so each
// product only shows the colors we actually have mockup photos for.
export default function ColorSwatches({ accent }: { accent: string }) {
  const productKey = useCustomizer((s) => s.productKey)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const inkColor = useCustomizer((s) => s.inkColor)
  const setShirtColor = useCustomizer((s) => s.setShirtColor)
  const setInkColor = useCustomizer((s) => s.setInkColor)
  const product = products[productKey]
  const productShirtColors = product.colors

  return (
    <>
      <CustGroup label={`Shirt color${productShirtColors.length === 1 ? ' (mockup)' : ''}`}>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {productShirtColors.map((c) => (
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
        {productShirtColors.length === 1 && (
          <div style={{ marginTop: 8, fontSize: 11, color: 'rgba(255,255,255,.55)', lineHeight: 1.5 }}>
            We've only mocked this product up in {productShirtColors[0].name.toLowerCase()} — request a different blank color in your project notes.
          </div>
        )}
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
