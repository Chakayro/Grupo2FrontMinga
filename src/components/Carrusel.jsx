// components/Carrusel.jsx
import React from 'react';

const Carrusel = ({ items }) => {
  return (
    <div className="w-full max-w-[1440px] mx-auto py-6 px-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, i) => (
        <div key={i} className="bg-gradient-to-r from-orange-500 to-orange-300 rounded-xl p-6 flex items-center justify-between text-white">
          <img src={item.imagen} alt={item.titulo} className="h-40 object-contain" />
          <div className="ml-4">
            <h3 className="text-2xl font-bold">{item.titulo}</h3>
            <p className="mt-2 text-sm">{item.descripcion}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Carrusel;
