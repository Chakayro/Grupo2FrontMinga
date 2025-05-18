import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import MainLayout from './Layouts/MainLayout'
import FormLayout from './Layouts/FormLayout'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'
import ChangeRol from './Pages/Users/ChangeRole'
import PrivateRoute from './components/privateRouter'
import Mangas from './Pages/Mangas/Mangas'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './store/actions/authAction'


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/home", element: <Home/>},
      {path:"/mangas", element: <Mangas/>},
      
      //Aca iran el resto de las rutas que se vayan creando

    ]
  },{
    path: "/",
    element: <FormLayout/>,
    children: [
      {path:"/login", element: <PrivateRoute><Login/></PrivateRoute>},
      {path:"/register", element: <Register/>},
      {path:"/changeRol", element: <ChangeRol/>}
      //Aca iran el resto de las rutas que se vayan creando
    ]
  }
])

const loginWithToken = async (token)=> {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/validateToken',{ 
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data.user;
  } catch (error) {
    console.error('Error validating token:', error);
    return null;
  }
}
function App() {
const dispatch = useDispatch();

  // Check if the token is present in localStorage and validate it
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    loginWithToken(token)
      .then(user => {
        if (user) {
          dispatch(setUser({ user, token }));
        }else{
          console.error('Token no valido');
          localStorage.removeItem('token');
        }
      })
      .catch(error => {
        console.error('Error durante la validacion:', error);
        localStorage.removeItem('token');
      });
  }

},[dispatch])




  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}


export default App
