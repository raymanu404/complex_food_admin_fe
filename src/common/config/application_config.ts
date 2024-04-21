import { BACKEND_BASE_API_URL } from '@/common/utils/constants'
import { QueryClient, keepPreviousData } from '@tanstack/react-query'
import axios from 'axios'

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

export { axiosInstance, queryClient }
