import { useCustomizer } from '../customizer'

// Inline SVG clipart. Each piece is a small SVG converted to a data URL on
// click and added to the canvas as an image element.
const ART: { name: string; svg: string }[] = [
  {
    name: 'Star',
    svg: starSvg('#FF3B2F'),
  },
  {
    name: 'Banner',
    svg: bannerSvg('TEAM', '#FF3B2F'),
  },
  {
    name: 'Lightning',
    svg: lightningSvg('#F2B632'),
  },
  {
    name: 'Football',
    svg: footballSvg('#0F1115'),
  },
  {
    name: 'Basketball',
    svg: basketballSvg('#FF6B2C'),
  },
  {
    name: 'Crown',
    svg: crownSvg('#F2B632'),
  },
  {
    name: 'Shield',
    svg: shieldSvg('#1E40FF'),
  },
  {
    name: 'Wreath',
    svg: wreathSvg('#2A4A3C'),
  },
]

export default function ArtPalette() {
  const addImage = useCustomizer((s) => s.addImage)

  const onPick = (svg: string) => {
    const dataURL = svgToDataURL(svg)
    // SVGs render as 200x200 viewBox-ish; pass square aspect so canvas seeds
    // a square element.
    addImage(dataURL, 200, 200)
  }

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        {ART.map((piece) => (
          <button
            key={piece.name}
            type="button"
            title={piece.name}
            onClick={() => onPick(piece.svg)}
            className="aspect-square rounded-lg bg-brand-dark4 border border-white/8 hover:border-brand-red/60 hover:bg-brand-dark2 transition-colors flex items-center justify-center p-2"
            dangerouslySetInnerHTML={{ __html: piece.svg }}
          />
        ))}
      </div>
      <p className="text-[11px] text-brand-silver/70 mt-2 leading-relaxed">
        Click any icon to drop it onto the shirt. Drag to position, corner-pull to resize, top handle to rotate.
      </p>
    </div>
  )
}

function svgToDataURL(svg: string): string {
  // Use base64 so dataURL works as a Konva.Image source without CORS issues.
  const encoded = btoa(unescape(encodeURIComponent(svg)))
  return `data:image/svg+xml;base64,${encoded}`
}

// ─── Art generators ──────────────────────────────────────────────────────

function starSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-100 -100 200 200" width="100%" height="100%">
    <path d="M 0 -88 L 24 -28 L 88 -28 L 36 12 L 56 72 L 0 36 L -56 72 L -36 12 L -88 -28 L -24 -28 Z" fill="${fill}" />
  </svg>`
}

function bannerSvg(label: string, fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M 10 80 L 30 70 L 30 130 L 10 120 Z M 30 70 L 170 70 L 190 100 L 170 130 L 30 130 Z M 170 70 L 190 60 L 190 110 L 170 100 Z" fill="${fill}" />
    <text x="100" y="108" text-anchor="middle" font-family="Archivo Black, Impact, sans-serif" font-size="30" fill="white" letter-spacing="2">${label}</text>
  </svg>`
}

function lightningSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M 110 10 L 50 110 L 90 110 L 70 190 L 150 80 L 110 80 Z" fill="${fill}" stroke="#0F1115" stroke-width="6" stroke-linejoin="round" />
  </svg>`
}

function footballSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <ellipse cx="100" cy="100" rx="78" ry="50" fill="${fill}" transform="rotate(-25 100 100)" />
    <g transform="rotate(-25 100 100)" stroke="white" stroke-width="4" fill="none" stroke-linecap="round">
      <line x1="60" y1="100" x2="140" y2="100" />
      <line x1="80" y1="92" x2="80" y2="108" />
      <line x1="95" y1="92" x2="95" y2="108" />
      <line x1="110" y1="92" x2="110" y2="108" />
      <line x1="125" y1="92" x2="125" y2="108" />
    </g>
  </svg>`
}

function basketballSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <circle cx="100" cy="100" r="78" fill="${fill}" />
    <g stroke="#0F1115" stroke-width="4" fill="none">
      <line x1="100" y1="22" x2="100" y2="178" />
      <line x1="22" y1="100" x2="178" y2="100" />
      <path d="M 35 50 Q 100 100 35 150" />
      <path d="M 165 50 Q 100 100 165 150" />
    </g>
  </svg>`
}

function crownSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M 30 140 L 30 80 L 65 110 L 100 50 L 135 110 L 170 80 L 170 140 Z M 30 150 L 170 150 L 170 165 L 30 165 Z" fill="${fill}" stroke="#0F1115" stroke-width="4" stroke-linejoin="round" />
    <circle cx="65" cy="80" r="6" fill="${fill}" stroke="#0F1115" stroke-width="3"/>
    <circle cx="100" cy="50" r="6" fill="${fill}" stroke="#0F1115" stroke-width="3"/>
    <circle cx="135" cy="80" r="6" fill="${fill}" stroke="#0F1115" stroke-width="3"/>
  </svg>`
}

function shieldSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <path d="M 100 20 L 170 45 L 170 105 Q 170 165 100 185 Q 30 165 30 105 L 30 45 Z" fill="${fill}" stroke="white" stroke-width="6" stroke-linejoin="round" />
    <path d="M 100 60 L 100 140 M 70 100 L 130 100" stroke="white" stroke-width="8" stroke-linecap="round" />
  </svg>`
}

function wreathSvg(fill: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%">
    <g fill="none" stroke="${fill}" stroke-width="8" stroke-linecap="round">
      <path d="M 100 30 Q 30 100 100 170" />
      <path d="M 100 30 Q 170 100 100 170" />
    </g>
    <g fill="${fill}">
      <ellipse cx="55" cy="60" rx="10" ry="14" transform="rotate(-30 55 60)" />
      <ellipse cx="38" cy="100" rx="10" ry="14" transform="rotate(-90 38 100)" />
      <ellipse cx="55" cy="140" rx="10" ry="14" transform="rotate(-150 55 140)" />
      <ellipse cx="145" cy="60" rx="10" ry="14" transform="rotate(30 145 60)" />
      <ellipse cx="162" cy="100" rx="10" ry="14" transform="rotate(90 162 100)" />
      <ellipse cx="145" cy="140" rx="10" ry="14" transform="rotate(150 145 140)" />
    </g>
  </svg>`
}
