import BgUp from "../components/BgUp";
import BgBt from "../components/BGBT";
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

function Manger() {
  return (
     <>
    <>
      {/* Estructura base del primer código proporcionado */}
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-end items-center">
        <div className="absolute w-full h-screen sm:h-8/12 top-0"> {/* Estilos del primer código */}
          <BgUp />
          {/* Contenedor para el título y la barra de búsqueda.
              Se usa flex-col para apilarlos y items-center para centrarlos horizontalmente.
              Se mantiene el offset -top-20 del primer código.
           */}
          <div className="absolute inset-0 flex flex-col items-center justify-center ">
            {/* Div del título del primer código */}
            <div className="text-center md:text-left text-white px-4">
              <h1 className="text-5xl font-bold">Company Name</h1>
            </div>

          </div>
        </div>
        <BgBt>
      
        </BgBt>
      </div>
    </>
    </>
  );
}
export default Manger;