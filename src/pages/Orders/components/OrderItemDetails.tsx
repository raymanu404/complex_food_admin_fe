import { OrderItemFeI } from '@/api/interfaces/orders'
import { Box } from '@mui/material'

interface PropsI {
  orderItem: OrderItemFeI
}

const OrderItemDetails = ({ orderItem }: PropsI) => {
  return <Box>{orderItem.description}</Box>
}

export default OrderItemDetails
