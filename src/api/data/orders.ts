import { BACKEND_ADMIN_PATH } from '@/common/utils/constants'
import { axiosInstance } from '../../common/config/application_config'
import { GetOrdersResponseBeI } from '../interfaces/orders'

const getListOrdersAsync = async () => {
  //TODO: add search, sorting,pagination etc
  const { data } = await axiosInstance.get<GetOrdersResponseBeI>(`${BACKEND_ADMIN_PATH}/orders`)

  return data
}

export { getListOrdersAsync }
