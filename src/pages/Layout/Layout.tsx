import { FlexBox } from '@/common/styles/styled-components'
import { PropsWithChildren } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <FlexBox>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </FlexBox>
  )
}

export default Layout
