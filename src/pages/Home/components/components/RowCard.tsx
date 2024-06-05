import { FlexBoxRow } from '@/common/styles/styled-components'
import { formatNumber } from '@/common/utils/helpers'
import { Box, Chip, ChipOwnProps, Typography, TypographyOwnProps } from '@mui/material'
import { DEFAULT_TITLE, DEFAULT_VALUE } from '../../utils/constants'

interface PropsI {
  value?: number | string | undefined
  title?: string | undefined
  isImportant?: boolean
  chipColor?: ChipOwnProps['color']
  customChildren?: React.ReactNode
  titleVariant?: TypographyOwnProps['variant']
}

const RowCard = ({
  value = DEFAULT_VALUE,
  title = DEFAULT_TITLE,
  isImportant = true,
  chipColor = 'default',
  customChildren,
  titleVariant = 'caption',
}: PropsI) => {
  const valueCalc = typeof value === 'number' ? formatNumber(value) : value
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography variant={titleVariant}>{title}</Typography>
      <FlexBoxRow sx={{ alignItems: 'center', justifyContent: 'center' }}>
        {customChildren ?? (
          <Chip
            label={valueCalc}
            variant={isImportant || valueCalc ? 'filled' : 'outlined'}
            color={valueCalc === `${DEFAULT_VALUE}` ? 'error' : chipColor}
          />
        )}
      </FlexBoxRow>
    </Box>
  )
}

export default RowCard
