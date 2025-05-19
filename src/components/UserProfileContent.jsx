// src/components/UserProfileContent.jsx
import React from 'react';
import UserCakeIcon from '../assets/cake.png'; 
import UserLocationIcon from '../assets/location.png';

// --- Clases de Estilo ---
// Estilos base son para MÓVIL, y los prefijos md: son para PC (desktop).

// Form Inputs: text-sm is fine for both.
const formInputClasses = "w-full p-0 pl-1 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm";

// Form Buttons: py-3 px-4 text-sm is fine for both.
const formButtonBaseClasses = "w-full font-semibold py-3 px-4 rounded-full transition-colors shadow-sm text-sm";
const saveButtonClasses = `${formButtonBaseClasses} bg-teal-400 hover:bg-teal-500 text-white`;
const deleteButtonClasses = `${formButtonBaseClasses} bg-pink-100 hover:bg-pink-200 text-red-500`;

// Profile Image:
// Mobile: w-20 h-20 (as per EditAuthor.png)
// PC: Your sm:w-27 sm:h-27 was non-standard. I'll use md:w-24 md:h-24 as a common PC size.
// If your PC size was different and defined by w-20 h-25 (non-standard), we need to clarify.
// For now: mobile default, md: for PC.
const profileImageClasses = "w-20 h-20 md:w-27 md:h-27 rounded-full object-cover shadow-md border-2 border-white"; 
// Margin bottom for image: mb-0 for mobile (no text below), md:mb-2 for PC (to space from text details)

// Profile Name & Details: Hidden on mobile, visible on PC.
// PC styles for these are taken from your last UserProfileContent.jsx (sm:text-lg, sm:text-sm, etc. will become md:text-lg, md:text-sm)
const profileNameClasses = "text-gray-800 text-center font-semibold hidden md:block md:text-lg md:mt-2"; // PC: text-lg, mt-2
const profileDetailContainerClasses = "items-center text-gray-600 mt-0.5 hidden md:flex md:text-sm md:mt-1"; // PC: text-sm, mt-1
const profileDetailIconClasses = "w-3 h-3 md:w- md:h-3.5 mr-1 md:mr-1.5"; // PC: w-3.5 h-3.5, mr-1.5

function UserProfileContent() {
  // Datos del perfil actualizados según la imagen image_935e6d.png
  const userProfile = {
    name: "Lucas Ezequiel",
    lastName: "Silva",
    location: "Caseros, Buenos Aires", // Este es el que se muestra debajo de la foto en PC
    joinDate: "28/12/2022",          // Este es el que aparece en el campo del formulario "Fecha (DD/MM/YYYY)"
    profileImageUrlForm: "",         // El campo "URL Profile Image" está vacío en la imagen
    displayImageUrl: "https://thispersondoesnotexist.com/", // Se mantiene para la foto de perfil
    birthDateDisplay: "16/02/2000"   // Este dato no está en la imagen de los campos, se mantiene el valor anterior. Se muestra debajo de la foto en PC.
  };

  return (
    // This component returns two main divs.
    // Their layout (flex-col vs md:flex-row, order, gap, max-w) is controlled by the div in Author.jsx
    <div className="w-full flex flex-col md:flex-row md:justify-around items-center md:items-start gap-y-8 md:gap-x-12 lg:gap-x-50">
      
      {/* Sección de Datos del Perfil con Foto */}
      {/* Móvil: order-1 (arriba). PC: md:order-2 (derecha). */}
      <div className={`w-full order-1 md:order-2 md:w-2/5 lg:w-1/2 flex flex-col items-center md:pt-13`}>
        <div className="flex flex-col items-center w-full">
          <img 
            src={userProfile.displayImageUrl} 
            alt="Profile" 
            className={`${profileImageClasses} mb-0 md:mb-2`} // Mobile: no margin bottom. PC: margin bottom.
          />
          {/* Text details are hidden on mobile, visible on PC via their specific classes */}
          <h2 className={profileNameClasses}>{userProfile.name} {userProfile.lastName}</h2>
          <div className={profileDetailContainerClasses}>
            <img src={UserLocationIcon} alt="Location" className={profileDetailIconClasses} />
            {/* En PC, debajo de la foto, se muestra userProfile.location */}
            <span>{userProfile.location}</span> 
          </div>
          <div className={profileDetailContainerClasses}>
            <img src={UserCakeIcon} alt="Cake" className={profileDetailIconClasses} />
            {/* En PC, debajo de la foto, se muestra userProfile.birthDateDisplay */}
            <span>{userProfile.birthDateDisplay}</span>
          </div>
        </div>
      </div>

      {/* Sección del Formulario */}
      {/* Móvil: order-2 (abajo). PC: md:order-1 (izquierda). */}
      <div className={`w-full order-2 md:order-1 md:w-3/5 lg:w-1/2`}>
        {/* Espaciado interno del formulario: móvil space-y-4, PC md:space-y-2 */}
        <div className="space-y-5 md:space-y-2"> 
          <div>
            <input type="text" defaultValue={userProfile.name} placeholder="Nombre(s)" className={formInputClasses} />
          </div>
          <div>
            <input type="text" defaultValue={userProfile.lastName} placeholder="Apellido(s)" className={formInputClasses} />
          </div>
          <div>
            {/* Este input en el formulario usa userProfile.location */}
            <input type="text" defaultValue={userProfile.location} placeholder="Ciudad, País" className={formInputClasses} />
          </div>
          <div>
            {/* Este input en el formulario usa userProfile.joinDate */}
            <input type="text" defaultValue={userProfile.joinDate} placeholder="Fecha (DD/MM/YYYY)" className={formInputClasses} />
          </div>
          <div>
            <input type="url" defaultValue={userProfile.profileImageUrlForm} placeholder="URL Profile Image" className={formInputClasses} />
          </div>
          {/* Espaciado para botones: móvil pt-4 space-y-3, PC md:pt-2 md:space-y-2 */}
          <div className="pt-5 space-y-3 md:pt-2 md:space-y-2"> 
            <button type="button" className={saveButtonClasses}>Save</button>
            <button type="button" className={deleteButtonClasses}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfileContent;
