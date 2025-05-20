import React, { useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { useParams, useLocation } from 'react-router-dom';

const PageWithLoader = ({ src, alt }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-[300px] h-[550px] relative overflow-hidden">
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
  const { chapterId } = useParams();
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
      <div className="bg-white rounded-xl shadow-lg w-9/12 md:w-4/5 lg:w-3/5 h-[80vh] flex flex-col items-center justify-center">

        {/* FlipBook con escalado responsivo */}
        <HTMLFlipBook
          width={300}
          height={550}
          showCover={true}
          className="scale-[0.85] sm:scale-[0.85] md:scale-[0.90] lg:scale-100 transition-transform duration-300 ease-in-out"
        >
          {chapter.pages.map((pageUrl, index) => (
            <div key={index}>
              <PageWithLoader src={pageUrl} alt={`Page ${index + 1}`} />
            </div>
          ))}
        </HTMLFlipBook>

        {/* Info capítulo */}
        <div className="flex justify-between w-full px-4 py-2 mt-4">
          <h2 className="text-lg font-semibold text-gray-800">Manga</h2>
          <span className="text-sm text-gray-600">
            Chapter {chapter.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReaderPage;
