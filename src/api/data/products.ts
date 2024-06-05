import { axiosInstance } from '@/common/config/application_config'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import {
  GetProductsResponseBeI,
  MostOrderedProductsDataResponse,
  ProductBodyToCreate,
  ProductBodyToUpdate,
  ProductsStatisticsResponse,
} from '../interfaces/products'
import { BACKEND_ADMIN_PATH } from '@/common/utils/constants'
import { formatDateToBe } from '@/common/utils/helpers'
import { generateMockMostOrderedProductsDataResponse, sampleStatistics } from './mockData'

const getListProductsAsync = async ({
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
  let params = {}
  if (columnFilters) {
    params = { ...params, columnFilters: columnFilters }
  }

  if (searchTerm) {
    params = { ...params, searchTerm }
  }

  if (sorting) {
    const id = sorting.at(0)?.id
    const asc = sorting.at(0)?.desc
    params = { ...params, orderBy: id, asc: asc }
  }
  if (pagination) {
    const { pageIndex, pageSize } = pagination
    params = { ...params, pageNumber: pageIndex + 1, pageSize: pageSize }
  }
  console.log(params)
  const { data } = await axiosInstance.get<GetProductsResponseBeI>(`${BACKEND_ADMIN_PATH}/products`, {
    params: { ...params },
  })

  return data
}

const updateProduct = async (productId: number, productToUpdate: ProductBodyToUpdate) => {
  await axiosInstance.put(`${BACKEND_ADMIN_PATH}/products/${productId}`, productToUpdate)
}

const createProduct = async (productBody: ProductBodyToCreate) => {
  await axiosInstance.post(`${BACKEND_ADMIN_PATH}/products/create`, productBody)
}

const deleteProduct = async (productId: number) => {
  await axiosInstance.delete(`${BACKEND_ADMIN_PATH}/products/${productId}`)
}

const getProductsStatistics = async ({ endDate, startDate }: { startDate?: Date | null; endDate?: Date | null }) => {
  let queryParams = `?`

  const startDateFormated = formatDateToBe(startDate)
  const endDateFormated = formatDateToBe(endDate)

  queryParams += startDate ? `startDate=${startDateFormated}` : ''
  queryParams += endDate ? `&endDate=${endDateFormated}` : ''

  const { data } = await axiosInstance.get<ProductsStatisticsResponse>(
    `${BACKEND_ADMIN_PATH}/products/products_statistics${queryParams}`
  )

  return data
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sampleStatistics)
      return sampleStatistics
    }, 1000)
  })

  return promise as Promise<ProductsStatisticsResponse>
}

const getMostOrderedProducts = async () => {
  const { data } = await axiosInstance.get<MostOrderedProductsDataResponse>(
    `${BACKEND_ADMIN_PATH}/products/most_ordered_products`
  )
  return data

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = generateMockMostOrderedProductsDataResponse()
      resolve(data)
      return data
    }, 2000)
  })
  return promise as Promise<MostOrderedProductsDataResponse>
}

export {
  getListProductsAsync,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductsStatistics,
  getMostOrderedProducts,
}
