import { Box, Alert } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../../utils/constants'
import { cardSx } from '../../utils/styles'

interface PropsI {
  message?: string
  type?: 'error' | 'info'
}

const AlertCard = ({ message = `Something went wrong!`, type = 'error' }: PropsI) => {
  return (
    <Box
      sx={(theme) => ({
        ...cardSx(theme),
        width: MAX_CARD_WITDH,
        height: MAX_CARD_HEIGHT,
        backgroundColor: theme.customPalette.utility.background,
      })}
    >
      <Alert severity={type} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {message}
      </Alert>
    </Box>
  )
}

export default AlertCard
