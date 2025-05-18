// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import footerBanner from "../assets/Frame 34631.svg";
import logoSmall from "../assets/logo2.png";

export default function Footer() {
  return (
    // El footer ahora es un bloque normal. Su altura será determinada por su contenido.
    // El div padre en Author.jsx con mt-auto lo empujará hacia abajo.
    <footer className="w-full bg-white"> {/* Añadido bg-white aquí si el footer debe tener fondo blanco */}
      <div
        className="footer-banner h-20 sm:h-28 md:h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${footerBanner})` }}
      ></div>
      <div className="flex flex-col sm:flex-row items-center sm:items-stretch px-6 max-w-[1440px] mx-auto py-4 sm:h-auto md:h-[122px]">
        {/* ... resto del contenido del footer sin cambios ... */}
        <div className="w-full sm:w-1/3 flex justify-center sm:justify-start items-center lg:translate-x-5 gap-6 sm:gap-12 py-3 sm:py-0">
          <span className="text-base sm:text-lg cursor-pointer hover:text-orange-500 transition">Home</span>
          <span className="text-base sm:text-lg cursor-pointer hover:text-orange-500 lg:translate-x-6 transition">Mangas</span>
        </div>
        <div className="w-full sm:w-1/3 flex justify-center items-center py-3 sm:py-0 order-first sm:order-none">
          <img src={logoSmall} alt="Logo de Minga" className="h-10 sm:h-12" />
        </div>
        <div className="w-full sm:w-1/3 flex flex-col sm:items-end justify-center items-center gap-3 py-3 sm:py-0">
          <div className="flex gap-6 sm:gap-8">
            <FaFacebookF className="text-black text-lg sm:text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaTwitter className="text-black text-lg sm:text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaVimeoV className="text-black text-lg sm:text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaYoutube className="text-black text-lg sm:text-xl cursor-pointer hover:text-orange-600 transition" />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-12 py-2 rounded-md flex items-center gap-2 transition text-sm sm:text-base">
            Donate <FaHeart />
          </button>
        </div>
      </div>
    </footer>
  );
}