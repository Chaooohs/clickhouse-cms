import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Routes, BrowserRouter } from 'react-router-dom'
import { Admin, Categories, Dashboard, Goods, LoginPage, Root } from './routes'
import { PrivateRouter } from './hoc/PrivateRouter'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={
      <PrivateRouter>
        <Root />
      </PrivateRouter>
    } >
      <Route path='/admin' element={<Admin />} >
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/categories' element={<Categories />} />
        <Route path='/admin/goods' element={<Goods />} />
      </Route>
      <Route path='/login' element={<LoginPage />} />
    </Route>
  )
)

export const App = () => {
  return <RouterProvider router={router} />
}


// export const App = () => {
//   return (
//     <BrowserRouter>
//       <PrivateRouter>
//         <Routes>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/login" element={<LoginPage />} />
//         </Routes>
//       </PrivateRouter>
//     </BrowserRouter>
//   )
// }
