import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo2 from '../assets/logo2.png';
import userPhoto from '../assets/user.png';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/actions/authAction';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { token, user } = useSelector(state => state.auth);
  const rol = user?.role;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    setIsOpen(false);
  };

  // Determinar etiqueta y ruta según rol
  let dynamicLabel = null;
  let dynamicPath  = null;
  let profilePath =null;
  switch (rol) {
    case 1:
      dynamicLabel = "Author";
      dynamicPath  = "/AuthorCompany";
      profilePath = "/authorProfile"
      break;
    case 2:
      dynamicLabel = "Company";
      dynamicPath  = "/AuthorCompany";
      profilePath = "/companyProfile"
      break;
    case 3:
      dynamicLabel = "Admin Panel";
      dynamicPath  = "/adminPanel";
      profilePath = "/authorProfile"
      break;
    default:
      break;
  }

  // Rutas base (sin duplicar Admin Panel ni Author/Company)
  const routes = [
    { name: 'Home',       path: '/',            type: "public"  },
    { name: 'Log In',     path: '/login',       type: "public"  },
    { name: 'Log Out',    path: null,           type: "auth"    },
    { name: 'Change Rol', path: '/changeRol',   type: "private" },
    { name: 'Mangas',     path: '/manga',       type: "public"  },
    { name: 'Favorites',  path: '/favorites',   type: "private" },
  ];

  return (
    <nav className="fixed top-0 w-full h-15 z-50">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        {isOpen
          ? <button className="text-2xl text-amber-50 z-50" onClick={() => setIsOpen(false)}><FaTimes/></button>
          : <button className="text-orange-500 text-2xl" onClick={() => setIsOpen(true)}><FaBars/></button>
        }
        <img src={logo2} alt="logo" className="h-10"/>
      </div>

      <div className={`fixed top-0 left-0 w-full md:w-1/4 h-screen
          bg-gradient-to-b from-orange-500 to-orange-600 text-white
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col mt-10 p-8">
          {/* Avatar y saludo */}
          <Link to={profilePath} className="flex items-center mb-4 bg-orange-900 rounded-lg p-2">
            <img
              src={!token ? userPhoto : user.photo}
              className="w-10 h-10 rounded-lg mr-3"
            />
            <h1 className="font-bold">
              {token
                ? `Welcome, ${user.email.split('@')[0]}!`
                : 'Welcome, Guest!'}
            </h1>
          </Link>

          {/* Rutas base */}
          {routes.map(route => {
            // Públicas
            if (route.type === "public") {
              if (!token || (token && route.name !== 'Log In')) {
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
                  >
                    {route.name}
                  </NavLink>
                );
              }
            }

            // Log Out
            if (route.type === "auth" && token) {
              return (
                <button
                  key="Log Out"
                  onClick={handleLogout}
                  className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
                >
                  Log Out
                </button>
              );
            }

            // Privadas
            if (route.type === "private" && token) {
              // Change Rol → solo rol 0
              if (route.path === '/changeRol' && rol === 0) {
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
                  >
                    {route.name}
                  </NavLink>
                );
              }
              // Favorites → cualquier usuario logueado
              if (route.name === 'Favorites') {
                return (
                  <NavLink
                    to={route.path}
                    key={route.name}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
                  >
                    {route.name}
                  </NavLink>
                );
              }
            }

            return null;
          })}

          {/* Inyección dinámica de Author/Company/Admin Panel */}
          {token && dynamicLabel && dynamicPath && (
            <NavLink
              to={dynamicPath}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
            >
              {dynamicLabel}
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
