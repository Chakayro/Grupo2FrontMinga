import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import FormLayout from './Layouts/FormLayout'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'

function App() {
  
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/home", element: <Home/>},
      
      //Aca iran el resto de las rutas que se vayan creando

    ]
  },{
    path: "/",
    element: <FormLayout/>,
    children: [
      {path:"/login", element: <Login/>},
      {path:"/register", element: <Register/>},
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
