import { useState, useEffect, useRef, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/ui/SEO'

// ─────────────────────────────────────────────
// Design tokens
// ─────────────────────────────────────────────
const C = {
  bgCream: '#F4EDE0',
  bgBone: '#ECE4D2',
  inkBlack: '#0F1115',
  inkSoft: '#1A1D24',
  paper: '#FFFFFE',
  red: '#FF3B2F',
  blue: '#1E40FF',
  gold: '#F2B632',
  rule: 'rgba(15,17,21,0.12)',
}

const DEFAULTS = {
  shirtColor: '#5A1A23',
  inkColor: '#FF3B2F',
  accent: '#FF3B2F',
  motion: 60,
  design: 'ALLSTAR',
  shirtModel: 'heavy' as 'heavy' | 'classic',
}

type Tweaks = typeof DEFAULTS

// Color helper
function lighten(hex: string, amt: number) {
  const c = hex.replace('#', '')
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  const f = (v: number) => Math.max(0, Math.min(255, Math.round(v + amt)))
  return `rgb(${f(r)},${f(g)},${f(b)})`
}

// ─────────────────────────────────────────────
// Star
// ─────────────────────────────────────────────
function Star({ size = 24, color = C.red }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="-25 -25 50 50">
      <path
        d="M 0 -22 L 6 -7 L 22 -7 L 9 3 L 14 18 L 0 9 L -14 18 L -9 3 L -22 -7 L -6 -7 Z"
        fill={color}
      />
    </svg>
  )
}

// ─────────────────────────────────────────────
// SVG t-shirt with print-area children
// ─────────────────────────────────────────────
function ShirtSVG({
  color = C.inkBlack,
  model = 'heavy',
  children,
}: {
  color?: string
  model?: 'heavy' | 'classic'
  children?: ReactNode
}) {
  const neck =
    model === 'classic' ? 'M 175 60 Q 200 90 225 60' : 'M 170 55 Q 200 95 230 55'
  const shadow = lighten(color, -30)
  const highlight = lighten(color, 25)
  const clipId = `shirtClip-${color.replace('#', '')}`
  const foldId = `shirtFold-${color.replace('#', '')}`
  const topId = `shirtTop-${color.replace('#', '')}`
  const bellyId = `bellyShadow-${color.replace('#', '')}`

  return (
    <svg
      viewBox="0 0 400 460"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%', display: 'block' }}
    >
      <defs>
        <linearGradient id={foldId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.7" />
          <stop offset="20%" stopColor={color} stopOpacity="0" />
          <stop offset="80%" stopColor={color} stopOpacity="0" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={topId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={highlight} stopOpacity="0.4" />
          <stop offset="40%" stopColor={color} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={bellyId} cx="0.5" cy="0.6" r="0.5">
          <stop offset="0%" stopColor={shadow} stopOpacity="0.0" />
          <stop offset="100%" stopColor={shadow} stopOpacity="0.55" />
        </radialGradient>
        <clipPath id={clipId}>
          <path d="M 130 50 L 170 55 Q 200 95 230 55 L 270 50 L 340 90 L 360 175 L 320 195 L 320 420 Q 200 440 80 420 L 80 195 L 40 175 L 60 90 Z" />
        </clipPath>
      </defs>

      <g>
        <path
          d="M 130 50 L 170 55 Q 200 95 230 55 L 270 50 L 340 90 L 360 175 L 320 195 L 320 420 Q 200 440 80 420 L 80 195 L 40 175 L 60 90 Z"
          fill={color}
        />
        <rect x="0" y="0" width="400" height="460" fill={`url(#${foldId})`} clipPath={`url(#${clipId})`} />
        <rect x="0" y="0" width="400" height="460" fill={`url(#${topId})`} clipPath={`url(#${clipId})`} />
        <ellipse cx="200" cy="320" rx="160" ry="120" fill={`url(#${bellyId})`} clipPath={`url(#${clipId})`} opacity="0.6" />
        <path d={neck} stroke={shadow} strokeWidth="3" fill="none" opacity="0.9" />
        <path d="M 168 58 Q 200 100 232 58" stroke={highlight} strokeWidth="1.5" fill="none" opacity="0.4" />
        <path d="M 80 195 Q 110 180 130 175" stroke={shadow} strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 320 195 Q 290 180 270 175" stroke={shadow} strokeWidth="2" fill="none" opacity="0.5" />
        <path d="M 80 415 Q 200 435 320 415" stroke={shadow} strokeWidth="2" fill="none" opacity="0.4" />
        <path d="M 120 220 Q 150 280 130 380" stroke={shadow} strokeWidth="1" fill="none" opacity="0.18" />
        <path d="M 280 220 Q 250 280 270 380" stroke={shadow} strokeWidth="1" fill="none" opacity="0.18" />
      </g>

      <foreignObject x="120" y="125" width="160" height="200" clipPath={`url(#${clipId})`}>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      </foreignObject>
    </svg>
  )
}

// ─────────────────────────────────────────────
// Distressed ink design overlay
// ─────────────────────────────────────────────
function DesignOverlay({
  text = 'ALLSTAR',
  inkColor = C.red,
}: {
  text?: string
  inkColor?: string
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        viewBox="0 0 200 220"
        style={{ width: '100%', height: '100%' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="inkRough" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves={2} seed={4} />
            <feDisplacementMap in="SourceGraphic" scale={1.5} />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <pattern id="halftone" x="0" y="0" width="3" height="3" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="0.6" fill="rgba(255,255,255,0.18)" />
          </pattern>
        </defs>

        <g transform="translate(100 50)" filter="url(#inkRough)">
          <path
            d="M 0 -22 L 6 -7 L 22 -7 L 9 3 L 14 18 L 0 9 L -14 18 L -9 3 L -22 -7 L -6 -7 Z"
            fill={inkColor}
          />
        </g>

        <text
          x="100"
          y="115"
          textAnchor="middle"
          fontFamily="Archivo Black, sans-serif"
          fontSize="38"
          fill={inkColor}
          letterSpacing="-1"
          filter="url(#inkRough)"
        >
          {text}
        </text>

        <text
          x="100"
          y="142"
          textAnchor="middle"
          fontFamily="JetBrains Mono, monospace"
          fontSize="9"
          fill={inkColor}
          letterSpacing="3"
          filter="url(#inkRough)"
        >
          EST · DALLAS · FORT WORTH
        </text>

        <g transform="translate(100 170)" filter="url(#inkRough)">
          <path
            d="M -55 -8 L 55 -8 L 60 0 L 55 8 L -55 8 L -60 0 Z"
            fill={inkColor}
          />
          <text
            x="0"
            y="3"
            textAnchor="middle"
            fontFamily="Archivo Black, sans-serif"
            fontSize="11"
            fill="white"
            letterSpacing="2"
          >
            VETERAN OWNED
          </text>
        </g>

        <rect x="0" y="0" width="200" height="220" fill="url(#halftone)" opacity="0.5" />
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────────
// Rotating shirt with parallax
// ─────────────────────────────────────────────
// Hero shirt: real PNG with subtle pointer parallax + gentle bob (no rotation)
function HeroShirtImage({ src, motion = 60 }: { src: string; motion?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })
  const [bob, setBob] = useState(0)

  useEffect(() => {
    let raf = 0
    const tick = (now: number) => {
      setBob(Math.sin(now / 1500) * 6 * (motion / 100))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [motion])

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!wrapRef.current) return
      const r = wrapRef.current.getBoundingClientRect()
      const x = (e.clientX - (r.left + r.width / 2)) / r.width
      const y = (e.clientY - (r.top + r.height / 2)) / r.height
      setPointer({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  const rx = -pointer.y * 6
  const ry = pointer.x * 8

  return (
    <div
      ref={wrapRef}
      style={{
        perspective: '1200px',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <img
        src={src}
        alt="Allstar Prints custom t-shirt"
        style={{
          width: '100%',
          maxWidth: 1680,
          height: 'auto',
          display: 'block',
          transform: `translateY(${bob}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.05)`,
          transformOrigin: 'center',
          transformStyle: 'preserve-3d',
          transition: 'transform .12s linear',
          filter: 'drop-shadow(0 40px 30px rgba(15,17,21,.35))',
          willChange: 'transform',
        }}
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// Studio backdrops + product-style shirt mockup
// ─────────────────────────────────────────────

// Surface variants — clean studio backdrops (paper sweep + floor + vignette).
// Designed to read as a real product shoot, not a cartoon scene.
const SURFACES: Record<
  string,
  { wall: string; floor: string; floorTone: string; light?: string }
> = {
  warm:    { wall: '#F2EAD7', floor: '#D9CDB1', floorTone: 'rgba(0,0,0,.10)', light: 'rgba(255,245,225,.55)' },
  cool:    { wall: '#E5E7E4', floor: '#C7CBC6', floorTone: 'rgba(0,0,0,.10)', light: 'rgba(255,255,255,.55)' },
  sand:    { wall: '#E8DCC4', floor: '#C9B891', floorTone: 'rgba(0,0,0,.12)', light: 'rgba(255,240,210,.55)' },
  walnut:  { wall: '#3D2E22', floor: '#2A1F17', floorTone: 'rgba(0,0,0,.32)', light: 'rgba(255,210,140,.20)' },
  paper:   { wall: '#F6F1E5', floor: '#E2D8C2', floorTone: 'rgba(0,0,0,.10)', light: 'rgba(255,255,255,.6)' },
  graphite:{ wall: '#1F2226', floor: '#15171B', floorTone: 'rgba(0,0,0,.40)', light: 'rgba(255,180,140,.18)' },
}

function Surface({ kind }: { kind: string }) {
  const s = SURFACES[kind] || SURFACES.warm
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
      {/* wall (back) */}
      <div style={{ position: 'absolute', inset: 0, background: s.wall }} />
      {/* paper-sweep floor */}
      <div
        style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 0,
          height: '42%',
          background: `linear-gradient(180deg, ${s.floor} 0%, ${s.floor} 70%, ${s.floorTone} 100%)`,
          borderTopLeftRadius: '60% 18%',
          borderTopRightRadius: '60% 18%',
        }}
      />
      {/* soft top light */}
      {s.light && (
        <div
          style={{
            position: 'absolute',
            top: '-10%', left: '50%', transform: 'translateX(-50%)',
            width: '85%', height: '60%',
            background: `radial-gradient(ellipse at center, ${s.light} 0%, transparent 65%)`,
            pointerEvents: 'none',
          }}
        />
      )}
      {/* corner vignette */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,.25) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}

// A product-style shirt: the polished ShirtSVG floating on the surface
// with a soft contact shadow underneath.
function ShirtMockup({
  shirtColor,
  inkColor,
  design,
  model = 'heavy',
  tilt = 0,
}: {
  shirtColor: string
  inkColor: string
  design: string
  model?: 'heavy' | 'classic'
  tilt?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: '6%',
      }}
    >
      <div style={{ position: 'relative', width: '78%', maxWidth: 360 }}>
        {/* contact shadow on the surface */}
        <div
          style={{
            position: 'absolute',
            left: '8%', right: '8%',
            bottom: '-3%',
            height: 28,
            background: 'radial-gradient(ellipse at center, rgba(0,0,0,.45) 0%, rgba(0,0,0,0) 70%)',
            filter: 'blur(2px)',
          }}
        />
        <div
          style={{
            position: 'relative',
            transform: `rotate(${tilt}deg)`,
            filter: 'drop-shadow(0 22px 18px rgba(15,17,21,.28)) drop-shadow(0 2px 1px rgba(15,17,21,.18))',
          }}
        >
          <ShirtSVG color={shirtColor} model={model}>
            <DesignOverlay text={design} inkColor={inkColor} />
          </ShirtSVG>
        </div>
      </div>
    </div>
  )
}

type Product = {
  name: string
  brand: string
  price: string
  tag: string
  color: string                 // primary swatch color (drives customizer pick)
  surface: string               // SURFACES key (used as fallback when no photo)
  shot: string
  tilt?: number
  model?: 'heavy' | 'classic'
  mockup?: string               // /mockups/*.jpg — real product photo
  printArea?: {                 // % positioning for the chest design overlay
    top: string
    left: string
    width: string
    height: string
  }
  showPrint?: boolean           // default true; false suppresses the chest overlay (e.g. hats)
}

function LifestyleCard({
  p,
  accent,
  inkColor,
  design,
  onPick,
}: {
  p: Product
  accent: string
  inkColor: string
  design: string
  onPick: () => void
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onPick}
      style={{
        position: 'relative',
        borderRadius: 20,
        overflow: 'hidden',
        background: C.inkBlack,
        cursor: 'pointer',
        aspectRatio: '4 / 5',
        boxShadow: hover ? '0 32px 80px rgba(15,17,21,.32)' : '0 8px 20px rgba(15,17,21,.08)',
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'all .4s cubic-bezier(.2,.8,.2,1)',
      }}
    >
      {p.mockup ? (
        <>
          {/* Real SanMar product photo */}
          <img
            src={p.mockup}
            alt={p.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
            }}
          />
          {/* Live design overlay on the chest, with multiply-blend for printed look */}
          {p.showPrint !== false && (
            <div
              style={{
                position: 'absolute',
                top: p.printArea?.top ?? '34%',
                left: p.printArea?.left ?? '38%',
                width: p.printArea?.width ?? '24%',
                height: p.printArea?.height ?? '22%',
                zIndex: 2,
                mixBlendMode: 'multiply',
                opacity: 0.92,
                pointerEvents: 'none',
                transform: hover ? 'scale(1.04)' : 'scale(1)',
                transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
              }}
            >
              <DesignOverlay text={design} inkColor={inkColor} />
            </div>
          )}
        </>
      ) : (
        <>
          <Surface kind={p.surface} />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              transform: hover ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
            }}
          >
            <ShirtMockup
              shirtColor={p.color}
              inkColor={inkColor}
              design={design}
              model={p.model}
              tilt={p.tilt}
            />
          </div>
        </>
      )}

      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          zIndex: 3,
          background: accent,
          color: 'white',
          fontSize: 10,
          fontWeight: 800,
          letterSpacing: '.1em',
          padding: '6px 11px',
          borderRadius: 99,
          textTransform: 'uppercase',
        }}
      >
        {p.tag}
      </div>

      <div
        style={{
          position: 'absolute',
          top: 14,
          right: 14,
          zIndex: 3,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'rgba(255,255,255,.85)',
          letterSpacing: '.08em',
          background: 'rgba(0,0,0,.32)',
          padding: '4px 9px',
          borderRadius: 99,
          backdropFilter: 'blur(6px)',
        }}
      >
        {p.shot}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 14,
          right: 14,
          bottom: 14,
          zIndex: 3,
          background: 'rgba(244,237,224,.94)',
          backdropFilter: 'blur(10px)',
          borderRadius: 14,
          padding: '14px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 16, letterSpacing: '-.01em', color: C.inkBlack }}>
            {p.name}
          </div>
          <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 1 }}>{p.brand}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 18, color: C.inkBlack }}>
            {p.price === 'Quote' ? 'Custom' : `$${p.price}`}
          </div>
          <div style={{ fontSize: 9, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: '.06em' }}>
            {p.price === 'Quote' ? 'quote' : p.price.startsWith('+') ? 'upgrade' : 'each'}
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: hover ? 88 : 64,
          right: 22,
          zIndex: 4,
          width: 42,
          height: 42,
          borderRadius: 99,
          background: accent,
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          opacity: hover ? 1 : 0,
          transition: 'all .3s',
          boxShadow: '0 12px 30px rgba(0,0,0,.3)',
        }}
      >
        →
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// Section bits
// ─────────────────────────────────────────────
function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div style={{ fontFamily: 'Archivo Black, sans-serif', fontSize: 32, lineHeight: 1, letterSpacing: '-.02em' }}>
        {n}
      </div>
      <div
        style={{
          fontSize: 12,
          color: C.inkSoft,
          textTransform: 'uppercase',
          letterSpacing: '.1em',
          marginTop: 6,
        }}
      >
        {l}
      </div>
    </div>
  )
}

function FloatingChip({
  children,
  top,
  left,
  right,
  delay = 0,
}: {
  children: ReactNode
  top?: string
  left?: string
  right?: string
  delay?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        right,
        background: C.paper,
        border: `1px solid ${C.rule}`,
        borderRadius: 14,
        padding: '10px 14px',
        fontSize: 12,
        boxShadow: '0 12px 30px rgba(15,17,21,.08)',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        animation: 'apFloat 3.4s ease-in-out infinite',
        animationDelay: `${delay}s`,
        maxWidth: 200,
        zIndex: 3,
      }}
    >
      {children}
    </div>
  )
}

function BgType({ motion, accent }: { motion: number; accent: string }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return
      const y = window.scrollY
      const k = motion / 100
      ref.current.style.transform = `translate3d(${-y * 0.3 * k}px, ${y * 0.1 * k}px, 0)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [motion])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: 'clamp(180px, 28vw, 460px)',
          color: 'transparent',
          WebkitTextStroke: `2px ${accent}22`,
          letterSpacing: '-.06em',
          whiteSpace: 'nowrap',
          opacity: 0.9,
          mixBlendMode: 'multiply',
        }}
      >
        ★ ALLSTAR ★ ALLSTAR
      </div>
    </div>
  )
}

function Marquee({
  items,
  speed = 30,
  accent,
  dark = false,
}: {
  items: string[]
  speed?: number
  accent: string
  dark?: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        background: dark ? C.inkBlack : accent,
        color: C.paper,
        padding: '18px 0',
        overflow: 'hidden',
        borderTop: `1px solid ${C.inkBlack}`,
        borderBottom: `1px solid ${C.inkBlack}`,
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 48,
          whiteSpace: 'nowrap',
          animation: `apMarquee ${speed}s linear infinite`,
          fontFamily: 'Archivo Black, sans-serif',
          fontSize: 'clamp(28px, 4vw, 56px)',
          letterSpacing: '-.02em',
        }}
      >
        {[...items, ...items, ...items].map((it, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 48 }}>
            {it}
            <Star size={28} color={dark ? accent : 'white'} />
          </span>
        ))}
      </div>
    </div>
  )
}

function SectionLabel({ n, l, accent }: { n: string; l: string; accent: string }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '.1em',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: 28,
          height: 28,
          borderRadius: 99,
          background: accent,
          color: 'white',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 11,
        }}
      >
        {n}
      </span>
      {l}
    </div>
  )
}

// ─────────────────────────────────────────────
// Hero
// ─────────────────────────────────────────────
function Hero({ tweaks }: { tweaks: Tweaks }) {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: '40px 28px 80px',
        overflow: 'hidden',
        background: C.bgCream,
        color: C.inkBlack,
      }}
    >
      <BgType motion={tweaks.motion} accent={tweaks.accent} />

      <div
        className="ap-hero-grid"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 24,
          maxWidth: 1440,
          margin: '0 auto',
        }}
      >
        <div style={{ paddingTop: '4vh' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              border: `1px solid ${C.inkBlack}`,
              borderRadius: 999,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '.04em',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: 99,
                background: '#0c0',
                boxShadow: '0 0 0 4px rgba(0,200,0,.18)',
              }}
            />
            Dallas–Fort Worth · Veteran Owned
          </div>
          <h1
            style={{
              fontFamily: 'Archivo Black, sans-serif',
              fontSize: 'clamp(54px, 9vw, 148px)',
              lineHeight: 0.86,
              letterSpacing: '-.04em',
            }}
          >
            Fast,
            <br />
            Custom{' '}
            <span
              style={{
                fontFamily: 'Bricolage Grotesque, serif',
                fontStyle: 'italic',
                fontWeight: 700,
                color: tweaks.accent,
              }}
            >
              apparel.
            </span>
            <br />
            Done right.
          </h1>
          <p
            style={{
              marginTop: 24,
              maxWidth: 540,
              fontSize: 'clamp(16px,1.4vw,20px)',
              lineHeight: 1.4,
              color: C.inkSoft,
            }}
          >
            Custom t-shirts, hoodies, hats, and DTF transfers for teams, brands, events,
            and one-off ideas you had at 2am. Quote in minutes. Proofs same day.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
            <a
              href="#customizer"
              style={{
                background: C.inkBlack,
                color: C.paper,
                padding: '18px 28px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                textDecoration: 'none',
              }}
            >
              Try the live customizer
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 99,
                  background: tweaks.accent,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 11,
                }}
              >
                →
              </span>
            </a>
            <a
              href="#blanks"
              style={{
                border: `1.5px solid ${C.inkBlack}`,
                padding: '17px 24px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15,
                color: C.inkBlack,
                textDecoration: 'none',
              }}
            >
              Browse blanks
            </a>
          </div>

          <div style={{ display: 'flex', gap: 32, marginTop: 48, flexWrap: 'wrap' }}>
            <Stat n="48hr" l="Rush available" />
            <Stat n="$12/ea" l="At 51+ shirts" />
            <Stat n="4.9★" l="From 380+ orders" />
          </div>
        </div>

        <div
          className="ap-hero-shirt"
          style={{
            position: 'relative',
            minHeight: 'min(70vh, 720px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <HeroShirtImage src="/allstar-hero-shirt.png" motion={tweaks.motion} />
          <FloatingChip top="6%" left="-2%" delay={0}>
            <strong>Front print included</strong>
            <span>Premium ringspun · no upcharge</span>
          </FloatingChip>
          <FloatingChip top="62%" right="-4%" delay={1.2}>
            <strong>Bulk discount</strong>
            <span>$12/shirt at 51+ · custom quote at 101+</span>
          </FloatingChip>
          <FloatingChip top="86%" left="8%" delay={0.6}>
            <strong>48-hr rush</strong>
            <span>+20% upcharge · same-day available</span>
          </FloatingChip>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          fontSize: 11,
          letterSpacing: '.3em',
          fontWeight: 600,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: C.inkBlack,
        }}
      >
        SCROLL
        <span
          style={{
            width: 1,
            height: 32,
            background: C.inkBlack,
            animation: 'apPulseLine 2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Customizer
// ─────────────────────────────────────────────
function CustGroup({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,.5)',
          marginBottom: 10,
          fontWeight: 600,
        }}
      >
        {label}
      </div>
      {children}
    </div>
  )
}

function Customizer({
  tweaks,
  setTweaks,
}: {
  tweaks: Tweaks
  setTweaks: (next: Partial<Tweaks>) => void
}) {
  const [side, setSide] = useState<'front' | 'back'>('front')
  const [text, setText] = useState(tweaks.design || 'ALLSTAR')
  const [color, setColor] = useState(tweaks.shirtColor)
  const [ink, setInk] = useState(tweaks.inkColor)
  const [size, setSize] = useState('M')
  const [qty, setQty] = useState(24)
  const [method, setMethod] = useState<'Standard' | 'Tri-Blend' | 'Heavy Cotton'>('Standard')

  useEffect(() => {
    setColor(tweaks.shirtColor)
    setInk(tweaks.inkColor)
    setText(tweaks.design)
  }, [tweaks.shirtColor, tweaks.inkColor, tweaks.design])

  const apply = () => setTweaks({ shirtColor: color, inkColor: ink, design: text })

  // Gildan Softstyle 64000 — popular core palette + real model photo per color
  const shirtColors = [
    { name: 'Black',         hex: '#1A1A1A', photo: '/mockups/customizer/64000-black.jpg' },
    { name: 'White',         hex: '#F5F5F0', photo: '/mockups/customizer/64000-white.jpg' },
    { name: 'Natural',       hex: '#E8DDC4', photo: '/mockups/customizer/64000-natural.jpg' },
    { name: 'Sport Grey',    hex: '#B8BCC0', photo: '/mockups/customizer/64000-sportgrey.jpg' },
    { name: 'Charcoal',      hex: '#4A4D52', photo: '/mockups/customizer/64000-charcoal.jpg' },
    { name: 'Navy',          hex: '#1F2A44', photo: '/mockups/customizer/64000-navy.jpg' },
    { name: 'Maroon',        hex: '#5C1F2A', photo: '/mockups/customizer/64000-maroon.jpg' },
    { name: 'Forest Green',  hex: '#2A4A3C', photo: '/mockups/customizer/64000-forest.jpg' },
  ]
  const currentPhoto = shirtColors.find(c => c.hex === color)?.photo || shirtColors[0].photo
  // Light shirts need design at full opacity; dark shirts get a slight boost via screen blend
  const isLightShirt = ['#F5F5F0', '#E8DDC4', '#B8BCC0'].includes(color)
  const inkColors = [
    { name: 'Red', hex: '#FF3B2F' },
    { name: 'Blue', hex: '#1E40FF' },
    { name: 'White', hex: '#F5F2E8' },
    { name: 'Black', hex: '#0F1115' },
    { name: 'Gold', hex: '#F2B632' },
    { name: 'Mint', hex: '#5BD9A4' },
  ]

  // Per Allstar Prints LLC price sheet — t-shirts, front print included
  const tierPrice = (n: number): number | null => {
    if (n >= 101) return null // custom quote
    if (n >= 51)  return 12
    if (n >= 25)  return 14
    if (n >= 12)  return 16
    if (n >= 6)   return 18
    if (n >= 2)   return 22
    return 25
  }
  const upgrade = method === 'Heavy Cotton' ? 5 : method === 'Tri-Blend' ? 3 : 0
  const base = tierPrice(qty)
  const each = base != null ? (base + upgrade).toFixed(2) : null
  const total = base != null && each != null ? (parseFloat(each) * qty).toFixed(0) : null

  return (
    <section
      id="customizer"
      style={{
        position: 'relative',
        background: C.inkBlack,
        color: C.paper,
        padding: '120px 28px',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: `radial-gradient(800px 500px at 30% 50%, ${ink}22, transparent 70%)`,
        }}
      />
      <div style={{ maxWidth: 1300, margin: '0 auto', position: 'relative' }}>
        <SectionLabel n="01" l="Live customizer" accent={tweaks.accent} />
        <h2
          style={{
            fontFamily: 'Archivo Black, sans-serif',
            fontSize: 'clamp(44px, 6vw, 96px)',
            lineHeight: 0.9,
            letterSpacing: '-.03em',
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          Design it. <span style={{ color: tweaks.accent }}>See it.</span> Order it.
        </h2>
        <p
          style={{
            maxWidth: 540,
            marginTop: 16,
            color: 'rgba(255,255,255,.7)',
            fontSize: 16,
            lineHeight: 1.5,
          }}
        >
          Pick a blank, drop in art or type, set your quantity. Every change re-renders on the shirt in real time.
        </p>

        <div
          className="ap-cust-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24, marginTop: 64 }}
        >
          <div
            style={{
              background: '#16191F',
              borderRadius: 24,
              border: '1px solid rgba(255,255,255,.08)',
              padding: 24,
              position: 'relative',
              overflow: 'hidden',
              minHeight: 460,
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px)',
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
                WebkitMaskImage: 'radial-gradient(ellipse at center, black 50%, transparent 100%)',
              }}
            />
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'relative',
                zIndex: 2,
              }}
            >
              <div style={{ display: 'flex', gap: 6 }}>
                {(['front', 'back'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSide(s)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 600,
                      background: side === s ? 'white' : 'transparent',
                      color: side === s ? C.inkBlack : 'rgba(255,255,255,.6)',
                      border: side === s ? '1px solid white' : '1px solid rgba(255,255,255,.15)',
                      textTransform: 'uppercase',
                      letterSpacing: '.06em',
                      cursor: 'pointer',
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,.5)' }}>
                {color.toUpperCase()} · {ink.toUpperCase()}
              </div>
            </div>
            <div
              style={{
                height: 'min(56vh, 520px)',
                position: 'relative',
                zIndex: 2,
                marginTop: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Real Gildan Softstyle 64000 model photo (color-aware) */}
              <div
                style={{
                  position: 'relative',
                  height: '100%',
                  aspectRatio: '1200 / 1800',
                  maxWidth: '100%',
                }}
              >
                <img
                  key={currentPhoto}
                  src={currentPhoto}
                  alt={`Gildan Softstyle 64000 in ${shirtColors.find(c => c.hex === color)?.name || 'selected color'}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    display: 'block',
                    filter: 'drop-shadow(0 30px 40px rgba(0,0,0,.45))',
                  }}
                />
                {/* Live design overlaid on the chest, blended for printed look */}
                <div
                  style={{
                    position: 'absolute',
                    top: '30%',
                    left: '38%',
                    width: '24%',
                    height: '22%',
                    pointerEvents: 'none',
                    mixBlendMode: isLightShirt ? 'multiply' : 'screen',
                    opacity: isLightShirt ? 0.92 : 0.95,
                  }}
                >
                  <DesignOverlay text={text} inkColor={ink} />
                </div>
              </div>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                zIndex: 3,
                display: 'flex',
                gap: 8,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {([
                { key: 'Standard',     label: 'Ringspun',         hint: 'Included' },
                { key: 'Tri-Blend',    label: 'Tri-Blend',        hint: '+$3' },
                { key: 'Heavy Cotton', label: 'Heavy Cotton',     hint: '+$5' },
              ] as const).map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMethod(m.key)}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 99,
                    fontSize: 12,
                    fontWeight: 600,
                    background: method === m.key ? tweaks.accent : 'rgba(255,255,255,.06)',
                    color: method === m.key ? 'white' : 'rgba(255,255,255,.7)',
                    border: '1px solid rgba(255,255,255,.1)',
                    backdropFilter: 'blur(8px)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  {m.label}
                  <span style={{ opacity: .7, fontWeight: 700 }}>{m.hint}</span>
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <CustGroup label="Your text">
              <input
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 12).toUpperCase())}
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
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,.4)', marginTop: 6, textAlign: 'right' }}>
                {text.length}/12
              </div>
            </CustGroup>

            <CustGroup label="Shirt color">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {shirtColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setColor(c.hex)}
                    title={c.name}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 99,
                      background: c.hex,
                      border:
                        color === c.hex ? '2px solid white' : '2px solid rgba(255,255,255,.1)',
                      boxShadow: color === c.hex ? `0 0 0 4px ${tweaks.accent}55` : 'none',
                      transition: 'all .2s',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </CustGroup>

            <CustGroup label="Ink color">
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {inkColors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setInk(c.hex)}
                    title={c.name}
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 99,
                      background: c.hex,
                      border: ink === c.hex ? '2px solid white' : '2px solid rgba(255,255,255,.1)',
                      boxShadow: ink === c.hex ? `0 0 0 4px ${tweaks.accent}55` : 'none',
                      cursor: 'pointer',
                    }}
                  />
                ))}
              </div>
            </CustGroup>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <CustGroup label="Size">
                <div style={{ display: 'flex', gap: 6 }}>
                  {['S', 'M', 'L', 'XL', '2XL'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      style={{
                        flex: 1,
                        padding: '12px 0',
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 700,
                        background: size === s ? 'white' : 'transparent',
                        color: size === s ? C.inkBlack : 'rgba(255,255,255,.7)',
                        border: '1px solid rgba(255,255,255,.15)',
                        cursor: 'pointer',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </CustGroup>
              <CustGroup label={`Qty: ${qty}`}>
                <input
                  type="range"
                  min="1"
                  max="288"
                  value={qty}
                  onChange={(e) => setQty(+e.target.value)}
                  style={{ width: '100%', accentColor: tweaks.accent }}
                />
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: 11,
                    color: 'rgba(255,255,255,.4)',
                    marginTop: 4,
                  }}
                >
                  <span>1</span>
                  <span>72</span>
                  <span>288+</span>
                </div>
              </CustGroup>
            </div>

            <div
              style={{
                border: `1px solid ${tweaks.accent}55`,
                borderRadius: 18,
                padding: 20,
                background: `linear-gradient(135deg, ${tweaks.accent}18, transparent)`,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(255,255,255,.5)',
                    }}
                  >
                    {total != null ? 'Estimated' : '101+ shirts'}
                  </div>
                  <div
                    style={{
                      fontFamily: 'Archivo Black, sans-serif',
                      fontSize: total != null ? 48 : 32,
                      lineHeight: 1,
                      letterSpacing: '-.02em',
                      marginTop: 4,
                    }}
                  >
                    {total != null ? `$${total}` : 'Custom Quote'}
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
                  {each != null ? (
                    <>
                      ${each} <span style={{ opacity: 0.5 }}>each</span>
                      <br />
                      <span style={{ opacity: 0.5 }}>
                        {qty} × {method}
                      </span>
                    </>
                  ) : (
                    <>
                      Bulk pricing<br />
                      <span style={{ opacity: 0.5 }}>Call (817) 507-4553</span>
                    </>
                  )}
                </div>
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,.45)', lineHeight: 1.5 }}>
                Front print included · 1 color, 1 location. Add-ons: back +$5 · sleeve +$3 · name/number +$4. 50% deposit on 12+ shirts.
              </div>
              <button
                onClick={apply}
                style={{
                  width: '100%',
                  marginTop: 16,
                  padding: '18px',
                  background: tweaks.accent,
                  color: 'white',
                  borderRadius: 99,
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: '.04em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Lock in this design <span>★</span>
              </button>
              <Link
                to="/upload-artwork"
                style={{
                  display: 'block',
                  textAlign: 'center',
                  marginTop: 12,
                  fontSize: 12,
                  letterSpacing: '.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,.6)',
                  textDecoration: 'underline',
                }}
              >
                Or upload your own artwork
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Process
// ─────────────────────────────────────────────
function Process({ accent }: { accent: string }) {
  const steps = [
    { n: '01', t: 'Upload or describe', d: 'Drop artwork, send a sketch, or just tell us the vibe. We’ll mock it up.' },
    { n: '02', t: 'Approve the proof', d: 'Same-day digital proof. Tweak colors, placement, garment until it’s perfect.' },
    { n: '03', t: 'We print it', d: 'Screen print, DTF transfer, or embroidery — pressed by hand in Dallas–Fort Worth.' },
    { n: '04', t: 'You wear it', d: 'Local pickup or shipped anywhere. Most orders out the door in 48 hours.' },
  ]
  return (
    <section
      id="process"
      style={{ padding: '120px 28px', background: C.bgCream, color: C.inkBlack }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <SectionLabel n="02" l="The process" accent={accent} />
        <h2
          style={{
            fontFamily: 'Archivo Black, sans-serif',
            fontSize: 'clamp(44px, 6vw, 88px)',
            lineHeight: 0.9,
            letterSpacing: '-.03em',
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          Quote to closet in <span style={{ color: accent }}>four steps.</span>
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: 1,
            marginTop: 64,
            background: C.rule,
            border: `1px solid ${C.rule}`,
            borderRadius: 24,
            overflow: 'hidden',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.n}
              style={{
                padding: '32px 28px',
                background: C.bgCream,
                minHeight: 240,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 13,
                  letterSpacing: '.1em',
                  color: accent,
                }}
              >
                {s.n}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: 'Archivo Black, sans-serif',
                    fontSize: 24,
                    letterSpacing: '-.02em',
                    marginBottom: 8,
                  }}
                >
                  {s.t}
                </div>
                <div style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.45 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Blanks (lifestyle gallery)
// ─────────────────────────────────────────────
function Blanks({
  tweaks,
  setTweaks,
}: {
  tweaks: Tweaks
  setTweaks: (next: Partial<Tweaks>) => void
}) {
  // Real SanMar blanks, 1200W product photos served from /public/mockups/
  const products: Product[] = [
    {
      name: 'Premium Ringspun Tee', brand: 'Gildan Softstyle 64000', price: '12–25', tag: 'Best seller',
      color: '#0F1115', surface: 'paper', shot: 'GILDAN · 64000',
      mockup: '/mockups/3480-black.jpg',
      printArea: { top: '30%', left: '38%', width: '24%', height: '22%' },
    },
    {
      name: 'Tri-Blend Tee', brand: 'BELLA+CANVAS 3413', price: '+3 ea', tag: 'Soft hand',
      color: '#3A3535', surface: 'cool', shot: 'BC · 3413',
      mockup: '/mockups/bc3413-charcoal.jpg',
      printArea: { top: '30%', left: '38%', width: '24%', height: '22%' },
    },
    {
      name: 'Heavy Cotton Tee', brand: 'Gildan Ultra Cotton 2000', price: '+5 ea', tag: 'Heavyweight',
      color: '#0F1115', surface: 'sand', shot: 'GILDAN · 2000',
      mockup: '/mockups/gildan-2000-black.jpg',
      printArea: { top: '30%', left: '38%', width: '24%', height: '22%' },
    },
    {
      name: 'Long Sleeve Tee', brand: 'Gildan Ultra Cotton G2400', price: '12–25', tag: 'Year-round',
      color: '#0F1115', surface: 'graphite', shot: 'GILDAN · G2400',
      mockup: '/mockups/gildan-g2400-black.jpg',
      printArea: { top: '32%', left: '38%', width: '24%', height: '22%' },
    },
    {
      name: 'Pullover Hoodie', brand: 'Gildan Heavy Blend 18500', price: 'Quote', tag: 'Embroidery ★',
      color: '#0E1B3D', surface: 'walnut', shot: 'GILDAN · 18500',
      mockup: '/mockups/gildan-18500-navy.jpg',
      printArea: { top: '36%', left: '38%', width: '24%', height: '22%' },
    },
    {
      name: 'Snapback Trucker Cap', brand: 'Port Authority C112', price: 'Quote', tag: 'Headwear',
      color: '#3A3F47', surface: 'warm', shot: 'PORT AUTH · C112',
      mockup: '/mockups/portauthority-c112-grey-black.jpg',
      showPrint: false, // hat front-panel print isn't in the same place as a shirt chest
    },
  ]
  return (
    <section
      id="blanks"
      style={{ padding: '120px 28px', background: C.bgBone, color: C.inkBlack }}
    >
      <div style={{ maxWidth: 1300, margin: '0 auto' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <SectionLabel n="03" l="Blank options" accent={tweaks.accent} />
            <h2
              style={{
                fontFamily: 'Archivo Black, sans-serif',
                fontSize: 'clamp(44px, 6vw, 88px)',
                lineHeight: 0.9,
                letterSpacing: '-.03em',
                marginTop: 16,
              }}
            >
              T-shirts, hoodies,{' '}
              <span
                style={{
                  fontFamily: 'Bricolage Grotesque, serif',
                  fontStyle: 'italic',
                  color: tweaks.accent,
                }}
              >
                hats
              </span>{' '}
              & DTF.
            </h2>
          </div>
          <Link
            to="/pricing"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontSize: 14,
              fontWeight: 700,
              borderBottom: `2px solid ${C.inkBlack}`,
              paddingBottom: 4,
              color: C.inkBlack,
              textDecoration: 'none',
            }}
          >
            See full pricing <span>→</span>
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 20,
            marginTop: 64,
          }}
        >
          {products.map((p) => (
            <LifestyleCard
              key={p.name}
              p={p}
              accent={tweaks.accent}
              inkColor={tweaks.inkColor}
              design={tweaks.design}
              onPick={() => setTweaks({ shirtColor: p.color })}
            />
          ))}
        </div>
        <div
          style={{
            marginTop: 24,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11,
            color: C.inkSoft,
            textAlign: 'center',
            letterSpacing: '.06em',
            opacity: 0.7,
          }}
        >
          ✱ Mockups shown — every order includes a free digital proof before we print
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// Page styles (keyframes + responsive)
// ─────────────────────────────────────────────
const PAGE_CSS = `
  @keyframes apMarquee { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }
  @keyframes apFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
  @keyframes apPulseLine { 0%,100%{transform:scaleY(.4); opacity:.4} 50%{transform:scaleY(1); opacity:1} }
  @media (min-width: 900px){
    .ap-hero-grid{ grid-template-columns: 0.85fr 1.5fr !important; gap:48px !important; }
    .ap-hero-shirt{ min-height: min(95vh, 1100px) !important; }
  }
  @media (min-width: 980px){
    .ap-cust-grid{ grid-template-columns: 1.4fr 1fr !important; gap: 40px !important; }
  }
`

// ─────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────
export default function Home() {
  const [tweaks, setTweaksState] = useState<Tweaks>(DEFAULTS)
  const setTweaks = (next: Partial<Tweaks>) =>
    setTweaksState((prev) => ({ ...prev, ...next }))

  return (
    <>
      <SEO
        title="Fast, Custom Apparel. Done Right."
        description="Allstar Prints LLC — Screen-printed, embroidered, and DTG apparel for teams, brands, events, and one-off ideas. Quote in minutes. Proofs same day. Veteran-owned in Glenn Heights, TX."
        path="/"
      />
      <style>{PAGE_CSS}</style>

      <Hero tweaks={tweaks} />

      <Marquee
        items={['48-HR RUSH AVAILABLE', 'FRONT PRINT INCLUDED', 'PREMIUM RINGSPUN', 'BULK PRICING FROM $12', 'VETERAN OWNED', 'DALLAS · FORT WORTH']}
        accent={tweaks.accent}
        speed={Math.max(15, 50 - tweaks.motion / 3)}
      />

      <Customizer tweaks={tweaks} setTweaks={setTweaks} />

      <Process accent={tweaks.accent} />

      <Marquee
        dark
        items={['★ T-SHIRTS · HOODIES · HATS', 'DTF TRANSFERS', 'SAME-DAY PROOFS', 'PICKUP OR SHIP', '★ ALLSTAR PRINTS LLC']}
        accent={tweaks.accent}
        speed={Math.max(20, 60 - tweaks.motion / 3)}
      />

      <Blanks tweaks={tweaks} setTweaks={setTweaks} />
    </>
  )
}
