import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Routes, BrowserRouter } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { Admin, Dashboard, LoginPage, Root } from './routes'
import { PrivateRouter } from './hoc/PrivateRouter'

const Categories = lazy(() => import('./routes/Categories'))
const Goods = lazy(() => import('./routes/Goods'))

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <PrivateRouter>
        <Root />
      </PrivateRouter>
    } >
      <Route path='/admin' element={<Admin />} >
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/categories' element={
          <Suspense>
            <Categories />
          </Suspense>
        } />
        <Route path='/admin/goods' element={
          <Suspense>
            <Goods />
          </Suspense>
        } />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Route>
  )
)

export const App = () => {
  return <RouterProvider router={router} />
}
