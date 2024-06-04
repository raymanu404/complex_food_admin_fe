/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from '@mui/material'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface PropsI {
  startDate?: Date | null | undefined
  endDate?: Date | null | undefined
  onChange: (date: [Date | null, Date | null]) => void
}

const DateTimeContainer = ({ onChange, endDate, startDate }: PropsI) => {
  return (
    <Box>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
      />
    </Box>
  )
}

export default DateTimeContainer
