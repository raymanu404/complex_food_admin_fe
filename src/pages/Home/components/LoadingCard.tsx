import { Skeleton } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../utils/constants'
import { cardSx } from '../utils/styles'

const LoadingCard = () => {
  return (
    <Skeleton width={MAX_CARD_WITDH} height={MAX_CARD_HEIGHT} variant="rectangular" sx={(theme) => cardSx(theme)} />
  )
}

export default LoadingCard
