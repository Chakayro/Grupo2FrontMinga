import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const formInputClasses =
  "w-10/12 p-4 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors font-semibold text-sm placeholder-gray-500";
const sendButtonClasses =
  "w-9/12 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-4 rounded-full transition-colors shadow-md text-sm mt-16";
const formContainerClasses = "w-full max-w-xs space-y-3";
const titleClasses = "text-4xl font-semibold text-gray-600 text-center mb-6";

export default function NewChapterPage() {
  const {id} = useParams();
  const [error, setError] = useState(null);
  
  const token = useSelector(state => state.auth.token);

  console.log(token);
  

  const [formData, setFormData] = useState({
    title: '',
    order: '',
    pages: [] 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'pages') {
      setFormData(prev => ({ 
        ...prev, 
        [name]: value.split(',').map(url => url.trim()) 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      
      if (!formData.title || !formData.order || !formData.pages.length) {
        throw new Error('All fields are required');
      }

      if (!token) {
        throw new Error('There is no authentication token');
      }

      const response = await fetch(`http://localhost:8080/api/chapter/create/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          order: Number(formData.order),
          pages: formData.pages
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error creating chapter');
      }

      const data = await response.json();
      console.log('Chapter created:', data);
      setError(null);

      setFormData({
        title: '',
        order: '',
        pages: []
      });
      
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className={formContainerClasses}>
        <h1 className={titleClasses}>New Chapter</h1>

        {error && (
          <div className="text-red-500 text-sm text-center">
            {error}
          </div>
        )}

        <input
          type="text"
          name="title"
          placeholder="Insert title"
          value={formData.title}
          onChange={handleChange}
          className={formInputClasses}
          required
        />
        <input
          type="number"
          name="order"
          placeholder="Insert order"
          value={formData.order}
          onChange={handleChange}
          className={formInputClasses}
          required
        />
        <input
          type="text"
          name="pages"
          placeholder="Insert pages (comma-separated URLs)"
          value={formData.pages.join(', ')}
          onChange={handleChange}
          className={formInputClasses}
          required
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