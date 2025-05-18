// src/components/EditChapterForm.jsx
import React from 'react';

const ChevronDownIcon = () => (
  <svg className="w-3 h-3 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
  </svg>
);

function EditChapterForm({ comicCoverImageUrl }) {
  const chapterDetails = {
    mangaName: "",
    // Nuevo campo añadido:
    titleOfTheChapter: "", // Para el nuevo input
    selectedChapter: "",
    selectedDataField: "",
    dataToEdit: "",
    comicTitleAboveImage: "Chapter #1 - Discover the word"
  };

  // Clases para los inputs del formulario en PC (se mantienen)
  const pcFormInputClasses = "w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-lg";
  // Clases para los botones en PC (se mantienen)
  const pcButtonClasses = "w-full font-semibold py-3 px-3 rounded-full transition-colors shadow-xs text-lg";


  return (
    // Contenedor general del componente, el ancho máximo para PC se mantiene.
    <div className="w-8/12 md:w-full max-w-3xl py-1"> 
      {/* Contenedor Flex principal:
        - Móvil (default): flex-col (un elemento encima del otro).
        - PC (md:): flex-row, justify-between (espacio entre las columnas), items-stretch (ambas columnas toman la altura de la más alta).
        - Gaps se mantienen como en tu código.
      */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-stretch gap-4 md:gap-6 lg:gap-60">
        
        {/* Columna Izquierda: Formulario */}
        {/* Anchos de columna para PC se mantienen. El orden también. */}
        <div className="w-full md:w-[55%] lg:w-[50%] flex flex-col space-y-1.5 order-1 md:order-1 p-1">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-7 text-center md:text-left">Edit Chapter</h2>
          
          <div>
            <input 
              type="text" 
              defaultValue={chapterDetails.mangaName}
              placeholder="name of the manga" 
              // Aplicamos las clases de PC. El padding 'p-' que estaba vacío se corrige a p-2.
              className={pcFormInputClasses} 
            />
          </div>

          {/* NUEVO CAMPO AÑADIDO */}
          <div>
            <input 
              type="text" 
              defaultValue={chapterDetails.titleOfTheChapter}
              placeholder="title of the chapter" 
              className={pcFormInputClasses} 
            />
          </div>
          
          <div className="relative">
            <select 
              defaultValue={chapterDetails.selectedChapter}
              className={`${pcFormInputClasses} appearance-none pr-6`} // Mantenemos pr-6 para el ícono
            >
              <option value="" disabled>select chapter</option>
              <option value="1">Chapter 1</option>
              <option value="2">Chapter 2</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-1.5">
              <ChevronDownIcon />
            </div>
          </div>

          <div className="relative">
            <select 
              defaultValue={chapterDetails.selectedDataField}
              className={`${pcFormInputClasses} appearance-none pr-6`}
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
              className={pcFormInputClasses} 
            />
          </div>
          
          {/* Botones: espaciado y clases de PC se mantienen */}
          <div className="pt-2 space-y-3">
            <button 
              type="button"
              className={`${pcButtonClasses} bg-teal-400 hover:bg-teal-500 text-white`}
            >
              Edit
            </button>
            <button 
              type="button"
              className={`${pcButtonClasses} bg-pink-100 hover:bg-pink-200 text-red-500`}
            >
              Delete
            </button>
          </div>
        </div>

        {/* Columna Derecha: Imagen del Cómic */}
        {/* Ancho de columna para PC se mantiene. 
            La clase 'hidden md:flex' asegura que sea visible en PC y se comporte como un contenedor flex.
            'md:justify-start' alinea el contenido (texto e imagen) arriba dentro de esta columna.
            items-center centrará horizontalmente el contenido de la imagen.
        */}
        <div className="w-full md:w-[50%] flex flex-col items-center order-2 md:order-2 md:justify-start pt-2 md:pt-0 hidden md:flex"> {/* Cambiado md:block a md:flex */}
          <div className="flex flex-col items-center w-full h-full"> {/* w-full y h-full para que el contenido pueda usar el espacio estirado */}
            {comicCoverImageUrl && (
              <p className="text-[10px] sm:text-xs text-gray-600 mb-1 text-center">{chapterDetails.comicTitleAboveImage}</p> // Aumentado mb-1
            )}
            <img 
              src={comicCoverImageUrl || "https://via.placeholder.com/300x450.png?text=Cover+Preview"} // Placeholder más alto
              alt="Comic Cover" 
              // Para que la imagen llene la altura disponible por 'items-stretch' en el padre:
              // - w-full (de su columna)
              // - h-full (para intentar llenar la altura de la columna) o h-auto (para mantener proporción con w-full)
              // - object-contain para asegurar que toda la imagen sea visible.
              // - max-w- se mantiene para limitar el ancho en PC y que no se distorsione demasiado.
              className="w-full max-w-xs sm:max-w-sm md:max-w-full h-auto md:h-full object-contain rounded shadow-md border border-gray-200" 
              // md:max-w-full para que use el ancho de su columna en PC
              // md:h-full para que intente usar la altura estirada. Si la imagen es muy ancha, object-contain la ajustará.
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default EditChapterForm;
