// import CreateAuthor from '../../components/AuthorForm'
// import RegisImage from '../../assets/registerpage.png'


// const Author = ()=>{

//     return (
//         <>
//         <div className='flex'>
//         <CreateAuthor/>
//         <div className='hidden md:flex w-1/2 h-screen '>
//             <img src={RegisImage} alt="Login Image"  className='w-full h-full object-center object-cover'/>
//         </div>
//         </div>
//         </>
//     )
// }

// export default Author


//me imagino vana a querer que yo haga esta parte y es mas facil trabajar sobre mi codigo por eso comento lo anterior, 
// hare lo mismmo en app.jsx, comentar su ruta y montar la mia, 
// es facil desaser los cambios por si no funciona o tienen problem con el codigo y regresar a la version anterior 

// src/pages/NewAuthorPage.jsx
import React, { useState } from 'react';

// Temporary style definitions
const formInputClasses = "w-10/12 p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const primaryButtonClasses = "w-10/12 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 mt-4 rounded-full transition-colors shadow-md text-lg";
const pageTitleClasses = "text-3xl font-semibold text-gray-800 text-center mb-11"; // mb-6 to match image
const formContainerMobileClasses = "w-full max-w-xs space-y-5"; // space-y-5 to match EditAuthor
const avatarImageClasses = "w-24 h-24 rounded-full object-cover shadow-md mb-9 border-2 border-gray-300 bg-gray-200"; // Placeholder style

// Simple SVG Placeholder for Avatar
const AvatarPlaceholderIcon = () => (
    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);


function NewAuthor() {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    cityCountry: '',
    date: '',
    profileImageUrl: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Author Data:", formData);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerMobileClasses}>
        <h1 className={pageTitleClasses}>New Author</h1>

        <div className="flex justify-center">
          <div className={avatarImageClasses}>
            {/* Puedes poner una imagen real o un placeholder SVG */}
            <AvatarPlaceholderIcon />
          </div>
        </div>
        
        <div>
          <input type="text" name="name" placeholder="Name (e.g., Lucas Ezequiel)" value={formData.name} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="lastName" placeholder="Last Name (e.g., Silva)" value={formData.lastName} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="cityCountry" placeholder="City, Country (e.g., Caseros, Buenos Aires)" value={formData.cityCountry} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="date" placeholder="Date (e.g., 28/12/2022)" value={formData.date} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="profileImageUrl" placeholder="URL Profile Image" value={formData.profileImageUrl} onChange={handleChange} className={formInputClasses} />
        </div>
        
        <div className="pt-2">
          <button type="button" onClick={handleSubmit} className={primaryButtonClasses}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default NewAuthor;
