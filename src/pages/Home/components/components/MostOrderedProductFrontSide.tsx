import RowCard from './RowCard'
import { formatDate } from '@/common/utils/helpers'
import { FlexBoxColumn, FlipCard } from '@/common/styles/styled-components'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { RO_CURRENCY } from '@/common/utils/constants'
import { OverflowTooltip } from '@/common/components'
import { CategoryProductEnum, OrderedProduct } from '@/api/interfaces/products'
import { Box, CardContent, CardHeader, Divider, Stack, Typography } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../../utils/constants'
import { cardSx } from '../../utils/styles'
import { theme } from '@/theme'

interface PropsI {
  data: Omit<OrderedProduct, 'image'>
  flipCardHandler: (value: boolean) => void
}
const MostOrderedProductFrontSide = ({
  data: { category, dateUpdated, description, id, isInStock, merchantPrice, mostOrderedProductCount, price, title },
  flipCardHandler,
}: PropsI) => {
  return (
    <Box
      onClick={(ev) => {
        ev.preventDefault()
        flipCardHandler(true)
      }}
      sx={{
        cursor: 'pointer',
        width: `${MAX_CARD_WITDH} px`,
        height: `${MAX_CARD_HEIGHT} px`,
      }}
    >
      <CardHeader
        title={
          <FlexBoxColumn sx={{ gap: '10px' }}>
            <RowCard title={`${title}`} value={id} chipColor="success" isImportant titleVariant="h5" />
            <RowCard
              title={'Most ordered product'}
              value={mostOrderedProductCount}
              chipColor="warning"
              isImportant
              titleVariant="h6"
            />
          </FlexBoxColumn>
        }
        subheader={
          <FlexBoxColumn sx={{ gap: '5px' }}>
            <RowCard
              title={'Category'}
              value={CategoryProductEnum[category]}
              chipColor="primary"
              isImportant
              titleVariant="body1"
            />
            <RowCard
              title={'Last date updated'}
              value={formatDate(dateUpdated)}
              chipColor="default"
              isImportant
              titleVariant="body2"
            />
          </FlexBoxColumn>
        }
      />
      <CardContent>
        <FlexBoxColumn sx={{ gap: '5px' }}>
          <RowCard
            title={'Product stock'}
            customChildren={isInStock ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
          />
          <RowCard title={`Price (${RO_CURRENCY})`} value={price} />
          <RowCard title={`Merchant price  (${RO_CURRENCY})`} value={merchantPrice} />
          <Divider />
          <Stack direction="column" justifyContent="space-between" alignItems="flex-start">
            <Typography gutterBottom variant="body2" component="div">
              Description
            </Typography>
            <OverflowTooltip text={description} />
          </Stack>
        </FlexBoxColumn>
      </CardContent>
    </Box>
  )
}

export default MostOrderedProductFrontSide
