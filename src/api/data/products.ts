import { axiosInstance } from '@/common/config/application_config'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { GetProductsResponseBeI, ProductBodyToCreate, ProductBodyToUpdate } from '../interfaces/products'
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

export { getListProductsAsync, updateProduct, createProduct, deleteProduct }
