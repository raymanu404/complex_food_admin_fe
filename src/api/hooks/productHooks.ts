import { transformProductsData } from '@/pages/Products/utils/mapper'
import { createProduct, deleteProduct, getListProductsAsync, updateProduct } from '../data/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { ProductBodyToCreate, ProductBodyToUpdate } from '../interfaces/products'
import { toast } from 'react-toastify'

//GET
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

//UPDATE
const useUpdateProduct = () => {
  return useMutation({
    mutationKey: ['update-product-mutation-key'],
    mutationFn: async ({ productId, productToUpdate }: { productId: number; productToUpdate: ProductBodyToUpdate }) =>
      await updateProduct(productId, productToUpdate),
    onError: (error) => {
      toast.error(`You cannot update product .\n${error.message}`)
    },
    onSuccess: (_, { productId }) => {
      toast.success(`Product with ID: ${productId} was updated successfully!`)
    },
  })
}

//CREATE
const useCreateProduct = () => {
  return useMutation({
    mutationKey: ['create-product-mutation-key'],
    mutationFn: async ({ productToCreate }: { productToCreate: ProductBodyToCreate }) =>
      await createProduct(productToCreate),
    onError: (error) => {
      toast.error(`You cannot create product .\n${error.message}`)
    },
    onSuccess: () => {
      toast.success(`Product was created successfully!`)
    },
  })
}

//DELETE
const useDeleteProduct = () => {
  return useMutation({
    mutationKey: ['delete-product-mutation-key'],
    mutationFn: async ({ productId }: { productId: number }) => await deleteProduct(productId),
    onError: (error) => {
      toast.error(`You cannot delete product .\n${error.message}`)
    },
    onSuccess: () => {
      toast.success(`Product was deleted successfully!`)
    },
  })
}

export { useGetListProducts, useUpdateProduct, useCreateProduct, useDeleteProduct }
