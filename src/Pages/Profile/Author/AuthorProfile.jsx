
import UserProfileContent from '../../../components/UserProfileContent';
import AuthorImage from '../../../assets/backgroundPrincipal.png';

export default function AuthorProfile() {
  return (
    <div className="w-full h-screen bg-gray-100 flex flex-col justify-end items-center relative">
      {/* Top background */}
      <div className="absolute top-0 w-full h-8/12">
        <img
          src={AuthorImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Profile</h1>
        </div>
      </div>

      {/* Content card */}
      <div className="absolute w-full h-full md:w-11/12 md:h-7/12 bg-white rounded-t-xl shadow-lg md:shadow-lg">
        <div className="h-full w-full flex items-center justify-center p-4">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-2xl">
            <UserProfileContent />
          </div>
        </div>
     </div>
    </div>
  );
}

