import { ExpandMore } from '@/common/styles/styled-components'
import { Alert, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, useTheme } from '@mui/material'
import { useMemo, useState } from 'react'
import RowCard from './RowCard'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { cardSx } from '../utils/styles'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH, TITLE_CARD_OVERVIEW } from '../utils/constants'
import LoadingCard from './LoadingCard'

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
  isLoading: boolean
  isError: boolean
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
  isError = false,
  isLoading = false,
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
    return (
      <Box
        sx={() => ({
          ...cardSx(theme),
          width: MAX_CARD_WITDH,
          height: MAX_CARD_HEIGHT,
          backgroundColor: theme.customPalette.utility.background,
        })}
      >
        <Alert severity="error">Something went wrong!</Alert>
      </Box>
    )
  }

  return (
    <Card
      sx={{
        ...cardSx(theme),
        width: MAX_CARD_WITDH,
        backgroundColor: theme.customPalette.primary.lightest,
        marginBottom: '20px',
      }}
    >
      <CardHeader title={title} subheader={<RowCard title={'Total products'} value={totalProducts} />} />
      <CardMedia component="img" height="194" image="src/common/assets/mazare_cu_pui.jpg" alt="Paella dish" />
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
          <RowCard title={'Total products out of stock'} value={outOfStock} />
          <RowCard title={'Total ordered products'} value={totalOrderedProducts} />
          <RowCard title={'Total selling price (RON)'} value={totalPrice} />
          <RowCard title={'Total merchant price (RON)'} value={totalMerchantPrice} />
          <RowCard title={'Total profit without VTA (RON)'} value={totalProfitWithoutVTA} />
          <RowCard title={'Total profit with VTA (RON)'} value={totalProfitWithVTA} />
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default ProductStatistcsCard
