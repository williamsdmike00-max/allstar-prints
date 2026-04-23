const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const BUCKET = 'artwork-uploads'

/**
 * Uploads files to Supabase Storage via the REST API and returns public URLs.
 * Uses direct fetch instead of the JS client to avoid JWT parsing issues.
 */
export async function uploadFilesToStorage(files: File[]): Promise<string[]> {
  if (files.length === 0) return []

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
  }

  const folder = `${Date.now()}`
  const urls: string[] = []

  for (const file of files) {
    const encodedPath = `${folder}/${encodeURIComponent(file.name)}`

    const response = await fetch(
      `${SUPABASE_URL}/storage/v1/object/${BUCKET}/${encodedPath}`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          'Content-Type': file.type || 'application/octet-stream',
        },
        body: file,
      },
    )

    if (!response.ok) {
      const err = await response.json().catch(() => ({}))
      throw new Error(`Failed to upload ${file.name}: ${err.error ?? response.statusText}`)
    }

    urls.push(`${SUPABASE_URL}/storage/v1/object/public/${BUCKET}/${encodedPath}`)
  }

  return urls
}
