import { transformProductsData } from '@/pages/Products/utils/mapper'
import { getListProductsAsync, updateProduct } from '../data/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { ProductBodyToUpdate } from '../interfaces/products'
import { toast } from 'react-toastify'

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

const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ['update-product-mutation-key'],
    mutationFn: async ({ productId, productToUpdate }: { productId: number; productToUpdate: ProductBodyToUpdate }) =>
      await updateProduct(productId, productToUpdate),
    onError: (error) => {
      toast.error(`You cannot update product .\n${error.message}`)
    },
    onSuccess: (_, { productId }) => {
      toast.success(`Product ${productId} was updated successfully!`)
    },
  })
}

export { useGetListProducts, useUpdateProduct }
