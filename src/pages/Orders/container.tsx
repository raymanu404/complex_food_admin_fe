import { useGetListOrders } from '@/api/hooks/orderHooks'
import { OrderFeI } from '@/api/interfaces/orders'
import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import { DEFAULT_PAGE_SIZE } from '@/common/utils/constants'
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import AddIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'
import { useMemo, useState } from 'react'
import { orders_columns } from './utils/mapper'
import OrderItemsContainer from './components/OrderItemsContainer'

export const OrdersContainer = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const { data, isLoading, isError, isRefetching } = useGetListOrders({
    columnFilters,
    globalFilter,
    sorting,
    pagination,
  })

  const orders = useMemo(() => data?.data ?? [], [data?.data])

  const columns = useMemo<MRT_ColumnDef<OrderFeI>[]>(orders_columns, [])

  const ordersTable = useMaterialReactTable({
    columns,
    data: orders,
    initialState: { showColumnFilters: false }, //default to false
    manualFiltering: false, //lets filter data on client-side for now, later we see how to do that on server side
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
    muiToolbarAlertBannerProps: isError
      ? {
          color: 'error',
          children: 'Error loading data',
        }
      : undefined,
    muiExpandButtonProps: ({ row }) => ({
      children: row.getIsExpanded() ? <MinusIcon /> : <AddIcon />,
      disabled: row.original.orderItems.length === 0,
    }),
    onColumnFiltersChange: setColumnFilters,
    //TODO:[OPTIONAL] figure out how to search by term in app, check also BE
    // onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    renderDetailPanel: ({ row }) => <OrderItemsContainer row={row} />,
    rowCount: data?.totalCount ?? 0,
    state: {
      columnFilters,
      // globalFilter,
      pagination,
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
    muiTableContainerProps: {
      color: 'primary',
    },
    muiPaginationProps: {
      color: 'primary',
      shape: 'rounded',
      variant: 'outlined',
    },
    paginationDisplayMode: 'pages',
    enableFacetedValues: true,
    enableGlobalFilter: false, //lets disable this for now
  })

  return (
    <FlexBoxCentered sx={{ padding: '20px 40px' }}>
      <FlexCard sx={{ width: '90vw' }}>
        <h1>this is orders page </h1>
        //TODO: figure out how to not overlap table with page e.g see table when expand all order items //TODO: make
        styles more fancy
        <MaterialReactTable table={ordersTable} />
      </FlexCard>
    </FlexBoxCentered>
  )
}
