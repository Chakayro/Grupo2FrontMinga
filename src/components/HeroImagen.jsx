  import React from 'react';

  const HeroImagen = ({ imagenFondo, children }) => {
    return (
      <div
        className="w-full h-screen md:h-[85vh]  bg-cover bg-center relative "
        style={{ backgroundImage: `url(${imagenFondo})` }}
      >
          {children}
      
      </div>
    );
  };

  export default HeroImagen;