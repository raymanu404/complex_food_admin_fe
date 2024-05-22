import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { useAuthContext } from '@/contexts/AuthContext'
import { Fragment, PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

interface PropsI extends PropsWithChildren {}

const RedirectRouter = ({ children }: PropsI) => {
  const { session } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    const navigateToLogin = () => navigate(`${PATHS[PathEnum.LOGIN]}`)

    if (!session) {
      console.log(`session: ${session}`)
      navigateToLogin()
    }
  }, [navigate, session])

  return <Fragment>{children}</Fragment>
}

export default RedirectRouter
