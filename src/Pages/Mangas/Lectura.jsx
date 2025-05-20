import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import {useLocation } from 'react-router-dom';
import logo2 from '../../assets/logo2.png';

const PageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-[340px] h-[440px] relative overflow-hidden">
      {/* Imagen */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoading(false)}
        className={`w-full h-[full] object-contain transition-opacity duration-300 ${
          loading ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Spinner superpuesto sin afectar layout */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

const ReaderPage = () => {
  const { state } = useLocation();
  const chapter = state?.chapter;

  if (!chapter) {
    return (
      <div className="text-white text-center mt-10">
        <p>Error: No se encontró información del capítulo.</p>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen bg-black flex items-center justify-center">
         {/* Info capítulo */}
        <div className="absolute md:rotate-270 md:bottom-1/2 lg:left-20 md:left-10 md:scale-200 
        rotate-0 bottom-5 scale-100">
          <img src={logo2} className='w-25' alt="logo minga" />
          <span className="text-sm text-gray-600">
            Chapter {chapter.title}
          </span>
        </div>
      <div className="bg-white rounded-xl shadow-lg w-9/12 md:w-3/6 lg:w-3/5 h-[73vh] lg:h-[88vh] md:h-[75vh] flex flex-col items-center justify-center">

        {/* FlipBook con escalado responsivo */}
        <HTMLFlipBook
          width={330}
          height={440}
          showCover={true}
          className=" scale-[0.85] md:scale-[0.95] lg:scale-122 transition-transform duration-300 ease-in-out mt-10"
        >
          {chapter.pages.map((pageUrl, index) => (
            <div key={index}>
              <PageWithLoader src={pageUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>
          <div className='h-2 p-5'></div>
       
      </div>
    </div>
  );
};

export default ReaderPage;
