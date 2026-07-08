import { createClient } from '@supabase/supabase-js'

const rawUrl = (import.meta.env.VITE_SUPABASE_URL ?? '').trim()
const rawAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? '').trim()

const isValidHttpUrl = (value) => {
  try {
    const url = new URL(value)
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

const supabaseUrl = isValidHttpUrl(rawUrl) ? rawUrl : ''
const supabaseAnonKey = rawAnonKey

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY가 없거나 형식이 올바르지 않습니다. ' +
      '방명록/관리자 로그인 기능은 비활성화된 상태로 동작합니다.' +
      (rawUrl && !supabaseUrl ? ` (VITE_SUPABASE_URL 값이 유효한 URL이 아닙니다: "${rawUrl}")` : '')
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
