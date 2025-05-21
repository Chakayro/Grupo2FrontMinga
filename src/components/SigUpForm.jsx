import logo from '../assets/logo2.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import {register, resetRegister} from '../store/actions/registerAction'
import { useSelector } from 'react-redux';

const Register = () => {
const [email, setEmail] = useState('');
const [photo, setPhoto] = useState('');
const [password, setPassword] = useState('');
const dispatch = useDispatch();
const navigate = useNavigate();
const {status, error, message} = useSelector((state) => state.register);
console.log("status", status);
console.log("error", error);


const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(
    register({
      email,
      photo,
      password
    })
  )
}

useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
      dispatch(resetRegister())
      navigate('/login');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === 'failed') {
     const timer = setTimeout(() => {
       dispatch(resetRegister())
     }, 2000);
       return () => clearTimeout(timer);
    }
  }, [status, message, error, navigate, dispatch]);




return (
    <div className="w-full md:w-1/2 h-screen flex justify-center items-center">
    <div className="bg-white flex flex-col items-center p-8 rounded-2xl w-120 space-y-6">
        <img src={logo} alt="logo" className="h-10 w-auto mb-2" />
        <h2 className="text-2xl font-bold">Welcome!</h2>

        <p className="text-center text-gray-500 text-sm">
        Discover manga, manhua and manhwa, track your progress, have fun, read manga.
        </p>

        <form className="w-full space-y-4 max-w-sm" onSubmit={handleSubmit}>
          {/* Email */}
        <div className="relative w-full">
            <label htmlFor="email" className="absolute text-orange-500 text-sm bg-white px-1 -top-2.5 left-3 z-10">Email</label>
            <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            required
            className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">@</span>
        </div>

          {/* Photo */}
        <div className="relative w-full">
            <label htmlFor="photo" className="absolute text-orange-500 text-sm bg-white px-1 -top-2.5 left-3 z-10">Photo</label>
            <input
            type="url"
            id="photo"
            onChange={(e) => setPhoto(e.target.value)}
            value={photo}
            placeholder="Url"
            required
            className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">📷</span>
        </div>

          {/* Password */}
        <div className="relative w-full">
            <label htmlFor="password" className="absolute text-orange-500 text-sm bg-white px-1 -top-2.5 left-3 z-10">Password</label>
            <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="**************"
            required
            className="w-full px-4 pt-5 pb-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-orange-500">🔒  </span>
        </div>

          {/* Checkbox */}
        <div className="flex items-center gap-2">
            <input type="checkbox" id="notify" className="accent-orange-500" />
            <label htmlFor="notify" className="text-sm text-gray-700">Send notification to my email</label>
        </div>


       { status ==='success' && (
         <div className='text-red-500 text-sm'>  
          <p>{message||'!Registro exitoso! Redirigiendo...'}</p>
        </div>
       )
       }
          { status ==='failed' && (
         <div className='text-red-500 text-sm'>  
          <p>{error|| 'Error al registrar'}</p>
        </div>
       )
       }

          {/* Sign up button */}
        <button className="w-full py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition">
            Sign up
        </button>

          {/* Google button */}
        <button className="w-full py-2 border border-gray-300 rounded-lg flex items-center justify-center space-x-2">
            <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google" className="h-5 w-5" />
            <span>Sign in with Google</span>
        </button>
        </form>

        <p className="text-sm text-gray-600 mt-4">
        Already have an account? <Link to="/login" className="text-orange-500 font-medium">Log in</Link>
        </p>
        <Link to="/home" className="text-orange-500 text-sm underline">Go back to home page</Link>
    </div>
    </div>
);
};

export default Register;
