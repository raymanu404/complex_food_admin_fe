import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Suspense } from 'react'
import { RoutePaths } from './utils/routersMapper'
import LoadingPage from '@/pages/Loading/LoadingPage'
import Layout from '@/pages/Layout/Layout'

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<LoadingPage />}>
          <Routes>
            {RoutePaths.map((route, index) => (
              <Route {...route.routeProps} key={`${index}-${route.name}`} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default Router
