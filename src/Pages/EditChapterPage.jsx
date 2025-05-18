// src/pages/EditChapterPage.jsx
import React from 'react';
// Importa tus componentes de layout si los necesitas, ej:
// import BgUp from "../components/BgUp";
// import BgBt from "../components/BGBT";
import EditChapterForm from '../components/EditChapterForm'; // Asegúrate de que la ruta sea correcta

// Asume que importarás la imagen del cómic aquí
import MyComicCover from '../assets/naruto.png'; // CAMBIA ESTA RUTA

function EditChapterPage() {
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4"> {/* Fondo y centrado */}
      <EditChapterForm comicCoverImageUrl={MyComicCover} />
    </div>

 
  );
}

export default EditChapterPage;