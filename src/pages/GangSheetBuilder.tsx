/**
 * GangSheetBuilder.tsx
 *
 * ARCHITECTURE NOTES FOR PHASE 2:
 * ─────────────────────────────────────────────────────────────────────
 * This page is built as a shell. Two integration points are marked:
 *
 *   [EMBED ZONE A] — Third-party gang sheet builder iframe/widget.
 *                    Replace <BuilderEmbed /> with your embed code.
 *                    Candidates: Printavo, Printful, or a custom React
 *                    canvas builder (Fabric.js / Konva.js).
 *
 *   [UPLOAD ZONE B] — File upload form for pre-made gang sheets.
 *                    Replace <UploadZone /> with your storage backend.
 *                    Candidates: Supabase Storage, AWS S3 presigned URL,
 *                    or a multipart POST to your own Express server.
 *
 * Pricing logic lives in SHEET_SIZES — update prices there once
 * you have real rates. The selected sheet state is lifted to this
 * component so both zones can react to it.
 * ─────────────────────────────────────────────────────────────────────
 */

import { useState, useRef, ChangeEvent, DragEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Upload, LayoutGrid, CheckCircle, Clock,
  Zap, FileCheck, X, Info, ChevronDown, Star,
} from 'lucide-react'
import { submitForm, splitName } from '../lib/web3forms'
import { uploadFilesToStorage } from '../lib/storage'
import SEO from '../components/ui/SEO'
import FAQAccordion from '../components/ui/FAQAccordion'
import TrustBar from '../components/ui/TrustBar'
import SectionHeader from '../components/ui/SectionHeader'

// ─────────────────────────────────────────────
// Sheet size data (update prices when ready)
// ─────────────────────────────────────────────

interface SheetSize {
  id: string
  label: string
  dims: string          // display dimensions
  widthIn: number       // inches
  heightIn: number      // inches
  pricePerSheet: number // USD — placeholder
  piecesEstimate: string
  popular?: boolean
}

const SHEET_SIZES: SheetSize[] = [
  {
    id: '11x17',
    label: '11" × 17"',
    dims: '11 × 17 in',
    widthIn: 11,
    heightIn: 17,
    pricePerSheet: 8,
    piecesEstimate: '2–4 small designs',
  },
  {
    id: '13x19',
    label: '13" × 19"',
    dims: '13 × 19 in',
    widthIn: 13,
    heightIn: 19,
    pricePerSheet: 10,
    piecesEstimate: '4–6 medium designs',
    popular: true,
  },
  {
    id: '22x34',
    label: '22" × 34"',
    dims: '22 × 34 in',
    widthIn: 22,
    heightIn: 34,
    pricePerSheet: 18,
    piecesEstimate: '8–14 mixed designs',
  },
  {
    id: '22x60',
    label: '22" × 60"',
    dims: '22 × 60 in',
    widthIn: 22,
    heightIn: 60,
    pricePerSheet: 28,
    piecesEstimate: '14–24 mixed designs',
  },
  {
    id: 'custom',
    label: 'Custom Size',
    dims: 'Contact for quote',
    widthIn: 0,
    heightIn: 0,
    pricePerSheet: 0,
    piecesEstimate: 'Ask us',
  },
]

// ─────────────────────────────────────────────
// FAQ data
// ─────────────────────────────────────────────

const faqs = [
  {
    question: 'What is a gang sheet?',
    answer:
      'A gang sheet is a single large sheet of DTF (Direct-to-Film) transfer film that contains multiple designs arranged together. Instead of printing each design on its own sheet, you fill one large sheet to maximize value. You then heat-press each design onto your garments individually.',
  },
  {
    question: 'What file format should I use?',
    answer:
      'Submit each design as a PNG with a transparent background at 300 DPI minimum. Keep each design on its own file — we\'ll arrange them on the sheet. Vector files (AI, EPS, SVG) are also accepted and preferred for logos.',
  },
  {
    question: 'Do I need to arrange the designs myself?',
    answer:
      'No. If you upload individual design files, our team will arrange them on the sheet efficiently to maximize space. If you prefer full control, you can submit a pre-arranged, print-ready gang sheet file instead.',
  },
  {
    question: 'Is there a minimum order for gang sheets?',
    answer:
      'No minimum. You can order a single gang sheet. The more sheets you order, the better the per-sheet price.',
  },
  {
    question: 'How durable are DTF transfers?',
    answer:
      'Very durable when applied correctly. Wash garments inside out in cold water and tumble dry low. Avoid harsh detergents. Properly applied DTF transfers hold up for 50+ wash cycles.',
  },
  {
    question: 'Can I order just the transfers without garments?',
    answer:
      'Yes. We sell gang sheet transfers on their own. You can apply them yourself with a heat press or bring your garments in and we can apply them for you.',
  },
  {
    question: 'How long does production take?',
    answer:
      'Standard gang sheet orders are printed and shipped within 3–5 business days after artwork approval. Rush 48-hour production is available — let us know when ordering.',
  },
]

// ─────────────────────────────────────────────
// [EMBED ZONE A] — Builder placeholder
// Replace this entire component in Phase 2 with
// your third-party embed or custom React builder.
// ─────────────────────────────────────────────

function BuilderEmbed({ sheetSize }: { sheetSize: SheetSize }) {
  return (
    <div className="relative w-full rounded-xl overflow-hidden border-2 border-dashed border-brand-red/30 bg-brand-dark3">
      {/* Min-height placeholder canvas area */}
      <div className="flex flex-col items-center justify-center gap-4 py-20 px-8 text-center min-h-[480px]">
        {/* Phase 2 marker */}
        <div className="absolute top-4 right-4">
          <span className="text-[10px] font-black uppercase tracking-widest bg-brand-navy/60 border border-brand-blue/30 text-brand-blue px-3 py-1 rounded-full">
            Phase 2 — Builder Coming Soon
          </span>
        </div>

        <LayoutGrid size={52} className="text-brand-red/40" />
        <div>
          <p className="text-lg font-black text-white mb-2">
            Online Gang Sheet Builder
          </p>
          <p className="text-sm text-brand-silver max-w-sm leading-relaxed">
            Our drag-and-drop gang sheet builder will go here. Upload your designs, arrange them on a{' '}
            <span className="text-white font-semibold">{sheetSize.dims}</span> canvas, and send directly to print.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {/*
           * INTEGRATION POINT A:
           * Replace this block with your embed iframe or React widget.
           *
           * Option 1 — Third-party iframe:
           *   <iframe src="https://your-builder.com/embed" width="100%" height="600" />
           *
           * Option 2 — Custom React component:
           *   <GangSheetCanvas sheetWidth={sheetSize.widthIn} sheetHeight={sheetSize.heightIn} />
           *
           * Option 3 — Printavo / similar embed script:
           *   Use a useEffect() to inject their script tag, then mount to a ref div.
           */}
          <Link
            to="/contact"
            className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
          >
            Get Notified When Live <ArrowRight size={14} />
          </Link>
          <a
            href="#upload-section"
            className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/12 text-white font-bold uppercase tracking-wider text-sm px-6 py-3 rounded-lg transition-all"
          >
            Upload Instead
          </a>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────
// [UPLOAD ZONE B] — File upload form
// Replace handleSubmit's body with your real
// storage API call (Supabase, S3, etc.)
// ─────────────────────────────────────────────

interface UploadState {
  name: string
  email: string
  phone: string
  notes: string
  sheetQty: string
}

function UploadZone({ selectedSheet }: { selectedSheet: SheetSize }) {
  const [files, setFiles] = useState<File[]>([])
  const [dragging, setDragging] = useState(false)
  const [form, setForm] = useState<UploadState>({ name: '', email: '', phone: '', notes: '', sheetQty: '1' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const addFiles = (list: FileList) =>
    setFiles((prev) => [...prev, ...Array.from(list)])

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const onPick = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
  }

  const fmt = (b: number) =>
    b < 1024 * 1024 ? `${(b / 1024).toFixed(0)} KB` : `${(b / (1024 * 1024)).toFixed(1)} MB`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)
    try {
      const { firstName, lastName } = splitName(form.name)
      const fileUrls = await uploadFilesToStorage(files)
      await submitForm({
        subject: 'New Gang Sheet Order — Allstar Prints',
        from_name: form.name,
        replyto: form.email,
        name: form.name,
        email: form.email,
        phone: form.phone,
        first_name: firstName,
        last_name: lastName,
        sheet_size: selectedSheet.label,
        sheet_quantity: form.sheetQty,
        estimated_price: selectedSheet.id !== 'custom'
          ? `$${(selectedSheet.pricePerSheet * parseInt(form.sheetQty || '1')).toFixed(2)}`
          : 'Custom — needs quote',
        files_uploaded: files.map((f) => f.name).join(', ') || 'None',
        download_links: fileUrls.length > 0 ? fileUrls.join('\n') : 'No files uploaded',
        notes: form.notes,
        source: window.location.href,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Gang sheet submission error:', err)
      setSubmitError('Something went wrong submitting your order. Please try again or email us directly at contact@allstarprintsllc.com')
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
        <FileCheck size={48} className="text-brand-red" />
        <h3 className="text-xl font-black text-white">Files Submitted!</h3>
        <p className="text-sm text-brand-silver max-w-sm leading-relaxed">
          We received your gang sheet files and details. Expect a proof and invoice from us within a few hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setFiles([]); setForm({ name: '', email: '', phone: '', notes: '', sheetQty: '1' }) }}
          className="mt-2 text-xs font-bold uppercase tracking-wide text-brand-red hover:text-white transition-colors"
        >
          Submit Another Order
        </button>
      </div>
    )
  }

  const estPrice =
    selectedSheet.id === 'custom'
      ? 'Contact for pricing'
      : `$${(selectedSheet.pricePerSheet * parseInt(form.sheetQty || '1')).toFixed(2)} est.`

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed py-10 px-6 text-center cursor-pointer transition-all ${
          dragging
            ? 'border-brand-red bg-brand-red/8 scale-[1.01]'
            : 'border-white/15 hover:border-brand-red/50 hover:bg-brand-red/4'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept=".png,.jpg,.jpeg,.pdf,.ai,.eps,.svg,.psd"
          onChange={onPick}
          className="hidden"
        />
        <Upload size={30} className="text-brand-red opacity-70" />
        <div>
          <p className="text-sm font-bold text-white">
            {dragging ? 'Drop your files here' : 'Drag & drop your gang sheet file'}
          </p>
          <p className="text-xs text-brand-silver mt-0.5">
            or click to browse · PNG, PDF, AI, EPS, SVG accepted · 300 DPI min
          </p>
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="flex flex-col gap-2">
          {files.map((f, i) => (
            <li key={i} className="flex items-center justify-between gap-3 px-4 py-2.5 bg-brand-dark4 rounded-lg border border-white/8">
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck size={14} className="text-brand-red flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate">{f.name}</p>
                  <p className="text-xs text-brand-silver">{fmt(f.size)}</p>
                </div>
              </div>
              <button type="button" onClick={() => setFiles((p) => p.filter((_, j) => j !== i))} className="text-brand-silver/50 hover:text-brand-red transition-colors flex-shrink-0">
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Contact + order details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UField label="Your Name" value={form.name} onChange={(v) => setForm((p) => ({ ...p, name: v }))} placeholder="Full name" required />
        <UField label="Email" type="email" value={form.email} onChange={(v) => setForm((p) => ({ ...p, email: v }))} placeholder="you@example.com" required />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <UField label="Phone (optional)" type="tel" value={form.phone} onChange={(v) => setForm((p) => ({ ...p, phone: v }))} placeholder="(555) 000-0000" />
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">
            Number of Sheets <span className="text-brand-red">*</span>
          </label>
          <div className="relative">
            <select
              value={form.sheetQty}
              onChange={(e) => setForm((p) => ({ ...p, sheetQty: e.target.value }))}
              required
              className="w-full bg-brand-dark4 border border-white/10 rounded-lg pl-4 pr-8 py-2.5 text-sm text-white outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 transition-colors appearance-none cursor-pointer"
            >
              {['1', '2', '3', '4', '5', '10', '15', '20', '25', '50'].map((n) => (
                <option key={n} value={n}>{n} sheet{parseInt(n) > 1 ? 's' : ''}</option>
              ))}
            </select>
            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-silver/40 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Estimated price display */}
      {selectedSheet.id !== 'custom' && (
        <div className="flex items-center justify-between px-4 py-3 rounded-lg bg-brand-dark4 border border-brand-red/15">
          <div className="flex items-center gap-2 text-xs text-brand-silver">
            <Info size={12} className="text-brand-red flex-shrink-0" />
            Estimated total for {form.sheetQty || 1}× {selectedSheet.label}
          </div>
          <span className="text-sm font-black text-white">{estPrice}</span>
        </div>
      )}

      <div className="flex flex-col gap-1.5">
        <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
          rows={3}
          placeholder="Design placement notes, garment types you'll be applying to, deadline, special requests..."
          className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 resize-none transition-colors"
        />
      </div>

      {submitError && (
        <div className="flex items-start gap-2 p-3 bg-red-900/30 border border-brand-red/40 rounded-lg">
          <Info size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
          <p className="text-xs text-brand-silver">{submitError}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={submitting || (!form.email)}
        className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-50 text-white font-black uppercase tracking-wide text-sm py-4 rounded-xl shadow-glow-red transition-all hover:-translate-y-px flex items-center justify-center gap-2"
      >
        {submitting ? 'Uploading...' : <><Upload size={15} /> Submit My Gang Sheet Files <ArrowRight size={15} /></>}
      </button>
      <p className="text-[11px] text-brand-silver/40 text-center">
        We'll review your files and send a proof + invoice within a few hours.
      </p>
    </form>
  )
}

// Tiny input helper local to this page
function UField({ label, value, onChange, placeholder, type = 'text', required }: {
  label: string; value: string; onChange: (v: string) => void
  placeholder?: string; type?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[10px] font-bold uppercase tracking-widest text-brand-silver/65">
        {label}{required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      <input
        type={type} value={value} onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} required={required}
        className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/35 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/12 transition-colors"
      />
    </div>
  )
}

// ─────────────────────────────────────────────
// Size selector component
// ─────────────────────────────────────────────

function SizeSelector({
  selected,
  onChange,
}: {
  selected: SheetSize
  onChange: (s: SheetSize) => void
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
      {SHEET_SIZES.map((size) => (
        <button
          key={size.id}
          type="button"
          onClick={() => onChange(size)}
          className={`relative flex flex-col items-center gap-1.5 p-4 rounded-xl border text-center transition-all ${
            selected.id === size.id
              ? 'bg-brand-red/12 border-brand-red/50 shadow-glow-red'
              : 'bg-brand-dark3 border-white/8 hover:border-brand-red/30 hover:-translate-y-0.5'
          }`}
        >
          {size.popular && (
            <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[9px] font-black uppercase tracking-widest bg-brand-red text-white px-2 py-0.5 rounded-full whitespace-nowrap">
              Popular
            </span>
          )}
          {/* Sheet visual */}
          <div
            className={`rounded border flex items-center justify-center ${
              selected.id === size.id ? 'border-brand-red/50 bg-brand-red/10' : 'border-white/15 bg-white/4'
            }`}
            style={{
              width: size.id === 'custom' ? 36 : Math.min(36, (size.widthIn / 24) * 40 + 16),
              height: size.id === 'custom' ? 44 : Math.min(52, (size.heightIn / 64) * 56 + 16),
            }}
          >
            <span className="text-[9px] font-black text-brand-silver/50">
              {size.id === 'custom' ? '?' : ''}
            </span>
          </div>
          <p className={`text-xs font-bold leading-tight ${selected.id === size.id ? 'text-white' : 'text-brand-silver'}`}>
            {size.label}
          </p>
          {size.id !== 'custom' && (
            <p className="text-[10px] text-brand-red font-bold">${size.pricePerSheet}/sheet</p>
          )}
          <p className="text-[10px] text-brand-silver/60 leading-tight">{size.piecesEstimate}</p>
        </button>
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────
// Main page component
// ─────────────────────────────────────────────

type ActiveTab = 'build' | 'upload'

export default function GangSheetBuilder() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('upload')
  const [selectedSheet, setSelectedSheet] = useState<SheetSize>(SHEET_SIZES[1]) // default 13×19

  return (
    <>
      <SEO
        title="DTF Gang Sheet Builder — Build or Upload Your Gang Sheet"
        description="Build a DTF gang sheet online or upload a print-ready file. Multiple sheet sizes available. No minimums. Fast turnaround from Allstar Prints LLC."
        path="/gang-sheet-builder"
      />
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark pt-12 pb-16 md:pt-16 md:pb-20">
        {/* Background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-brand-navy/20 blur-3xl -translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-red/8 blur-3xl translate-x-1/3 translate-y-1/3" />
          <div className="absolute inset-0 flex items-center justify-center select-none">
            <span className="text-[45vw] leading-none font-black text-white/[0.015]">▦</span>
          </div>
        </div>

        <div className="relative container-xl section-padding">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-brand-red/12 border border-brand-red/30 text-brand-red text-xs font-black uppercase tracking-widest px-4 py-2 rounded-full mb-6">
              <Zap size={12} fill="currentColor" />
              DTF Gang Sheet Printing
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.04] mb-5">
              Build Your DTF<br />
              <span className="text-gradient-red">Gang Sheet Online</span>
            </h1>

            <p className="text-brand-silver text-lg leading-relaxed mb-8 max-w-2xl">
              Upload your designs individually or submit a pre-arranged print-ready file.
              We'll print it on premium DTF transfer film and ship it fast — no garments needed.
            </p>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setActiveTab('build')
                  document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                <LayoutGrid size={16} /> Build My Gang Sheet
              </button>
              <button
                onClick={() => {
                  setActiveTab('upload')
                  document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/12 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg transition-all"
              >
                <Upload size={16} /> Upload Ready-to-Print File
              </button>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* ── WHAT IS A GANG SHEET ── */}
      <section className="section-padding py-16 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">
              Gang Sheet Explained
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-5">
              What Is a<br />
              <span className="text-gradient-red">Gang Sheet?</span>
            </h2>
            <p className="text-brand-silver leading-relaxed mb-5">
              A gang sheet is a large sheet of DTF (Direct-to-Film) transfer film packed with multiple designs side by side. Instead of printing each design on its own sheet — which wastes film and money — you fill one sheet with everything you need.
            </p>
            <p className="text-brand-silver leading-relaxed mb-6">
              Once printed, each design is cut out and heat-pressed onto any garment you choose. No minimums, no wasted material, and you get full-color photographic-quality prints on every piece.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                'Works on any fabric type and color',
                'Full-color printing with no color restrictions',
                'Press onto t-shirts, hoodies, bags, hats — anything',
                'No minimum order — one sheet is fine',
                'Apply now or store and use later',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-brand-silver">
                  <CheckCircle size={14} className="text-brand-red flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual diagram */}
          <div className="relative">
            <div className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-brand-red/6 to-brand-navy/8 blur-xl pointer-events-none" />
            <div className="relative bg-brand-dark3 border border-white/8 rounded-2xl p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-silver/50 mb-5 text-center">
                Sample Gang Sheet Layout
              </p>
              {/* Mock gang sheet grid */}
              <div className="bg-brand-dark4 border border-white/10 rounded-xl p-4 aspect-[3/4] flex flex-col gap-2.5">
                {/* Row 1: two wide blocks */}
                <div className="flex gap-2 flex-1">
                  <div className="flex-1 rounded-lg bg-brand-red/12 border border-brand-red/20 flex items-center justify-center">
                    <span className="text-2xl">👕</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-brand-navy/30 border border-brand-blue/20 flex items-center justify-center">
                    <span className="text-2xl">🏆</span>
                  </div>
                </div>
                {/* Row 2: three small blocks */}
                <div className="flex gap-2 flex-1">
                  <div className="flex-1 rounded-lg bg-brand-navy/30 border border-brand-blue/20 flex items-center justify-center">
                    <span className="text-xl">⭐</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-brand-red/12 border border-brand-red/20 flex items-center justify-center">
                    <span className="text-xl">🎨</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-white/4 border border-white/10 flex items-center justify-center">
                    <span className="text-xl">🔥</span>
                  </div>
                </div>
                {/* Row 3: one wide */}
                <div className="flex gap-2 flex-1">
                  <div className="w-2/3 rounded-lg bg-brand-red/12 border border-brand-red/20 flex items-center justify-center">
                    <span className="text-xl">🏅</span>
                  </div>
                  <div className="flex-1 rounded-lg bg-brand-navy/30 border border-brand-blue/20 flex items-center justify-center">
                    <span className="text-xl">✨</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-brand-silver/50 text-center mt-3">
                Multiple designs packed onto one sheet — max value, minimum waste
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHEET SIZE SELECTOR ── */}
      <section className="bg-brand-dark2 border-y border-white/8 py-16">
        <div className="container-xl section-padding">
          <SectionHeader
            label="Sheet Sizes"
            title="Choose Your"
            titleHighlight="Sheet Size"
            subtitle="Pick the size that fits your needs. Larger sheets hold more designs and cost less per design."
          />
          <SizeSelector selected={selectedSheet} onChange={setSelectedSheet} />

          {/* Selected sheet detail card */}
          {selectedSheet.id !== 'custom' && (
            <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-xl bg-brand-dark3 border border-brand-red/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand-red/12 border border-brand-red/25 flex items-center justify-center text-brand-red">
                  <LayoutGrid size={22} />
                </div>
                <div>
                  <p className="text-base font-black text-white">{selectedSheet.label} Gang Sheet</p>
                  <p className="text-sm text-brand-silver">{selectedSheet.piecesEstimate} · ${selectedSheet.pricePerSheet} per sheet</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setActiveTab('upload')
                  document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="flex-shrink-0 inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
              >
                Order This Size <ArrowRight size={13} />
              </button>
            </div>
          )}
          {selectedSheet.id === 'custom' && (
            <div className="mt-6 p-5 rounded-xl bg-brand-dark3 border border-brand-blue/20 flex items-start gap-3">
              <Info size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-bold text-white mb-1">Need a custom size?</p>
                <p className="text-sm text-brand-silver leading-relaxed">
                  We can accommodate non-standard sheet dimensions. <Link to="/contact" className="text-brand-red hover:text-white transition-colors font-semibold">Contact us</Link> with your dimensions and we'll provide a custom quote.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── BUILDER / UPLOAD TABS ── */}
      <section id="builder-section" className="section-padding py-16 container-xl mx-auto scroll-mt-20">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-2">Place Your Order</p>
          <h2 className="text-2xl md:text-3xl font-black text-white mb-5">
            How Would You Like to{' '}
            <span className="text-gradient-red">Submit Your Order?</span>
          </h2>

          {/* Tab switcher */}
          <div className="inline-flex bg-brand-dark3 border border-white/8 rounded-xl p-1 gap-1">
            <button
              onClick={() => setActiveTab('build')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${
                activeTab === 'build'
                  ? 'bg-brand-red text-white shadow-glow-red'
                  : 'text-brand-silver hover:text-white'
              }`}
            >
              <LayoutGrid size={14} /> Build Online
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold uppercase tracking-wide transition-all ${
                activeTab === 'upload'
                  ? 'bg-brand-red text-white shadow-glow-red'
                  : 'text-brand-silver hover:text-white'
              }`}
            >
              <Upload size={14} /> Upload File
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content area */}
          <div className="lg:col-span-2">
            {activeTab === 'build' ? (
              <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <p className="text-sm font-bold text-white">
                      Building on: <span className="text-brand-red">{selectedSheet.label}</span>
                    </p>
                    <p className="text-xs text-brand-silver">{selectedSheet.piecesEstimate}</p>
                  </div>
                  <button
                    onClick={() => document.getElementById('size-section')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-xs font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide flex items-center gap-1"
                  >
                    Change size <ChevronDown size={11} />
                  </button>
                </div>
                {/* [EMBED ZONE A] */}
                <BuilderEmbed sheetSize={selectedSheet} />
              </div>
            ) : (
              <div className="bg-brand-dark3 border border-white/8 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-brand-navy/60 to-brand-dark3 border-b border-white/8 px-7 py-5">
                  <h3 className="text-base font-black text-white mb-0.5">Upload Your Gang Sheet File</h3>
                  <p className="text-sm text-brand-silver">
                    Submit a print-ready file for{' '}
                    <span className="text-white font-semibold">{selectedSheet.label}</span> — we'll print and ship it fast.
                  </p>
                </div>
                <div className="p-7">
                  {/* [UPLOAD ZONE B] */}
                  <UploadZone selectedSheet={selectedSheet} />
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">
            {/* Turnaround */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <div className="flex items-center gap-3 mb-4">
                <Clock size={18} className="text-brand-red" />
                <h3 className="text-sm font-black uppercase tracking-wide text-white">Turnaround</h3>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Standard', time: '3–5 business days', badge: '' },
                  { label: '⚡ Rush', time: '24–48 hours', badge: 'Add-on fee' },
                ].map((t) => (
                  <div key={t.label} className="flex items-center justify-between p-3 bg-brand-dark4 rounded-lg border border-white/8">
                    <div>
                      <p className="text-sm font-bold text-white">{t.label}</p>
                      <p className="text-xs text-brand-silver">{t.time}</p>
                    </div>
                    {t.badge && (
                      <span className="text-[10px] font-bold uppercase tracking-wide text-brand-red border border-brand-red/30 px-2 py-0.5 rounded-full">
                        {t.badge}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Artwork requirements */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-4">Artwork Requirements</h3>
              <ul className="flex flex-col gap-2.5">
                {[
                  { icon: '✅', text: 'PNG with transparent background' },
                  { icon: '✅', text: '300 DPI minimum resolution' },
                  { icon: '✅', text: 'AI, EPS, SVG also accepted' },
                  { icon: '✅', text: 'Convert fonts to outlines' },
                  { icon: '❌', text: 'No low-res screenshots or JPGs under 200 DPI' },
                  { icon: '❌', text: 'No white backgrounds (use transparency)' },
                ].map((item) => (
                  <li key={item.text} className="flex items-start gap-2 text-xs text-brand-silver leading-relaxed">
                    <span className="text-sm flex-shrink-0 leading-none mt-0.5">{item.icon}</span>
                    {item.text}
                  </li>
                ))}
              </ul>
              <div className="mt-4 p-3 rounded-lg bg-brand-navy/20 border border-brand-blue/20">
                <p className="text-xs text-brand-silver leading-relaxed">
                  <span className="font-bold text-white">Not sure about your file?</span> Upload it anyway — we'll let you know if we can work with it or need something different.
                </p>
              </div>
            </div>

            {/* Trust snippet */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-red/8 to-brand-dark3 border border-brand-red/15">
              <div className="flex gap-0.5 mb-3">
                {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-brand-red" fill="currentColor" />)}
              </div>
              <p className="text-sm text-brand-silver italic leading-relaxed mb-2">
                "Got my gang sheets in 2 days. Print quality was insane — every color popped perfectly. Will definitely reorder."
              </p>
              <p className="text-xs font-bold text-white">Briana T. — Custom Apparel Reseller</p>
            </div>

            {/* Need help link */}
            <div className="p-5 rounded-xl bg-brand-dark3 border border-white/8">
              <h4 className="text-sm font-bold text-white mb-1.5">Need Help?</h4>
              <p className="text-sm text-brand-silver mb-3 leading-relaxed">
                Not sure what size to use or how to set up your file? We're happy to help you figure it out.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
              >
                Contact Us <ArrowRight size={11} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-brand-dark2 border-y border-white/8 py-16">
        <div className="container-xl section-padding">
          <SectionHeader
            label="The Process"
            title="How Gang Sheet"
            titleHighlight="Orders Work"
            subtitle="Simple from start to finish. Upload, approve, print, press."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { num: '01', icon: '📐', title: 'Choose Your Sheet Size', desc: 'Pick the sheet size that fits your designs and quantity. Larger sheets = lower cost per design.' },
              { num: '02', icon: '🎨', title: 'Submit Your Designs', desc: 'Upload individual PNG files or a pre-arranged print-ready gang sheet. We accept all common formats.' },
              { num: '03', icon: '👁️', title: 'Approve the Proof', desc: 'We send a digital preview showing the final layout before printing. You approve — then we print.' },
              { num: '04', icon: '🔥', title: 'Print, Ship & Press', desc: 'Transfers are printed on premium DTF film, packaged carefully, and shipped to your door.' },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-3 p-5 rounded-xl bg-brand-dark3 border border-white/8 hover:border-brand-red/25 transition-colors">
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-red/50">Step {step.num}</span>
                  <h3 className="text-sm font-bold text-white mt-0.5 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-brand-silver leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding py-16 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">FAQ</p>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
              Gang Sheet<br />
              <span className="text-gradient-red">Questions Answered</span>
            </h2>
            <p className="text-brand-silver leading-relaxed mb-6">
              Everything you need to know before placing your first gang sheet order.
            </p>
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
          <FAQAccordion items={faqs} />
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-navy via-brand-dark3 to-brand-dark2 border-y border-white/8 py-16">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-brand-red/8 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-brand-blue/6 blur-3xl" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-3">Ready to Print?</p>
          <h2 className="text-2xl md:text-4xl font-black text-white leading-tight mb-4">
            Full-Color DTF Transfers.<br />
            <span className="text-gradient-red">Any Design. Any Quantity.</span>
          </h2>
          <p className="text-brand-silver max-w-xl mx-auto leading-relaxed mb-8">
            No minimums. No setup fees. Professional DTF gang sheet printing that's fast, affordable, and done right.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setActiveTab('upload')
                document.getElementById('builder-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white font-black uppercase tracking-wider text-sm px-8 py-4 rounded-lg shadow-glow-red transition-all hover:-translate-y-0.5"
            >
              <Upload size={16} /> Submit My Gang Sheet <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/8 border border-white/15 hover:bg-white/12 text-white font-bold uppercase tracking-wider text-sm px-8 py-4 rounded-lg transition-all"
            >
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
