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

export { FlexBox, FlexBoxCentered }
