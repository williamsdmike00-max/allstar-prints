import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string
const BUCKET = 'artwork-uploads'

function getClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Supabase env vars not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local')
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
}

/**
 * Uploads an array of files to Supabase Storage and returns their public URLs.
 * Each file is stored under a timestamped folder to avoid collisions.
 */
export async function uploadFilesToStorage(files: File[]): Promise<string[]> {
  if (files.length === 0) return []

  const supabase = getClient()
  const folder = `${Date.now()}`
  const urls: string[] = []

  for (const file of files) {
    const path = `${folder}/${file.name}`
    const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    })
    if (error) throw new Error(`Failed to upload ${file.name}: ${error.message}`)

    const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
    urls.push(data.publicUrl)
  }

  return urls
}
