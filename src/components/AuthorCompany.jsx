import { NavLink } from 'react-router-dom';
import logo from '../assets/logo2.png';

const RoleSelector = () => {


return (
    <div className="w-full md:w-1/2 h-screen flex justify-center items-center">
    <div className="bg-white flex flex-col items-center p-8 rounded-2xl space-y-6 w-[90%] max-w-md md:max-w-full">
         <h2 className="text-xl font-semibold text-orange-300">Change role to</h2>
        <img src={logo} alt="logo" className="h-10 w-auto mb-2" />
        <div className="space-y-4 w-full">
        <NavLink
            to="/newAuthor"
            className={`flex items-center justify-between border rounded-xl p-4 w-full transition border-gray-100 hover:border-orange-500 hover:ring-2 hover:ring-[#FF6600]`}
        >
            <div className='w-8/10'>
            <h3 className="font-semibold text-orange-500">Join as an Author!</h3>
            <p className="text-sm text-orange-300">I'm a reader writing a manga</p>
            </div>
            <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Author"
            className="w-10 h-10 rounded-full"
            />
        </NavLink>

        <NavLink
            to="/newCompany"
            className={`flex items-center justify-between border rounded-xl p-4 w-full transition border-gray-100 hover:border-orange-500 hover:ring-2 hover:ring-[#FF6600]`}
        >
            <div className='w-8/10'>
            <h3 className="font-semibold text-[#FF6600]">Join as a Company!</h3>
            <p className="text-sm text-orange-300 ">I'm a company and I want to publish my comics</p>
            </div>
            
            <img src="https://randomuser.me/api/portraits/women/2.jpg" className="w-10 h-10 rounded-full " />
            
        </NavLink>
        </div>
    </div>
    </div>
);
};

export default RoleSelector;
