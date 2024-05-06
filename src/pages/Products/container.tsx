import { useCallback, useMemo, useState } from 'react'
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_EditActionButtons,
  MRT_PaginationState,
  MRT_SortingState,
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { Box, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { products_columns } from './utils/mapper'
import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { CategoryProductEnum, ProductFeI } from '@/api/interfaces/products'
import { DEFAULT_PAGE_SIZE } from '@/common/utils/constants'
import { useGetListProducts, useUpdateProduct } from '@/api/hooks/productHooks'
import ActionsCell from './components/ActionsCell'
import EditProductModal from './components/EditProductModal'
import { useModal } from '@/common/utils/hooks/useModal'
import CreateProductModal from './components/CreateProductModal'

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

  // const handleEditProduct: MRT_TableOptions<ProductFeI>['onEditingRowSave'] = async ({ values }) => {
  //   console.log({ values })
  //   // table.setEditingRow(null) //exit editing mode
  // }

  //TODO: CHECK IF THIS SHOULD BE DELETED
  // const handleEditProduct: MRT_TableOptions<ProductFeI>['onEditingRowSave'] = async ({ values, table }) => {
  //   console.log(values)
  //   // await updateUser(values);
  //   await mutateAsync({
  //     productId: values.id,
  //     productToUpdate: {
  //       category: stringToEnum(CategoryProductEnum, `${values.category}`) ?? 1,
  //       description: values.description,
  //       image: values.image,
  //       isInStock: values.isInStock,
  //       price: values.price,
  //       title: values.title,
  //     },
  //   })
  //   table.setEditingRow(null) //exit editing mode
  // }

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

  const handleCloseCreateModal = useCallback(() => {
    closeCreateModal()
  }, [closeCreateModal])

  const products = useMemo(() => data?.data ?? [], [data?.data])

  const columns = useMemo<MRT_ColumnDef<ProductFeI>[]>(() => products_columns(), [])

  const productsTable = useMaterialReactTable({
    columns,
    data: products,
    initialState: { showColumnFilters: false, columnPinning: { right: ['mrt-row-actions'] }, isFullScreen: true },
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
      sx: { overflow: 'auto' },
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
    // onEditingRowSave: handleEditProduct,
    // editDisplayMode: 'custom',
    // editDisplayMode: 'modal',
    // onEditingRowSave: handleEditProduct,
    // renderEditRowDialogContent: ({ table, row, internalEditComponents }) => (
    //   <>
    //     <DialogTitle variant="h3">Edit User</DialogTitle>
    //     <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    //       {internalEditComponents} {/* or render custom edit components here */}
    //     </DialogContent>
    //     <DialogActions>
    //       <MRT_EditActionButtons variant="text" table={table} row={row} />
    //     </DialogActions>
    //   </>
    // ),
    // createDisplayMode: 'modal',
    // renderCreateRowDialogContent: ({ row, table }) => {
    //   console.log(`isCreateModalOpen ${isCreateModalOpen}`)
    //   return (
    //     isCreateModalOpen && (
    //       <CreateProductModal row={row} close={handleCloseCreateModal} isOpen={isCreateModalOpen} table={table} />
    //     )
    //   )
    // },
    // muiCreateRowModalProps: { open: isCreateModalOpen, onClose: handleCloseCreateModal },
    // renderTopToolbarCustomActions: ({ table }) => (
    //   <Button
    //     variant="contained"
    //     onClick={() => {
    //       openCreateModal()
    //       //  table.setCreatingRow(true) //simplest way to open the create row modal with no default values
    //       //or you can pass in a row object to set default values with the `createRow` helper function
    //       // table.setCreatingRow(
    //       //   createRow(table, {
    //       //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
    //       //   }),
    //       // );
    //     }}
    //   >
    //     Create New Product
    //   </Button>
    // ),
    state: {
      columnFilters,
      globalFilter,
      pagination,
      isLoading: isLoading,
      // isSaving: isUpdatingProduct,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  })

  return (
    <FlexBoxCentered sx={{ padding: '20px 40px', margin: '0 auto' }}>
      <FlexCard sx={{ height: '80vh' }}>
        <h1>Products table</h1>
        <MaterialReactTable table={productsTable} />
      </FlexCard>
      {isEditModalOpen && (
        <EditProductModal close={closeEditModal} isOpen={isEditModalOpen} product={editProduct} refetch={refetch} />
      )}
    </FlexBoxCentered>
  )
}
