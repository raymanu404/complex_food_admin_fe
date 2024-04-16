import { Box, Typography, useTheme } from '@mui/material'

const Navbar = () => {
  const theme = useTheme()

  return (
    <Box sx={{ backgroundColor: theme.customPalette.primary.lightest, width: '100%', height: '5vh' }}>
      <Typography>navbar</Typography>
    </Box>
  )
}

export default Navbar
