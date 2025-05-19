// src/pages/EditMangaPage.jsx
import React, { useState } from 'react';

// Temporary style definitions (ideally import from a shared file)
const formInputClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const formSelectClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm appearance-none pr-8 text-gray-500";
const tealButtonClasses = "w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const pinkButtonClasses = "w-full bg-pink-100 hover:bg-pink-200 text-red-500 font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const pageTitleClasses = "text-2xl font-bold text-gray-800 text-center mb-8";
const formContainerMobileClasses = "w-full max-w-xs space-y-6";

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

function EditMangaPage() {
  const [formData, setFormData] = useState({
    title: 'Shingeki No Kyojin', // Example pre-filled data
    description: 'After his hometown is destroyed...',
    photo: 'https://example.com/snk.jpg',
    category: 'shonen',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    console.log("Edit Manga Data:", formData);
  };

  const handleCancel = () => {
    console.log("Edit Cancelled");
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerMobileClasses}>
        <h1 className={pageTitleClasses}>Edit Manga</h1>
        
        <div>
          <input type="text" name="title" placeholder="title of the manga" value={formData.title} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="description" placeholder="description" value={formData.description} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="url" name="photo" placeholder="photo URL" value={formData.photo} onChange={handleChange} className={formInputClasses} />
        </div>
        
        <div className="relative">
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={formSelectClasses}
          >
            <option value="" disabled>category</option>
            <option value="shonen">Shonen</option>
            <option value="shojo">Shojo</option>
            {/* Add other categories */}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDownIcon />
          </div>
        </div>
        
        <div className="pt-2 space-y-3">
          <button type="button" onClick={handleEdit} className={tealButtonClasses}>
            Edit
          </button>
          <button type="button" onClick={handleCancel} className={pinkButtonClasses}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditMangaPage;
