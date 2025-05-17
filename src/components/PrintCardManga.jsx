import React, { useState } from "react";

const textColorMap = {
  "bg-gray-300": "text-gray-500",
  "bg-red-200": "text-red-500",
  "bg-orange-200": "text-orange-500",
  "bg-green-200": "text-green-500",
  "bg-blue-200": "text-blue-500",
};

// Recibe el objeto manga y el array de categorías para buscar el color
const MangaCard = ({ manga, categories }) => {
  const category = categories.find(
    (cat) => cat.label.toLowerCase() === manga.category_id.toLowerCase()
  ) || categories[0];

  const textColor = textColorMap[category.color] || "text-gray-500";

  // Estado para el formato de la imagen
  const [isVertical, setIsVertical] = useState(false);

  // Detecta el formato al cargar la imagen
  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    setIsVertical(naturalHeight > naturalWidth);
  };

  return (
    <div className="h-[25vh] w-[75vw] bg-white rounded-lg flex items-center shadow-md overflow-hidden">
      {/* Barra de color vertical */}
      <div className={`h-[60%] w-2 ${category.color}`} />
      {/* Contenido principal */}
      <div className="flex-1 flex flex-row items-center pl-3 py-2 w-[95%]">
        <div className="flex-1 flex flex-col justify-between h-full text-left">
          <p className="text-md font-semibold text-gray-900 line-clamp-2">{manga.title}</p>
          <p className="text-sm font-semibold text-gray-900 line-clamp-2">{manga.description}</p>
          <span className={`text-xs font-medium ${textColor} mt-1`}>
            {category.label}
          </span>
        </div>
        {/* Contenedor de la imagen */}
        <div className="h-full w-[50%] overflow-hidden rounded-l-full flex items-center justify-end">
          <img
            src={manga.cover_photo}
            alt={manga.title}
            onLoad={handleImageLoad}
            className={
              isVertical
                ? "h-full w-[170px] object-cover translate-y-7"
                : "h-full min-w-[290px] object-cover translate-x-10"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MangaCard;