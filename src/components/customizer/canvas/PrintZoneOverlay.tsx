import { Rect } from 'react-konva'

// A subtle dashed rectangle drawn at the print-zone bounds so the user can
// see the editable region. Only visible when an element is selected.
export default function PrintZoneOverlay({
  x,
  y,
  width,
  height,
  visible,
}: {
  x: number
  y: number
  width: number
  height: number
  visible: boolean
}) {
  if (!visible) return null
  return (
    <>
      {/* Two-pass dashed border: dark + light dashes interleave so the box
          stays visible on both light and dark fabrics. */}
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="rgba(0,0,0,.55)"
        strokeWidth={1.25}
        dash={[6, 6]}
        listening={false}
        perfectDrawEnabled={false}
      />
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        stroke="rgba(255,255,255,.85)"
        strokeWidth={1.25}
        dash={[6, 6]}
        dashOffset={6}
        listening={false}
        perfectDrawEnabled={false}
      />
    </>
  )
}
