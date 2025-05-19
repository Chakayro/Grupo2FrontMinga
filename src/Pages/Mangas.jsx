// src/pages/Mangas.jsx
import BgUp from "../components/BgUp";
import BgBt from "../components/BgBt"; // Assuming BgBt.jsx is the correct filename

// Un simple ícono de búsqueda en SVG
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
    <>
      {/* Estructura base del primer código proporcionado */}
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-end items-center">
        <div className="absolute w-full h-screen sm:h-8/12 top-0"> {/* Estilos del primer código */}
          <BgUp />
          {/* Contenedor para el título y la barra de búsqueda.
              Se usa flex-col para apilarlos y items-center para centrarlos horizontalmente.
              Se mantiene el offset -top-20 del primer código.
           */}
          <div className="absolute inset-0 flex flex-col items-center justify-center -top-20">
            {/* Div del título del primer código */}
            <div className="text-center md:text-left text-white px-4">
              <h1 className="text-5xl font-bold">Mangas</h1>
            </div>

            {/* Barra de búsqueda del segundo código, colocada debajo del bloque del título.
                El 'mt-8' en este div controlará el espacio vertical debajo del título.
            */}
            <div className="mt-8 w-full max-w-4xl"> {/* Clases originales del contenedor de la barra de búsqueda */}
              <div className="relative flex items-center bg-white shadow-md rounded-xl h-12">
                <div className="pl-4 pr-2">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Find your manga here"
                  className="w-full h-full bg-transparent text-gray-700 text-md focus:outline-none rounded-full pr-4"
                />
              </div>
            </div>
          </div>
        </div>
        <BgBt>
          {/* Puedes añadir contenido dentro de BgBt aquí si es necesario */}
        </BgBt>
      </div>
    </>
  );
}
export default Mangas;