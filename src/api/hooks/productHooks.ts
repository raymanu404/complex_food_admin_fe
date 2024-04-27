import { transformProductsData } from '@/pages/Products/utils/mapper'
import { getListProductsAsync } from '../data/products'
import { useQuery } from '@tanstack/react-query'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'

const useGetListProducts = ({
  columnFilters,
  searchTerm,
  pagination,
  sorting,
}: {
  columnFilters: MRT_ColumnFiltersState
  searchTerm: string
  sorting: MRT_SortingState
  pagination: MRT_PaginationState
}) => {
  return useQuery({
    queryKey: [
      'get-paginated-products-list-query',
      columnFilters,
      searchTerm,
      pagination.pageSize,
      pagination.pageIndex,
      sorting,
    ],
    queryFn: async () => await getListProductsAsync({ columnFilters, pagination, sorting, searchTerm }),
    select: transformProductsData,
  })
}

export { useGetListProducts }
