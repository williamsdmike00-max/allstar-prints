import { ShirtColor, InkColor, Size, Material } from './types'

export type ProductKey =
  | 'tshirt-gildan-64000'
  | 'longsleeve-gildan-g2400'
  | 'hoodie-gildan-18500'
  | 'heavytee-gildan-2000'

export interface ProductDefinition {
  key: ProductKey
  name: string
  sku: string
  blurb: string
  /** Print-zone bbox as % of the 1200x1800 model-front photo. Calibrated per
   *  product so the dashed box sits over the chest, not on the hood or pocket. */
  printZone: { topPct: number; leftPct: number; widthPct: number; heightPct: number }
  /** Available shirt colors for this product. Photos must already exist in /public. */
  colors: ShirtColor[]
  /** Default color hex (matches one of `colors`). */
  defaultColorHex: string
}

export const PHOTO_ASPECT_RATIO = '1200 / 1800'

// Gildan Softstyle 64000 — full 8-color photoset, fully designable.
const TSHIRT_COLORS: ShirtColor[] = [
  { name: 'Black',        hex: '#1A1A1A', photo: '/mockups/customizer/64000-black.jpg' },
  { name: 'White',        hex: '#F5F5F0', photo: '/mockups/customizer/64000-white.jpg' },
  { name: 'Natural',      hex: '#E8DDC4', photo: '/mockups/customizer/64000-natural.jpg' },
  { name: 'Sport Grey',   hex: '#B8BCC0', photo: '/mockups/customizer/64000-sportgrey.jpg' },
  { name: 'Charcoal',     hex: '#4A4D52', photo: '/mockups/customizer/64000-charcoal.jpg' },
  { name: 'Navy',         hex: '#1F2A44', photo: '/mockups/customizer/64000-navy.jpg' },
  { name: 'Maroon',       hex: '#5C1F2A', photo: '/mockups/customizer/64000-maroon.jpg' },
  { name: 'Forest Green', hex: '#2A4A3C', photo: '/mockups/customizer/64000-forest.jpg' },
]

// Single-color photosets for the secondary products. These mockups only exist
// in one color; the user can request other colors via project notes.
const LONGSLEEVE_COLORS: ShirtColor[] = [
  { name: 'Black', hex: '#1A1A1A', photo: '/mockups/gildan-g2400-black.jpg' },
]

const HOODIE_COLORS: ShirtColor[] = [
  { name: 'Navy', hex: '#1F2A44', photo: '/mockups/gildan-18500-navy.jpg' },
]

const HEAVYTEE_COLORS: ShirtColor[] = [
  { name: 'Black', hex: '#1A1A1A', photo: '/mockups/gildan-2000-black.jpg' },
]

export const products: Record<ProductKey, ProductDefinition> = {
  'tshirt-gildan-64000': {
    key: 'tshirt-gildan-64000',
    name: 'Classic Crew T-Shirt',
    sku: 'Gildan Softstyle 64000',
    blurb: 'Ringspun cotton, 8 colors. Front + back print available.',
    printZone: { topPct: 30, leftPct: 38, widthPct: 24, heightPct: 22 },
    colors: TSHIRT_COLORS,
    defaultColorHex: TSHIRT_COLORS[0].hex,
  },
  'longsleeve-gildan-g2400': {
    key: 'longsleeve-gildan-g2400',
    name: 'Long Sleeve Tee',
    sku: 'Gildan G2400',
    blurb: 'Heavyweight long-sleeve. Black mockup — request other colors in notes.',
    printZone: { topPct: 32, leftPct: 38, widthPct: 24, heightPct: 18 },
    colors: LONGSLEEVE_COLORS,
    defaultColorHex: LONGSLEEVE_COLORS[0].hex,
  },
  'hoodie-gildan-18500': {
    key: 'hoodie-gildan-18500',
    name: 'Pullover Hoodie',
    sku: 'Gildan Heavy Blend 18500',
    blurb: 'Heavy cotton hoodie. Print sits between the V-neck and the front pouch.',
    printZone: { topPct: 38, leftPct: 39, widthPct: 22, heightPct: 13 },
    colors: HOODIE_COLORS,
    defaultColorHex: HOODIE_COLORS[0].hex,
  },
  'heavytee-gildan-2000': {
    key: 'heavytee-gildan-2000',
    name: 'Heavyweight Tee',
    sku: 'Gildan Ultra Cotton 2000',
    blurb: 'Heavy 6 oz cotton, long-lasting wear. Black mockup — request other colors in notes.',
    printZone: { topPct: 30, leftPct: 38, widthPct: 24, heightPct: 22 },
    colors: HEAVYTEE_COLORS,
    defaultColorHex: HEAVYTEE_COLORS[0].hex,
  },
}

export const productList: ProductDefinition[] = Object.values(products)

// Backward-compatible: expose the t-shirt's color list as the legacy
// `shirtColors` constant so older imports keep working.
export const shirtColors: ShirtColor[] = TSHIRT_COLORS
export const PRINT_ZONE = products['tshirt-gildan-64000'].printZone

// Light-shirt hex set used to switch the canvas blend mode from 'screen' to
// 'multiply' so prints look right on cream/white/grey shirts.
export const LIGHT_SHIRT_HEX = ['#F5F5F0', '#E8DDC4', '#B8BCC0']

export const inkColors: InkColor[] = [
  { name: 'Red',   hex: '#FF3B2F' },
  { name: 'Blue',  hex: '#1E40FF' },
  { name: 'White', hex: '#F5F2E8' },
  { name: 'Black', hex: '#0F1115' },
  { name: 'Gold',  hex: '#F2B632' },
  { name: 'Mint',  hex: '#5BD9A4' },
]

export const sizes: Size[] = ['S', 'M', 'L', 'XL', '2XL']

export const materials: { key: Material; label: string; hint: string }[] = [
  { key: 'Standard',     label: 'Ringspun',     hint: 'Included' },
  { key: 'Tri-Blend',    label: 'Tri-Blend',    hint: '+$3' },
  { key: 'Heavy Cotton', label: 'Heavy Cotton', hint: '+$5' },
]

export const PERSIST_KEY = 'apc:customizer:v1'
export const HANDOFF_KEY = 'apc:customizer:handoff'
