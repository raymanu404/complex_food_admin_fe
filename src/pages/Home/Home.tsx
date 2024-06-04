import { Box, Typography } from '@mui/material'
import ProductStatisticsContainer from './components/ProductStatisticsContainer'

export const Home = () => {
  return (
    <Box>
      <Typography variant="h2">Welcome in ComplexFood Admin Dashboard</Typography>
      {/* TODO: put general datePicker  */}
      <ProductStatisticsContainer />
      {/* TODO: Add Most ordered feature  */}
      {/* TODO: Add orders statistics  */}
    </Box>
  )
}
