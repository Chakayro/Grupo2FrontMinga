// src/pages/NewChapterPage.jsx
import React, { useState } from 'react';

// Definiciones de estilo (idealmente importadas)
const formInputClasses = "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const primaryButtonClasses = "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const pageTitleClasses = "text-2xl font-bold text-gray-800 text-center mb-8";
const formContainerMobileClasses = "w-full max-w-xs space-y-6";

function NewChapterPage() {
  const [formData, setFormData] = useState({
    title: '',
    order: '',
    pages: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Chapter Data:", formData);
    // Lógica de envío aquí
  };

  return (
    <div className="min-h-full flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerMobileClasses}>
        <h1 className={pageTitleClasses}>New Chapter</h1>
        
        <div>
          <input type="text" name="title" placeholder="Insert title" value={formData.title} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          <input type="number" name="order" placeholder="Insert order" value={formData.order} onChange={handleChange} className={formInputClasses} />
        </div>
        <div>
          {/* Para "Insert pages", podría ser un input de texto para URLs separadas por comas, o un uploader más complejo */}
          <input type="text" name="pages" placeholder="Insert pages (e.g., URL list)" value={formData.pages} onChange={handleChange} className={formInputClasses} />
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

export default NewChapterPage;
