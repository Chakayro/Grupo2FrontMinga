
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