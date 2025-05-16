import BgUp from "../components/BgUp";
import BgBt from "../components/BgBt";
function Manger() {
  return (
                <div className=" w-full h-screen bg-gray-100 ">
       <div className="absolute w-full h-screen sm:h-9/12 ">
      <BgUp/>
       <div className="absolute inset-0 flex items-center justify-center md:ml-24">
                <div className="text-center md:text-left text-white px-4 ">
                    <p className="text-5xl font-bold">Chakayro's company</p>
                </div>
            </div>
              
    </div>
      <BgBt/>
    </div>
  );
}
export default Manger;