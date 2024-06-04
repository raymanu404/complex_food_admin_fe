import { Box, Alert } from '@mui/material'
import { MAX_CARD_HEIGHT, MAX_CARD_WITDH } from '../../utils/constants'
import { cardSx } from '../../utils/styles'

interface PropsI {
  message?: string
}

const ErrorCard = ({ message = `Something went wrong!` }: PropsI) => {
  return (
    <Box
      sx={(theme) => ({
        ...cardSx(theme),
        width: MAX_CARD_WITDH,
        height: MAX_CARD_HEIGHT,
        backgroundColor: theme.customPalette.utility.background,
      })}
    >
      <Alert severity="error" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        {message}
      </Alert>
    </Box>
  )
}

export default ErrorCard
