import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

// Single shared client. Auth state (the admin session) persists to
// localStorage automatically; anonymous visitors just use the anon role.
export const supabase = createClient(url, anonKey)
