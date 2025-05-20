import React from 'react';
import { useParams } from 'react-router-dom';
// import SwipeComponent from '../../components/SwipeComponent'; // Importa tu componente Swipe personalizado o librería

const ReaderPage = () => {
  const { chapterId } = useParams(); // Suponiendo que pasas el ID del capítulo por la URL

  return (
    <div className="min-h-screen bg-orange-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-11/12 md:w-4/5 lg:w-3/4 h-[80vh] flex flex-col items-center justify-center">
        {/* Aquí irá el componente Swipe */}
        {/* <SwipeComponent chapterId={chapterId} /> */}
        <p className="text-gray-700">Contenido del lector para el capítulo: {chapterId}</p>
        <p className="text-sm text-gray-500">(Reemplaza este texto con el componente Swipe)</p>
      </div>
    </div>
  );
};

export default ReaderPage;