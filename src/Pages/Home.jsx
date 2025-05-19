// pages/Home.jsx
import React, { useEffect } from 'react';
import HeroImagen from '../components/HeroImagen.jsx';
import backgroundPrincipal from "../assets/backgroundPrincipal.png";
import MangaCarousel from '../components/Slide.jsx';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { fetchMangas } from "../store/actions/mangaAction"; // Ajusta el path si es necesario

const Home = () => {
  const dispatch = useDispatch();
  const mangas = useSelector((state) => state.mangas.mangas);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!mangas || mangas.length === 0) {
      dispatch(fetchMangas());
    }
  }, [dispatch, mangas]);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HeroImagen - con altura completa en móviles */}
      <div>
        <HeroImagen imagenFondo={backgroundPrincipal}>
          {/* Modifiqué esta clase para asegurar que ocupe toda la altura sin crear espacios extra */}
          <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
            <div className="text-center md:text-left text-white px-4">
              <h1 className="text-5xl font-bold">For the love of manga</h1>
              <p className="mt-2 text-2xl">Explore our varieties</p>
              <p className="mt-1 text-sm font-bold mb-5">#MingaLove❤️</p>
              
              {!token ?
            (<Link to={"/login"}  className="mt-4 text-xl bg-white text-[#FF6600] font-bold px-6 py-2 rounded w-[200px] hover:bg-[#FF6600] hover:text-amber-50" >
                Sign In!
              </Link>)
            :
            (<Link to={"/manga"}  className="mt-4 text-xl bg-white text-[#FF6600] font-bold px-6 py-2 rounded w-[200px] hover:bg-[#FF6600] hover:text-amber-50" >
              Get Started!
            </Link>)
            }
            </div>        
          </div>
        </HeroImagen>
      </div>

      {/* Carrusel visible solo en md+ */}
      <div>
        <MangaCarousel slides={mangas} />
      </div>
    </div>
  );
};

export default Home;
