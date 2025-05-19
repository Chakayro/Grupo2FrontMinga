import BgUp from "../components/BgUp";

function Home() {
  return (

    <div className="w-full h-screen bg-gray-100 flex flex-col">
      
      <div className="relative w-full h-8/12"> 
        <BgUp/> {/* BgUp llenará este div h-8/12 */}
        <div className="absolute inset-0 flex items-center justify-center md:justify-start md:ml-24">
          <div className="text-center md:text-left text-white px-4 ">
            <h1 className="text-5xl font-bold">For the love of manga</h1>
            <p className="mt-2 text-2xl">Explore our varieties</p>
            <p className="mt-1 text-sm font-bold hidden md:block">#MingaLove❤️</p>
            <button className="mt-4 text-xl bg-white text-orange-500 font-bold px-6 py-2 rounded w-[200px]">
              Sign In!
            </button>
          </div>
        </div>
      </div>

      {/* Sección Inferior (20% de la altura) */}
      {/* Este div no debería ser 'absolute' si quieres que siga al anterior en el flujo flex */}
      <div className="w-full h-4/12 bg-gradient-to-b from-transparent to-gray-100 flex items-center justify-center"> {/* Eliminado absolute, añadido flex para centrar el h2 */}
        <h2 className="text-white text-2xl"></h2> {/* Texto de ejemplo */}
      </div>

    </div>
  );
}
export default Home;