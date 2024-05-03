import { useMemo, useState } from 'react'
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { products_columns } from './utils/mapper'
import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { ProductFeI } from '@/api/interfaces/products'
import { DEFAULT_PAGE_SIZE } from '@/common/utils/constants'
import { useGetListProducts } from '@/api/hooks/productHooks'
import ActionsCell from './components/ActionsCell'

export const ProductsContainer = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading, isError, isRefetching } = useGetListProducts({
    columnFilters,
    searchTerm: globalFilter,
    sorting,
    pagination,
  })

  const products = useMemo(() => data?.data ?? [], [data?.data])

  const columns = useMemo<MRT_ColumnDef<ProductFeI>[]>(() => products_columns(), [])

  const productsTable = useMaterialReactTable({
    columns,
    data: products,
    initialState: { showColumnFilters: false, columnPinning: { right: ['actions'] } },
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
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    enableRowActions: true,
    enablePinning: true,
    renderRowActions: ({ row }) => <ActionsCell row={row} />,
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
    <FlexBoxCentered sx={{ padding: '20px 40px', maxWidth: '80vw' }}>
      <FlexCard sx={{ height: '80vh' }}>
        <h1>Products table</h1>
        <MaterialReactTable table={productsTable} />
      </FlexCard>
    </FlexBoxCentered>
  )
}
