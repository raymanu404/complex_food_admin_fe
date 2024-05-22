import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import { Navigate } from 'react-router-dom'

const DefaultRouter = () => {
  return <Navigate to={`${PATHS[PathEnum.HOME]}`} replace />
}

export default DefaultRouter
