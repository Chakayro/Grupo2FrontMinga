import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'
import Panel from './Pages/Panel'

function App() {
  
const router = createBrowserRouter([
  {path: "/", element: <MainLayout/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/home", element: <Home/>},
      {path:"/login", element: <Login/>},
      {path:"/register", element: <Register/>},
      {path:"/panel", element: <Panel/>},

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
