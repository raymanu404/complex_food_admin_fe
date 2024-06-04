import { transformProductsData } from '@/pages/Products/utils/mapper'
import {
  createProduct,
  deleteProduct,
  getListProductsAsync,
  getMostOrderedProducts,
  getProductsStatistics,
  updateProduct,
} from '../data/products'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { ProductBodyToCreate, ProductBodyToUpdate } from '../interfaces/products'
import { toast } from 'react-toastify'
import { SUPABASE_PRODUCTS_STORAGE_NAME } from '@/common/utils/constants'
import { supabaseClient } from '@/common/config/application_config'
import { createFullPathStorageFile } from '@/common/utils/helpers'
import { useState } from 'react'

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

//UPLOAD IMAGE TO STORAGE
const useUploadFile = () => {
  //TODO: check
  const uploadFileHandler = async (file: File | undefined) => {
    let imageUrl = ''
    if (file) {
      const { name } = file

      const { data, error } = await supabaseClient.storage
        .from(SUPABASE_PRODUCTS_STORAGE_NAME)
        .upload(`public/${name}`, file, {
          upsert: true,
        })

      imageUrl = createFullPathStorageFile(name)
      return { error, data, imageUrl }
    }

    return null
  }

  return { uploadFileHandler }
}

//GET IMAGE FROM STORAGE !EXPERIMENTAL!
const useGetFileFromStorage = () => {
  //TODO: check
  const [isLoading, setIsLoading] = useState(true)
  const getFileHandler = async (path: string) => {
    const { data } = supabaseClient.storage.from(SUPABASE_PRODUCTS_STORAGE_NAME).getPublicUrl(path)
    setIsLoading(false)
    return data
  }

  return { getFileHandler, isLoading }
}

//GET PRODUCTS STATISTICS
const useGetProductsStatistics = ({ endDate, startDate }: { startDate?: Date; endDate?: Date }) => {
  return useQuery({
    queryKey: ['get-products-statistics-query'],
    queryFn: async () => await getProductsStatistics({ startDate, endDate }),
    enabled: true,
  })
}
//GET MOST ORDERED PRODUCTS
const useGetMostOrderedProducts = () => {
  return useQuery({
    queryKey: ['get-most-orderded-products-query'],
    queryFn: async () => await getMostOrderedProducts(),
    enabled: false,
  })
}

export {
  useGetListProducts,
  useUpdateProduct,
  useCreateProduct,
  useDeleteProduct,
  useUploadFile,
  useGetFileFromStorage,
  useGetProductsStatistics,
  useGetMostOrderedProducts,
}
