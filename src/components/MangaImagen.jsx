import React, { useEffect, useState } from 'react';

const MangaImagen = ({ imagenFondo, children }) => {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    // Función para detectar si es mobile/tablet
    const checkScreenSize = () => {
      setIsMobileOrTablet(window.innerWidth < 1024);
    };
    
    // Verificar tamaño inicial
    checkScreenSize();
    
    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', checkScreenSize);
    
    // Limpiar listener al desmontar
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div
      className="w-full h-screen md:h-[85vh] relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${imagenFondo})`,
        backgroundPosition: isMobileOrTablet ? 'center bottom 130px' : 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        // Aseguramos que el fondo se ajuste dentro del contenedor
        backgroundAttachment: 'local'
      }}
    >
      {children}
    </div>
  );
};

export default MangaImagen;