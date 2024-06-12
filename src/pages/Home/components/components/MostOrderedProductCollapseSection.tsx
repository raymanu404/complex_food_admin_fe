import { OrderedProduct } from '@/api/interfaces/products'
import { CardContent, Divider, Stack, Typography } from '@mui/material'
import { FlexBoxColumn } from '@/common/styles/styled-components'
import RowCard from './RowCard'
import { OverflowTooltip } from '@/common/components'
import { RO_CURRENCY } from '@/common/utils/constants'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import { formatDate } from '@/common/utils/helpers'

interface PropsI {
  data: Pick<OrderedProduct, 'isInStock' | 'price' | 'merchantPrice' | 'description' | 'dateUpdated'>
}

const MostOrderedProductCollapseSection = ({
  data: { description, isInStock, merchantPrice, price, dateUpdated },
}: PropsI) => {
  return (
    <CardContent sx={{ gap: '12px', display: 'flex', flexDirection: 'column' }}>
      <FlexBoxColumn sx={{ gap: '5px' }}>
        <RowCard
          title={'Last date updated'}
          value={formatDate(dateUpdated)}
          chipColor="default"
          isImportant
          titleVariant="body2"
        />
        <RowCard title={'Product stock'} customChildren={isInStock ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />} />
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
  )
}

export default MostOrderedProductCollapseSection
