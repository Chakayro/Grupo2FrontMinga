import { useEffect } from 'react'; // Added React and useEffect
import BgUp from "../components/BgUp";
import MangaCarousel from '../components/Slide.jsx'; // Added MangaCarousel import
import { Link } from 'react-router-dom'; // Added Link for potential future use or if MangaCarousel internals need it
import { useDispatch, useSelector } from "react-redux"; // Added Redux hooks
import { fetchMangas } from "../store/actions/mangaAction"; // Added action import (adjust path if necessary)

// The user's original code used "function Home()". We'll keep that.
// If you prefer const Home = () => {}, that's also fine.
function Home() {
  const dispatch = useDispatch();
  // Assuming your Redux state has a 'mangas' slice with a 'mangas' array,
  // and an 'auth' slice with a 'token'.
  const mangas = useSelector((state) => state.mangas.mangas);
  const token = useSelector((state) => state.auth.token); // Token is fetched, though the button below is not yet conditional

  useEffect(() => {
    // Fetch mangas if the mangas array from Redux is null, undefined, or empty.
    if (!mangas || mangas.length === 0) {
      dispatch(fetchMangas());
    }
  }, [dispatch, mangas]); // Dependencies for the effect

  return (
    // Contenedor principal: from your original code
    <div className="w-full h-screen bg-gray-100 flex flex-col">

      {/* Sección Superior (80% de la altura) - from your original code */}
      <div className="relative w-full h-8/12">
        <BgUp/> {/* BgUp llenará este div h-8/12 */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
          <div className="text-center md:text-left text-white px-4 ">
            <h1 className="text-5xl font-bold">For the love of manga</h1>
            <p className="mt-2 text-2xl">Explore our varieties</p>
            <p className="mt-1 text-sm font-bold hidden md:block">#MingaLove❤️</p>
            {/* This is your original button. If you want it to be conditional (Sign In / Get Started)
                based on the 'token', you would replace this with logic similar to the 'develop' branch,
                using the 'Link' component and 'token' state. */}
            <button className="mt-4 text-xl bg-white text-orange-500 font-bold px-6 py-2 rounded w-[200px]">
              Sign In!
            </button>
          </div>
        </div>
      </div>

      {/* Sección Inferior (4/12 de la altura) - Now contains the MangaCarousel */}
      <div className="w-full h-4/12 bg-gradient-to-b from-transparent to-gray-100 flex items-center justify-center p-4"> {/* Added some padding for the carousel */}
        {/* The MangaCarousel is placed here, replacing the example h2 */}
        {/* It will receive the manga data fetched via Redux */}
        {mangas && mangas.length > 0 ? (
          <MangaCarousel slides={mangas} />
        ) : (
          // Optional: Show a loading message or placeholder while mangas are being fetched or if empty
          <p className="text-gray-500">Loading mangas...</p>
        )}
      </div>

    </div>
  );
}

export default Home;