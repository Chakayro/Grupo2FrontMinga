// src/pages/Author.jsx
import React from 'react';
import BgUp from "../../../components/BgUp";
import BgBtFull from "../../../components/BgBtFull"; 
import UserProfileContent from '../../../components/UserProfileContent';
import AuthorImage from "../../../assets/backgroundProfile.png";

function AuthorProfile() {
  return (
    <div className="w-full h-full bg-gray-100 flex flex-col justify-end items-center"> 
      <div className="absolute w-full h-full sm:h-8/12 top-0">
        {/* <BgUp /> */}
         <img
                src={AuthorImage}
                alt=""
                className=" h-full w-full object-cover "
            />
        <div className="absolute inset-0 flex items-center justify-center -top-25">
          <div className="text-center md:text-left text-white px-4">
            <h1 className="text-5xl font-bold">Profile</h1>
          </div>
        </div>
      </div>
      
      <div className="w-full flex flex-col justify-end items-center">
        <BgBtFull> 
          <div className="h-full w-full flex items-center justify-center p-4">
            {/* El div que envuelve UserProfileContent en Author.jsx ahora solo necesita centrarlo y darle un max-width general si es necesario */}
            {/* UserProfileContent maneja su propio layout interno de columnas y responsividad */}
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl"> {/* Ancho responsivo para el bloque UserProfileContent */}
              <UserProfileContent />
            </div>
          </div>
        </BgBtFull>
      </div>
    </div>
  );
}

export default AuthorProfile;