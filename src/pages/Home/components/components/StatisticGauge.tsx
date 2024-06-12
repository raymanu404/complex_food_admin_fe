import { FlexBoxCentered, FlexBoxColumn } from '@/common/styles/styled-components'
import { Skeleton, Typography, useTheme } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts'
import { cardSx } from '../../utils/styles'

interface PropsI {
  value: number | undefined
  isLoading: boolean
  textLabel: string
  width?: number
  height?: number
}

const MAX_VALUE = 100
const MIN_VALUE = 0

const StatisticGauge = ({ value = MIN_VALUE, isLoading = false, textLabel, height = 300, width = 300 }: PropsI) => {
  const theme = useTheme()

  return (
    <FlexBoxColumn>
      {isLoading ? (
        <Skeleton animation="wave" sx={{ width: width, height: height, ...cardSx(theme) }} />
      ) : (
        <FlexBoxCentered>
          <Gauge
            valueMax={MAX_VALUE}
            value={value}
            startAngle={-110}
            endAngle={110}
            sx={{
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 40,
                transform: 'translate(0px, 0px)',
                color: 'aqua',
              },
            }}
            text={({ value }) => `${value}%`}
            width={width}
            height={height}
          />
          <Typography variant="body2">{textLabel}</Typography>
        </FlexBoxCentered>
      )}
    </FlexBoxColumn>
  )
}

export default StatisticGauge
