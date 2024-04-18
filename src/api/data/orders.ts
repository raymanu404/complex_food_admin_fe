import { BACKEND_ADMIN_PATH } from '@/common/utils/constants'
import { axiosInstance } from '../config'

const getListOrdersAsync = async () => {
  const { data } = await axiosInstance.get(`${BACKEND_ADMIN_PATH}/orders`)

  return data
}

export { getListOrdersAsync }
