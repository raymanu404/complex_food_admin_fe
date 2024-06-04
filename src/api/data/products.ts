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

const sampleStatistics: ProductsStatisticsResponse = {
  calculusData: {
    data: [
      {
        categoryName: 'Soup',
        totalProducts: 6,
        inStock: 6,
        outOfStock: 0,
        totalPrice: 5293,
        totalMerchantPrice: 973.25,
        totalProfitWithoutVTA: 4319.75,
        totalProfitWithVTA: 3455.8,
        totalOrderedProducts: 214,
      },
      {
        categoryName: 'Drink',
        totalProducts: 2,
        inStock: 2,
        outOfStock: 0,
        totalPrice: 159.6,
        totalMerchantPrice: 39.9,
        totalProfitWithoutVTA: 119.69999999999999,
        totalProfitWithVTA: 95.75999999999999,
        totalOrderedProducts: 8,
      },
      {
        categoryName: 'Standard',
        totalProducts: 7,
        inStock: 5,
        outOfStock: 2,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'Desert',
        totalProducts: 1,
        inStock: 1,
        outOfStock: 0,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'FoodGarnish',
        totalProducts: 1,
        inStock: 0,
        outOfStock: 1,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
      {
        categoryName: 'Meat',
        totalProducts: 1,
        inStock: 1,
        outOfStock: 0,
        totalPrice: 0,
        totalMerchantPrice: 0,
        totalProfitWithoutVTA: 0,
        totalProfitWithVTA: 0,
        totalOrderedProducts: 0,
      },
    ],
    totalCount: 6,
  },
  totalProducts: 18,
  totalInStock: 15,
  totalOutOfStock: 3,
  totalPrice: 5452.6,
  totalMerchantPrice: 1013.15,
  totalProfitWithoutVTA: 4439.45,
  totalProfitWithVTA: 3551.5600000000004,
  totalOrderedProducts: 222,
}

const getProductsStatistics = async ({ endDate, startDate }: { startDate?: Date; endDate?: Date }) => {
  let queryParams = `?`

  queryParams += startDate ? `startDate=${startDate.toDateString()}` : ''
  queryParams += endDate ? `&endDate=${endDate.toDateString()}` : ''

  const { data } = await axiosInstance.get<ProductsStatisticsResponse>(
    `${BACKEND_ADMIN_PATH}/products/products_statistics${queryParams}`
  )

  // const promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     // resolve(sampleStatistics)
  //     reject('muie la shakali')
  //     return sampleStatistics
  //   }, 1000)
  // })

  // return promise as Promise<ProductsStatisticsResponse>

  return data
}

const getMostOrderedProducts = async () => {
  const { data } = await axiosInstance.get<MostOrderedProductsDataResponse>(
    `${BACKEND_ADMIN_PATH}/products/most_ordered_products`
  )
  return data
}

export {
  getListProductsAsync,
  updateProduct,
  createProduct,
  deleteProduct,
  getProductsStatistics,
  getMostOrderedProducts,
}
