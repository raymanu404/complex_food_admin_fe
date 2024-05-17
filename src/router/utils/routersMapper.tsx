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
const LoginPage = lazy(() => import('@/pages/Auth/AuthContainer').then((module) => ({ default: module.default })))

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
