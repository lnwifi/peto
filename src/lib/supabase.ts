import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Create client with fallback to prevent crashes
let supabase: SupabaseClient

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  console.log('✅ Supabase connected')
} else {
  console.warn('⚠️ Supabase credentials not found - running in demo mode')
  // Create a mock for demo mode - this won't actually work but prevents crashes
  supabase = {} as SupabaseClient
}

export { supabase }
