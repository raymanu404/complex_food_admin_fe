import { Box, Typography } from '@mui/material'
import ParentContainer from '../ParentContainer'
import { useGetOrdersStatistics } from '@/api/hooks/orderHooks'
import { useCallback, useMemo, useState } from 'react'
import { FlexBoxRow } from '@/common/styles/styled-components'
import StatisticGauge from '../components/StatisticGauge'
import AlertCard from '../components/AlertCard'
import DateTimeContainer from './DateTimeContainer'

const OrderStatisticsContainer = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 0, 1))
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const onChangeStartDateHandler = useCallback((date: Date | null) => {
    setStartDate(date)
  }, [])

  const onChangeEndDateHandler = useCallback((date: Date | null) => {
    setEndDate(date)
  }, [])
  const { data, isError, isLoading, isFetching } = useGetOrdersStatistics({ startDate, endDate })

  const dataInPercents = useMemo(() => data?.dataInPercentsResponse, [data])
  const dataInPercentsValueKeys: { key: string; value: number }[] = useMemo(
    () =>
      Object.entries(dataInPercents ?? {}).map(([key, value]) => {
        const castedKey = key as string
        const castedValue = value as number
        return { key: castedKey, value: castedValue }
      }),
    [dataInPercents]
  )

  return (
    <ParentContainer
      title={
        <FlexBoxRow>
          <Typography variant="h4">Orders Statistics</Typography>
        </FlexBoxRow>
      }
      isLoading={isFetching && !isLoading}
    >
      <DateTimeContainer
        onChangeStartDate={onChangeStartDateHandler}
        onChangeEndDate={onChangeEndDateHandler}
        startDate={startDate}
        endDate={endDate}
      />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          padding: '40px',
          alignItems: 'flex-start',
        }}
      >
        {isError && <AlertCard />}
        {!isError && !dataInPercentsValueKeys && !isLoading && <AlertCard message="No data" type="info" />}
        {!isError &&
          data &&
          dataInPercentsValueKeys &&
          dataInPercentsValueKeys.length > 0 &&
          dataInPercentsValueKeys.map((x) => (
            <StatisticGauge value={x.value} isLoading={isLoading} textLabel={x.key} key={`${x.key}-${x.value}`} />
          ))}
      </Box>
    </ParentContainer>
  )
}

export default OrderStatisticsContainer
