import { useGetProductsStatistics } from '@/api/hooks/productHooks'
import { FlexBoxColumn, FlexBoxRow } from '@/common/styles/styled-components'
import { Box, Chip, Divider, Typography } from '@mui/material'
import ProductStatistcsCard from '../components/ProductStatistcsCard'
import { useState } from 'react'
import ParentContainer from '../ParentContainer'

interface PropsI {
  startDate?: Date | null
  endDate?: Date | null
}

const ProductStatisticsContainer = ({ endDate, startDate }: PropsI) => {
  const [isExpandedChildren, setIsExpandedChildren] = useState(false)

  const { data, isError, isLoading } = useGetProductsStatistics({ startDate, endDate })
  const { calculusData, ...rest } = data ?? {}
  const overviewData = { categoryName: undefined, ...rest }

  const onClickHandler = () => {
    setIsExpandedChildren((prev) => !prev)
  }

  return (
    <ParentContainer
      title={
        <FlexBoxRow>
          <Typography variant="h4">Products Statistics</Typography>
        </FlexBoxRow>
      }
      parentProps={{
        sx: { overflow: 'auto', maxHeight: '500px' },
      }}
    >
      <FlexBoxRow sx={{ overflowX: 'auto', maxWidth: '90vw', gap: '20px', maxHeight: '80vh', padding: '40px' }}>
        <Box
          sx={{
            position: 'sticky',
            top: '0px',
            zIndex: 1,
          }}
        >
          <ProductStatistcsCard
            data={{ ...overviewData, inStock: overviewData.totalInStock, outOfStock: overviewData.totalOutOfStock }}
            isError={isError}
            isLoading={isLoading}
          />
        </Box>
        <FlexBoxColumn>
          <Divider orientation="vertical" variant="fullWidth">
            <Chip
              label="Statistics"
              size="small"
              onClick={onClickHandler}
              disabled={isError || isError || !calculusData || calculusData.data.length === 0}
            />
          </Divider>
        </FlexBoxColumn>
        {isExpandedChildren && (
          <Box>
            {!isLoading &&
              calculusData &&
              calculusData.data.length > 0 &&
              calculusData.data.map((data) => {
                return (
                  <ProductStatistcsCard data={data} isError={isError} isLoading={isLoading} key={data.categoryName} />
                )
              })}
          </Box>
        )}
      </FlexBoxRow>
    </ParentContainer>
  )
}

export default ProductStatisticsContainer
