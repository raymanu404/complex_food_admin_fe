import { Box } from '@mui/material'
import LoadingCard from './LoadingCard'

interface PropsI {
  length?: number
  alignContainer?: 'column' | 'row'
}

const LoadingContainer = ({ length = 3, alignContainer = 'row' }: PropsI) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: alignContainer,
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
      }}
    >
      {Array.from({ length: length }).map((_, index) => (
        <LoadingCard key={index.toLocaleString()} />
      ))}
    </Box>
  )
}

export default LoadingContainer
