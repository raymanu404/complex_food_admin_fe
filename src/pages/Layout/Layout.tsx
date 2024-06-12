import { FlexBox } from '@/common/styles/styled-components'
import { PropsWithChildren, useMemo } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import { Toast } from '@/common/components'
import { useLocation } from 'react-router-dom'
import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'

const Layout = ({ children }: PropsWithChildren) => {
  const { pathname } = useLocation()
  const enabledHeader = useMemo(() => !pathname.includes(PATHS[PathEnum.CONFIRM_ACCOUNT]), [pathname])

  return (
    <FlexBox sx={{ overflowY: 'auto' }}>
      {enabledHeader && <Header />}
      <Main>{children}</Main>
      <Toast />
    </FlexBox>
  )
}

export default Layout
