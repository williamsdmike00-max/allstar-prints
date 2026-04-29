// Coordinates for design elements are stored as percentages (0-100) of the
// print-zone box, not pixels. Render code converts to pixels at draw time so
// the design scales across breakpoints.

export type Side = 'front' | 'back'

export type Material = 'Standard' | 'Tri-Blend' | 'Heavy Cotton'

export type Size = 'S' | 'M' | 'L' | 'XL' | '2XL'

export type DesignFont =
  | 'Archivo Black'
  | 'Archivo'
  | 'Bricolage Grotesque'
  | 'JetBrains Mono'

export type TextElement = {
  id: string
  type: 'text'
  x: number             // % of print-zone width  (center)
  y: number             // % of print-zone height (center)
  fontSizePct: number   // % of print-zone height — drives the actual fontSize
  rotation: number
  anchor: 'center'
  text: string
  font: DesignFont
  color: string
}

export type ImageElement = {
  id: string
  type: 'image'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  anchor: 'center'
  src: string
}

export type DesignElement = TextElement | ImageElement

export type ShirtColor = {
  name: string
  hex: string
  photo: string
}

export type InkColor = {
  name: string
  hex: string
}

export type CustomizerHandoff = {
  shirtColorName: string
  shirtColorHex: string
  inkColorHex: string
  material: Material
  size: Size
  qty: number
  designText: string
  notes: string
  pngDataURL: string
}
