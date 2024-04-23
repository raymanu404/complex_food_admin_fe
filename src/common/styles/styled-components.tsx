import { Box, Card, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'

const FlexBox = styled(Box)(() => ({
  flex: '1',
  display: 'flex',
  flexDirection: 'column',
}))

const FlexBoxCentered = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
}))

const FlexCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  backgroundColor: theme.customPalette.utility.background,
  borderRadius: '20px',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0, .15)',
  flexGrow: 1,
}))

const TooltipCustom = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
  />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 500,
  },
})

const FlipCard = styled(Card)(() => ({
  width: '300px',
  height: '300px',
  borderRadius: '16px',
  padding: '20px 5px',
}))

export { FlexBox, FlexBoxCentered, FlexCard, TooltipCustom, FlipCard }
