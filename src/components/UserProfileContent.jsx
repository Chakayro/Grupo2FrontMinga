// src/components/UserProfileContent.jsx
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

import { fetchAuthorById, updateAuthor, deleteAuthor } from '../store/actions/authorAction';

import UserLocationIcon from '../assets/location.png';
import UserCakeIcon from '../assets/cake.png';

const formInputClasses =
  "w-full p-0.5 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-xs placeholder-gray-400";
const buttonBase = "w-full font-semibold py-2 px-4 rounded-full transition-colors shadow-sm text-sm";
const saveButton = `${buttonBase} bg-teal-400 hover:bg-teal-500 text-white`;
const deleteButton = `${buttonBase} bg-pink-100 hover:bg-pink-200 text-red-500`;

const profileImage = "w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md border-2 border-white";
const nameClasses = "text-gray-800 text-center font-semibold hidden md:block md:text-lg md:mt-2";
const detailContainer = "flex items-center text-gray-600 mt-1 hidden md:flex md:text-sm";
const detailIcon = "w-3.5 h-3.5 mr-1.5";

export default function UserProfileContent() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Inicializa useNavigate
  const { author, status, error, message } = useSelector(state => state.author);
  const { user: authUser } = useSelector(state => state.auth);

  console.log("Estado actual del autor en Redux (UserProfileContent):", author);

  const [formData, setFormData] = useState({
    name: '',
    last_name: '',
    city: '',
    country: '',
    date: '',
    photo: '',
  });

  // Efecto para disparar la carga del autor
  useEffect(() => {
    if (authUser && status === 'idle') {
        dispatch(fetchAuthorById());
    }
  }, [dispatch, authUser, status]);

  // Efecto para rellenar el formulario y para redirigir después de eliminar
  useEffect(() => {
    let currentAuthorObject = null;

    // Lógica para obtener el objeto del autor, ya sea que venga en un array o directamente
    if (Array.isArray(author) && author.length > 0) {
      currentAuthorObject = author[0];
    } else if (author && typeof author === 'object' && !Array.isArray(author)) {
      currentAuthorObject = author;
    }

    // Si la carga fue exitosa y tenemos un objeto de autor, rellenamos el formulario
    if (status === 'success' && currentAuthorObject) {
      setFormData({
        name: currentAuthorObject.name || '',
        last_name: currentAuthorObject.last_name || '',
        city: currentAuthorObject.city || '',
        country: currentAuthorObject.country || '',
        date: currentAuthorObject.date ? new Date(currentAuthorObject.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '',
        photo: currentAuthorObject.photo || '',
      });
    }
    
    if (status === 'success' && message === 'Author successfully deleted') { 
        navigate('/home'); // Redirige al home
    }
    console.log("Estado del autor después de la carga:", author);
    console.log(status, );
    
    

  }, [author, status, message, navigate]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Obtenemos el ID del autor de forma segura
    const idToUpdate = (Array.isArray(author) && author.length > 0)
      ? author[0]._id
      : (author ? author._id : null);

    if (idToUpdate) {
      const dataToSave = { ...formData };

      // Conversión de fecha de DD/MM/YYYY a formato ISO para el backend
      if (dataToSave.date) {
        const parts = dataToSave.date.split('/');
        if (parts.length === 3) {
            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // Meses son 0-index en JavaScript
            const year = parseInt(parts[2], 10);

            const dateObject = new Date(year, month, day);

            if (isNaN(dateObject.getTime())) {
                console.error("Fecha inválida en el formulario:", dataToSave.date);
                // Aquí podrías mostrar un error visual al usuario
                return;
            }
            dataToSave.date = dateObject.toISOString();
        } else {
            console.error("Formato de fecha inválido. Se esperaba DD/MM/YYYY:", dataToSave.date);
            // Mostrar un mensaje al usuario
            return;
        }
      }

      dispatch(updateAuthor({ idauthor: idToUpdate, dataAutor: dataToSave }));
    } else {
      console.error("No se pudo obtener el ID del autor para actualizar.");
      // Mensaje de error al usuario
    }
  };

  const handleDeleteAccount = () => {
    // Obtenemos el ID del autor de forma segura para la eliminación
    const idToDelete = (Array.isArray(author) && author.length > 0)
      ? author[0]._id
      : (author ? author._id : null);

    if (idToDelete) {
      if (window.confirm("¿Estás seguro de que quieres eliminar tu perfil de autor? Esta acción es irreversible.")) {
        dispatch(deleteAuthor(idToDelete));
        // IMPORTANTE: NO se pone <Navigate /> aquí. La redirección se maneja en el useEffect.
      }
    } else {
      console.error("No se pudo obtener el ID del autor para eliminar.");
      // Mensaje de error al usuario
    }
  };

  // ----- Condiciones de Renderizado Temprano (para mostrar mensajes de estado) -----

  // Si el usuario no está autenticado
  if (!authUser) {
    return (
      <div className="w-full flex justify-center items-center h-40 text-gray-600">
        <p>Por favor, inicia sesión para ver tu perfil de autor.</p>
      </div>
    );
  }

  // Si los datos están cargando
  if (status === 'pending') {
    return (
      <div className="w-full flex justify-center items-center h-40">
        <p>Cargando información del autor...</p>
      </div>
    );
  }

  // Si no se encontró un autor después de la carga (o después de una eliminación exitosa)
  const noAuthorFound = !author || (Array.isArray(author) && author.length === 0);
  if (status !== 'pending' && noAuthorFound) {
    return (
      <div className="w-full flex flex-col justify-center items-center h-40 text-gray-600">
        <p>No se encontró un perfil de autor para este usuario.</p>
        {/* Muestra un mensaje adicional si existe (ej. "Autor eliminado exitosamente.") */}
        {message && <p className="text-green-500 mt-2">{message}</p>}
      </div>
    );
  }

  // Si hubo un error en la carga o cualquier operación
  if (status === 'failed') {
    return (
      <div className="w-full flex justify-center items-center h-40 text-red-500">
        <p>Error: {error}</p>
        <p>Por favor, intenta de nuevo o contacta a soporte.</p>
      </div>
    );
  }
    
  // Renderizado del formulario y detalles del perfil cuando el autor está cargado
  return (
    <div className="w-full flex flex-col md:flex-row md:justify-around items-center gap-y-8 md:gap-x-45">
      {/* Columna del perfil (imagen y detalles) */}
      <div className="w-full md:w-2/5 flex flex-col items-center order-1 md:order-2 md:pt-8">
        <img src={formData.photo || 'https://via.placeholder.com/96x96?text=No+Photo'} alt="Profile" className={`${profileImage} mb-2`} />
        <h2 className={nameClasses}>{formData.name}</h2>
        <h2 className={nameClasses}>{formData.last_name}</h2>
        <div className={detailContainer}>
          <img src={UserLocationIcon} alt="Location" className={detailIcon} />
          <span>{formData.city}, {formData.country}</span>
        </div>
        <div className={detailContainer}>
          <img src={UserCakeIcon} alt="Join Date" className={detailIcon} />
          <span>{formData.date}</span>
        </div>
      </div>

      {/* Columna del formulario */}
      <div className="w-full md:w-3/5 order-2 md:order-1">
        <div className="space-y-4 md:space-y-2">
          {/* Mensajes de éxito o error específicos de la operación */}
          {message && status === 'success' && <p className="text-green-500 text-center">{message}</p>}
          {error && status === 'failed' && <p className="text-red-500 text-center">{error}</p>}

          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" className={formInputClasses} />
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Apellido" className={formInputClasses} />
          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Ciudad" className={formInputClasses} />
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="País" className={formInputClasses} />
          <input type="text" name="date" value={formData.date} onChange={handleChange} placeholder="Fecha (DD/MM/YYYY)" className={formInputClasses} />
          <input type="url" name="photo" value={formData.photo} onChange={handleChange} placeholder="URL Foto de Perfil" className={formInputClasses} />
          
          <div className="pt-5 space-y-3 md:pt-2 md:space-y-2">
            <button type="button" onClick={handleSave} className={saveButton}>Save</button>
            <button type="button" onClick={handleDeleteAccount} className={deleteButton}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}