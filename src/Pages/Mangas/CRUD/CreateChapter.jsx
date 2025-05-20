import  { useState } from 'react';

const formInputClasses =
  "w-9/12 p-4 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors font-semibold text-sm placeholder-gray-500";
const sendButtonClasses =
  "w-9/12 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 rounded-full transition-colors shadow-md text-sm mt-16";
const formContainerClasses = "w-full max-w-xs space-y-3";
const titleClasses = "text-4xl font-semibold text-gray-600 text-center mb-6";

export default function NewChapterPage() {
  const [formData, setFormData] = useState({
    title: '',
    order: '',
    pages: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('New Chapter Data:', formData);
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerClasses}>
        <h1 className={titleClasses}>New Chapter</h1>

        <input
          type="text"
          name="title"
          placeholder="Insert title"
          value={formData.title}
          onChange={handleChange}
          className={formInputClasses}
        />
        <input
          type="number"
          name="order"
          placeholder="Insert order"
          value={formData.order}
          onChange={handleChange}
          className={formInputClasses}
        />
        <input
          type="text"
          name="pages"
          placeholder="Insert pages"
          value={formData.pages}
          onChange={handleChange}
          className={formInputClasses}
        />

        <button
          type="button"
          onClick={handleSubmit}
          className={sendButtonClasses}
        >
          Send
        </button>
      </div>
    </div>
  );
}