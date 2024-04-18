import { FlexBox } from '@/common/styles/styled-components'
import { PropsWithChildren } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { Toast } from '@/common/components'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox>
      <Header />
      <Main>{children}</Main>
      <Toast />
    </FlexBox>
  )
}

export default Layout
