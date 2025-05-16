import BgUp from "../components/BgUp";
function Home() {
  return (
    <div className="absolute w-full h-screen sm:h-8/12 ">
      <BgUp/>
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
  );
}
export default Home;