import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangasByAuthorId } from "../../../store/actions/mangaAction";
import MangaImagen from "../../../components/MangaImagen";
import BackgroundMangas from "../../../assets/mangasgeneral.png";
import CategoryButton from "../../../components/CategoryButton";
import MangaCard from "../../../components/PrintCardManga";
import ChatBubble from "../../../components/ChatBubble";
import goku from "../../../assets/goku.png";
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate

const Mangas = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializamos navigate

  const authorMangas = useSelector((state) => state.mangas.authorMangas);
  const status = useSelector((state) => state.mangas.authorStatus);
  const error = useSelector((state) => state.mangas.authorError);

  console.log("Estado de Redux (authorMangas):", authorMangas);
  console.log("Estado de Redux (status):", status);
  console.log("Estado de Redux (error):", error);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);

  const mangasToUse = Array.isArray(authorMangas) ? authorMangas : [];

  const entityName = (() => {
    if (mangasToUse.length > 0) {
      const firstManga = mangasToUse[0];

      if (firstManga.author_id) {
        const author = firstManga.author_id;
        if (author.name && author.last_name) {
          return `${author.name} ${author.last_name}`;
        }
        if (author.name) {
          return author.name;
        }
      } else if (firstManga.company_id) {
        const company = firstManga.company_id;
        if (company.name && company.last_name) {
          return `${company.name} ${company.last_name}`;
        }
        if (company.name) {
          return company.name;
        }
      }
    }
    return 'Mangas';
  })();

  const filteredMangas = mangasToUse.filter((manga) => {
    const matchesCategory =
      selectedCategory === "all" ||
      manga.category_id?.name?.toLowerCase() === selectedCategory;

    const matchesText =
      (manga.title?.toLowerCase() ?? '').includes(searchText.toLowerCase());

    return matchesCategory && matchesText;
  });

  useEffect(() => {
    let timer;
    if (filteredMangas.length === 0) {
      timer = setTimeout(() => {
        setShowNoResults(true);
      }, 1000);
    } else {
      setShowNoResults(false);
    }

    console.log("Mangas filtrados (filteredMangas):", filteredMangas);

    return () => clearTimeout(timer);
  }, [filteredMangas.length]);

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
    if (status === 'idle' || status === 'failed') {
      console.log("Realizando dispatch de fetchMangasByAuthorId (sin ID).");
      dispatch(fetchMangasByAuthorId());
    }
  }, [dispatch, status]);

  // Función para manejar el clic en el botón "Add New Manga"
  const handleAddNewManga = () => {
    // Redirige al usuario a la ruta para crear un nuevo manga
    // Debes reemplazar '/create-manga' con la ruta real de tu formulario de creación de manga
    navigate('/create-manga');
  };


  return (
    <>
      <ChatBubble />
      <div className="bg-gray-100 h-[85vh]">
        <MangaImagen imagenFondo={BackgroundMangas}>
          <div className="absolute inset-0 flex flex-col items-center justify-start lg:justify-center translate-y-20 lg:-translate-y-25">
            <h1 className="text-5xl font-bold text-white">{entityName}</h1>
            <input
              type="text"
              placeholder="🔍Find your manga here"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-[73vw] max-w-4xl px-6 py-3 rounded-lg bg-white text-gray-700 text-lg shadow focus:outline-none translate-y-10 md:translate-y-10"
            />
            {/* Botón para agregar nuevo manga */}
            <button
              onClick={handleAddNewManga}
              className="mt-6 bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 translate-y-10 md:translate-y-10"
            >
              + Add New Manga
            </button>
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
                  showActions={true}
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