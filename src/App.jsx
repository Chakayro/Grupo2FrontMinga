import './App.css'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import LayoutAnim from './Layouts/LayoutAnim'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'
import Panel from './Pages/Panel'
import Mangas from './Pages/Mangas'
import Manager from './Pages/Manager'
import Author from './pages/Author'
import EditChapterPage from './pages/EditChapterPage'

import NewMangaPage from './pages/NewMangaPage';
import EditMangaPage from './pages/EditMangaPage';
import NewChapterPage from './pages/NewChapterPage';
import NewCompanyPage from './pages/NewCompanyPage';
import NewAuthorPage from './pages/NewAuthorPage';
import CompanyProfilePage from './pages/CompanyProfilePage';

function App() {
  
const router = createBrowserRouter([
  {path: "/", element: <LayoutAnim/>,
    children: [
      {path:"/", element: <Home/>},
      {path:"/home", element: <Home/>},
      {path:"/login", element: <Login/>},
      {path:"/register", element: <Register/>},
      {path:"/panel", element: <Panel/>},
      {path:"/mangas", element: <Mangas/>},
      {path:"/manager", element: <Manager/>},
      {path:"/author", element: <Author/>},
      {path:"/edit-chapter", element: <EditChapterPage/>},
      
      
      {path:"/new-manga", element: <NewMangaPage/>},
      {path:"/edit-manga", element: <EditMangaPage/>},
      { path:"/new-chapter", element: <NewChapterPage/>},
      { path:"/new-company", element: <NewCompanyPage/>},
      { path:"/new-author", element: <NewAuthorPage/>},
      { path:"/company-profile", element: <CompanyProfilePage/>},
      

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
