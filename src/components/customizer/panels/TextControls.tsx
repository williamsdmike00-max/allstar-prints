import { useEffect, useMemo, useState } from 'react'
import CustGroup from './CustGroup'
import { useCustomizer, firstTextElement } from '../state'
import { TextElement } from '../types'

// Keeps the same look as the original side-panel input (max 12 chars,
// auto-uppercased) but now drives the *selected* text element on the canvas.
// If no element is selected, it edits the first text element by default.
export default function TextControls({ accent }: { accent: string }) {
  const elements = useCustomizer((s) => s.elements)
  const selectedId = useCustomizer((s) => s.selectedId)
  const selectElement = useCustomizer((s) => s.selectElement)
  const updateElement = useCustomizer((s) => s.updateElement)
  const addText = useCustomizer((s) => s.addText)

  const target = useMemo<TextElement | null>(() => {
    if (selectedId) {
      const sel = elements.find((e) => e.id === selectedId)
      if (sel && sel.type === 'text') return sel
    }
    return firstTextElement(elements)
  }, [selectedId, elements])

  // Mirror target text in local state so typing feels snappy.
  const [text, setText] = useState(target?.text || '')
  useEffect(() => { setText(target?.text || '') }, [target?.id, target?.text])

  const commit = (next: string) => {
    const clean = next.slice(0, 12).toUpperCase()
    setText(clean)
    if (target) updateElement(target.id, { text: clean })
  }

  return (
    <CustGroup label="Your text">
      <input
        value={text}
        onChange={(e) => commit(e.target.value)}
        onFocus={() => target && selectElement(target.id)}
        placeholder="ALLSTAR"
        style={{
          width: '100%',
          background: 'transparent',
          border: '1px solid rgba(255,255,255,.15)',
          borderRadius: 14,
          padding: '18px 20px',
          color: 'white',
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: 24,
          letterSpacing: '-.02em',
          outline: 'none',
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 6,
        }}
      >
        <button
          type="button"
          onClick={() => addText('NEW')}
          style={{
            fontSize: 11,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: accent,
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            fontWeight: 700,
          }}
        >
          + Add text
        </button>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>{text.length}/12</div>
      </div>
    </CustGroup>
  )
}
