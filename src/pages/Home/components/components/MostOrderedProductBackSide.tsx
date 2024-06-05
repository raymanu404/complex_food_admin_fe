import { OrderedProduct } from '@/api/interfaces/products'
import { handleImageError } from '@/common/utils/helpers'
import { Box, CardMedia } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../../utils/constants'
import { FlipCard } from '@/common/styles/styled-components'

interface PropsI {
  data: Pick<OrderedProduct, 'image' | 'title'>
  flipCardHandler: (value: boolean) => void
}

const MostOrderedProductBackSide = ({ flipCardHandler, data: { image, title } }: PropsI) => {
  return (
    <Box
      onClick={(ev) => {
        ev.preventDefault()
        flipCardHandler(false)
      }}
      sx={{ cursor: 'pointer', width: `${MAX_CARD_WITDH} px`, height: `${MAX_CARD_HEIGHT} px` }}
    >
      <Box
        component="img"
        sx={{ objectFit: 'fill', width: MAX_CARD_WITDH, height: MAX_CARD_HEIGHT }}
        src={image}
        alt={title}
        onError={handleImageError}
      />
    </Box>
  )
}

export default MostOrderedProductBackSide
