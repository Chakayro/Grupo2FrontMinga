import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoryButton from "../../components/CategoryButton";
import ReactionButtons from "../../components/ReactionButtons ";
import TabsManga from "../../components/TabsManga";
import ChapterPage from "../../components/ChapterPage";



const DetailsMangas = () => {
  const { id } = useParams();
  const { chapters } = useSelector((state) => state.chapters);
  const { mangas } = useSelector((state) => state.mangas);

  // Encontrar el capítulo y el manga correspondientes
  const chapter = chapters.find((ch) => ch._id === id);
  const manga = mangas.find((m) =>
    chapter ? m._id === chapter.manga_id : null
  ); // Encuentra el manga basado en el manga_id del capítulo

  console.log("Capitulo seleccionado:", chapter);
  console.log("Manga seleccionado:", manga);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleRead = (imageUrl) => {
    // Aquí puedes implementar la lógica para abrir la imagen en un visor de pantalla completa
    console.log("Opening image:", imageUrl);
    // Por ejemplo, puedes usar una ventana modal o una nueva pestaña
    window.open(imageUrl, "_blank"); //abre la imagen en una nueva pestaña
  };

  if (!chapter) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <span className="text-gray-500 text-lg">Capítulo no encontrado.</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center py-16 ">
      <div className="p-2 rounded-2xl shadow-xl w-[400px] md:w-[500px] lg:w-[700px] flex flex-col gap-4">
        {/* Imagen */}
        <div className="w-full flex justify-center">
          <img
            src={chapter.cover_photo}
            alt={chapter.title}
            className="rounded-xl object-cover object-top w-[100%] h-[60vh] shadow"
          />
        </div>
        {/* Título */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-2">
          <h2 className="text-3xl md:text-4xl  text-gray-900">{chapter.title}</h2>
        </div>
        {/* Categoría y compañía */}
        <div className="flex items-center justify-between gap-2 mt-1">
          {manga?.category_id && ( // Verifica si manga y category_id existen
            <CategoryButton
              category_id={manga.category_id.name?.toLowerCase() || ""}
              label={manga.category_id.name}
              color={manga.category_id.color}
              activeColor={manga.category_id.hover}
              active={false}
              onClick={() => {}}
            />
          )}
          {manga?.company_id?.name ? (  // Usar manga para obtener el nombre de la compañía o autor
            <span className="text-md md:text-lg font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
              Compañía: {manga.company_id.name}
            </span>
          ) : manga?.author_id?.name ? (
            <span className="text-md md:text-lg font-semibold px-3 py-1 rounded-full bg-amber-100 text-amber-700">
              Autor: {manga.author_id.name}
            </span>
          ) : (
            <span className="text-gray-400 text-md md:text-lg font-semibold">
              Sin autor o compañía
            </span>
          )}
        </div>
        {/* Reacciones */}
        <ReactionButtons
          counts={{ 1: 3, 2: 0, 3: 1, 4: 0 }}
          onReact={(reactionId, action, count) => {
            // Aquí puedes usar reactionId, action ("add"/"remove") y el nuevo count
            // Por ejemplo: api.updateReaction(mangaId, reactionId, action, count)
          }}
        />
        {/* Stats */}
        <div className="flex items-center justify-evenly bg-white rounded-xl px-6 py-3 mt-2">
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-800">4.5/5</span>
            <span className="text-xs text-gray-400">Rating</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-800 border-l-2 border-r-2 border-gray-200 px-12 md:px-20 py-1">
              265
            </span>
            <span className="text-xs text-gray-400">Chapters</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-bold text-lg text-gray-800">Eng</span>
            <span className="text-xs text-gray-400">Language</span>
          </div>
        </div>
        {/* Pestaña */}
        <TabsManga
          tabs={[
            {
              label: "Manga",
              content: (
                <div className="mt-4 p-2">
                  <p className="text-gray-700 text-base text-justify">
                    {manga?.description || "No description available"}
                  </p>
                </div>
              ),
            },
            {
              label: "Chapters",
              content: (
                <div className="mt-4 p-2">
                  {/* Aquí tu lista de capítulos */}
                  {chapter.pages && chapter.pages.length > 0 ? (
                    <div className="space-y-2">
                      {chapter.pages.map((page, index) => (
                        <ChapterPage
                          key={index}
                          page={index}
                          imageUrl={chapter.cover_photo}
                          onRead={handleRead}
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-700">No pages found for this chapter.</p>
                  )}
                </div>
              ),
            },
          ]}
        />
      </div>
    </div>
  );
};

export default DetailsMangas;

