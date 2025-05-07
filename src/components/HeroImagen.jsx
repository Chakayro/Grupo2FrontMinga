import React from 'react';

const HeroImagen = ({ imagenFondo, children }) => {
  return (
    <div
      className="w-full aspect-[1440/644] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${imagenFondo})` }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default HeroImagen;

