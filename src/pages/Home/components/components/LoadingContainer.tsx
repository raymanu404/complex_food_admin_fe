import { Box } from '@mui/material'
import LoadingCard from './LoadingCard'

interface PropsI {
  length?: number
  isLoading: boolean
  alignContainer?: 'column' | 'row'
}

const LoadingContainer = ({ length = 3, isLoading, alignContainer = 'row' }: PropsI) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: alignContainer, alignItems: 'center' }}>
      {isLoading && Array.from({ length: length }).map((_, index) => <LoadingCard key={index.toLocaleString()} />)}
    </Box>
  )
}

export default LoadingContainer
