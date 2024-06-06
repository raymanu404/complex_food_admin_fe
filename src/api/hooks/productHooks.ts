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
  const [isLoading, setIsLoading] = useState(false)
  const uploadFileHandler = async (file: File | undefined) => {
    let imageUrl = ''
    if (file) {
      const { name } = file
      setIsLoading(true)
      const { data, error } = await supabaseClient.storage
        .from(SUPABASE_PRODUCTS_STORAGE_NAME)
        .upload(`public/${name}`, file, {
          upsert: true,
        })

      imageUrl = createFullPathStorageFile(name)
      setIsLoading(false)
      return { error, data, imageUrl }
    }

    return null
  }

  return { uploadFileHandler, isLoading }
}

//GET FILE PATH FROM STORAGE
const useGetFilePathFromStorage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const getFileHandler = async ({ srcPathWithExt, folderName }: { srcPathWithExt: string; folderName: string }) => {
    setIsLoading(true)

    const path = `${folderName}/${srcPathWithExt}`
    const { data } = supabaseClient.storage.from(SUPABASE_PRODUCTS_STORAGE_NAME).getPublicUrl(path)
    setIsLoading(false)

    return data
  }

  return { getFileHandler, isLoading }
}

//GET FILES NAMES FROM STORAGE
const useGetListFilesDataFromStorage = ({
  bucketId = SUPABASE_PRODUCTS_STORAGE_NAME,
  folderName,
}: {
  bucketId?: string
  folderName: string
}) => {
  const query = useQuery({
    queryKey: ['get-file-list-from-storaget'],
    queryFn: async () =>
      await supabaseClient.storage.from(bucketId).list(folderName, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' },
      }),
    enabled: true,
  })

  return query
}

//GET PRODUCTS STATISTICS
const useGetProductsStatistics = ({ endDate, startDate }: { startDate?: Date | null; endDate?: Date | null }) => {
  return useQuery({
    queryKey: ['get-products-statistics-query', startDate, endDate],
    queryFn: async () => await getProductsStatistics({ startDate, endDate }),
    enabled: true,
  })
}
//GET MOST ORDERED PRODUCTS
const useGetMostOrderedProducts = () => {
  return useQuery({
    queryKey: ['get-most-orderded-products-query'],
    queryFn: async () => await getMostOrderedProducts(),
    enabled: true,
  })
}

export {
  useGetListProducts,
  useUpdateProduct,
  useCreateProduct,
  useDeleteProduct,
  useUploadFile,
  useGetFilePathFromStorage,
  useGetProductsStatistics,
  useGetMostOrderedProducts,
  useGetListFilesDataFromStorage,
}
