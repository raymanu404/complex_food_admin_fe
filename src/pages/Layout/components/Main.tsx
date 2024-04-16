import { Container } from '@mui/material'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
  return <Container sx={{ padding: '0 20px' }}>{children}</Container>
}

export default Main
