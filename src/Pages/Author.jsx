// src/pages/Author.jsx
import React from 'react';
import BgUp from "../components/BgUp";
import BgBt from "../components/BGBT";
import UserProfileContent from '../components/UserProfileContent';

function Author() {
  return (
    // Este es el contenido que irá dentro del <Outlet /> de MainLayout.
    // Este div principal ocupa toda la altura de la sección de "contenido" de MainLayout.
    // MainLayout ya es h-screen, y la <main> dentro de él es flex-grow.
    // Si esta página Author debe ocupar toda la altura de la <main>, entonces h-full aquí.
    <div className="w-full h-full bg-gray-100 flex flex-col justify-end items-center"> 
      {/* La estructura interna de Author.jsx se mantiene como la querías originalmente */}
      <div className="absolute w-full h-full sm:h-9/12 top-0">
        <BgUp />
        <div className="absolute inset-0 flex items-center justify-center md:ml-24">
          <div className="text-center md:text-left text-white px-4">
            <h1 className="text-5xl font-bold">Profile</h1>
          </div>
        </div>
      </div>
      {/* Este div se asegura que BgBt esté al final y centrado */}
      <div className="w-full flex flex-col justify-end items-center">
        <BgBt>
          <div className="h-full w-full flex items-center justify-center">
            <UserProfileContent />
          </div>
        </BgBt>
      </div>
    </div>
  );
}

export default Author;