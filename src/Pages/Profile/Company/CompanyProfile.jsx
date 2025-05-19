// src/pages/CompanyProfilePage.jsx
import React, { useState } from 'react'; // useEffect eliminado ya que no se usa
// import { useParams } from 'react-router-dom'; // Se mantiene comentado por si lo necesitas después

// Definiciones de estilo (idealmente importadas de un archivo común)
const formInputClasses = "w-10/12 p-3 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-md placeholder-gray-400";
const tealButtonClasses = "w-10/12 bg-teal-400 hover:bg-teal-500 text-white font-extrabold py-4 px-4 rounded-full transition-colors shadow-md text-xl mt-6 mb-5";
const pinkButtonClasses = "w-10/12 bg-pink-100 hover:bg-pink-200 text-red-300 font-extrabold py-4 px-4 rounded-full transition-colors shadow-md text-xl";
// pageTitleClasses eliminada ya que no se usa
const formContainerMobileClasses = "w-full max-w-xs space-y-5";
const avatarImageClasses = "w-24 h-24 rounded-full object-contain shadow-md mb-11 border-2 border-gray-300 bg-white p-2";

// Icono de placeholder si no hay logo
const CompanyLogoPlaceholder = () => (
    <svg className="w-full h-full text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
);

function CompanyProfile() {
  // const { companyId } = useParams(); // Se mantiene comentado por si lo necesitas después

  // Datos de ejemplo, simular carga desde backend
  const [formData, setFormData] = useState({
    name: 'Toei Animation',
    country: 'United States',
    website: 'https://www.toei-animation.com',
    profileImageUrl: '', 
  });

  // El useEffect comentado para cargar datos se ha eliminado.
  // Si necesitas cargar datos, puedes reintroducirlo.

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Save Company Data:", formData);
    // Aquí iría tu lógica para guardar los datos
  };

  const handleDelete = () => {
    console.log("Delete Company Account for:", formData.name); // Lógica para eliminar
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerMobileClasses}>
        {/* El h1 para el título de la página (que usaría pageTitleClasses) se mantiene comentado */}
        {/* <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Company Profile</h1> */}

        <div className="flex justify-center">
          <div className={avatarImageClasses}>
            {formData.profileImageUrl ? 
              <img src={formData.profileImageUrl} alt={`${formData.name} Logo`} className="w-full h-full rounded-full object-contain" /> 
              : <CompanyLogoPlaceholder />
            }
          </div>
        </div>
        
        <div>
          <input type="text" name="name" placeholder="Company Name" value={formData.name} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="profileImageUrl" placeholder="URL Profile Image" value={formData.profileImageUrl} onChange={handleChange} className={formInputClasses} />
        </div>
        
        <div className="pt-2 space-y-3">
          <button type="button" onClick={handleSave} className={tealButtonClasses}>
            Save
          </button>
          <button type="button" onClick={handleDelete} className={pinkButtonClasses}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyProfile;
