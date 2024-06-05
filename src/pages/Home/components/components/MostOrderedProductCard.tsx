import { useState } from 'react'
import { OrderedProduct } from '@/api/interfaces/products'
import { Box, SxProps, useTheme } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../../utils/constants'

import ReactCardFlip from 'react-card-flip'
import MostOrderedProductFrontSide from './MostOrderedProductFrontSide'
import MostOrderedProductBackSide from './MostOrderedProductBackSide'

interface PropsI {
  data: OrderedProduct
  extraSx?: SxProps
}

const MostOrderedProductCard = ({ data, extraSx }: PropsI) => {
  const theme = useTheme()
  const [isFlipped, setIsFlipped] = useState(false)
  const { image, ...restData } = data

  return (
    <Box
      sx={{
        width: `${MAX_CARD_WITDH} px`,
        height: `${MAX_CARD_HEIGHT} px`,
        backgroundColor: theme.customPalette.primary.lightest,
        ...extraSx,
      }}
    >
      <ReactCardFlip isFlipped={isFlipped}>
        <MostOrderedProductFrontSide flipCardHandler={(value) => setIsFlipped(value)} data={restData} />
        <MostOrderedProductBackSide
          data={{
            image,
            title: restData.title,
          }}
          flipCardHandler={(value) => setIsFlipped(value)}
        />
      </ReactCardFlip>
    </Box>
  )
}

export default MostOrderedProductCard
