import { FlexBoxRow } from '@/common/styles/styled-components'
import { formatNumber } from '@/common/utils/helpers'
import { Box, Chip, Typography } from '@mui/material'
import { DEFAULT_TITLE, DEFAULT_VALUE } from '../../utils/constants'

interface PropsI {
  value: number | undefined
  title: string | undefined
  isImportant?: boolean
}

const RowCard = ({ value, title, isImportant = true }: PropsI) => {
  const valueCalc = formatNumber(value ?? DEFAULT_VALUE)
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant="caption">{title ?? DEFAULT_TITLE}</Typography>
      <FlexBoxRow sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Chip
          label={valueCalc}
          variant={isImportant || valueCalc ? 'filled' : 'outlined'}
          color={valueCalc === '0' ? 'error' : 'default'}
        />
      </FlexBoxRow>
    </Box>
  )
}

export default RowCard
