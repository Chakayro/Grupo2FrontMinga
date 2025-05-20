import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo2 from '../assets/logo2.png'; // Ajusta la ruta si hace falta
import userPhoto from '../assets/user.png';
import { NavLink } from 'react-router-dom';
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

  const routes = [
    { name: 'Home', path: '/', type: "public" },
    { name: 'Log In', path: '/login', type: "public" },
    { name: 'Log Out', path: null, type: "auth" },
    { name: 'Change Rol', path: '/changeRol', type: "private" },
    { name: 'Author or Company', path: '/AuthorCompany', type: "private" },
    { name: 'Mangas', path: '/manga', type: "public" },
    { name: 'Favorites', path: '/favorites', type: "private" },
  ]; 

  return (
    <nav className="fixed top-0 w-full h-15 z-50">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        {!isOpen
          ? <button className="text-orange-500 text-2xl z-50" onClick={() => setIsOpen(true)}>
            <FaBars />
          </button>
          : <button className="text-2xl text-amber-50 z-50" onClick={() => setIsOpen(false)}>
            <FaTimes />
          </button>
        }
        <img src={logo2} alt="logo" className="h-10 z-50" />
      </div>
      <div
        className={`fixed top-0 left-0 w-full md:w-1/4 h-screen
                    bg-gradient-to-b from-orange-500 to-orange-600 text-white
                    transform transition-transform duration-300 ease-in-out z-40
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex flex-col mt-10 p-8">
          {<div className='flex items-center mb-4 justify-start align-center bg-orange-900 rounded-lg'>
            <img src={rol === undefined ? userPhoto : user?.photo} className='w-10 h-10 m-2 rounded-lg border-1 border-black' />
            <h1 className="font-bold text-center mx-2">
              {rol >= 0 ? `Welcome, ${user?.email?.split("@")[0]}!` : 'Welcome, You Can Log In!'}
            </h1>
          </div>
          }


          {routes.map(route => {
            if (token) {
              <h1>hola</h1>

            }
            // 1) Rutas públicas
            if (route.type === "public") {
              // Si no hay token → todas las públicas
              if (!token) {
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
              // Si hay token → solo Home y Manga (ocultar Log In)
              if (token && route.name !== 'Log In') {
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

            // 2) Ruta de autenticación (Log Out)
            if (route.type === "auth" && token) {
              return (
                <button
                  key={route.name}
                  onClick={handleLogout}
                  className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left"
                >
                  {route.name}
                </button>
              );
            }

            // 3) Rutas privadas (solo si hay token)
            if (route.type === "private" && token) {
              // Change Rol solo cuando rol === 0
              if (route.name === 'Change Rol' && rol === 0) {
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
              // Author or Company solo cuando rol > 0
              if (route.name === 'Author or Company' && rol > 0) {
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
              // Favorites para cualquier usuario autenticado
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

            // Si no cuadra ninguna condición, no renderizamos nada
            return null;
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
