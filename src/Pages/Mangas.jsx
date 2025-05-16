import BgUp from "../components/BgUp";
import BgBt from "../components/BGBT";

// Un simple ícono de búsqueda en SVG que puedes usar o reemplazar
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-5 h-5 text-gray-500" // Ajusta el color y tamaño según necesites
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

function Mangas() {
  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="absolute w-full h-screen sm:h-9/12">
        <BgUp />
        <div className="absolute inset-0 flex flex-col items-center justify-center -mt-15 space-y-6"> {/* Modificado para flex-col y pt-10 para espacio */}
          
          
          <div className="text-center text-white px-4"> {/* Eliminado md:text-left para centrar el h1 también si es necesario */}
            <h1 className="text-5xl font-bold">Mangas</h1>
          </div>


          <div className="mt-8 w-full max-w-4xl "> {/* Margen superior y ancho máximo para la barra */}
            <div className="relative flex items-center bg-white shadow-md rounded-xl h-12"> {/* Contenedor de la barra con fondo blanco y sombra */}
              <div className="pl-4 pr-2"> {/* Espacio para el ícono */}
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Find your manga here"
                className="w-full h-full bg-transparent text-gray-700  text-md focus:outline-none rounded-full pr-4" // Input transparente
              />
            </div>
          </div>

        </div>
      </div>
      <BgBt />
    </div>
  );
}
export default Mangas;