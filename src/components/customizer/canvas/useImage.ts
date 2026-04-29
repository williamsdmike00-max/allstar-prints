import { useEffect, useState } from 'react'

// Tiny equivalent of the use-image hook: load an image element so it can be
// rendered as a Konva.Image (and captured by stage.toDataURL()).
export function useImage(src: string) {
  const [img, setImg] = useState<HTMLImageElement | null>(null)

  useEffect(() => {
    if (!src) {
      setImg(null)
      return
    }
    const el = new window.Image()
    el.crossOrigin = 'anonymous'
    el.src = src
    let cancelled = false
    const onLoad = () => { if (!cancelled) setImg(el) }
    const onError = () => { if (!cancelled) setImg(null) }
    el.addEventListener('load', onLoad)
    el.addEventListener('error', onError)
    return () => {
      cancelled = true
      el.removeEventListener('load', onLoad)
      el.removeEventListener('error', onError)
    }
  }, [src])

  return img
}
