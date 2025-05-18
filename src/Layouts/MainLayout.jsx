// src/Layouts/MainLayout.jsx
import React, { useState, useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Iconos de Flecha Modificados (más gruesos, con "palo", y color definido aquí)
const ArrowDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-orange-500"> {/* strokeWidth=3, text-orange-500 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0m0 0-6-6m6 6 6-6" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10 text-orange-500"> {/* strokeWidth=3, text-orange-500 */}
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5V4.5m0 0m0 0-6 6m6-6 6 6" />
  </svg>
);

const SECTION_TRANSITION_DURATION = 700;
const BUTTON_APPEAR_DELAY = 50;
const DELAY_FOOTER_TO_CONTENT_BUTTON_REPOSITION = 500; 
const DELAY_CONTENT_TO_FOOTER_BUTTON_REPOSITION = SECTION_TRANSITION_DURATION - 100;

const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('content');
  const [navButtonPositionClass, setNavButtonPositionClass] = useState('bottom-5 sm:bottom-8');
  const [isNavButtonVisible, setIsNavButtonVisible] = useState(true);
  
  const positionTimerRef = useRef(null);
  const visibilityTimerRef = useRef(null);

  const handleToggleSection = () => {
    setIsNavButtonVisible(false);
    setActiveSection(prev => (prev === 'content' ? 'footer' : 'content'));
  };
  
  useEffect(() => {
    if (positionTimerRef.current) clearTimeout(positionTimerRef.current);
    if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);

    if (activeSection === 'content') {
      positionTimerRef.current = setTimeout(() => {
        setNavButtonPositionClass('bottom-5 sm:bottom-8');
        visibilityTimerRef.current = setTimeout(() => {
          setIsNavButtonVisible(true);
        }, BUTTON_APPEAR_DELAY);
      }, DELAY_FOOTER_TO_CONTENT_BUTTON_REPOSITION);
    } else { 
      positionTimerRef.current = setTimeout(() => {
        setNavButtonPositionClass('top-5 sm:top-8');
        visibilityTimerRef.current = setTimeout(() => {
          setIsNavButtonVisible(true);
        }, BUTTON_APPEAR_DELAY);
      }, DELAY_CONTENT_TO_FOOTER_BUTTON_REPOSITION);
    }

    return () => {
      if (positionTimerRef.current) clearTimeout(positionTimerRef.current);
      if (visibilityTimerRef.current) clearTimeout(visibilityTimerRef.current);
    };
  }, [activeSection]);


  const isContentActiveCurrentRender = activeSection === 'content';
  const navButtonIcon = isContentActiveCurrentRender ? <ArrowDownIcon /> : <ArrowUpIcon />;
  const navButtonAriaLabel = isContentActiveCurrentRender ? 'Ir al footer' : 'Volver al contenido';

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-gray-100">
      
      <div 
        style={{ zIndex: isContentActiveCurrentRender ? 10 : 0 }}
        className={`absolute inset-0 w-full h-full transition-transform duration-${SECTION_TRANSITION_DURATION} ease-in-out transform
                    ${isContentActiveCurrentRender 
                        ? 'translate-y-0 pointer-events-auto' 
                        : '-translate-y-full pointer-events-none' 
                    } flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow overflow-y-auto">
          <Outlet />
        </main>
      </div>

      <div 
        style={{ zIndex: !isContentActiveCurrentRender ? 10 : 0 }}
        className={`absolute inset-0 w-full h-full transition-transform duration-${SECTION_TRANSITION_DURATION} ease-in-out transform 
                    ${!isContentActiveCurrentRender 
                        ? 'translate-y-0 pointer-events-auto' 
                        : 'translate-y-full pointer-events-none'
                    }
                    bg-gray-100 flex flex-col`}
      >
        <div className="w-full mt-auto">
          <Footer /> 
        </div>
      </div>

      <button
        onClick={handleToggleSection}
        className={`absolute ${navButtonPositionClass} left-11/12 transform -translate-x-1/2  // Ajustada posición horizontal: left-11/12 y -translate-x-1/2 (o -translate-x-full si es necesario)
                   z-30 p-3 flex items-center justify-center  // Reducido p-2 para un círculo hover más ajustado al ícono
                   text-orange-500  // Color de la flecha por defecto (ya se define en SVG, pero por si acaso)
                   hover:bg-black hover:bg-opacity-25  // Fondo solo en hover, opacidad ajustada
                   rounded-full cursor-pointer 
                   transition-all duration-300 ease-in-out
                   ${isNavButtonVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-label={navButtonAriaLabel}
      >
        {navButtonIcon}
      </button>
    </div>
  );
};

export default MainLayout;