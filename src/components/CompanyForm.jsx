import { useState, useEffect } from 'react';
import userImage from '../assets/user.png';
import { useDispatch } from 'react-redux';
import { createCompany, resetCompanyCreation } from '../store/actions/companyAction';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CreateCompany = () => {
const dispatch = useDispatch();
const navigate = useNavigate();
const {status, error, message} = useSelector((state) => state.company);
const [company, setCompany] = useState({
    name: '',
    website: '',
    description: '',
    photo: ''
    
});

const handleChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Company:', company);
    dispatch(createCompany(company));
};

useEffect(() => {
    if (status === 'success') {
      const timer = setTimeout(() => {
      dispatch(resetCompanyCreation())
      navigate('/home');
      }, 1000);
      return () => clearTimeout(timer);
    } else if (status === 'failed') {
     const timer = setTimeout(() => {
       dispatch(resetCompanyCreation())
     }, 2000);
       return () => clearTimeout(timer);
    }
  }, [status, message, error, navigate, dispatch]);

return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center   w-full md:w-1/2">
    <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded- flex flex-col items-center space-y-4 w-full max-w-sm"
>
        <h2 className="text-2xl font-semibold text-center">New Company</h2>
        <img src={userImage} alt="Author" className="rounded-full w-20 h-20 object-cover" />
        <input
        type="text"
        name="name"
        placeholder="Name"
        value={company.name}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="url"
        name="website"
        placeholder="Website"
        value={company.website}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="url"
        name="photo"
        placeholder="URL Profile Image"
        value={company.photo}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <textarea
        name="description"
        placeholder="Description"
        value={company.description}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
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
        <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition">
        Send
        </button>
    </form>
    </div>
);
};

export default CreateCompany;
