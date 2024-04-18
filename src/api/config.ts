import { BACKEND_BASE_API_URL } from '@/common/utils/constants'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `${BACKEND_BASE_API_URL}`,
})

export { axiosInstance }
