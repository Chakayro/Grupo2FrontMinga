import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { fetchChaptersByMangaId } from '../../store/actions/chapterMangaAction';
import MangaImagen from "../../components/MangaImagen";
import BackgroundMangas from "../../assets/mangasgeneral.png";
import CategoryButton from "../../components/CategoryButton";
import MangaCard from "../../components/PrintCardManga";

const ChaptersPage = () => {
  const dispatch = useDispatch();
  const { chapters, status: chaptersStatus, error: chaptersError } = useSelector((state) => state.chapters);
  const { mangas } = useSelector((state) => state.mangas);
  const { id } = useParams();

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchText, setSearchText] = useState("");
  const [mangaCategory, setMangaCategory] = useState(null); // Nuevo estado para la categoría del manga


    // Extraer categorías únicas de los mangas
    const [apiCategories, setApiCategories] = useState([]);

    useEffect(() => {
        if (mangas) {
            const uniqueCategories = [];
            const categoryNames = new Set();
            mangas.forEach((manga) => {
                const cat = manga.category_id;
                if (cat && !categoryNames.has(cat.name.toLowerCase())) {
                    uniqueCategories.push({
                        category_id: cat.name.toLowerCase(),
                        label: cat.name,
                        color: cat.color,
                        activeColor: cat.hover,
                    });
                    categoryNames.add(cat.name.toLowerCase());
                }
            });
             setApiCategories([
                {
                    category_id: "all",
                    label: "All",
                    color: "bg-gray-300",
                    activeColor: "bg-gray-500",
                },
                ...uniqueCategories,
            ]);

            // Encontrar la categoría del manga actual
            const mangaData = mangas.find(m => m._id === id);
            setMangaCategory(mangaData?.category_id); // Establecer la categoría
        }
    }, [mangas, id]);


  useEffect(() => {
    dispatch(fetchChaptersByMangaId(id));
  }, [dispatch, id]);


  //logger
  useEffect(() => {
    if (chaptersStatus === 'succeeded') {
      console.log('Capítulos recibidos:', chapters);
    } else if (chaptersStatus === 'failed') {
      console.error('Error al cargar capítulos:', chaptersError);
    }
  }, [chaptersStatus, chapters, chaptersError]);


  return (
    <>
      <div className="bg-gray-100 h-[85vh]">
        <MangaImagen imagenFondo={BackgroundMangas}>
          <div className="absolute inset-0 flex flex-col items-center justify-start lg:justify-center translate-y-20 lg:-translate-y-25">
            <h1 className="text-5xl font-bold text-white">Chapters</h1>
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
            {apiCategories.map((cat) => (
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
          {chaptersStatus === "pending" && <div>Cargando Capitulos...</div>}
          {chaptersStatus === "failed" && <div>Error: {chaptersError}</div>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {chapters && chapters.length > 0 ? (
              chapters.map((chapter) => (
                <MangaCard
                  key={chapter._id}
                  title={chapter.title}
                  description={`Chapter ${chapter.chapterNumber}`}
                  cover_photo={chapter.cover_photo}
                  categories={apiCategories}
                  category_id={mangaCategory?.name?.toLowerCase()} // Usar la categoría del manga
                  detailsPath={`/Detailsmanga/${chapter._id}`}
                />
              ))
            ) : (
              <div>No chapters found.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChaptersPage;

