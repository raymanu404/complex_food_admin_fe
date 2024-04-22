import { OrderItemFeI } from '@/api/interfaces/orders'
import { Box } from '@mui/material'

interface PropsI {
  orderItem: OrderItemFeI
}

const OrderItemDetails = ({ orderItem }: PropsI) => {
  return <Box>{orderItem.description}</Box> //TODO show as carousel order items
}

export default OrderItemDetails
