import { useEffect, useRef } from 'react'
import { Group, Text, Image as KImage, Transformer } from 'react-konva'
import Konva from 'konva'
import { useCustomizer } from '../state'
import { TextElement, ImageElement } from '../types'
import { useImage } from './useImage'

interface PrintZonePx {
  x: number
  y: number
  width: number
  height: number
}

// Renders all design elements as Konva nodes inside the print zone, plus the
// Transformer that's bound to the currently selected element. Text auto-sizes
// to its content (no wrapping) — fontSizePct (% of print-zone height) controls
// scale; user resizes via Transformer bake into fontSizePct.
export default function DesignLayer({
  pz,
  blend,
}: {
  pz: PrintZonePx
  blend?: 'multiply' | 'screen'
}) {
  const elements = useCustomizer((s) => s.elements)
  const selectedId = useCustomizer((s) => s.selectedId)
  const selectElement = useCustomizer((s) => s.selectElement)
  const updateElement = useCustomizer((s) => s.updateElement)

  const trRef = useRef<Konva.Transformer>(null)
  const nodeMap = useRef(new Map<string, Konva.Node>())

  useEffect(() => {
    const tr = trRef.current
    if (!tr) return
    if (!selectedId) {
      tr.nodes([])
      tr.getLayer()?.batchDraw()
      return
    }
    const node = nodeMap.current.get(selectedId)
    if (node) {
      tr.nodes([node])
      tr.getLayer()?.batchDraw()
    } else {
      tr.nodes([])
    }
  }, [selectedId, elements.length])

  return (
    <>
      <Group
        x={pz.x}
        y={pz.y}
        // Soft-clip to print zone so anything dragged outside is masked,
        // matching what would actually print.
        clipX={0}
        clipY={0}
        clipWidth={Math.max(0, pz.width)}
        clipHeight={Math.max(0, pz.height)}
        globalCompositeOperation={blend}
      >
        {pz.width > 0 && pz.height > 0 && elements.map((el) => {
          const cx = (el.x / 100) * pz.width
          const cy = (el.y / 100) * pz.height
          const registerRef = (node: Konva.Node | null) => {
            if (node) nodeMap.current.set(el.id, node)
            else nodeMap.current.delete(el.id)
          }
          if (el.type === 'text') {
            const fontSize = Math.max(8, (el.fontSizePct / 100) * pz.height)
            return (
              <TextNode
                key={el.id}
                el={el}
                cx={cx}
                cy={cy}
                fontSize={fontSize}
                registerRef={registerRef}
                onSelect={() => selectElement(el.id)}
                onChange={(patch) => updateElement(el.id, patch)}
                pz={pz}
              />
            )
          }
          if (el.type === 'image') {
            const widthPx = Math.max(8, (el.width / 100) * pz.width)
            const heightPx = Math.max(8, (el.height / 100) * pz.height)
            return (
              <ImageNode
                key={el.id}
                el={el}
                cx={cx}
                cy={cy}
                widthPx={widthPx}
                heightPx={heightPx}
                registerRef={registerRef}
                onSelect={() => selectElement(el.id)}
                onChange={(patch) => updateElement(el.id, patch)}
                pz={pz}
              />
            )
          }
          return null
        })}
      </Group>
      {/* Transformer lives OUTSIDE the clipped group so its handles never get
          masked at the print-zone boundary. */}
      <Transformer
        ref={trRef}
        rotateEnabled
        keepRatio={true}
        // Only show corner anchors so the resize stays uniform — text is the
        // only element type for v1; non-uniform scaling looks broken on text.
        enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
        anchorSize={9}
        anchorCornerRadius={2}
        borderStroke="rgba(255,255,255,.85)"
        borderStrokeWidth={1}
        anchorStroke="rgba(255,255,255,.9)"
        anchorFill="#FF3B2F"
        rotateAnchorOffset={22}
        rotationSnaps={[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180]}
        rotationSnapTolerance={5}
        boundBoxFunc={(_oldBox, newBox) => {
          if (newBox.width < 16 || newBox.height < 8) return _oldBox
          return newBox
        }}
      />
    </>
  )
}

// Self-positioning text node. After Konva measures the rendered text, we
// set x/y so the visual CENTER lands at (cx, cy) — independent of fontSize
// or text length, which keeps drag/rotate intuitive.
function TextNode({
  el,
  cx,
  cy,
  fontSize,
  registerRef,
  onSelect,
  onChange,
  pz,
}: {
  el: TextElement
  cx: number
  cy: number
  fontSize: number
  registerRef: (node: Konva.Node | null) => void
  onSelect: () => void
  onChange: (patch: Partial<TextElement>) => void
  pz: PrintZonePx
}) {
  const ref = useRef<Konva.Text | null>(null)

  // Re-position whenever measured size changes (text/fontSize edits).
  useEffect(() => {
    const node = ref.current
    if (!node) return
    node.offsetX(node.width() / 2)
    node.offsetY(node.height() / 2)
    node.getLayer()?.batchDraw()
  }, [el.text, el.font, fontSize])

  return (
    <Text
      ref={(node) => {
        ref.current = node
        registerRef(node)
      }}
      x={cx}
      y={cy}
      text={el.text || ' '}
      fontFamily={el.font}
      fontStyle="normal"
      fill={el.color}
      align="center"
      verticalAlign="middle"
      rotation={el.rotation}
      fontSize={fontSize}
      letterSpacing={-0.5}
      wrap="none"
      draggable
      onMouseDown={(e) => {
        e.cancelBubble = true
        onSelect()
      }}
      onTouchStart={(e) => {
        e.cancelBubble = true
        onSelect()
      }}
      onDragEnd={(e) => {
        const node = e.target
        // Konva.Text.x/y reflect the offset-adjusted center because we set offset.
        const newCx = node.x()
        const newCy = node.y()
        const xPct = Math.max(0, Math.min(100, (newCx / pz.width) * 100))
        const yPct = Math.max(0, Math.min(100, (newCy / pz.height) * 100))
        onChange({ x: xPct, y: yPct })
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Text
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()
        // Average the two scales (Transformer keeps ratio, so they should be
        // equal; defensive average covers edge cases).
        const scale = (scaleX + scaleY) / 2
        const newFontSize = Math.max(8, fontSize * scale)
        node.scaleX(1)
        node.scaleY(1)
        const newFontSizePct = Math.max(4, Math.min(120, (newFontSize / pz.height) * 100))
        const xPct = Math.max(0, Math.min(100, (node.x() / pz.width) * 100))
        const yPct = Math.max(0, Math.min(100, (node.y() / pz.height) * 100))
        onChange({
          x: xPct,
          y: yPct,
          fontSizePct: newFontSizePct,
          rotation: node.rotation(),
        })
      }}
    />
  )
}

// Image element — uses an HTMLImageElement loaded via useImage. Position +
// rotation are stored as % of print zone; width/height too. On transform we
// bake the scale back into element.width/height and reset node scale.
function ImageNode({
  el,
  cx,
  cy,
  widthPx,
  heightPx,
  registerRef,
  onSelect,
  onChange,
  pz,
}: {
  el: ImageElement
  cx: number
  cy: number
  widthPx: number
  heightPx: number
  registerRef: (node: Konva.Node | null) => void
  onSelect: () => void
  onChange: (patch: Partial<ImageElement>) => void
  pz: PrintZonePx
}) {
  const ref = useRef<Konva.Image | null>(null)
  const img = useImage(el.src)

  if (!img) return null

  return (
    <KImage
      ref={(node) => {
        ref.current = node
        registerRef(node)
      }}
      image={img}
      x={cx}
      y={cy}
      width={widthPx}
      height={heightPx}
      offsetX={widthPx / 2}
      offsetY={heightPx / 2}
      rotation={el.rotation}
      draggable
      onMouseDown={(e) => { e.cancelBubble = true; onSelect() }}
      onTouchStart={(e) => { e.cancelBubble = true; onSelect() }}
      onDragEnd={(e) => {
        const node = e.target
        const xPct = Math.max(0, Math.min(100, (node.x() / pz.width) * 100))
        const yPct = Math.max(0, Math.min(100, (node.y() / pz.height) * 100))
        onChange({ x: xPct, y: yPct })
      }}
      onTransformEnd={(e) => {
        const node = e.target as Konva.Image
        const scaleX = node.scaleX()
        const scaleY = node.scaleY()
        const newWidthPx = Math.max(12, widthPx * scaleX)
        const newHeightPx = Math.max(12, heightPx * scaleY)
        node.scaleX(1)
        node.scaleY(1)
        const xPct = Math.max(0, Math.min(100, (node.x() / pz.width) * 100))
        const yPct = Math.max(0, Math.min(100, (node.y() / pz.height) * 100))
        onChange({
          x: xPct,
          y: yPct,
          width: Math.max(4, Math.min(180, (newWidthPx / pz.width) * 100)),
          height: Math.max(4, Math.min(180, (newHeightPx / pz.height) * 100)),
          rotation: node.rotation(),
        })
      }}
    />
  )
}
