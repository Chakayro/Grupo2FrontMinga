import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LayoutAnim from './Layouts/LayoutAnim'
import Home from './Pages/Home'
import Login from './Pages/Users/Login'
import Register from './Pages/Users/Register'
import Panel from './Pages/Panel'
import Manager from './Pages/Manager'
import Author from './pages/Author' // Assuming this is the correct path, was './pages/Author', now consistent
import EditChapterPage from './pages/EditChapterPage'

import NewMangaPage from './pages/NewMangaPage';
import EditMangaPage from './pages/EditMangaPage';
import NewChapterPage from './pages/NewChapterPage';
import NewCompanyPage from './pages/NewCompanyPage';
import NewAuthorPage from './pages/NewAuthorPage';
import CompanyProfilePage from './pages/CompanyProfilePage';
import MainLayout from './Layouts/MainLayout'
import FormLayout from './Layouts/FormLayout'

import ChangeRol from './Pages/Users/ChangeRole'
import PrivateRoute from './components/privateRouter'
import Mangas from './Pages/Mangas/Mangas'
import MangaChapter from './Pages/Mangas/MangaChapter'
import DetailsMangas from './Pages/Mangas/DetailsMangas'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './store/actions/authAction'

import Company from './Pages/Users/NewCompany'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAnim />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/panel", element: <Panel /> },
      { path: "/manager", element: <Manager /> },
      { path: "/author", element: <Author /> }, // Path for Author page
      { path: "/edit-chapter", element: <EditChapterPage /> },
      { path: "/new-manga", element: <NewMangaPage /> },
      { path: "/edit-manga", element: <EditMangaPage /> },
      { path: "/new-chapter", element: <NewChapterPage /> },
      { path: "/new-company", element: <NewCompanyPage /> }, // Path for NewCompanyPage under LayoutAnim
      { path: "/new-author", element: <NewAuthorPage /> },   // Path for NewAuthorPage under LayoutAnim
      { path: "/company-profile", element: <CompanyProfilePage /> },
    ]
  },
  {
    path: "/", // This path might conflict if not managed carefully, consider more specific base paths for layouts
    element: <MainLayout />,
    children: [
      // Note: The paths "/" and "/manga" under MainLayout might overlap with "/" and "/home" under LayoutAnim if not handled carefully.
      // It's generally better to have distinct base paths for different layouts or ensure only one matches.
      { path: "/mangas_overview", element: <Mangas /> }, // Changed path to avoid conflict with root
      { path: "/manga", element: <Mangas /> },
      { path: "/mangaChapter/:id", element: <MangaChapter /> },
      { path: "/Detailsmanga/:id", element: <DetailsMangas /> },
      //Aca iran el resto de las rutas que se vayan creando
    ]
  },
  {
    path: "/", // Similar to MainLayout, consider specific base paths
    element: <FormLayout />,
    children: [
      { path: "/login", element: <PrivateRoute><Login /></PrivateRoute> },
      { path: "/register", element: <Register /> },
      { path: "/changeRol", element: <ChangeRol /> },
      // The path "/newAuthor" was pointing to <Author/>. Assuming you meant NewAuthorPage or a specific form component.
      // If './pages/Author' is a page and './Pages/Users/NewAuthor' is a form, clarify which one.
      // For now, I'm keeping <Author /> as per original, but it might be an oversight.
      { path: "/newAuthorForm", element: <Author /> }, // Changed path to avoid conflict, assuming this is a form for creating an author
      // The path "/newCompany" was pointing to <Company/>. Assuming you meant NewCompanyPage or a specific form component.
      // If './pages/NewCompanyPage' is a page and './Pages/Users/NewCompany' is a form, clarify.
      { path: "/newCompanyForm", element: <Company /> }, // Changed path to avoid conflict, assuming this is a form for creating a company
      //Aca iran el resto de las rutas que se vayan creando
    ]
  }
])

const loginWithToken = async (token) => {
  try {
    const response = await axios.get('http://localhost:8080/api/auth/validateToken', {
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
          } else {
            console.error('Token no valido');
            localStorage.removeItem('token');
          }
        })
        .catch(error => {
          console.error('Error durante la validacion:', error);
          localStorage.removeItem('token');
        });
    }

  }, [dispatch])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
