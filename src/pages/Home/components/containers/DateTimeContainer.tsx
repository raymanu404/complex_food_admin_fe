/* eslint-disable @typescript-eslint/no-explicit-any */
import { FlexBoxRow } from '@/common/styles/styled-components'
import { Box, Typography } from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface PropsI {
  startDate?: Date | null | undefined
  endDate?: Date | null | undefined
  onChangeStartDate: (date: Date | null) => void
  onChangeEndDate: (date: Date | null) => void
}
/* TODO: Add more detailed info about datetime  */
const DateTimeContainer = ({ onChangeStartDate, endDate, startDate, onChangeEndDate }: PropsI) => {
  return (
    <FlexBoxRow sx={{ gap: '30px' }}>
      <Box>
        <Typography variant="h5">Select Start Date</Typography>
        <DatePicker selected={startDate} onChange={onChangeStartDate} inline />
      </Box>
      <Box>
        <Typography variant="h5">Select End Date</Typography>
        <DatePicker selected={endDate} onChange={onChangeEndDate} inline />
      </Box>
    </FlexBoxRow>
  )
}

export default DateTimeContainer
