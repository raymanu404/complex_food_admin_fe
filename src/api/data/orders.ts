import { BACKEND_ADMIN_PATH } from '@/common/utils/constants'
import { axiosInstance } from '../../common/config/application_config'
import { GetOrdersResponseBeI, OrderStatisticsResponse } from '../interfaces/orders'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { formatDateToBe } from '@/common/utils/helpers'
import { mockDataOrdersStatistics } from './mockData'

const getListOrdersAsync = async ({
  columnFilters,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  globalFilter,
  pagination,
  sorting,
}: {
  columnFilters: MRT_ColumnFiltersState
  globalFilter: string
  sorting: MRT_SortingState
  pagination: MRT_PaginationState
}) => {
  let params = {}
  if (columnFilters) {
    params = { ...params, columnFilters: columnFilters }
  }
  // if (globalFilter) {
  //   params = { ...params, searchTerm: globalFilter }
  // }
  if (sorting) {
    const id = sorting.at(0)?.id
    const asc = sorting.at(0)?.desc
    params = { ...params, orderBy: id, asc: asc }
  }
  if (pagination) {
    const { pageIndex, pageSize } = pagination
    params = { ...params, pageNumber: pageIndex + 1, pageSize: pageSize }
  }

  // console.log(params)

  const { data } = await axiosInstance.get<GetOrdersResponseBeI>(`${BACKEND_ADMIN_PATH}/orders`, {
    params: { ...params },
  })

  return data
}

const updateOrderStatus = async (orderId: number, orderStatus: number) => {
  const { data } = await axiosInstance.put<number>(
    `${BACKEND_ADMIN_PATH}/orders/update-status/${orderId}?orderStatus=${orderStatus}`
  )

  return data
}

const getOrdersStatistics = async ({ endDate, startDate }: { startDate?: Date | null; endDate?: Date | null }) => {
  let queryParams = `?`

  const startDateFormated = formatDateToBe(startDate)
  const endDateFormated = formatDateToBe(endDate)

  queryParams += startDate ? `startDate=${startDateFormated}` : ''
  queryParams += endDate ? `&endDate=${endDateFormated}` : ''

  // const { data } = await axiosInstance.get<OrderStatisticsResponse>(
  //   `${BACKEND_ADMIN_PATH}/orders/statistics${queryParams}`
  // )

  // return data

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mockDataOrdersStatistics)
      return mockDataOrdersStatistics
    }, 2000)
  })

  return promise as Promise<OrderStatisticsResponse>
}

export { getListOrdersAsync, updateOrderStatus, getOrdersStatistics }
