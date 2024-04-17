import { FlexBox } from '@/common/styles/styled-components'
import { Typography, useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()

  return (
    <FlexBox sx={{ backgroundColor: theme.customPalette.primary.lightest, height: '5vh' }}>
      <Typography>footer</Typography>
    </FlexBox>
  )
}

export default Footer
