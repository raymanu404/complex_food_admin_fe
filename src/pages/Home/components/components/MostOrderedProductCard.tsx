import { useState } from 'react'
import { OrderedProduct } from '@/api/interfaces/products'
import { Card, CardActions, Collapse, SxProps, useTheme } from '@mui/material'
import { MAX_CARD_WITDH } from '../../utils/constants'
import { ExpandMore } from '@/common/styles/styled-components'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MostOrderedProductHeaderSection from './MostOrderedProductHeaderSection'
import MostOrderedProductCollapseSection from './MostOrderedProductCollapseSection'
import { cardSx } from '../../utils/styles'

interface PropsI {
  data: OrderedProduct
  extraSx?: SxProps
}
const MostOrderedProductCard = ({ data, extraSx }: PropsI) => {
  const theme = useTheme()
  const [isExpandedChildren, setIsExpandedChildren] = useState(false)
  const { description, merchantPrice, isInStock, price, dateUpdated, ...restData } = data

  const onClickHandler = () => {
    setIsExpandedChildren((prev) => !prev)
  }

  return (
    <Card
      sx={{
        ...cardSx(theme),
        flexGrow: 0,
        width: MAX_CARD_WITDH,
        backgroundColor: theme.customPalette.primary.lightest,
        ...extraSx,
      }}
    >
      <MostOrderedProductHeaderSection data={restData} />
      <CardActions disableSpacing>
        <ExpandMore
          expand={isExpandedChildren}
          onClick={onClickHandler}
          aria-expanded={isExpandedChildren}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={isExpandedChildren} timeout="auto" unmountOnExit>
        <MostOrderedProductCollapseSection
          data={{
            description,
            isInStock,
            merchantPrice,
            price,
            dateUpdated,
          }}
        />
      </Collapse>
    </Card>
  )
}

export default MostOrderedProductCard
