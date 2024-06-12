import { ExpandMore, FlexBoxCentered } from '@/common/styles/styled-components'
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, SxProps, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import RowCard from './RowCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { cardSx } from '../../utils/styles'
import { MAX_CARD_WITDH, TITLE_CARD_OVERVIEW, MAX_CARD_HEIGHT } from '../../utils/constants'
import LoadingCard from './LoadingCard'
import AlertCard from './AlertCard'
import { PLACEHOLDER_IMAGE, RO_CURRENCY, VAT } from '@/common/utils/constants'
import { handleImageError } from '@/common/utils/helpers'
import { Spinner } from '@/common/components'

const IMAGE_HEIGHT = MAX_CARD_HEIGHT - 100
interface PropsI {
  data: {
    categoryName?: string
    totalProducts?: number
    inStock?: number
    outOfStock?: number
    totalPrice?: number
    totalMerchantPrice?: number
    totalProfitWithoutVTA?: number
    totalProfitWithVTA?: number
    totalOrderedProducts?: number
  }
  imageSrc: string
  isLoading: boolean
  isLoadingImg?: boolean
  isError: boolean
  extraSx?: SxProps
}

const ProductStatistcsCard = ({
  data: {
    inStock,
    outOfStock,
    totalMerchantPrice,
    totalOrderedProducts,
    totalPrice,
    totalProducts,
    totalProfitWithVTA,
    totalProfitWithoutVTA,
    categoryName,
  },
  imageSrc = PLACEHOLDER_IMAGE,
  isError = false,
  isLoading = false,
  isLoadingImg = false,
  extraSx,
}: PropsI) => {
  const theme = useTheme()
  const [expanded, setExpanded] = useState(false)

  const handleExpandClick = () => {
    setExpanded((prev) => !prev)
  }
  const title = useMemo(() => categoryName ?? TITLE_CARD_OVERVIEW, [categoryName])

  if (isLoading) {
    return <LoadingCard />
  }

  if (isError) {
    return <AlertCard />
  }

  return (
    <Card
      sx={{
        ...cardSx(theme),
        width: MAX_CARD_WITDH + 50,
        backgroundColor: theme.customPalette.primary.lightest,
        marginBottom: '20px',
        ...extraSx,
      }}
    >
      <CardHeader title={title} subheader={<RowCard title={'Total products'} value={totalProducts} />} />
      {isLoadingImg ? (
        <FlexBoxCentered height={IMAGE_HEIGHT}>
          <Spinner size={'4rem'} />
        </FlexBoxCentered>
      ) : (
        <CardMedia
          component="img"
          height={IMAGE_HEIGHT}
          sx={{ objectFit: 'cover' }}
          src={imageSrc ?? PLACEHOLDER_IMAGE}
          alt={title}
          onError={handleImageError}
        />
      )}

      <CardContent sx={{ overflowY: 'auto' }}>
        <RowCard title={'Total products in stock'} value={inStock} />
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent sx={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
          <RowCard title={`Total products out of stock`} value={outOfStock} />
          <RowCard title={`Total ordered products`} value={totalOrderedProducts} />
          <RowCard title={`Total selling price (${RO_CURRENCY})`} value={totalPrice} />
          <RowCard title={`Total merchant price (${RO_CURRENCY})`} value={totalMerchantPrice} />
          <RowCard title={`Total profit without ${VAT} (${RO_CURRENCY})`} value={totalProfitWithoutVTA} />
          <RowCard title={`Total profit with ${VAT} (${RO_CURRENCY})`} value={totalProfitWithVTA} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProductStatistcsCard
