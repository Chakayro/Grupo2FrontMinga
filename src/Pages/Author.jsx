// src/pages/Author.jsx (o donde lo tengas)
import React from 'react';
import BgUp from "../components/BgUp";
import BgBt from "../components/BGBT";
import UserProfileContent from '../components/UserProfileContent';

function Author() {
  return (
    <>
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-end items-center">
        <div className="absolute w-full h-screen sm:h-9/12 top-0">
          <BgUp />
          <div className="absolute inset-0 flex items-center justify-center md:ml-24">
            <div className="text-center md:text-left text-white px-4">
              <h1 className="text-5xl font-bold">Profile</h1>
            </div>
          </div>
        </div>
        <BgBt>
          {/* Contenido principal centrado dentro de BgBt */}
          <div className="h-full w-full flex items-center justify-center ">
            <UserProfileContent /> {/* Aquí se usa el nuevo componente */}
          </div>
        </BgBt>
      </div>
    </>
  );
}

export default Author;