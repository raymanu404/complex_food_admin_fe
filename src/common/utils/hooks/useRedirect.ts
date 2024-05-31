import { useNavigate } from 'react-router-dom'
import { PathEnum } from '../interfaces'
import { PATHS } from '../constants'

const useRedirect = () => {
  const navigate = useNavigate()

  const navigateToHome = () => navigate(`${PATHS[PathEnum.HOME]}`)
  const navigateToLogin = () => navigate(`${PATHS[PathEnum.LOGIN]}`)

  return { navigateToHome, navigateToLogin }
}

export { useRedirect }
