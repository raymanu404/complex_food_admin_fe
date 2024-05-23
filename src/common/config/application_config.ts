import {
  BACKEND_BASE_API_URL,
  SUPABASE_PUBLIC_KEY_API,
  SUPABASE_SERVICE_ROLE_KEY_API,
  SUPABASE_URL,
} from '@/common/utils/constants'
import { QueryClient, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'
import { createClient } from '@supabase/supabase-js'

const axiosInstance = axios.create({
  baseURL: `${BACKEND_BASE_API_URL}`,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      placeholderData: keepPreviousData,
    },
  },
})

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY_API)
const supabaseAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY_API, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
}).auth.admin

export { axiosInstance, queryClient, supabaseClient, corsHeaders, supabaseAdminClient }
