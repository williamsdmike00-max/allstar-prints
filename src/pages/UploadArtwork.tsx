import { useState, useRef, DragEvent, ChangeEvent } from 'react'
import { Upload, FileCheck, AlertCircle, ArrowRight, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import SectionHeader from '../components/ui/SectionHeader'
import { submitForm, splitName } from '../lib/web3forms'
import SEO from '../components/ui/SEO'

const acceptedTypes = [
  { ext: 'AI', desc: 'Adobe Illustrator', preferred: true },
  { ext: 'EPS', desc: 'Vector format', preferred: true },
  { ext: 'SVG', desc: 'Scalable vector', preferred: true },
  { ext: 'PDF', desc: 'Print-ready PDF', preferred: true },
  { ext: 'PNG', desc: '300 DPI min', preferred: false },
  { ext: 'JPG', desc: '300 DPI min', preferred: false },
]

const tips = [
  { icon: '✅', text: 'Use a transparent background (PNG) when possible' },
  { icon: '✅', text: 'Minimum 300 DPI for raster files (PNG, JPG)' },
  { icon: '✅', text: 'Convert fonts to outlines in AI/EPS files' },
  { icon: '✅', text: 'Provide exact Pantone or hex color codes if colors matter' },
  { icon: '❌', text: 'Avoid screenshots or images exported from Word/PowerPoint' },
  { icon: '❌', text: 'Avoid sending files under 72 DPI' },
]

interface UploadedFile {
  name: string
  size: number
  type: string
}

export default function UploadArtwork() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragging, setDragging] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [notes, setNotes] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const addFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((f) => ({ name: f.name, size: f.size, type: f.type }))
    setFiles((prev) => [...prev, ...newFiles])
  }

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragging(false)
    if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) addFiles(e.target.files)
  }

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const { firstName, lastName } = splitName(name)
      await submitForm({
        subject: 'New Artwork Upload — Allstar Prints',
        from_name: name,
        name,
        email,
        phone,
        first_name: firstName,
        last_name: lastName,
        notes,
        files_uploaded: files.map((f) => f.name).join(', ') || 'No files — see notes',
        file_count: files.length,
        source: window.location.href,
      })
      setSubmitted(true)
    } catch (err) {
      console.error('Webhook error:', err)
      setSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <SEO
        title="Upload Artwork — Submit Your Design File"
        description="Upload your custom apparel artwork to Allstar Prints LLC. We accept AI, EPS, SVG, PDF, PNG, and JPG files. Get a free proof and quote back within hours."
        path="/upload-artwork"
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-dark via-brand-dark2 to-brand-dark py-20 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-brand-navy/20 blur-3xl translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="relative container-xl section-padding text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red mb-4">Upload Artwork</p>
          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-5">
            Send Us Your Design.<br />
            <span className="text-gradient-red">We'll Take It From There.</span>
          </h1>
          <p className="text-brand-silver text-lg leading-relaxed max-w-xl mx-auto">
            Upload your artwork below, include a few details about your project, and we'll review your file and follow up with a quote — usually within a few hours.
          </p>
        </div>
      </section>

      <section className="section-padding py-16 container-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Accepted file types */}
            <div className="p-6 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-4">Accepted File Types</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {acceptedTypes.map((t) => (
                  <span key={t.ext} className={`flex flex-col items-center px-3 py-2 rounded-lg border text-center ${t.preferred ? 'bg-brand-red/8 border-brand-red/30 text-brand-red' : 'bg-brand-dark4 border-white/10 text-brand-silver'}`}>
                    <span className="text-xs font-black uppercase">.{t.ext}</span>
                    <span className="text-[10px] mt-0.5 opacity-70">{t.desc}</span>
                    {t.preferred && <span className="text-[9px] font-bold uppercase text-brand-red/70 mt-0.5">Preferred</span>}
                  </span>
                ))}
              </div>
              <p className="text-xs text-brand-silver/60">Don't have the right format? Send what you have — we'll let you know if we can work with it.</p>
            </div>

            {/* Design tips */}
            <div className="p-6 rounded-xl bg-brand-dark3 border border-white/8">
              <h3 className="text-sm font-black uppercase tracking-wide text-white mb-4">Artwork Tips</h3>
              <ul className="flex flex-col gap-2.5">
                {tips.map((tip) => (
                  <li key={tip.text} className="flex items-start gap-2 text-xs text-brand-silver leading-relaxed">
                    <span className="text-sm flex-shrink-0">{tip.icon}</span>
                    {tip.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* No design? */}
            <div className="p-5 rounded-xl bg-gradient-to-br from-brand-navy/30 to-brand-dark3 border border-brand-navy/40">
              <h4 className="text-sm font-bold text-white mb-2">Don't Have Artwork Yet?</h4>
              <p className="text-sm text-brand-silver mb-3 leading-relaxed">
                No problem. Skip the upload, describe your idea in the notes, and we'll work with you to create something from scratch.
              </p>
              <Link to="/pricing" className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-white transition-colors uppercase tracking-wide">
                Request a quote instead <ArrowRight size={11} />
              </Link>
            </div>
          </div>

          {/* Upload form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-center p-10 rounded-xl bg-brand-dark3 border border-brand-red/25">
                <FileCheck size={48} className="text-brand-red mb-5" />
                <h2 className="text-2xl font-black text-white mb-3">Artwork Submitted!</h2>
                <p className="text-brand-silver leading-relaxed max-w-md mb-6">
                  We've received your files and details. Our team will review your artwork and follow up shortly with a quote and any questions.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFiles([]); setName(''); setEmail(''); setPhone(''); setNotes('') }}
                  className="text-sm font-bold text-brand-red hover:text-white transition-colors uppercase tracking-wide"
                >
                  Submit More Files
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-brand-dark3 border border-white/8 rounded-xl p-7 flex flex-col gap-6">
                <div>
                  <h2 className="text-xl font-black text-white mb-1">Upload Your Artwork</h2>
                  <p className="text-sm text-brand-silver">Attach your files, tell us about your project, and we'll take it from there.</p>
                </div>

                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  onClick={() => fileRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
                    dragging ? 'border-brand-red bg-brand-red/8' : 'border-white/15 hover:border-brand-red/50 hover:bg-brand-red/4'
                  }`}
                >
                  <input
                    ref={fileRef}
                    type="file"
                    multiple
                    accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg"
                    onChange={onFileChange}
                    className="hidden"
                  />
                  <Upload size={32} className="text-brand-red mx-auto mb-3 opacity-70" />
                  <p className="text-sm font-bold text-white mb-1">
                    {dragging ? 'Drop your files here' : 'Drag & drop your files here'}
                  </p>
                  <p className="text-xs text-brand-silver">or click to browse — AI, EPS, SVG, PDF, PNG, JPG accepted</p>
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="flex flex-col gap-2">
                    {files.map((file, i) => (
                      <div key={i} className="flex items-center justify-between gap-3 p-3 bg-brand-dark4 rounded-lg border border-white/8">
                        <div className="flex items-center gap-3 min-w-0">
                          <FileCheck size={16} className="text-brand-red flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{file.name}</p>
                            <p className="text-xs text-brand-silver">{formatSize(file.size)}</p>
                          </div>
                        </div>
                        <button type="button" onClick={() => removeFile(i)} className="text-brand-silver hover:text-brand-red transition-colors flex-shrink-0">
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact info */}
                <fieldset className="flex flex-col gap-4">
                  <legend className="text-xs font-bold uppercase tracking-widest text-brand-silver/60 mb-1">Your Contact Info</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <ArtField label="Your Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required />
                    <ArtField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" required />
                  </div>
                  <ArtField label="Phone (optional)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000" />
                </fieldset>

                {/* Notes */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-silver/70">
                    Project Notes <span className="normal-case font-normal text-brand-silver/40">(design intent, colors, size, quantity, deadline)</span>
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    placeholder="Tell us about your project — garment type, print colors, quantity, placement, deadline, and anything else we should know..."
                    className="bg-white/4 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 resize-none transition-colors"
                  />
                </div>

                {files.length === 0 && (
                  <div className="flex items-start gap-2 p-3 bg-brand-navy/20 border border-brand-blue/20 rounded-lg">
                    <AlertCircle size={14} className="text-brand-blue flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-brand-silver">No files added yet. You can still submit — just describe your design in the notes above and we'll follow up.</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting || (!email && !name)}
                  className="w-full bg-brand-red hover:bg-brand-red-dark disabled:opacity-60 text-white font-bold uppercase tracking-wider text-sm py-4 rounded-md shadow-glow-red transition-all hover:-translate-y-px flex items-center justify-center gap-2"
                >
                  {submitting ? 'Uploading...' : <>Submit Artwork <ArrowRight size={16} /></>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="section-padding py-16 bg-brand-dark2 border-t border-white/8">
        <div className="container-xl mx-auto">
          <SectionHeader label="What Happens Next" title="After You Upload" titleHighlight="We Handle the Rest" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: '1', icon: '🔍', title: 'We Review Your File', desc: 'Our team checks your artwork for print quality and notes any issues within hours.' },
              { step: '2', icon: '🎨', title: 'We Send a Mockup', desc: 'We place your design on your chosen garment and send a digital proof for approval.' },
              { step: '3', icon: '✅', title: 'You Approve & We Print', desc: 'Once you give the green light, we start printing. No surprises, no hidden fees.' },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-xl bg-brand-dark3 border border-white/8">
                <span className="text-3xl mb-4 block">{item.icon}</span>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-brand-silver leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

interface ArtFieldProps {
  label: string
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  type?: string
  required?: boolean
}

function ArtField({ label, value, onChange, placeholder, type = 'text', required }: ArtFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-widest text-brand-silver/70">
        {label}{required && <span className="text-brand-red ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-white/4 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-brand-silver/40 outline-none focus:border-brand-red focus:ring-2 focus:ring-brand-red/15 transition-colors"
      />
    </div>
  )
}
