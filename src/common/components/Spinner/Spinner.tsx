import { Box, CircularProgress, CircularProgressProps } from '@mui/material'

interface PropsI extends CircularProgressProps {}

const Spinner = ({ size = '3rem', ...rest }: PropsI) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={size} {...rest} />
    </Box>
  )
}

export default Spinner
