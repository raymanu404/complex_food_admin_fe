// import { useGetListOrders } from '@/api/hooks/orderHooks'
import { useGetListOrders } from '@/api/hooks/orderHooks'
import { OrderBeI } from '@/api/interfaces/orders'
import { FlexBoxCentered, FlexCard } from '@/common/styles/styled-components'
import {
  MRT_ColumnDef,
  MRT_ColumnFiltersState,
  MRT_PaginationState,
  MRT_SortingState,
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table'
import { useMemo, useState } from 'react'

export const OrdersContainer = () => {
  const [columnFilters, setColumnFilters] = useState<MRT_ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [sorting, setSorting] = useState<MRT_SortingState>([])
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading, isError, isRefetching } = useGetListOrders()

  const orders = useMemo(() => data?.data ?? [], [data?.data])

  const columns = useMemo<MRT_ColumnDef<OrderBeI>[]>(
    () => [
      {
        accessorKey: 'id', //access nested data with dot notation
        header: 'Id',
        size: 150,
      },
      {
        accessorKey: 'code',
        header: 'Order code',
        size: 150,
      },
      {
        accessorKey: 'buyerId', //normal accessorKey
        header: 'Buyer Id',
        size: 200,
      },
      {
        accessorKey: 'datePlaced',
        header: 'datePlaced',
        size: 150,
      },
      {
        accessorKey: 'discount',
        header: 'discount',
        size: 150,
      },
      {
        accessorKey: 'totalPrice',
        header: 'datePlaced',
        size: 150,
      },
      {
        accessorKey: 'status',
        header: 'status',
        size: 150,
      },
    ],
    []
  )

  const ordersTable = useMaterialReactTable({
    columns,
    data: orders,
    initialState: { showColumnFilters: true },
    manualFiltering: true, //turn off built-in client-side filtering
    manualPagination: true, //turn off built-in client-side pagination
    manualSorting: true, //turn off built-in client-side sorting
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
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
    },
  })

  return (
    <FlexBoxCentered sx={{ padding: '20px 40px', flex: '1' }}>
      <FlexCard sx={{ width: '90vw' }}>
        <h1>this is orders page </h1>
        <MaterialReactTable table={ordersTable} />
      </FlexCard>
    </FlexBoxCentered>
  )
}
