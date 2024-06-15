import { OrderFeI } from '@/api/interfaces/orders'
import { Box, Stack } from '@mui/material'
import { MRT_Row } from 'material-react-table'
import OrderItemDetails from './OrderItemDetails'

interface PropsI {
  row: MRT_Row<OrderFeI>
}

const OrderItemsContainer = ({ row }: PropsI) => {
  const { original } = row
  const { orderItems } = original

  //TODO:finish styles
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', overflow: 'auto', height: '300px' }}>
      <Stack gap="0.2rem" direction={'row'} columnGap={10}>
        {orderItems &&
          orderItems.map((orderItem) => <OrderItemDetails orderItem={orderItem} key={orderItem.orderItemId} />)}
      </Stack>
    </Box>
  )
}

export default OrderItemsContainer
