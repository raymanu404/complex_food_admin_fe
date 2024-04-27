import { APP_CLIENT_PATH_HOME } from '@/common/utils/constants'
import NotFound from '@/pages/NotFound/NotFound'
import { lazy } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

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
const LoginPage = lazy(() => import('@/pages/Login/container').then((module) => ({ default: module.default })))

const RoutePaths: RouteI[] = [
  {
    name: 'default',
    routeProps: { path: `/`, element: <Navigate to={`${APP_CLIENT_PATH_HOME}`} replace /> },
  },
  {
    name: 'Home',
    routeProps: { path: `${APP_CLIENT_PATH_HOME}`, element: <HomePage /> },
  },
  {
    name: 'Orders',
    routeProps: { path: `/orders`, element: <OrdersPage /> },
  },
  {
    name: 'Products',
    routeProps: { path: `/products`, element: <ProductsPage /> },
  },
  {
    name: 'Login',
    routeProps: { path: `/login`, element: <LoginPage /> },
  },
  {
    name: 'not-found',
    routeProps: { path: `/not-found`, element: <NotFound /> },
  },
  {
    name: 'whatever',
    routeProps: { path: `*`, element: <Navigate to={`/not-found`} replace /> },
  },
]

export { RoutePaths }
