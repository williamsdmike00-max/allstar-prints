import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DesignElement, Side, Material, Size, TextElement, ImageElement } from './types'
import { PERSIST_KEY } from './constants'

export type PrintLocation = 'front' | 'back' | 'sleeve'

export const PRINT_LOCATION_UPCHARGE: Record<PrintLocation, number> = {
  front: 0,   // included in base price
  back: 5,    // +$5/shirt
  sleeve: 3,  // +$3/shirt
}

let counter = 0
const nextId = () => `el_${Date.now().toString(36)}_${(counter++).toString(36)}`

export const seedTextElement = (text: string, color: string): TextElement => ({
  id: nextId(),
  type: 'text',
  // Centered in the print zone. fontSizePct = 16% of print-zone height fits
  // a typical 6-7 char Archivo Black word inside the print zone width.
  x: 50,
  y: 50,
  fontSizePct: 16,
  rotation: 0,
  anchor: 'center',
  text,
  font: 'Archivo Black',
  color,
})

export interface CustomizerState {
  side: Side
  printLocations: PrintLocation[]   // always contains 'front'; 'back' / 'sleeve' optional
  shirtColor: string
  inkColor: string
  material: Material
  size: Size
  qty: number
  elements: DesignElement[]
  selectedId: string | null

  setSide: (side: Side) => void
  togglePrintLocation: (loc: PrintLocation) => void
  setShirtColor: (hex: string) => void
  setInkColor: (hex: string) => void
  setMaterial: (m: Material) => void
  setSize: (s: Size) => void
  setQty: (n: number) => void

  addText: (text: string) => void
  addImage: (src: string, naturalWidth?: number, naturalHeight?: number) => void
  updateElement: (id: string, patch: Partial<DesignElement>) => void
  removeElement: (id: string) => void
  selectElement: (id: string | null) => void
  clearElements: () => void

  hydrate: (init: { shirtColor: string; inkColor: string; design: string }) => void
}

const DEFAULT_TEXT = 'ALLSTAR'
const DEFAULT_SHIRT = '#5A1A23'
const DEFAULT_INK = '#FF3B2F'

export const useCustomizer = create<CustomizerState>()(
  persist(
    (set, get) => ({
      side: 'front',
      printLocations: ['front'],
      shirtColor: DEFAULT_SHIRT,
      inkColor: DEFAULT_INK,
      material: 'Standard',
      size: 'M',
      qty: 24,
      elements: [seedTextElement(DEFAULT_TEXT, DEFAULT_INK)],
      selectedId: null,

      setSide: (side) => set({ side }),
      togglePrintLocation: (loc) => {
        // Front is always included — toggling it is a no-op.
        if (loc === 'front') return
        set((s) => {
          const has = s.printLocations.includes(loc)
          const next = has
            ? s.printLocations.filter((x) => x !== loc)
            : [...s.printLocations, loc]
          // Always keep 'front' in the list.
          if (!next.includes('front')) next.unshift('front')
          return { printLocations: next }
        })
      },
      setShirtColor: (hex) => set({ shirtColor: hex }),
      setInkColor: (hex) => {
        // Recolor every text element when ink changes — matches old single-text behavior.
        set((s) => ({
          inkColor: hex,
          elements: s.elements.map((el) =>
            el.type === 'text' ? { ...el, color: hex } : el,
          ),
        }))
      },
      setMaterial: (material) => set({ material }),
      setSize: (size) => set({ size }),
      setQty: (qty) => set({ qty: Math.max(1, Math.min(288, Math.round(qty))) }),

      addText: (text) => {
        const el = seedTextElement(text || 'ALLSTAR', get().inkColor)
        set((s) => ({ elements: [...s.elements, el], selectedId: el.id }))
      },
      addImage: (src, naturalWidth, naturalHeight) => {
        // Default to 70% width centered; preserve aspect from natural dims if provided.
        const widthPct = 70
        const aspectRatio =
          naturalWidth && naturalHeight && naturalWidth > 0
            ? naturalHeight / naturalWidth
            : 1
        const heightPct = Math.max(10, Math.min(100, widthPct * aspectRatio))
        const el: ImageElement = {
          id: `el_${Date.now().toString(36)}_${(counter++).toString(36)}`,
          type: 'image',
          x: 50,
          y: 50,
          width: widthPct,
          height: heightPct,
          rotation: 0,
          anchor: 'center',
          src,
        }
        set((s) => ({ elements: [...s.elements, el], selectedId: el.id }))
      },
      updateElement: (id, patch) => {
        set((s) => ({
          elements: s.elements.map((el) =>
            el.id === id ? ({ ...el, ...patch } as DesignElement) : el,
          ),
        }))
      },
      removeElement: (id) => {
        set((s) => ({
          elements: s.elements.filter((el) => el.id !== id),
          selectedId: s.selectedId === id ? null : s.selectedId,
        }))
      },
      selectElement: (id) => set({ selectedId: id }),
      clearElements: () => set({ elements: [], selectedId: null }),

      hydrate: (init) => {
        // Called from Home.tsx so the parent's `tweaks` defaults seed the store
        // on first mount, but we don't clobber a user's saved edits.
        const s = get()
        const hasUserEdits = s.elements.some(
          (el) => el.type === 'text' && el.text !== DEFAULT_TEXT,
        )
        if (hasUserEdits) return
        set({
          shirtColor: init.shirtColor,
          inkColor: init.inkColor,
          elements: [seedTextElement(init.design || DEFAULT_TEXT, init.inkColor)],
        })
      },
    }),
    {
      name: PERSIST_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({
        printLocations: s.printLocations,
        shirtColor: s.shirtColor,
        inkColor: s.inkColor,
        material: s.material,
        size: s.size,
        qty: s.qty,
        elements: s.elements,
      }),
      version: 1,
    },
  ),
)

export const firstTextElement = (els: DesignElement[]): TextElement | null =>
  (els.find((el) => el.type === 'text') as TextElement) || null
