import { FlexBox } from '@/common/styles/styled-components'
import { useTheme } from '@mui/material'

const Footer = () => {
  const theme = useTheme()

  return (
    <FlexBox sx={{ backgroundColor: theme.customPalette.primary.main, height: '5vh' }}>
      <h1>Footer</h1>
    </FlexBox>
  )
}

export default Footer
