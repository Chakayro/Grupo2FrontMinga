import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home'

function App() {
  
const router = createBrowserRouter([
  {path: "/", element: <MainLayout/>,
    children: [
      {path:"/", element: <Home/>}
      //Aca iran el resto de las rutas que se vayan creando
    ]
  }
])


  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}
     

export default App
