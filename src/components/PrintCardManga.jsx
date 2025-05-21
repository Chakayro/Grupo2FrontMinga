import { useState } from "react";
import { Link } from "react-router-dom";

// Recibe props individuales para máxima reutilización
const MangaCard = ({
  title,
  cover_photo,
  categories,
  category_id,
  manga = {}, // opcional, para compatibilidad
}) => {
  // Buscar la categoría correspondiente
  const category =
    categories?.find(
      (cat) =>
        (cat.category_id || "").toLowerCase() ===
        (category_id || manga.category_id?.name?.toLowerCase() || "")
    ) || categories?.[0];

  // Estado para el formato de la imagen
  const [isVertical, setIsVertical] = useState(false);

  // Detecta el formato al cargar la imagen
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsVertical(naturalHeight > naturalWidth);
  }; 
  return (
    <div
      className="h-[25vh] w-[70vw] bg-white rounded-lg flex items-center shadow-md overflow-hidden 
                    md:h-[23vh] md:w-[40vw] lg:h-[30vh] lg:w-[35vw] xl:h-[35vh] 2xl:h-[34vh] 2xl:w-[33vw]"
    >
      {/* Barra de color vertical */}
      {category?.color && category.color.startsWith("#") ? (
        <div className="h-[60%] w-2" style={{ background: category.color }} />
      ) : (
        <div className={`h-[60%] w-2 ${category?.color || ""}`} />
      )}
      {/* Contenido principal */}
      <div className="flex-1 flex flex-row items-center pl-3 py-2 w-[95%]">
        <div className="flex-1 flex flex-col justify-between h-full text-left">
          <div>
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
        <Link
            to={`/Detailsmanga/${manga._id}`}
            state={{ mangaLocal: manga }}
            className="w-[50%] flex items-center justify-center bg-green-200 text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-400 transition mt-4 translate-y-20"
          >
            Read
          </Link>

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
