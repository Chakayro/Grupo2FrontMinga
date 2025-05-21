import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaPencilAlt } from 'react-icons/fa'; // Importa los iconos de React-Icons

const MangaCard = ({
  title,
  cover_photo,
  categories,
  category_id,
  manga = {},
  showActions = false, // Ahora esta prop controla los 4 botones o solo el "Read"
}) => {
  const category =
    categories?.find(
      (cat) =>
        (cat.category_id || "").toLowerCase() ===
        (category_id || manga.category_id?.name?.toLowerCase() || "")
    ) || categories?.[0];

  const [isVertical, setIsVertical] = useState(false);

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsVertical(naturalHeight > naturalWidth);
  };

  return (
    <div
      className="h-[25vh] w-[70vw] bg-white rounded-lg flex items-center shadow-md overflow-hidden 
                   md:h-[23vh] md:w-[40vw] lg:h-[30vh] lg:w-[35vw] xl:h-[35vh] 2xl:h-[34vh] 2xl:w-[33vw] relative"
    >
      {/* Barra de color vertical */}
      {category?.color && category.color.startsWith("#") ? (
        <div className="h-[60%] w-2" style={{ background: category.color }} />
      ) : (
        <div className={`h-[60%] w-2 ${category?.color || ""}`} />
      )}

      {/* --- BOTONES SUPERIORES (Agregar/Editar Capítulo) - Condicional con showActions --- */}
      {showActions && ( // Se muestran SÓLO si showActions es true
        <div className="absolute top-2 left-2 flex ml-3 gap-2 z-10">
          <Link
            to={`/createChapter/${manga._id}`}
            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            title="Agregar Capítulo"
          >
            <FaPlus className="w-4 h-4" />
          </Link>
          <Link
            to={`/editChapter/${manga._id}`}
            className="p-1 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
            title="Editar Capítulo"
          >
            <FaPencilAlt className="w-4 h-4" />
          </Link>
        </div>
      )}
      {/* --- FIN BOTONES SUPERIORES --- */}


      {/* Contenido principal (texto y botones inferiores) */}
      <div className="flex-1 flex flex-row items-center pl-3 py-2 w-[95%]">
        <div className="flex-1 flex flex-col h-full text-left gap-y-4">
          <div className="flex-grow overflow-hidden">
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-gray-900 line-clamp-2 my-2">
              {title || manga.title}
            </p>
            <span
              className={`text-sm md:text-sm lg:text-md font-medium `}
              style={
                category?.color && category.color.startsWith("#")
                  ? { color: category.color }
                  : {}
              }
            >
              {category?.category_id}
            </span>
          </div>

          {/* Bloque de botones inferiores (Read o Editar/Eliminar) - Condicional con showActions */}
          <div className="mt-auto">
            {showActions ? ( // Se muestran SÓLO si showActions es true
              <div className="flex flex-row gap-2">
                <Link
                  to={`/editManga/${manga._id}`}
                  className="flex-1 flex items-center justify-center bg-purple-200 text-purple-700 font-semibold px-2 py-1 rounded-full hover:bg-purple-300 transition text-sm md:text-base"
                >
                  Editar
                </Link>
                <button
                  onClick={() => alert(`Borrar manga con ID: ${manga._id}`)}
                  //to={`/Detailsmanga/${manga._id}`} --->>cambia onclick por to path para redirigir a una pagina
                  className="flex-1 flex items-center justify-center bg-red-200 text-red-700 font-semibold px-2 py-1 rounded-full hover:bg-red-300 transition text-sm md:text-base"
                >
                  Borrar
                </button>
              </div>
            ) : ( // Si showActions es false, muestra solo el botón Read
              <Link
                to={`/Detailsmanga/${manga._id}`}
                state={{ mangaLocal: manga }}
                className="w-[50%] flex items-center justify-center bg-green-200 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-400 transition"
              >
                Read
              </Link>
            )}
          </div>
        </div>
        {/* Contenedor de la imagen */}
        <div className="h-full w-[50%] overflow-hidden rounded-l-full flex items-center justify-end">
          <img
            src={cover_photo || manga.cover_photo}
            alt={title || manga.title}
            onLoad={handleImageLoad}
            className={
              isVertical
                ? "h-full w-[170px]  lg:w-[250px] object-cover translate-y-5"
                : "h-full min-w-[290px] lg:min-w-[450px] object-cover translate-x-10 lg:translate-x-28"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MangaCard;