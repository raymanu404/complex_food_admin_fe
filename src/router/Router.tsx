import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { RoutePaths } from './utils/routersMapper'
import LoadingPage from '@/pages/Loading/LoadingPage'
import Layout from '@/pages/Layout/Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <Layout>
          <Routes>
            {RoutePaths.map((route, index) => (
              <Route {...route.routeProps} key={`${index}-${route.name}`} />
            ))}
          </Routes>
        </Layout>
      </Suspense>
    </BrowserRouter>
  )
}

export default Router
