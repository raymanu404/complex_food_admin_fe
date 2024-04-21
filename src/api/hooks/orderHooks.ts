import { useQuery } from '@tanstack/react-query'
import { getListOrdersAsync } from '../data/orders'
import { transformOrdersData } from '@/pages/Orders/utils/mapper'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'

const useGetListOrders = ({
  columnFilters,
  globalFilter,
  pagination,
  sorting,
}: {
  columnFilters: MRT_ColumnFiltersState
  globalFilter: string
  sorting: MRT_SortingState
  pagination: MRT_PaginationState
}) => {
  return useQuery({
    queryKey: [
      'get-paginated-orders-list',
      columnFilters,
      globalFilter,
      pagination.pageSize,
      pagination.pageIndex,
      sorting,
    ],
    queryFn: async () => await getListOrdersAsync({ columnFilters, pagination, sorting, globalFilter }),
    select: transformOrdersData,
  })
}

export { useGetListOrders }
