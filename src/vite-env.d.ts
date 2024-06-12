/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_BACKEND_URL: string
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_PUBLIC_KEY_API: string
  readonly VITE_CLIENT_APP_URL: string
  readonly VITE_SUPABASE_SERVICE_ROLE_KEY_API: string
  readonly VITE_SUPABASE_STORAGE_RELATIVE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
