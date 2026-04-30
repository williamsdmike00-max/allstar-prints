import { forwardRef, useEffect, useMemo } from 'react'
import { Stage, Layer, Image as KImage, Rect } from 'react-konva'
import Konva from 'konva'
import { useCustomizer } from '../state'
import { LIGHT_SHIRT_HEX, products } from '../constants'
import { useImage } from './useImage'
import { useStageSize } from './useStageSize'
import DesignLayer from './DesignLayer'
import PrintZoneOverlay from './PrintZoneOverlay'

// Stage layout: the entire stage covers the product-photo box. The product
// photo renders as a Konva.Image background so stage.toDataURL() captures it.
// On top: a clipped <DesignLayer> sized exactly to the print zone.

interface Props {
  disabled?: boolean
}

const StageCanvas = forwardRef<Konva.Stage, Props>(({ disabled }, ref) => {
  const productKey = useCustomizer((s) => s.productKey)
  const shirtColor = useCustomizer((s) => s.shirtColor)
  const selectedId = useCustomizer((s) => s.selectedId)
  const selectElement = useCustomizer((s) => s.selectElement)
  const removeElement = useCustomizer((s) => s.removeElement)

  const product = products[productKey]
  const photo = useMemo(
    () => product.colors.find((c) => c.hex === shirtColor)?.photo || product.colors[0].photo,
    [product, shirtColor],
  )
  const isLight = LIGHT_SHIRT_HEX.includes(shirtColor)

  const { ref: wrapperRef, size } = useStageSize<HTMLDivElement>()
  const img = useImage(photo)

  // Print zone in stage-pixel coordinates — driven by per-product calibration.
  const pz = useMemo(() => {
    const z = product.printZone
    return {
      x: (z.leftPct / 100) * size.width,
      y: (z.topPct / 100) * size.height,
      width: (z.widthPct / 100) * size.width,
      height: (z.heightPct / 100) * size.height,
    }
  }, [size, product])

  // Delete/Backspace removes the selected element. Only when canvas is focused.
  useEffect(() => {
    if (!selectedId) return
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const tag = target?.tagName?.toLowerCase()
      // Skip when user is typing in a form field.
      if (tag === 'input' || tag === 'textarea' || target?.isContentEditable) return
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault()
        removeElement(selectedId)
      } else if (e.key === 'Escape') {
        selectElement(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedId, removeElement, selectElement])

  return (
    <div
      ref={wrapperRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
      role="img"
      aria-label={`Customizable ${product.name} design preview`}
    >
      {size.width > 0 && size.height > 0 && (
        <Stage
          ref={ref}
          width={size.width}
          height={size.height}
          // Clicking empty stage deselects.
          onMouseDown={(e) => {
            if (disabled) return
            if (e.target === e.target.getStage()) selectElement(null)
          }}
          onTouchStart={(e) => {
            if (disabled) return
            if (e.target === e.target.getStage()) selectElement(null)
          }}
        >
          <Layer listening={!disabled}>
            {img && (
              <KImage
                image={img}
                x={0}
                y={0}
                width={size.width}
                height={size.height}
                listening={false}
              />
            )}
          </Layer>
          {!disabled && (
            <>
              {/* Design layer — blend mode tints the printed design into the
                  fabric photo, matching the old `mixBlendMode` look. */}
              <Layer>
                <DesignLayer pz={pz} blend={isLight ? 'multiply' : 'screen'} />
              </Layer>
              {/* Overlay layer — kept unblended so the dashed print-zone hint
                  stays visible on light + dark shirts alike. */}
              <Layer listening={false}>
                <PrintZoneOverlay
                  x={pz.x}
                  y={pz.y}
                  width={pz.width}
                  height={pz.height}
                  visible
                />
              </Layer>
            </>
          )}
          {disabled && (
            <Layer listening={false}>
              <Rect
                x={0}
                y={0}
                width={size.width}
                height={size.height}
                fill="rgba(15,17,21,.55)"
              />
            </Layer>
          )}
        </Stage>
      )}
    </div>
  )
})

StageCanvas.displayName = 'StageCanvas'
export default StageCanvas
