import { OrderItemFeI } from '@/api/interfaces/orders'
import { FlipCard, TooltipCustom } from '@/common/styles/styled-components'
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
              <Typography variant="h5" gutterBottom>
                {title}
              </Typography>
            </TooltipCustom>
          </Box>
          <Chip label={orderItemId} />
        </Box>

        <Divider />
        {/* DETAILS */}
        <Box sx={{ padding: '10px 20px', height: '140px' }}>
          <Typography variant="h4">{category}</Typography>
          {/* <TooltipCustom title={description}> */}
          <Typography variant="h5">{description}</Typography>
          {/* </TooltipCustom> */}
        </Box>
        {/* PRICE + Quantity */}
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {price.toLocaleString('ro-RO', { style: 'currency', currency: 'RON' })}
          </Typography>
          <Typography variant="body2">{quantity} items</Typography>
        </Box>
      </CardContent>
    </FlipCard>
  )
}

export default OrderItemFrontSide
