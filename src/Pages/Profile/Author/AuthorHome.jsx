import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangasByAuthorId } from "../../../store/actions/mangaAction";
import MangaImagen from "../../../components/MangaImagen";
import BackgroundMangas from "../../../assets/mangasgeneral.png";
import CategoryButton from "../../../components/CategoryButton";
import MangaCard from "../../../components/PrintCardManga";
import ChatBubble from "../../../components/ChatBubble";
import goku from "../../../assets/goku.png";
import { fetchAllAuthors } from "../../../store/actions/authorAction.js";
import { fetchAllCompanies } from "../../../store/actions/companyAction.js";

const Mangas = () => {
  const dispatch = useDispatch();

  const role = useSelector((state) => state?.auth?.user?.role);
  const author = useSelector((state) => state?.author?.authors?.authors);
  const company = useSelector((state) => state?.company?.companies);
  const idUser = useSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    if (role === 1) {
      dispatch(fetchAllAuthors());
    } else if (role === 2) {
      dispatch(fetchAllCompanies());
    }
  }, [dispatch, role]);

  // Evito errores forzando arrays
  const authorArray = Array.isArray(author) ? author : []
  const companyArray = Array.isArray(company) ? company : []

  // Memoriza filteredUser para que no recalcule innecesariamente
  const filteredUser = useMemo(() => {
    if (role === 1) {
      return authorArray.filter((user) => user.user_id === idUser);
    } else if (role === 2) {
      return companyArray.filter((user) => user.user_id === idUser);
    } else {
      return [];
    }
  }, [role, authorArray, companyArray, idUser]);

  const authorMangas = useSelector((state) => state.mangas.authorMangas);
  const status = useSelector((state) => state.mangas.authorStatus);
  const error = useSelector((state) => state.mangas.authorError);

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);

  const mangasToUse = Array.isArray(authorMangas) ? authorMangas : [];

  // Memoriza el filtro de mangas
  const filteredMangas = useMemo(() => {
    return mangasToUse.filter((manga) => {
      const matchesCategory =
        selectedCategory === "all" ||
        manga.category_id?.name?.toLowerCase() === selectedCategory;

      const matchesText = (manga.title?.toLowerCase() ?? "").includes(searchText.toLowerCase());

      return matchesCategory && matchesText;
    });
  }, [mangasToUse, selectedCategory, searchText]);

  useEffect(() => {
    let timer;
    if (filteredMangas.length === 0) {
      timer = setTimeout(() => setShowNoResults(true), 400);
    } else {
      setShowNoResults(false);
    }
    return () => clearTimeout(timer);
  }, [filteredMangas]);

  // Genera las categorías únicas a partir de mangasToUse
  const categories = useMemo(() => {
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

    return [
      {
        category_id: "all",
        label: "All",
        color: "bg-gray-300",
        activeColor: "bg-gray-500",
      },
      ...apiCategories,
    ];
  }, [mangasToUse]);

  useEffect(() => {
    if (status === "idle" || status === "failed") {
      dispatch(fetchMangasByAuthorId());
    }
  }, [dispatch, status]);

  return (
    <>
      <ChatBubble />
      <div className="bg-gray-100 h-[85vh]">
        <MangaImagen imagenFondo={BackgroundMangas}>
          <div className="absolute inset-0 flex flex-col items-center justify-start lg:justify-center translate-y-20 lg:-translate-y-25">
            {role === 1 ? (
              <h1 className="text-5xl font-bold text-white">
                Author: {filteredUser[0]?.name ?? "Unknown"} {filteredUser[0]?.last_name ?? ""}
              </h1>
            ) : (
              <h1 className="text-5xl font-bold text-white">
                Company: {filteredUser[0]?.name ?? "Unknown"}
              </h1>
            )}

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
                  showActions={true}
                />
              ))
            ) : (
              showNoResults && filteredMangas.length === 0 && (
                <div className="text-center px-4 bg-white rounded-lg shadow-md col-span-full">
                  <div className="w-64 h-64 mx-auto rounded-xl">
                    <img src={goku} alt="Goku fixing a robot" className="w-full h-full object-contain" />
                  </div>
                  <p className="my-4 text-lg font-semibold text-gray-700 p-2">
                    Goku couldn’t find the manga…
                    <br />
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
