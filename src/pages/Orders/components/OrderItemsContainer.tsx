import { OrderFeI } from '@/api/interfaces/orders'
import { Stack } from '@mui/material'
import { MRT_Row } from 'material-react-table'
import OrderItemDetails from './OrderItemDetails'

interface PropsI {
  row: MRT_Row<OrderFeI>
}

const OrderItemsContainer = ({ row }: PropsI) => {
  const { original } = row
  const { orderItems } = original

  return (
    <Stack gap="0.5rem" minHeight="00px">
      {orderItems &&
        orderItems.map((orderItem) => <OrderItemDetails orderItem={orderItem} key={orderItem.orderItemId} />)}
    </Stack>
  )
}

export default OrderItemsContainer
