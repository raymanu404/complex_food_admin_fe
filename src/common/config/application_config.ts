import { BACKEND_BASE_API_URL, SUPABASE_PUBLIC_KEY_API, SUPABASE_URL } from '@/common/utils/constants'
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


const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY_API)

export { axiosInstance, queryClient, supabase }
