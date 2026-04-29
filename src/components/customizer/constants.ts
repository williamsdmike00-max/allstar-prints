import { ShirtColor, InkColor, Size, Material } from './types'

// Print-zone bounding box, in % of the 1200x1800 SanMar Gildan 64000 ModelFront
// photo. Mirrors the original overlay rect from the inline customizer.
export const PRINT_ZONE = {
  topPct: 30,
  leftPct: 38,
  widthPct: 24,
  heightPct: 22,
} as const

export const PHOTO_ASPECT_RATIO = '1200 / 1800'

// Gildan Softstyle 64000 — popular core palette + real model photo per color.
// Copied verbatim from Home.tsx so the price sheet + photo paths stay aligned.
export const shirtColors: ShirtColor[] = [
  { name: 'Black',        hex: '#1A1A1A', photo: '/mockups/customizer/64000-black.jpg' },
  { name: 'White',        hex: '#F5F5F0', photo: '/mockups/customizer/64000-white.jpg' },
  { name: 'Natural',      hex: '#E8DDC4', photo: '/mockups/customizer/64000-natural.jpg' },
  { name: 'Sport Grey',   hex: '#B8BCC0', photo: '/mockups/customizer/64000-sportgrey.jpg' },
  { name: 'Charcoal',     hex: '#4A4D52', photo: '/mockups/customizer/64000-charcoal.jpg' },
  { name: 'Navy',         hex: '#1F2A44', photo: '/mockups/customizer/64000-navy.jpg' },
  { name: 'Maroon',       hex: '#5C1F2A', photo: '/mockups/customizer/64000-maroon.jpg' },
  { name: 'Forest Green', hex: '#2A4A3C', photo: '/mockups/customizer/64000-forest.jpg' },
]

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
