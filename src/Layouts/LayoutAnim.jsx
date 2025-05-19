// src/Layouts/MainLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// --- Iconos (con mayor grosor) ---
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10 text-orange-500"> {/* Aumentado strokeWidth */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0m0 0-6-6m6 6 6-6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={4} stroke="currentColor" className="w-10 h-10 text-orange-500"> {/* Aumentado strokeWidth */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5V4.5m0 0m0 0-6 6m6-6 6 6" />
  </svg>
);

// --- Constantes de Configuración de Transición ---
const PAGE_TRANSITION_MS = 300; 
const NAV_BTN_FADE_MS = 300;    
const NAV_BTN_REAPPEAR_DELAY_MS = 50; 
const BTN_DELAY_TO_BOTTOM_ON_FOOTER_TO_CONTENT = 500;
const BTN_DELAY_TO_TOP_ON_CONTENT_TO_FOOTER = PAGE_TRANSITION_MS - 100; 

const LayoutAnim = () => {


  const [activeSection, setActiveSection] = useState('content'); 
  const [btnPositionClass, setBtnPositionClass] = useState('bottom-5 sm:bottom-8');
  const [isBtnVisible, setIsBtnVisible] = useState(true); 
  
  const btnActionTimer = useRef(null);

  const toggleView = () => {
    // La funcionalidad de toggle ahora está activa en todos los tamaños de pantalla
    setIsBtnVisible(false); 
    setActiveSection(prev => (prev === 'content' ? 'footer' : 'content'));
  };
  
  useEffect(() => {
    // Lógica del botón de navegación y su animación para todas las pantallas.
    if (btnActionTimer.current) {
      clearTimeout(btnActionTimer.current);
    }

    const newPosition = activeSection === 'content' ? 'bottom-5 sm:bottom-8' : 'top-5 sm:top-8';
    const delayForReposition = activeSection === 'content' ? BTN_DELAY_TO_BOTTOM_ON_FOOTER_TO_CONTENT : BTN_DELAY_TO_TOP_ON_CONTENT_TO_FOOTER;

    btnActionTimer.current = setTimeout(() => {
      setBtnPositionClass(newPosition);
      setTimeout(() => { 
        setIsBtnVisible(true); 
      }, NAV_BTN_REAPPEAR_DELAY_MS);
    }, delayForReposition);

    return () => {
      if (btnActionTimer.current) {
        clearTimeout(btnActionTimer.current);
      }
    };
  }, [activeSection]); // Ya no depende de isMediumScreenAndUp para su lógica principal

  const navBtnIcon = activeSection === 'content' ? <ArrowDownIcon /> : <ArrowUpIcon />;
  const navBtnLabel = activeSection === 'content' ? 'Ir al footer' : 'Volver al contenido';

  // --- Layout único para todas las pantallas con transición ---
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100"> {/* overflow-hidden aquí es para el efecto de pantalla completa */}
      {/* Sección de Contenido Principal */}
      <div 
        style={{ zIndex: activeSection === 'content' ? 10 : 0 }}
        className={`absolute inset-0 w-full h-full transition-transform duration-${PAGE_TRANSITION_MS} ease-in-out transform
                    ${activeSection === 'content' 
                        ? 'translate-y-0 pointer-events-auto' 
                        : '-translate-y-full pointer-events-none' 
                    } flex flex-col`}
      >
        <Navbar />
        {/* overflow-y-auto aquí permite scroll DENTRO de esta sección si el contenido del Outlet es muy largo */}
        <main className="flex-grow overflow-y-auto"> 
          <Outlet />
        </main>
      </div>

      {/* Sección del Footer */}
      <div 
        style={{ zIndex: activeSection === 'footer' ? 10 : 0 }}
        className={`absolute inset-0 w-full h-full transition-transform duration-${PAGE_TRANSITION_MS} ease-in-out transform 
                    ${activeSection === 'footer' 
                        ? 'translate-y-0 pointer-events-auto' 
                        : 'translate-y-full pointer-events-none'
                    }
                    bg-gray-100 flex flex-col`}
      >
        <div className="w-full mt-auto">
          <Footer /> 
        </div>
      </div>

      {/* Botón de Navegación (ahora para todas las pantallas) */}
      <button
        onClick={toggleView}
        className={`
          absolute ${btnPositionClass}
          z-30 p-3 flex items-center justify-center 
          hover:bg-black hover:bg-opacity-20 
          rounded-full cursor-pointer 
          transition-all ease-in-out
          duration-${NAV_BTN_FADE_MS} // Manteniendo tu sintaxis para la duración
          ${isBtnVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          left-1/2 -translate-x-1/2 md:left-auto md:right-20 md:-translate-x-0 // Centrado en móvil, a la derecha en md+
        `}
        aria-label={navBtnLabel}
      >
        {navBtnIcon}
      </button>
    </div>
  );
};

export default LayoutAnim;