import { FlexBoxRow } from '@/common/styles/styled-components'
import ParentContainer from '../ParentContainer'
import { Box, Typography } from '@mui/material'
import { useGetMostOrderedProducts } from '@/api/hooks/productHooks'
import LoadingContainer from '../components/LoadingContainer'
import MostOrderedProductCard from '../components/MostOrderedProductCard'
import AlertCard from '../components/AlertCard'

const MostOrderedProductsContainer = () => {
  const { data, isError, isLoading, isFetching } = useGetMostOrderedProducts()
  const { data: products } = data ?? {}

  return (
    <ParentContainer
      title={
        <FlexBoxRow>
          <Typography variant="h4">Most ordered Products</Typography>
        </FlexBoxRow>
      }
      isLoading={isFetching && !isLoading}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '40px',
          alignItems: 'flex-start',
        }}
      >
        {isLoading && <LoadingContainer />}
        {isError && <AlertCard />}
        {!isError && !products && !isLoading && <AlertCard message="No data" type="info" />}
        {!isLoading &&
          !isError &&
          data &&
          products &&
          products.data &&
          products.data.length > 0 &&
          products.data.map((product) => <MostOrderedProductCard data={product} key={product.id} />)}
      </Box>
    </ParentContainer>
  )
}

export default MostOrderedProductsContainer
