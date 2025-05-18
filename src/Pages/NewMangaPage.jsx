// src/pages/NewMangaPage.jsx
import React, { useState } from 'react';
// Assuming you'll import shared styles or define them here
// For this example, I'll copy-paste for clarity, but ideally import:
// import { formInputClasses, formSelectClasses, primaryButtonClasses, pageTitleClasses, formContainerMobileClasses } from '../styles/formStyles';

// Temporary style definitions (ideally import from a shared file)
const formInputClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const formSelectClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm appearance-none pr-8 text-gray-500";
const primaryButtonClasses = "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const pageTitleClasses = "text-2xl font-bold text-gray-800 text-center mb-8"; // Increased mb-8
const formContainerMobileClasses = "w-full max-w-xs space-y-6"; // Increased space-y-6

const ChevronDownIcon = () => (
  <svg className="w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
);

function NewMangaPage() {
  // Example state - you'll need to manage form data
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    coverPhoto: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Manga Data:", formData);
    // Add your submission logic here
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100"> {/* Changed min-h-screen to min-h-full if inside Outlet */}
      <div className={formContainerMobileClasses}>
        <h1 className={pageTitleClasses}>New Manga</h1>
        
        <div>
          <input type="text" name="title" placeholder="Insert title" value={formData.title} onChange={handleChange} className={formInputClasses} />
        </div>
        
        <div className="relative">
          <select 
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={formSelectClasses}
          >
            <option value="" disabled>Insert category</option>
            <option value="shonen">Shonen</option>
            <option value="shojo">Shojo</option>
            <option value="seinen">Seinen</option>
            <option value="josei">Josei</option>
            <option value="manhwa">Manhwa</option>
            <option value="manhua">Manhua</option>
            <option value="comic">Comic</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2">
            <ChevronDownIcon />
          </div>
        </div>

        <div>
          <input type="url" name="coverPhoto" placeholder="Insert cover photo URL" value={formData.coverPhoto} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="text" name="description" placeholder="Insert description" value={formData.description} onChange={handleChange} className={formInputClasses} />
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

export default NewMangaPage;
