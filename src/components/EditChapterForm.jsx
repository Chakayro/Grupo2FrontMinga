// src/components/EditChapterForm.jsx
import React from 'react';

const ChevronDownIcon = () => (
  <svg className="w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"> {/* Reducido w-3 h-3 */}
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);

function EditChapterForm({ comicCoverImageUrl }) {
  const chapterDetails = {
    mangaName: "",
    selectedChapter: "",
    selectedDataField: "",
    dataToEdit: "",
    comicTitleAboveImage: "Chapter #1 - Discover the word"
  };

  return (
    // Reducimos max-w y py para un componente más compacto en general
    <div className="w-full max-w-3xl py-1"> {/* Antes max-w-3xl, py-2 */}
      {/*
        md:items-stretch para que las columnas intenten tener la misma altura.
        md:justify-between para que haya espacio entre ellas pero no necesariamente "around".
      */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-4 md:gap-6 lg:gap-60"> {/* Reducido gap y cambiado justify/items */}
        
        {/* Columna Izquierda: Formulario */}
        {/* Ajustamos anchos para ser un poco más de la mitad pero dejando espacio */}
        <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col space-y-1.5 order-1 md:order-1 p-1"> {/* space-y-1.5, p-1 para padding interno */}
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center md:text-left">Edit Chapter</h2> {/* Reducido tamaño y mb */}
          <div>
            <input 
              type="text" 
              defaultValue={chapterDetails.mangaName}
              placeholder="name of the manga" 
              // Reducido p-0.5, text-xs
              className="w-full p- border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg" 
            />
          </div>
          
          <div className="relative">
            <select 
              defaultValue={chapterDetails.selectedChapter}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg appearance-none pr-6" // pr-6 para ícono
            >
              <option value="" disabled>select chapter</option>
              <option value="1">Chapter 1</option>
              <option value="2">Chapter 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1.5"> {/* Reducido px */}
                <ChevronDownIcon />
            </div>
          </div>

          <div className="relative">
            <select 
              defaultValue={chapterDetails.selectedDataField}
              className="w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg appearance-none pr-6"
            >
              <option value="" disabled>select data</option>
              <option value="title">Title</option>
              <option value="pages">Pages</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1.5">
                <ChevronDownIcon />
            </div>
          </div>

          <div>
            <input 
              type="text" 
              defaultValue={chapterDetails.dataToEdit}
              placeholder="data to edit" 
              className="w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg" 
            />
          </div>
          
          {/* Botones más compactos */}
          <div className="pt-2 space-y-3"> {/* Reducido pt y space-y */}
            <button 
              type="button"
              // Reducido py, px y shadow
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-3 rounded-full transition-colors shadow-xs text-lg"
            >
              Edit
            </button>
            <button 
              type="button"
              className="w-full bg-pink-100 hover:bg-pink-200 text-red-500 font-semibold py-3 px-3 rounded-full transition-colors shadow-xs text-lg"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Columna Derecha: Imagen del Cómic */}
        {/* Ajustamos anchos. md:justify-start para alinear contenido arriba. */}
        <div className="w-full md:w-[40%] lg:w-[45%] flex flex-col items-center order-2 md:order-2 md:justify-start pt-2 md:pt-0 p-1"> {/* Reducido pt, p-1 */}
          <div className="flex flex-col items-center w-full">
            {comicCoverImageUrl && (
                // Texto más pequeño y mb-0.5
                <p className="text-[10px] sm:text-xs text-gray-600 mb-0.5 text-center">{chapterDetails.comicTitleAboveImage}</p>
            )}
            <img 
              src={comicCoverImageUrl || "https://via.placeholder.com/200x300.png?text=Cover"}
              alt="Comic Cover" 
              // Imagen más pequeña y max-w reducido. object-scale-down o object-contain.
              className="w-full max-w-[200px] sm:max-w-[230px] h-auto object-contain rounded shadow-md border border-gray-200" 
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default EditChapterForm; 