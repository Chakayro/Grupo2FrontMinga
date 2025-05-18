
import UserCakeIcon from '../assets/cake.png'; 
import UserLocationIcon from '../assets/location.png';

function UserProfileContent() {
  const userProfile = {
    name: "Lucas Ezequiel",
    lastName: "Silva",
    location: "Caseros, Buenos Aires",
    joinDate: "28/12/2022",
    profileImageUrlForm: "",
    displayImageUrl: "https://thispersondoesnotexist.com/",
    birthDateDisplay: "16/02/2000"
  };

  return (
    // Reducimos el max-w para un contenedor general más pequeño y py para altura general
    <div className="w-full max-w-2xl py-2"> {/* Antes max-w-2xl, sin py */}
      {/* Aumentamos el gap para mayor separación entre columnas en desktop */}
      <div className="flex flex-col md:flex-row md:justify-around md:items-start gap-4 md:gap-12 lg:gap-66"> {/* md:gap-12/lg:gap-16 para más separación */}
        
        {/* Columna Izquierda: Formulario */}
        {/* Reducimos space-y y anchos. Mantenemos p-0.5 en inputs */}
        <div className="w-full md:w-3/5 lg:w-4/6 space-y-2 order-1 md:order-1"> {/* space-y-0.5, y anchos ajustados */}
          <div>
            <input 
              type="text" 
              defaultValue={userProfile.name}
              placeholder="Nombre(s)" 
              className="w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm" 
            />
          </div>
          <div>
            <input 
              type="text" 
              defaultValue={userProfile.lastName}
              placeholder="Apellido(s)" 
              className="w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm" 
            />
          </div>
          <div>
            <input 
              type="text" 
              defaultValue={userProfile.location}
              placeholder="Ciudad, País" 
              className="w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm" 
            />
          </div>
          <div>
            <input 
              type="text" 
              defaultValue={userProfile.joinDate}
              placeholder="Fecha (DD/MM/YYYY)" 
              className="w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm" 
            />
          </div>
          <div>
            <input 
              type="url" 
              defaultValue={userProfile.profileImageUrlForm}
              placeholder="URL Profile Image" 
              className="w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm" 
            />
          </div>
          
          {/* Reducimos padding y espacio en botones, y altura de botones */}
          <div className="pt-2 space-y-2"> {/* pt-2, space-y-1.5 */}
            <button 
              type="button"
              // Reducimos py, px y tamaño de texto
              className="w-full bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-4 rounded-full transition-colors shadow-xs text-sm"
            >
              Save
            </button>
            <button 
              type="button"
              className="w-full bg-pink-100 hover:bg-pink-200 text-red-500 font-semibold py-3 px-4 rounded-full transition-colors shadow-sm text-sm"
            >
              Delete Account
            </button>
          </div>
        </div>

        {/* Columna Derecha: Datos del Perfil con Foto */}
        {/* Ajustamos anchos y tamaños de elementos. Aseguramos centrado de imagen. */}
        <div className="w-full md:w-2/5 lg:w-1/2 flex flex-col items-center order-2 md:order-2 md:justify-center md:min-h-full pt-3 md:pt-14">
          {/* Contenedor interno para centrar todo el bloque de perfil a la derecha */}
          <div className="flex flex-col items-center w-full"> {/* items-center para centrar la imagen y el texto debajo */}
            {/* Reducimos tamaño de la imagen de perfil */}
            <img 
              src={userProfile.displayImageUrl} 
              alt="Profile" 
              // Tamaño de imagen más pequeño, mx-auto siempre para centrarla
              className="w-20 h-20 sm:w-27 sm:h-27 rounded-full object-cover shadow-md mb-2 border-2 border-white" 
            />
            {/* Reducimos tamaño de fuente del nombre y texto */}
            <h2 className="text-base sm:text-lg font-semibold text-gray-800 text-center">{userProfile.name} {userProfile.lastName}</h2>
            <div className="flex items-center text-gray-600 text-sm sm:text-sm mt-0.5">
              <img src={UserLocationIcon} alt="Location" className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
              <span>{userProfile.location}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm sm:text-sm mt-0.5">
              <img src={UserCakeIcon} alt="Cake" className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" />
              <span>{userProfile.birthDateDisplay}</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default UserProfileContent;