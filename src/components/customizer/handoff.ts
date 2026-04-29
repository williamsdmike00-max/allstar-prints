import Konva from 'konva'
import { CustomizerState, firstTextElement } from './state'
import { shirtColors, HANDOFF_KEY } from './constants'
import { CustomizerHandoff } from './types'

// Captures the current canvas as a PNG, builds a notes blurb for the
// upload-artwork form, and stashes everything into sessionStorage so the
// destination page can pre-fill regardless of how it was navigated to.
export async function buildHandoff(
  stage: Konva.Stage | null,
  state: CustomizerState,
): Promise<CustomizerHandoff> {
  const shirtName =
    shirtColors.find((c) => c.hex === state.shirtColor)?.name || 'Custom'
  const txtEl = firstTextElement(state.elements)
  const designText = txtEl?.text || ''

  // Deselect before snapshot so the Transformer handles don't appear in the PNG.
  // (Caller is responsible for clearing selection before invoking.)
  let pngDataURL = ''
  if (stage) {
    try {
      pngDataURL = stage.toDataURL({ pixelRatio: 2, mimeType: 'image/png' })
    } catch (err) {
      console.warn('Customizer: stage.toDataURL failed; continuing without PNG', err)
    }
  }

  const lines = [
    'Designed in customizer:',
    `• Shirt: ${shirtName} (${state.shirtColor.toUpperCase()})`,
    `• Ink: ${state.inkColor.toUpperCase()}`,
    `• Material: ${state.material}`,
    `• Size: ${state.size}, Qty: ${state.qty}`,
    designText ? `• Text: "${designText}"` : null,
    '',
    'See attached preview. Upload your final art below.',
  ].filter(Boolean) as string[]

  const handoff: CustomizerHandoff = {
    shirtColorName: shirtName,
    shirtColorHex: state.shirtColor,
    inkColorHex: state.inkColor,
    material: state.material,
    size: state.size,
    qty: state.qty,
    designText,
    notes: lines.join('\n'),
    pngDataURL,
  }

  try {
    sessionStorage.setItem(HANDOFF_KEY, JSON.stringify(handoff))
  } catch (err) {
    console.warn('Customizer: failed to write handoff to sessionStorage', err)
  }
  return handoff
}

export function readHandoff(): CustomizerHandoff | null {
  try {
    const raw = sessionStorage.getItem(HANDOFF_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CustomizerHandoff
  } catch {
    return null
  }
}

export function clearHandoff() {
  try {
    sessionStorage.removeItem(HANDOFF_KEY)
  } catch {
    /* private browsing, ignore */
  }
}

export async function dataURLToFile(
  dataURL: string,
  filename = 'allstar-customizer-preview.png',
): Promise<File | null> {
  if (!dataURL) return null
  try {
    const res = await fetch(dataURL)
    const blob = await res.blob()
    return new File([blob], filename, { type: blob.type || 'image/png' })
  } catch (err) {
    console.warn('Customizer: failed to convert dataURL to File', err)
    return null
  }
}
