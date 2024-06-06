import RowCard from './RowCard'
import { handleImageError } from '@/common/utils/helpers'
import { FlexBoxColumn } from '@/common/styles/styled-components'

import { CategoryProductEnum, OrderedProduct } from '@/api/interfaces/products'
import { Box, CardHeader, CardMedia } from '@mui/material'
import { OverflowTooltip } from '@/common/components'

interface PropsI {
  data: Omit<OrderedProduct, 'description' | 'isInStock' | 'merchantPrice' | 'price' | 'dateUpdated'>
}
const MostOrderedProductHeaderSection = ({ data: { category, id, mostOrderedProductCount, title, image } }: PropsI) => {
  return (
    <>
      <CardHeader
        title={
          <Box sx={{ paddingBottom: '5px' }}>
            <RowCard
              title={<OverflowTooltip text={title} />}
              value={id}
              chipColor="success"
              isImportant
              titleVariant="h5"
            />
          </Box>
        }
        subheader={
          <FlexBoxColumn sx={{ gap: '5px' }}>
            <RowCard
              title={'Most ordered product'}
              value={mostOrderedProductCount}
              chipColor="warning"
              isImportant
              titleVariant="body1"
            />
            <RowCard
              title={'Category'}
              value={CategoryProductEnum[category]}
              chipColor="primary"
              isImportant
              titleVariant="body1"
            />
          </FlexBoxColumn>
        }
      />
      <CardMedia component="img" height="194" src={image} alt={title} onError={handleImageError} />
    </>
  )
}

export default MostOrderedProductHeaderSection
