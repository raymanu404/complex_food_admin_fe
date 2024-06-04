import { Box } from '@mui/material'
import ProductStatisticsContainer from './components/containers/ProductStatisticsContainer'
import HeaderSection from './components/containers/HeaderSection'

export const Home = () => {
  return (
    <Box
      sx={{
        display: 'block',
        flex: 'none',
        width: 'auto',
      }}
    >
      {/* <HeaderSection /> */}
      {/* TODO: put general datePicker  */}
      <ProductStatisticsContainer />
      {/* TODO: Add Most ordered feature  */}
      {/* TODO: Add orders statistics  */}
    </Box>
  )
}
