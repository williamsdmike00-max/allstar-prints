import { useRef, useState } from 'react'
import { Upload, AlertCircle } from 'lucide-react'
import { useCustomizer } from '../customizer'

const MAX_BYTES = 8 * 1024 * 1024 // 8 MB
const ACCEPTED = 'image/png,image/jpeg,image/svg+xml,image/webp'

export default function UploadImage() {
  const addImage = useCustomizer((s) => s.addImage)
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  const handle = async (file: File | undefined) => {
    setError(null)
    if (!file) return
    if (file.size > MAX_BYTES) {
      setError('Image is too large (max 8 MB). Try a smaller file or send the original via Upload Artwork.')
      return
    }
    setBusy(true)
    try {
      const dataURL = await fileToDataURL(file)
      const dims = await readImageSize(dataURL)
      addImage(dataURL, dims.width, dims.height)
    } catch (err) {
      console.warn('UploadImage failed', err)
      setError('Could not read that image. Try a PNG or JPG.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={busy}
        className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg bg-brand-red text-white font-bold text-sm uppercase tracking-wide hover:bg-brand-red-dark transition-colors disabled:opacity-50"
      >
        <Upload size={16} />
        {busy ? 'Loading…' : 'Upload Image'}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED}
        className="hidden"
        onChange={(e) => handle(e.target.files?.[0])}
      />
      <p className="text-[11px] text-brand-silver/70 leading-relaxed">
        PNG, JPG, SVG, or WEBP — under 8 MB. Use a transparent PNG when possible. For print-ready vector art, send via the Upload Artwork page.
      </p>
      {error && (
        <div className="flex items-start gap-2 p-2.5 rounded-lg bg-brand-red/10 border border-brand-red/30">
          <AlertCircle size={14} className="text-brand-red flex-shrink-0 mt-0.5" />
          <p className="text-xs text-white">{error}</p>
        </div>
      )}
    </div>
  )
}

function fileToDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '')
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

function readImageSize(dataURL: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new window.Image()
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = dataURL
  })
}
