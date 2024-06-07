import { Stack } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'

const OrderStatisticsContainer = () => {
  //TODO: implement
  return (
    <div>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
        <Gauge
          valueMax={100}
          value={12}
          startAngle={-110}
          endAngle={110}
          sx={{
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 40,
              transform: 'translate(0px, 0px)',
            },
          }}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
          width={400}
          height={300}
        />
        <Gauge width={400} height={300} value={60} startAngle={-90} endAngle={90} />
      </Stack>
    </div>
  )
}

export default OrderStatisticsContainer
