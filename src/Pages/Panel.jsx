import BgUp from "../components/BgUp";
import BgBt from "../components/BGBT";
function Panel() {
  return (
    <>
       <div className="absolute w-full h-screen sm:h-9/12 ">
      <BgUp/>
       <div className="absolute inset-0 flex items-center justify-center md:ml-24">
                <div className="text-center md:text-left text-white px-4 ">
                    <h1 className="text-5xl font-bold">Panel</h1>
                </div>
            </div>
              
    </div>
  <BgBt></BgBt>
    </>
  );
}
export default Panel;