import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../../store/actions/mangaAction";
import MangaImagen from "../../components/MangaImagen";
import BackgroundMangas from "../../assets/mangasgeneral.png";
import CategoryButton from "../../components/CategoryButton";
import MangaCard from "../../components/PrintCardManga";
import ChatBubble from "../../components/ChatBubble";


const Mangas = () => {
  const dispatch = useDispatch();
  const { mangas, status, error } = useSelector((state) => state.mangas);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");

  // Extraer categorías únicas de los mangas
  const apiCategories = [];
  const categoryNames = new Set();

  mangas.forEach((manga) => {
    const cat = manga.category_id;
    if (cat && !categoryNames.has(cat.name.toLowerCase())) {
      apiCategories.push({
        category_id: cat.name.toLowerCase(),
        label: cat.name,
        color: cat.color,
        activeColor: cat.hover,
      });
      categoryNames.add(cat.name.toLowerCase());
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
    if (!mangas || mangas.length === 0) {
      dispatch(fetchMangas());
    }
  }, [dispatch, mangas]);

  // Filtrado cruzado por categoría y texto
  const filteredMangas = mangas.filter((manga) => {
    const matchesCategory =
      selectedCategory === "all" ||
      manga.category_id?.name?.toLowerCase() === selectedCategory;

    // Filtro por texto (en título o descripción)
    const matchesText =
      manga.title.toLowerCase().includes(searchText.toLowerCase()) ||
      manga.description.toLowerCase().includes(searchText.toLowerCase());

    // Ambos filtros deben cumplirse
    return matchesCategory && matchesText;
  });

  return (
    <>
      <ChatBubble></ChatBubble>
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
          {status === "pending" && <div>Cargando mangas...</div>}
          {status === "failed" && <div>Error: {error}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {filteredMangas.map((manga) => (
              <MangaCard
                key={manga._id}  // Agregamos la key aquí
                title={manga.title}
                description={manga.description}
                cover_photo={manga.cover_photo}
                categories={categories}
                category_id={manga.category_id?.name?.toLowerCase()}
                detailsPath={`/mangaChapter/${manga._id}`}
              />
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Mangas;
