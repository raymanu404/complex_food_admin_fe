import ProductStatisticsContainer from './components/containers/ProductStatisticsContainer'
import HeaderSection from './components/containers/HeaderSection'
import { FlexBoxColumn } from '@/common/styles/styled-components'
import MostOrderedProductsContainer from './components/containers/MostOrderedProductsContainer'
import OrderStatisticsContainer from './components/containers/OrderStatisticsContainer'

export const Home = () => {
  return (
    <FlexBoxColumn
      sx={{
        overflow: 'auto',
        gap: '30px',
      }}
    >
      <HeaderSection />
      <MostOrderedProductsContainer />
      <ProductStatisticsContainer />
      <OrderStatisticsContainer />
    </FlexBoxColumn>
  )
}
