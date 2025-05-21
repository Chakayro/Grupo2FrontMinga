import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangasByAuthorId } from "../../../store/actions/mangaAction"; 
import MangaImagen from "../../../components/MangaImagen";
import BackgroundMangas from "../../../assets/mangasgeneral.png";
import CategoryButton from "../../../components/CategoryButton";
import MangaCard from "../../../components/PrintCardManga";
import ChatBubble from "../../../components/ChatBubble";
import goku from "../../../assets/goku.png";

const Mangas = () => {
  const dispatch = useDispatch();


  const authorMangas = useSelector((state) => state.mangas.authorMangas);
  const status = useSelector((state) => state.mangas.authorStatus);
  const error = useSelector((state) => state.mangas.authorError);
  
  console.log("Estado de Redux (authorMangas):", authorMangas);
  console.log("Estado de Redux (status):", status);
  console.log("Estado de Redux (error):", error);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);


  // Esto previene errores si inicialmente es `null` o `undefined`.

  const mangasToUse = Array.isArray(authorMangas) ? authorMangas : [];

  // Filtrado cruzado por categoría y texto - AHORA USA `mangasToUse`
  const filteredMangas = mangasToUse.filter((manga) => {

    const matchesCategory =
      selectedCategory === "all" ||
      manga.category_id?.name?.toLowerCase() === selectedCategory;

   
    const matchesText =
      (manga.title?.toLowerCase() ?? '').includes(searchText.toLowerCase())
      

    return matchesCategory && matchesText;
  });

  useEffect(() => {
    let timer;
    if (filteredMangas.length === 0) {
      timer = setTimeout(() => {
        setShowNoResults(true);
      }, 1000); // 1000ms = 1 segundo de delay
    } else {
      setShowNoResults(false);
    }
    
    // Log para depuración
    console.log("Mangas filtrados (filteredMangas):", filteredMangas);

    return () => clearTimeout(timer);
  }, [filteredMangas.length]);

  // Extraer categorías únicas de los mangas - AHORA USA `mangasToUse`
  const apiCategories = [];
  const categoryNames = new Set();

  mangasToUse.forEach((manga) => {
   
    const catName = manga.category_id?.name;
    const catColor = manga.category_id?.color;
    const catHover = manga.category_id?.hover;

   
    if (catName && !categoryNames.has(catName.toLowerCase())) {
      apiCategories.push({
        category_id: catName.toLowerCase(), 
        label: catName,                     
        color: catColor || "bg-gray-300",  
        activeColor: catHover || "bg-gray-500", 
      });
      categoryNames.add(catName.toLowerCase());
    }
  });

  // Agrega la opción "All" al principio
  const categories = [
    {
      category_id: "all",
      label: "All",
      color: "bg-gray-300",
      activeColor: "bg-gray-500",
    },
    ...apiCategories,
  ];

  useEffect(() => {
   
    if (status === 'idle' || status === 'failed') { // Solo si no ha cargado o falló
        console.log("Realizando dispatch de fetchMangasByAuthorId (sin ID).");
        dispatch(fetchMangasByAuthorId()); // No se pasa authorId
    }
  }, [dispatch, status]); 


  return (
    <>
      <ChatBubble />
      <div className="bg-gray-100 h-[85vh]">
        <MangaImagen imagenFondo={BackgroundMangas}>
          <div className="absolute inset-0 flex flex-col items-center justify-start lg:justify-center translate-y-20 lg:-translate-y-25">
            <h1 className="text-5xl font-bold text-white">Mangas</h1>
            <input
              type="text"
              placeholder="🔍Find your manga here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-[73vw] max-w-4xl px-6 py-3 rounded-lg bg-white text-gray-700 text-lg shadow focus:outline-none translate-y-10 md:translate-y-10"
            />
          </div>
        </MangaImagen>
      </div>

      <div className="relative z-10 w-full min-h-[60vh] bg-gray-200 rounded-t-[2.5rem] rounded-b-xl shadow p-4 mx-auto max-w-[100vw] -mt-60">
        <div className="contenedor-principal flex flex-col items-center gap-7">
          <div className="contenedor-categorias flex flex-row items-center justify-center gap-3 flex-wrap mb-6">
            {categories.map((cat) => (
              <CategoryButton
                key={cat.category_id}
                category_id={cat.category_id}
                label={cat.label}
                color={cat.color}
                activeColor={cat.activeColor}
                active={selectedCategory === cat.category_id}
                onClick={() => setSelectedCategory(cat.category_id)}
              />
            ))}
          </div>
          {status === "pending" && <div className="text-gray-600 font-semibold">Cargando mangas...</div>}
          {status === "failed" && <div className="text-red-600 font-semibold">Error al cargar mangas: {error}</div>}
          {status === "succeeded" && filteredMangas.length === 0 && !showNoResults && (
            <div className="text-gray-500">No se encontraron mangas para este autor.</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {filteredMangas.length > 0 ? (
              filteredMangas.map((manga) => (
                <MangaCard
                  manga={manga}
                  key={manga._id}
                  title={manga.title}
                  cover_photo={manga.cover_photo}
                  categories={categories}
                  category_id={manga.category_id?.name?.toLowerCase()}
                />
              ))
            ) : (
              showNoResults && filteredMangas.length === 0 && (
                <div className="text-center px-4 bg-white rounded-lg shadow-md col-span-full">
                  <div className="w-64 h-64 mx-auto rounded-xl">
                    <img
                      src={goku}
                      alt="Goku fixing a robot"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="my-4 text-lg font-semibold text-gray-700 p-2">
                    Goku couldn’t find the manga…
                    <br></br>
                    Maybe it’s hiding with Shenron!
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mangas;

<style>
  {`
.fade-to-bg {
  -webkit-mask-image: radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
  mask-image: radial-gradient(circle, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
}
`}
</style>