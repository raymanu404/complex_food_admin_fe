import { BACKEND_ADMIN_PATH } from '@/common/utils/constants'
import { axiosInstance } from '../../common/config/application_config'
import { GetOrdersResponseBeI } from '../interfaces/orders'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'

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

export { getListOrdersAsync }
