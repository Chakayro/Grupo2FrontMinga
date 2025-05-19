import BgUp from "../components/BgUp";
import BgBt from "../components/BgBt"; // Assuming BgBt.jsx is the correct filename
function Manger() {
  return (
     <>
      <div className="w-screen h-screen bg-gray-100 flex flex-col justify-end items-center">
        <div className="absolute w-full h-screen sm:h-8/12 top-0">
          <BgUp />
          <div className="absolute inset-0 flex items-center justify-center -top-20">
            <div className="text-center md:text-left text-white px-4">
              <h1 className="text-5xl font-bold">Panel</h1>
            </div>
          </div>
        </div>
        <BgBt>
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold text-orange-500">Company Name</h2> 
              <div className="mt-1 h-2 w-24 bg-orange-600 mx-auto"></div>
            </div>

            <div className="flex items-center justify-center">
              <TableComponent />
            </div>
          </div>
        </BgBt>
      </div>
    </>
  );
}
export default Manger;