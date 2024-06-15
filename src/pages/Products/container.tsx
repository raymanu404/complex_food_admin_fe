import { useCallback, useMemo, useState } from 'react'
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { Button } from '@mui/material'
import { products_columns } from './utils/mapper'
import { FlexBoxCentered } from '@/common/styles/styled-components'
import { ProductFeI } from '@/api/interfaces/products'
import { DEFAULT_PAGE_SIZE } from '@/common/utils/constants'
import { useGetListProducts } from '@/api/hooks/productHooks'
import ActionsCell from './components/ActionsCell'
import EditProductModal from './components/EditProductModal'
import { useModal } from '@/common/utils/hooks/useModal'
import CreateProductModal from './components/CreateProductModal'
import DeleteProductModal from './components/DeleteProductModal'

export const ProductsContainer = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const { closeModal: closeEditModal, isOpen: isEditModalOpen, openModal: openEditModal } = useModal()
  const { closeModal: closeCreateModal, isOpen: isCreateModalOpen, openModal: openCreateModal } = useModal()
  const { closeModal: closeDeleteModal, isOpen: isDeleteModalOpen, openModal: openDeleteModal } = useModal()
  const [editProduct, setEditProduct] = useState<ProductFeI>()
  const [productId, setProductId] = useState<number>(0)

  const { data, isLoading, isError, isRefetching, refetch } = useGetListProducts({
    columnFilters,
    searchTerm: globalFilter,
    sorting,
    pagination,
  })

  const handleOpenEditModal = useCallback(
    async (product: ProductFeI) => {
      await new Promise((resolve) => {
        setEditProduct(product)
        resolve('finish')
      }).then(() => {
        openEditModal()
      })
    },
    [openEditModal]
  )

  const handleOpenDeleteModal = useCallback(
    async (productId: number) => {
      await new Promise((resolve) => {
        setProductId(productId)
        resolve('finish')
      }).then(() => {
        openDeleteModal()
      })
    },
    [openDeleteModal]
  )

  const products = useMemo(() => data?.data ?? [], [data?.data])

  const columns = useMemo<MRT_ColumnDef<ProductFeI>[]>(() => products_columns(), [])

  const productsTable = useMaterialReactTable({
    columns,
    data: products,
    initialState: {
      showColumnFilters: false,
      columnPinning: { right: ['mrt-row-actions'] },
      isFullScreen: false,
      density: 'compact',
    },
    manualFiltering: false, //lets filter data on client-side for now, later we see how to do that on server side
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: false, //turn off built-in client-side sorting
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: data?.totalCount ?? 0,
    muiTableContainerProps: {
      color: 'primary',
    },
    muiTablePaperProps: {
      sx: {
        overflow: 'auto',
      },
    },
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined',
    },
    enableStickyHeader: true,
    paginationDisplayMode: 'pages',
    enableFacetedValues: true,
    enableGlobalFilter: true,
    enableEditing: true,
    enableRowActions: true,
    enablePinning: true,
    renderRowActions: ({ row }) => (
      <ActionsCell row={row} openEditModal={handleOpenEditModal} openDeleteModal={handleOpenDeleteModal} />
    ),
    editDisplayMode: 'custom',
    createDisplayMode: 'custom',
    renderTopToolbarCustomActions: () => (
      <Button
        variant="contained"
        onClick={() => {
          openCreateModal()
        }}
      >
        Create New Product
      </Button>
    ),
    state: {
      columnFilters,
      globalFilter,
      pagination,
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  })

  return (
    <FlexBoxCentered sx={{ padding: '20px 40px', margin: '0 auto' }}>
      <MaterialReactTable table={productsTable} />
      {isEditModalOpen && (
        <EditProductModal close={closeEditModal} isOpen={isEditModalOpen} product={editProduct} refetch={refetch} />
      )}
      {isCreateModalOpen && (
        <CreateProductModal close={closeCreateModal} isOpen={isCreateModalOpen} refetch={refetch} />
      )}
      {isDeleteModalOpen && (
        <DeleteProductModal
          close={closeDeleteModal}
          isOpen={isDeleteModalOpen}
          refetch={refetch}
          productId={productId}
        />
      )}
    </FlexBoxCentered>
  )
}
