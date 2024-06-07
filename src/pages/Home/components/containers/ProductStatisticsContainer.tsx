import { useGetProductsStatistics } from '@/api/hooks/productHooks'
import { FlexBoxColumn, FlexBoxRow } from '@/common/styles/styled-components'
import { Box, Chip, Divider, Typography } from '@mui/material'
import ProductStatistcsCard from '../components/ProductStatistcsCard'
import { useCallback, useState } from 'react'
import ParentContainer from '../ParentContainer'
// import { SUPABASE_STORAGE_CATEGORIES_FOLDER } from '@/common/utils/constants'
import { createAbsolutePathLocal } from '../../utils/helpers'
import { CategoryEnum } from '../../utils/interfaces'
import { FILE_EXTENSION } from '../../utils/constants'
import DateTimeContainer from './DateTimeContainer'

const ProductStatisticsContainer = () => {
  const [isExpandedChildren, setIsExpandedChildren] = useState(false)

  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 0, 1))
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const onChangeStartDateHandler = useCallback((date: Date | null) => {
    setStartDate(date)
  }, [])

  const onChangeEndDateHandler = useCallback((date: Date | null) => {
    setEndDate(date)
  }, [])

  const { data, isError, isLoading, isFetching } = useGetProductsStatistics({ startDate, endDate })
  const { calculusData, ...rest } = data ?? {}
  const overviewData = { categoryName: undefined, ...rest }

  const onClickHandler = () => {
    setIsExpandedChildren((prev) => !prev)
  }

  // const { data: dataFileList, isLoading: isLoadingGetFileList } = useGetListFilesDataFromStorage({
  //   folderName: SUPABASE_STORAGE_CATEGORIES_FOLDER,
  // })

  // const fileList = useMemo(() => dataFileList?.data?.map((x) => x.name), [dataFileList?.data])
  // console.log({ fileList })

  return (
    <ParentContainer
      title={
        <FlexBoxRow>
          <Typography variant="h4">Products Statistics</Typography>
        </FlexBoxRow>
      }
      isLoading={isFetching && !isLoading}
      // parentProps={{
      //   sx: { overflow: 'auto', maxHeight: '80vh' },
      // }}
    >
      <DateTimeContainer
        onChangeStartDate={onChangeStartDateHandler}
        onChangeEndDate={onChangeEndDateHandler}
        startDate={startDate}
        endDate={endDate}
      />
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
            imageSrc={createAbsolutePathLocal({
              fileName: CategoryEnum.General,
              fileExt: FILE_EXTENSION,
            })}
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
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '30px',
              alignItems: 'flex-start',
            }}
          >
            {!isLoading &&
              calculusData &&
              calculusData.data.length > 0 &&
              calculusData.data.map((data) => {
                return (
                  <ProductStatistcsCard
                    data={data}
                    isError={isError}
                    isLoading={isLoading}
                    key={data.categoryName}
                    imageSrc={createAbsolutePathLocal({
                      fileName: data.categoryName.toLocaleLowerCase(),
                      fileExt: FILE_EXTENSION,
                    })}
                  />
                )
              })}
          </Box>
        )}
      </FlexBoxRow>
    </ParentContainer>
  )
}

export default ProductStatisticsContainer
