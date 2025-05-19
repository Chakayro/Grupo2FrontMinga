// src/styles/formStyles.js
import React from 'react'; // Necesario para los componentes funcionales con JSX

// Inputs y Selects
export const formInputClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
export const formSelectClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm appearance-none pr-8 text-gray-500";
export const formTextareaClasses = "w-full p-1.5 pl-1 border-2 border-gray-300 rounded-md focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400 h-24 resize-none";

// Botones
const formButtonBaseClasses = "w-full font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
export const primaryButtonClasses = `${formButtonBaseClasses} bg-orange-500 hover:bg-orange-600 text-white`;
export const tealButtonClasses = `${formButtonBaseClasses} bg-teal-400 hover:bg-teal-500 text-white`;
export const pinkButtonClasses = `${formButtonBaseClasses} bg-pink-100 hover:bg-pink-200 text-red-500`;

// Títulos y Contenedores de Formularios (para móvil principalmente)
export const pageTitleClasses = "text-2xl font-bold text-gray-800 text-center mb-6 sm:mb-8";
export const formContainerMobileClasses = "w-full max-w-xs space-y-5";

// Imágenes de Avatar/Logo
export const avatarImageClasses = "w-24 h-24 rounded-full object-contain shadow-md mb-6 border-2 border-gray-300 bg-white p-2";

// Iconos
export const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

export const AvatarPlaceholderIcon = () => (
    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

export const CompanyLogoPlaceholder = () => (
    <svg className="w-full h-full text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);
