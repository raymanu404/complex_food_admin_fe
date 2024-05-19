import { Backdrop } from '@/common/components'
import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const DefaultRouter = () => {
  const { session, isSessionLoading } = useAuthContext()

  // if (isSessionLoading) {
  //   return <Backdrop isOpen={isSessionLoading} />
  // }
  if (!session && !isSessionLoading) {
    return <Navigate to={`${PATHS[PathEnum.LOGIN]}`} replace />
  }

  return <Navigate to={`${PATHS[PathEnum.HOME]}`} replace />
}

export default DefaultRouter
