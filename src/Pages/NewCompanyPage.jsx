// src/pages/NewCompanyPage.jsx
import React, { useState } from 'react';

// Definiciones de estilo (idealmente importadas)
const formInputClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const primaryButtonClasses = "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const pageTitleClasses = "text-2xl font-bold text-gray-800 text-center mb-6";
const formContainerMobileClasses = "w-full max-w-xs space-y-5";
const avatarImageClasses = "w-24 h-24 rounded-full object-cover shadow-md mb-6 border-2 border-gray-300 bg-gray-200";

const AvatarPlaceholderIcon = () => (
    <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

function NewCompanyPage() {
  const [formData, setFormData] = useState({
    name: '',
    website: '',
    profileImageUrl: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Company Data:", formData);
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerMobileClasses}>
        <h1 className={pageTitleClasses}>New Company</h1>

        <div className="flex justify-center">
          <div className={avatarImageClasses}>
            {formData.profileImageUrl ? 
              <img src={formData.profileImageUrl} alt="Company Logo Preview" className="w-full h-full rounded-full object-cover" /> 
              : <AvatarPlaceholderIcon />
            }
          </div>
        </div>
        
        <div>
          <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="website" placeholder="Website" value={formData.website} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="profileImageUrl" placeholder="URL Profile Image" value={formData.profileImageUrl} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className={formInputClasses} />
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

export default NewCompanyPage;
