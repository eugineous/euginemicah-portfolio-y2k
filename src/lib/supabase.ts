import { createClient } from '@supabase/supabase-js'

// Database types
export interface Database {
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          purpose: string
          message: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          purpose: string
          message: string
          created_at?: string
        }
      }
      page_analytics: {
        Row: {
          id: string
          page: string
          referrer: string | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          page: string
          referrer?: string | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}

// Anon client — lazy singleton, safe for client-side and server components
let _anonClient: ReturnType<typeof createClient<Database>> | null = null
export function getSupabaseAnon() {
  if (!_anonClient) {
    _anonClient = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )
  }
  return _anonClient
}

// Keep named export for backward compat (lazy)
export const supabaseAnon = {
  get client() { return getSupabaseAnon() }
}

// Service role client — server actions ONLY, never imported in client components
export function createServerSupabaseClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}
