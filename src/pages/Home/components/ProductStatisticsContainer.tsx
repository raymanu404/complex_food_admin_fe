import { useGetProductsStatistics } from '@/api/hooks/productHooks'
import { FlexBoxColumn, FlexBoxRow } from '@/common/styles/styled-components'
import { Box, Chip, Divider } from '@mui/material'
import ProductStatistcsCard from './ProductStatistcsCard'
import LoadingCard from './LoadingCard'

const ProductStatisticsContainer = () => {
  const { data, isError, isLoading } = useGetProductsStatistics({})
  const { calculusData, ...rest } = data ?? {}
  const overviewData = { categoryName: undefined, ...rest }

  return (
    <Box>
      <FlexBoxRow sx={{ overflowX: 'auto', maxWidth: '100vw', gap: '20px', maxHeight: '80vh' }}>
        <Box>
          <ProductStatistcsCard data={overviewData} isError={isError} isLoading={isLoading} />
        </Box>
        <FlexBoxColumn>
          <Divider orientation="vertical" variant="fullWidth">
            <Chip label="Statistics" size="small" />
          </Divider>
        </FlexBoxColumn>
        <Box>
          {isLoading && <LoadingCard />}
          {!isLoading &&
            calculusData &&
            calculusData.data.length > 0 &&
            calculusData.data.map((data) => {
              return (
                <ProductStatistcsCard data={data} isError={isError} isLoading={isLoading} key={data.categoryName} />
              )
            })}
        </Box>
      </FlexBoxRow>
    </Box>
  )
}

export default ProductStatisticsContainer
