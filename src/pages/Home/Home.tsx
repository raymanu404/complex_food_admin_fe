/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductStatisticsContainer from './components/containers/ProductStatisticsContainer'
import HeaderSection from './components/containers/HeaderSection'
import { useCallback, useState } from 'react'
import DateTimeContainer from './components/containers/DateTimeContainer'
import { FlexBoxColumn } from '@/common/styles/styled-components'

export const Home = () => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(2024, 0, 1))
  const [endDate, setEndDate] = useState<Date | null>(new Date())

  const onChangeDateTimeHandler = useCallback((dates: [Date | null, Date | null]) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
  }, [])

  return (
    <FlexBoxColumn
      sx={{
        overflow: 'auto',
        maxHeight: '90vh',
        gap: '30px',
      }}
    >
      <HeaderSection />
      <DateTimeContainer onChange={onChangeDateTimeHandler} startDate={startDate} endDate={endDate} />
      {/* TODO: put general datePicker  */}
      <ProductStatisticsContainer startDate={startDate} endDate={endDate} />
      {/* TODO: Add Most ordered feature  */}
      {/* TODO: Add orders statistics  */}
    </FlexBoxColumn>
  )
}
