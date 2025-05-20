// src/components/UserProfileContent.jsx
import UserLocationIcon from '../assets/location.png'
import UserCakeIcon from '../assets/cake.png';

const formInputClasses =
  "w-full p-2 border-b-2 border-gray-300 focus:border-teal-500 bg-transparent focus:outline-none transition-colors text-sm placeholder-gray-400";
const buttonBase = "w-full font-semibold py-3 px-4 rounded-full transition-colors shadow-sm text-sm";
const saveButton = `${buttonBase} bg-teal-400 hover:bg-teal-500 text-white`;
const deleteButton = `${buttonBase} bg-pink-100 hover:bg-pink-200 text-red-500`;

const profileImage = "w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-md border-2 border-white";
const nameClasses = "text-gray-800 text-center font-semibold hidden md:block md:text-lg md:mt-2";
const detailContainer = "flex items-center text-gray-600 mt-1 hidden md:flex md:text-sm";
const detailIcon = "w-3.5 h-3.5 mr-1.5";

export default function UserProfileContent() {
  const user = {
    firstName: "Lucas Ezequiel",
    lastName: "Silva",
    location: "Caseros, Buenos Aires",
    joinDate: "28/12/2022",
    profileImg: "https://thispersondoesnotexist.com/",
    imageUrlField: "",
  };

  return (
    <div className="w-full flex flex-col md:flex-row md:justify-around items-center gap-y-8 md:gap-x-12">
      {/* Profile column */}
      <div className="w-full md:w-2/5 flex flex-col items-center order-1 md:order-2 md:pt-8">
        <img src={user.profileImg} alt="Profile" className={`${profileImage} mb-2`} />
        <h2 className={nameClasses}>{user.firstName} {user.lastName}</h2>
        <div className={detailContainer}>
          <img src={UserLocationIcon} alt="Location" className={detailIcon} />
          <span>{user.location}</span>
        </div>
        <div className={detailContainer}>
          <img src={UserCakeIcon} alt="Birthday" className={detailIcon} />
          <span>{user.joinDate}</span>
        </div>
      </div>

      {/* Form column */}
      <div className="w-full md:w-3/5 order-2 md:order-1">
        <div className="space-y-4 md:space-y-2">
          <input type="text" defaultValue={user.firstName} placeholder="Nombre(s)" className={formInputClasses} />
          <input type="text" defaultValue={user.lastName} placeholder="Apellido(s)" className={formInputClasses} />
          <input type="text" defaultValue={user.location} placeholder="Ciudad, País" className={formInputClasses} />
          <input type="text" defaultValue={user.joinDate} placeholder="Fecha (DD/MM/YYYY)" className={formInputClasses} />
          <input type="url" defaultValue={user.imageUrlField} placeholder="URL Profile Image" className={formInputClasses} />
          <div className="pt-5 space-y-3 md:pt-2 md:space-y-2">
            <button type="button" className={saveButton}>Save</button>
            <button type="button" className={deleteButton}>Delete Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}