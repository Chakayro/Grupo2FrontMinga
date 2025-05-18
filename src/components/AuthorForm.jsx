import { useState } from 'react';
import userImage from '../assets/user.png';

const CreateAuthor = () => {
const [author, setAuthor] = useState({
    name: '',
    lastName: '',
    city: '',
    birthDate: '',
    photo: ''
});

const handleChange = (e) => {
    setAuthor({ ...author, [e.target.name]: e.target.value });
};

const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Author:', author);
    // Aquí va el dispatch
};

return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center  w-full md:w-1/2">
    <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg  flex flex-col items-center space-y-4 w-full max-w-sm"
    >
        <h2 className="text-2xl font-semibold text-center">New Author</h2>
        <img src={userImage} alt="Author" className="rounded-full w-20 h-20 object-cover" />
        <input
        type="text"
        name="name"
        placeholder="First Name"
        value={author.name}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={author.lastName}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="text"
        name="city"
        placeholder="City, Country"
        value={author.city}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="date"
        name="birthDate"
        value={author.birthDate}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <input
        type="url"
        name="photo"
        placeholder="URL Profile Image"
        value={author.photo}
        onChange={handleChange}
        className="border-b border-gray-500 outline-none w-full"
        />
        <button className="bg-orange-500 text-white font-semibold px-6 py-2 rounded-full hover:bg-orange-600 transition">
        Send
        </button>
    </form>
    </div>
);
};

export default CreateAuthor;
