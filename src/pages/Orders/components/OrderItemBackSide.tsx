import { OrderItemFeI } from '@/api/interfaces/orders'
import { FlipCard } from '@/common/styles/styled-components'
import { handleImageError } from '@/common/utils/helpers'
import { CardMedia } from '@mui/material'

interface PropsI extends Pick<OrderItemFeI, 'image' | 'title'> {
  flipCardHandler: (value: boolean) => void
}

const OrderItemBackSide = ({ flipCardHandler, image, title }: PropsI) => {
  return (
    <FlipCard
      onClick={(ev) => {
        ev.preventDefault()
        flipCardHandler(false)
      }}
      sx={{ cursor: 'pointer', justifyContent: 'center', display: 'flex', alignItems: 'center' }}
    >
      <CardMedia component="img" sx={{ objectFit: 'cover' }} image={image} alt={title} onError={handleImageError} />
    </FlipCard>
  )
}

export default OrderItemBackSide
