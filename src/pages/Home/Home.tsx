import { Box, useTheme } from '@mui/material'

export const Home = () => {
  const theme = useTheme()
  return (
    <Box sx={{ backgroundColor: theme.customPalette.primary.main }}>
      <h1>hello world, this is home page</h1>
    </Box>
  )
}
