import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { useAuthContext } from '@/contexts/AuthContext'
import { Fragment, PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'

interface PropsI extends PropsWithChildren {}

const RedirectRouter = ({ children }: PropsI) => {
  const { session } = useAuthContext()

  if (!session) {
    return <Navigate to={`${PATHS[PathEnum.LOGIN]}`} replace />
  }

  return <Fragment>{children}</Fragment>
}

export default RedirectRouter
