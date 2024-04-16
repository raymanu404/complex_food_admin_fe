import { Box, Typography, useTheme } from '@mui/material'

export const Home = () => {
  const theme = useTheme()
  return (
    <Box sx={{ backgroundColor: theme.customPalette.primary.main }}>
      <Typography>hello world, this is home page</Typography>
    </Box>
  )
}
