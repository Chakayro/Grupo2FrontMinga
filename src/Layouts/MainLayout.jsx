// src/Layouts/MainLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useMediaQuery from "../hooks/useMediaQuery"; // Asegúrate que la ruta a este hook sea correcta

// --- Iconos ---
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0m0 0-6-6m6 6 6-6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-orange-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5V4.5m0 0m0 0-6 6m6-6 6 6" />
  </svg>
);

// --- Constantes de Configuración de Transición (solo para desktop/lg) ---
const PAGE_TRANSITION_MS = 300; 
const NAV_BTN_FADE_MS = 300;    
const NAV_BTN_REAPPEAR_DELAY_MS = 50; 
const BTN_DELAY_TO_BOTTOM_ON_FOOTER_TO_CONTENT = 500;
const BTN_DELAY_TO_TOP_ON_CONTENT_TO_FOOTER = PAGE_TRANSITION_MS - 100; 

const MainLayout = () => {
  const isLargeScreen = useMediaQuery('(min-width: 1024px)'); 

  const [activeSection, setActiveSection] = useState('content'); 
  const [btnPositionClass, setBtnPositionClass] = useState('bottom-5 sm:bottom-8');
  const [isBtnVisible, setIsBtnVisible] = useState(true); 
  
  const btnActionTimer = useRef(null);

  const toggleView = () => {
    if (!isLargeScreen) return; 
    
    setIsBtnVisible(false); 
    setActiveSection(prev => (prev === 'content' ? 'footer' : 'content'));
  };
  
  useEffect(() => {
    // Lógica del botón de navegación y su animación, solo para pantallas grandes.
    if (!isLargeScreen) {
      setIsBtnVisible(false); // El botón no es visible en pantallas pequeñas
      if (btnActionTimer.current) {
        clearTimeout(btnActionTimer.current);
      }
      // Resetea la vista a 'content' si se encoge la pantalla para evitar estados extraños
      setActiveSection('content'); 
      setBtnPositionClass('bottom-5 sm:bottom-8'); 
      return; 
    }

    // Si es pantalla grande, procede con la lógica de animación del botón
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
  }, [activeSection, isLargeScreen]); // Dependencias del efecto


  const navBtnIcon = activeSection === 'content' ? <ArrowDownIcon /> : <ArrowUpIcon />;
  const navBtnLabel = activeSection === 'content' ? 'Ir al footer' : 'Volver al contenido';

  // --- Renderizado Condicional basado en isLargeScreen ---
  if (isLargeScreen) {
    // --- VISTA PANTALLA GRANDE (lg y superior): Con transición a pantalla completa ---
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

        {/* Botón de Navegación (solo para pantallas grandes) */}
        <button
          onClick={toggleView}
          className={`absolute ${btnPositionClass} right-6 sm:right-8 md:right-10 lg:right-12 
                     z-30 p-2 flex items-center justify-center 
                     hover:bg-black hover:bg-opacity-20 
                     rounded-full cursor-pointer 
                     transition-all duration-${NAV_BTN_FADE_MS} ease-in-out
                     ${isBtnVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          aria-label={navBtnLabel}
        >
          {navBtnIcon}
        </button>
      </div>
    );
  } else {
    // --- VISTA MÓVIL Y TABLET (inferior a lg): Layout de scroll normal ---
    return (
      // Este div permite que la página crezca y haga scroll si el contenido es más alto que la pantalla.
      // No debe tener overflow-hidden.
      <div className="flex flex-col min-h-screen bg-gray-100"> 
        <Navbar />
        {/* flex-grow permite que esta sección principal ocupe el espacio disponible.
            El scroll vertical de la página ocurrirá si el contenido del Outlet es muy largo. */}
        <main className="flex-grow w-full"> 
          <Outlet />
        </main>
        <Footer /> {/* El Footer aparecerá después del contenido principal. */}
      </div>
    );
  }
};

export default MainLayout;
