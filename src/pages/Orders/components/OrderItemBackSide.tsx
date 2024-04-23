import { OrderItemFeI } from '@/api/interfaces/orders'
import { FlipCard } from '@/common/styles/styled-components'
import { Button, CardActions, CardMedia } from '@mui/material'

interface PropsI extends Pick<OrderItemFeI, 'image' | 'title'> {
  flipCardHandler: (value: boolean) => void
}

//TODO: replace with image when we get images saved in storage and our db
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OrderItemBackSide = ({ flipCardHandler, image, title }: PropsI) => {
  return (
    <FlipCard>
      <CardMedia component="img" sx={{ objectFit: 'fill' }} image="src\common\assets\ciorba-de-burta.jpg" alt={title} />
      <CardActions sx={{ bottom: 0 }}>
        <Button
          size="small"
          onClick={(ev) => {
            ev.preventDefault()
            flipCardHandler(false)
          }}
        >
          Go back
        </Button>
      </CardActions>
    </FlipCard>
  )
}

export default OrderItemBackSide
