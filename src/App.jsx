import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'
import Panel from './Pages/Panel'
import Mangas from './Pages/Mangas'
import Manager from './Pages/Manager'
import Author from './pages/Author'

function App() {
  
const router = createBrowserRouter([
  {path: "/", element: <MainLayout/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/home", element: <Home/>},
      {path:"/login", element: <Login/>},
      {path:"/register", element: <Register/>},
      {path:"/panel", element: <Panel/>},
      {path:"/mangas", element: <Mangas/>},
      {path:"/manager", element: <Manager/>},
      {path:"/author", element: <Author/>},

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
