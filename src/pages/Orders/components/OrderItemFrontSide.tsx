import { OrderItemFeI } from '@/api/interfaces/orders'
import { OverflowTooltip } from '@/common/components'
import { FlipCard, TooltipCustom } from '@/common/styles/styled-components'
import { RO_CURRENCY } from '@/common/utils/constants'
import { CardContent, Typography, Divider, useTheme, Box, Chip } from '@mui/material'

interface PropsI extends Omit<OrderItemFeI, 'image' | 'orderId'> {
  flipCardHandler: (value: boolean) => void
}

const OrderItemFrontSide = ({
  category,
  description,
  price,
  orderItemId,
  quantity,
  title,
  flipCardHandler,
}: PropsI) => {
  const theme = useTheme()

  //TODO: fix styles, tooltips, buttons etc
  return (
    <FlipCard
      sx={{
        backgroundColor: theme.customPalette.primary.lightest,
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={(ev) => {
        ev.preventDefault()
        flipCardHandler(true)
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Box width={'85%'}>
            <TooltipCustom title={title}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
            </TooltipCustom>
          </Box>
          <Chip label={orderItemId} />
        </Box>

        <Divider />
        {/* DETAILS */}
        <Box sx={{ padding: '10px 20px', height: '140px' }}>
          <Typography variant="h6">{category}</Typography>
          <TooltipCustom title={description}>{description}</TooltipCustom>
          {/* <OverflowTooltip text={`${description}`} /> */}
          {/* </TooltipCustom> */}
        </Box>
        {/* PRICE + Quantity */}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {price.toLocaleString('ro-RO', { style: 'currency', currency: RO_CURRENCY })}
          </Typography>
          <Typography variant="body2">{quantity} items</Typography>
        </Box>
      </CardContent>
    </FlipCard>
  )
}

export default OrderItemFrontSide
