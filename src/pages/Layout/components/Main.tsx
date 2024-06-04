import { FlexBoxCentered } from '@/common/styles/styled-components'
// import { Container } from '@mui/material'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
  return <FlexBoxCentered sx={{ padding: '0 20px', maxHeight: '90vh' }}>{children}</FlexBoxCentered>
}

export default Main
