import logo from '../assets/logo2.png';
import { Link } from 'react-router-dom';



const SigIn = () => {
return (
    <div className=" w-full md:w-1/2 h-screen flex justify-center items-center">
    <div className="bg-white flex flex-col items-center p-8 rounded-2xl space-y-6 w-200">
        <img src={logo} alt="logo" className="h-10 w-auto mb-2" />
        <h2 className="text-2xl font-bold">
        Welcome <span className="text-orange-500">back!</span>
        </h2>

        <p className="text-center text-gray-500 text-sm">
        Discover manga, manhua and manhwa, track your progress, have fun, read manga.
        </p>

        <form className="w-full space-y-4 max-w-sm">
        <div className="relative w-full mt-4">
            <label
                htmlFor="email"
                className="absolute text-orange-500 text-sm bg-white px-1 -top-2.5 left-3 z-10"
            >Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="Enter your email"
                required
                className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">@</span>
            </div>

        <div className='relative w-full'>
            <label
                htmlFor="password" 
                className="text-sm absolute -top-2.5 left-3 z-10 bg-white text-orange-500"
            >Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="**************"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
        </div>

        <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
            Sign in
        </button>

        <button className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="h-5 w-5" />
            <span>Sign in with Google</span>
        </button>
        </form>

        <button  className="text-sm text-gray-600 mt-4">
        you don't have an account yet? <Link to="/register" className="text-orange-500 font-medium">Sign up</Link>
        </button>
        <Link to="/home" className="text-orange-500 text-sm underline">Go back to home page</Link>
    </div>
    </div>
);
};

export default SigIn;
