import { PATHS } from '@/common/utils/constants'
import { PathEnum } from '@/common/utils/interfaces'
import NotFound from '@/pages/NotFound/NotFound'
import { lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'
import DefaultRouter from '../components/DefaultRouter'
import RedirectRouter from '../components/RedirectRouter'

interface RouteI {
  name: string
  routeProps: RouteProps
}

const HomePage = lazy(() => import('@/pages/Home/Home').then((module) => ({ default: module.Home })))
const OrdersPage = lazy(() =>
  import('@/pages/Orders/container').then((module) => ({ default: module.OrdersContainer }))
)
const ProductsPage = lazy(() =>
  import('@/pages/Products/container').then((module) => ({ default: module.ProductsContainer }))
)

//auth and create admins
const LoginPage = lazy(() => import('@/pages/Auth/AuthContainer').then((module) => ({ default: module.default })))
const InviteAdminPage = lazy(() =>
  import('@/pages/InviteAdmin/InviteAdmin').then((module) => ({ default: module.default }))
)

const ConfirmAccount = lazy(() =>
  import('@/pages/Auth/components/ConfirmAccount').then((module) => ({ default: module.default }))
)

//create a component that provides redirecting if user is not authenticated or authorzied
const RoutePaths: RouteI[] = [
  {
    name: 'default',
    routeProps: { path: `${PATHS[PathEnum.DEFAULT]}`, element: <DefaultRouter /> },
  },
  {
    name: 'Home',
    routeProps: {
      path: `${PATHS[PathEnum.HOME]}`,
      element: (
        <RedirectRouter>
          <HomePage />
        </RedirectRouter>
      ),
    },
  },
  {
    name: 'Orders',
    routeProps: {
      path: `${PATHS[PathEnum.ORDERS]}`,
      element: (
        <RedirectRouter>
          <OrdersPage />
        </RedirectRouter>
      ),
    },
  },
  {
    name: 'Products',
    routeProps: {
      path: `${PATHS[PathEnum.PRODUCTS]}`,
      element: (
        <RedirectRouter>
          <ProductsPage />
        </RedirectRouter>
      ),
    },
  },
  {
    name: 'InviteAdmin',
    routeProps: {
      path: `${PATHS[PathEnum.INVITE_ADMIN]}`,
      element: (
        <RedirectRouter>
          <InviteAdminPage />
        </RedirectRouter>
      ),
    },
  },
  {
    name: 'ConfirmAccount',
    routeProps: {
      path: `${PATHS[PathEnum.CONFIRM_ACCOUNT]}`,
      element: <ConfirmAccount />,
    },
  },
  {
    name: 'Login',
    routeProps: { path: `${PATHS[PathEnum.LOGIN]}`, element: <LoginPage /> },
  },
  {
    name: 'not-found',
    routeProps: { path: `${PATHS[PathEnum.NOT_FOUND]}`, element: <NotFound /> },
  },
  {
    name: 'whatever',
    routeProps: {
      path: `${PATHS[PathEnum.EVERYTHING]}`,
      element: <Navigate to={`${PATHS[PathEnum.NOT_FOUND]}`} replace />,
    },
  },
]

export { RoutePaths }
