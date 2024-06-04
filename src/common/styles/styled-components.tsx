/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Card, IconButton, Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import { ExpandMoreProps } from '../utils/interfaces'

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

const FlexBoxStart = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
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
  width: '240px',
  height: '240px',
  borderRadius: '16px',
  padding: '20px 5px',
}))

const SecondaryCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  backgroundColor: theme.customPalette.utility.background,
  borderRadius: '20px',
  boxShadow: '0px 2px 4px 0px rgba(0,0,0, .15)',
  flexGrow: 1,
}))

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

const FlexBoxRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
}))
const FlexBoxColumn = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}))

export {
  FlexBox,
  FlexBoxCentered,
  FlexCard,
  TooltipCustom,
  FlipCard,
  SecondaryCard,
  FlexBoxStart,
  ExpandMore,
  FlexBoxRow,
  FlexBoxColumn,
}
