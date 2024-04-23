import { OrderItemFeI } from '@/api/interfaces/orders'
import ReactCardFlip from 'react-card-flip'
import OrderItemFrontSide from './OrderItemFrontSide'
import OrderItemBackSide from './OrderItemBackSide'
import { useState } from 'react'
import { Box } from '@mui/material'

interface PropsI {
  orderItem: OrderItemFeI
}

const OrderItemDetails = ({ orderItem }: PropsI) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const { category, description, image, orderItemId, price, quantity, title } = orderItem

  return (
    <Box sx={{ maxHeight: '300px' }}>
      <ReactCardFlip isFlipped={isFlipped}>
        <OrderItemFrontSide
          category={category}
          description={description}
          orderItemId={orderItemId}
          price={price}
          quantity={quantity}
          title={title}
          flipCardHandler={(value) => setIsFlipped(value)}
        />
        <OrderItemBackSide flipCardHandler={(value) => setIsFlipped(value)} image={image} title={title} />
      </ReactCardFlip>
    </Box>
  )
}

export default OrderItemDetails
