import { useGetMostOrderedProducts, useGetProductsStatistics } from '@/api/hooks/productHooks'
import { Box, Typography, useTheme } from '@mui/material'

export const Home = () => {
  const theme = useTheme()
  const { data, refetch } = useGetProductsStatistics({})
  const { data: mostOrderedData, refetch: getMostOrderedData } = useGetMostOrderedProducts()

  console.log({ data })
  console.log({ mostOrderedData })
  return <Box></Box>
}
