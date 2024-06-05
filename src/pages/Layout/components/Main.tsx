import { FlexBoxCentered } from '@/common/styles/styled-components'
import { PropsWithChildren } from 'react'

const Main = ({ children }: PropsWithChildren) => {
  return <FlexBoxCentered sx={{ padding: '0 20px' }}>{children}</FlexBoxCentered>
}

export default Main
