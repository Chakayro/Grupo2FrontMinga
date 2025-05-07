import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaVimeoV,
  FaYoutube,
  FaHeart,
} from "react-icons/fa";
import footerBanner from "../assets/Frame 34631.svg";
import logoSmall from "../assets/LOGO DOS (1).png";


export default function Footer() {
  return (
    <footer className="w-full">
      {/* Banner responsive con clase personalizada */}
      <div
        className="footer-banner"
        style={{ backgroundImage: `url(${footerBanner})` }}
      ></div>

      {/* Contenido del footer */}
      <div className="bg-white flex flex-col sm:flex-row items-center sm:items-stretch px-6 max-w-[1440px] mx-auto py-4 sm:h-[122px]">
        {/* Menú */}
        <div className="w-full sm:w-1/3 flex justify-center items-center lg:translate-x-5 gap-12 py-3 sm:py-0">
          <span className="text-lg cursor-pointer hover:text-orange-500 transition">Home</span>
          <span className="text-lg cursor-pointer hover:text-orange-500 lg:translate-x-6 transition ">Mangas</span>
        </div>

        {/* Logo */}
        <div className="w-full sm:w-1/3 flex justify-center items-center py-3 sm:py-0">
          <img src={logoSmall} alt="Logo de Minga" className="h-12" />
        </div>

        {/* Redes + Botón */}
        <div className="w-full sm:w-1/3 flex flex-col justify-center items-center gap-3 py-3 sm:py-0">
          <div className="flex gap-8">
            <FaFacebookF className="text-black text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaTwitter className="text-black text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaVimeoV className="text-black text-xl cursor-pointer hover:text-orange-600 transition" />
            <FaYoutube className="text-black text-xl cursor-pointer hover:text-orange-600 transition" />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-12 py-2 rounded-md flex items-center gap-2 transition">
            Donate <FaHeart />
          </button>
        </div>
      </div>
    </footer>
  );
}
