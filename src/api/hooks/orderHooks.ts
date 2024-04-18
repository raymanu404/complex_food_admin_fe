import { useQuery } from '@tanstack/react-query'
import { getListOrdersAsync } from '../data/orders'

const useGetListOrders = () => {
  return useQuery({
    queryKey: ['get-paginated-orders-list'], //TODO:update
    queryFn: async () => await getListOrdersAsync(),
  })
}

export { useGetListOrders }
