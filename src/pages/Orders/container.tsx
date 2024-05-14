import { useGetListOrders, useUpdateOrderStatus } from '@/api/hooks/orderHooks'
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
import { useCallback, useMemo, useState } from 'react'
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

  const { mutateAsync: updateOrderStatusAsync } = useUpdateOrderStatus()

  const orders = useMemo(() => data?.data ?? [], [data?.data])

  const changeOrderStatusHandler = useCallback(
    async (orderId: number, orderStatus: number) => {
      await updateOrderStatusAsync({ orderId: orderId, orderStatus: orderStatus })
    },
    [updateOrderStatusAsync]
  )

  const columns = useMemo<MRT_ColumnDef<OrderFeI>[]>(
    () => orders_columns({ changeOrderStatusHandler }),
    [changeOrderStatusHandler]
  )

  const ordersTable = useMaterialReactTable({
    columns,
    data: orders,
    initialState: {
      showColumnFilters: false,
      columnPinning: { right: ['status'] },
      isFullScreen: false,
      density: 'compact',
    }, //default to false
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
    muiTableContainerProps: {
      color: 'primary',
    },
    muiTablePaperProps: {
      sx: {
        // minHeight: '50vh',
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
    enableGlobalFilter: false, //lets disable this for now
    editDisplayMode: 'table', // ('modal', 'row', 'cell', and 'custom' are also
    enableEditing: true,
    // enableRowActions: true,
    state: {
      columnFilters,
      // globalFilter,
      pagination,
      isLoading: isLoading,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  })

  return (
    <FlexBoxCentered sx={{ padding: '20px 40px', maxWidth: '80vw' }}>
      <FlexCard sx={{ maxHeight: '90vh' }}>
        <h1>Orders table</h1>
        <MaterialReactTable table={ordersTable} />
      </FlexCard>
    </FlexBoxCentered>
  )
}
