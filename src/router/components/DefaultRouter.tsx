import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { useAuthContext } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const DefaultRouter = () => {
  const { session } = useAuthContext()

  if (!session) {
    return <Navigate to={`${PATHS[PathEnum.LOGIN]}`} replace />
  }

  return <Navigate to={`${PATHS[PathEnum.DEFAULT]}`} replace />
}

export default DefaultRouter
