import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo2 from '../assets/logo2.png'; // Adjust the path as necessary
import { NavLink } from 'react-router-dom';
import { useSelector,  useDispatch } from 'react-redux';
import { logout } from '../store/actions/authAction';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
  }
  const routes = [

    { name: 'Home', path: '/', type: "public" },
    { name: 'logIn', path: '/login', type:"public" },
    { name: "LogOut", path:null,  type:"auth"},
    { name: 'Company/Author', path: '/company', type:"private" },
    { name: 'Manga', path: '/manga', type:"public" },
    { name: 'Favorites', path: '/favorites', type:"private" },
  ];

  return (
    <nav className="fixed top-0 w-full  h-15  z-50">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        {/* Always-visible hamburger */}
      {!isOpen ? (<button
          className="text-orange-500 text-2xl z-50"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
      )
      :( <button
        className="text-2xl text-amber-50 z-50 "
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button>)} 

        {/* Logo on the right */}
      <img src={logo2} alt="logo" className='h-10 z-50'/>
      </div>

      {/* Mobile/fullscreen menu drawer */}
    <div
      className={`fixed top-0 left-0 w-full md:w-1/4 h-screen bg-gradient-to-b from-orange-500 to-orange-600 text-white transform transition-transform duration-300 ease-in-out z-40
    ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
>

          <div className=" flex flex-col  mt-10 p-8">
          {routes.map((route) => {
           if(!token && route.type === "public"){
            return(
              <NavLink
              to={route.path}
              key={route.name}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left ">
              {route.name}
            </NavLink>
            )
           }
           if(token && route.type === "auth"){
            return(
              <NavLink
              to={route.path}
              key={route.name}
              href={route.path}
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left "
            >
              {route.name}
            </NavLink>
            )
           }
           if(token && route.type === "private" || (route.type === "public" && route.name !== "logIn")){
            return(<NavLink
              to={route.path}
              key={route.name}
              href={route.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left "
            >
              {route.name}
            </NavLink>)
           }

           
            })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
