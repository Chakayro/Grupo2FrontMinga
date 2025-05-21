import { useState } from 'react';


const formInputClasses =
  "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const formSelectClasses =
  "w-full p-1.5 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm appearance-none pr-8";
const primaryButtonClasses =
  "w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-md text-sm";
const containerClasses = "h-screen flex flex-col items-center justify-center p-4 bg-gray-100";
const formWrapperClasses = "w-full max-w-xs space-y-6";
const titleClasses = "text-2xl font-bold text-gray-800 text-center mb-8";

export default function NewMangaPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    coverPhoto: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('New Manga Data:', formData);
  };

  return (
    <div className={containerClasses}>
      <div className={formWrapperClasses}>
        <h1 className={titleClasses}>New Manga</h1>

        <input
          type="text"
          name="title"
          placeholder="Insert title"
          value={formData.title}
          onChange={handleChange}
          className={formInputClasses}
        />

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
          <svg
            className="w-4 h-4 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <input
          type="url"
          name="coverPhoto"
          placeholder="Insert cover photo"
          value={formData.coverPhoto}
          onChange={handleChange}
          className={formInputClasses}
        />

        <input
          type="text"
          name="description"
          placeholder="Insert description"
          value={formData.description}
          onChange={handleChange}
          className={formInputClasses}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className={primaryButtonClasses}
        >
          Send
        </button>
      </div>
    </div>
  );
}