import { Box, styled } from '@mui/material'

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

export { FlexBox, FlexBoxCentered, FlexCard }
