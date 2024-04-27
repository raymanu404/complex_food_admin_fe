import { useMutation, useQuery } from '@tanstack/react-query'
import { getListOrdersAsync, updateOrderStatus } from '../data/orders'
import { transformOrdersData } from '@/pages/Orders/utils/mapper'
import { MRT_ColumnFiltersState, MRT_PaginationState, MRT_SortingState } from 'material-react-table'
import { toast } from 'react-toastify'
import { OrderStatusEnum } from '../interfaces/orders'

const useGetListOrders = ({
  columnFilters,
  globalFilter,
  pagination,
  sorting,
}: {
  columnFilters: MRT_ColumnFiltersState
  globalFilter: string
  sorting: MRT_SortingState
  pagination: MRT_PaginationState
}) => {
  return useQuery({
    queryKey: [
      'get-paginated-orders-list-query',
      columnFilters,
      globalFilter,
      pagination.pageSize,
      pagination.pageIndex,
      sorting,
    ],
    queryFn: async () => await getListOrdersAsync({ columnFilters, pagination, sorting, globalFilter }),
    select: transformOrdersData,
  })
}

const useUpdateOrderStatus = () => {
  return useMutation({
    mutationKey: ['update-order-status-mutation'],
    mutationFn: async ({ orderId, orderStatus }: { orderId: number; orderStatus: number }) =>
      await updateOrderStatus(orderId, orderStatus),
    onError: (error) => {
      toast.error(`You cannot update order status.\n${error.message}`)
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSuccess: (data, { orderId, orderStatus }) => {
      if (data === 1) {
        toast.success(`Order ${orderId} was updated to -> ${OrderStatusEnum[orderStatus]}`)
      } else {
        toast.info(`Order ${orderId} was not updated to ${OrderStatusEnum[orderStatus]}`)
      }
    },
  })
}

export { useGetListOrders, useUpdateOrderStatus }
