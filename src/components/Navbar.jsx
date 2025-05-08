import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import logo2 from '../assets/logo2.png'; // Adjust the path as necessary
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const routes = [
    { name: 'Home', path: '/' },
    { name: 'Register', path: '/register' },
    { name: 'Sign In', path: '/signin' },
    { name: 'Company/Author', path: '/company' },
    { name: 'Manga', path: '/manga' },
    { name: 'Favorites', path: '/favorites' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/10 z-50 shadow-sm h-15 ">
      <div className="flex items-center justify-between px-4 py-3 h-full">
        {/* Always-visible hamburger */}
       {!isOpen ? (<button
          className="text-orange-500 text-2xl"
          onClick={() => setIsOpen(true)}
        >
          <FaBars />
        </button>
       )
      :( <button
        className="text-2xl text-orange-500"
        onClick={() => setIsOpen(false)}
      >
        <FaTimes />
      </button>)} 

        {/* Logo on the right */}
       <img src={logo2} alt="logo" className='h-8'/>
      </div>

      {/* Mobile/fullscreen menu drawer */}
      <div
        className={` w-full md:w-1/4 h-screen bg-gradient-to-b from-orange-500 to-orange-600 text-white transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
          <nav className=" flex flex-col   p-8">
          {routes.map((route) => (
            <NavLink
            to={route.path}
              key={route.name}
              href={route.path}
              className="text-lg font-medium hover:bg-amber-50 w-full p-2 hover:text-orange-500 text-center md:text-left "
            >
              {route.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </nav>
  );
};

export default Navbar;
