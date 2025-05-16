import React, { useState } from 'react';
import Users from '../assets/Users.png'; // Asegúrate que la ruta es correcta
import RedTeamImg from '../assets/redteam.jpg'; // Renombrado para claridad
import BlueTeamImg from '../assets/blueteam.jpg'; // Renombrado para claridad
import OrangeTeamImg from '../assets/orangeteam.jpg'; // Renombrado para claridad
import PurpleTeamImg from '../assets/purpleteam.jpg'; // Renombrado para claridad

// Componente Interruptor (simulado)
const ToggleSwitch = ({ enabled }) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  return (
    <button
      onClick={() => setIsEnabled(!isEnabled)}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none ${
        isEnabled ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
          isEnabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
};

const TableComponent = () => {
  const [activeTab, setActiveTab] = useState('companies'); // 'companies' o 'authors'

  return (
    <div className="w-full max-w-xl "> {/* Manteniendo la restricción de ancho original */}
      <div className="bg-gray-100 shadow-lg rounded-lg  overflow-hidden border border-gray-300">
        {/* Pestañas de Encabezado */}
        <div className="flex border-b border-orange-600">
          <button
            onClick={() => setActiveTab('companies')}
            className={`py-2 px-6 font-semibold text-xs focus:outline-none w-1/2 text-center transition-colors duration-150
              ${activeTab === 'companies'
                ? 'bg-orange-500 text-white rounded-tl-lg'
                : 'text-orange-500 hover:bg-orange-50'
              }`}
          >
            Companies
          </button>
          <button
            onClick={() => setActiveTab('authors')}
            className={`py-2 px-4 font-semibold text-xs focus:outline-none w-1/2 text-center transition-colors duration-150
              ${activeTab === 'authors'
                ? 'bg-orange-500 text-white rounded-tr-lg'
                : 'text-orange-500 hover:bg-orange-50'
              }`}
          >
            Authors
          </button>
        </div>

        {/* Contenido de la Tabla */}
        {activeTab === 'companies' && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-gray-100 divide-y divide-gray-200">

                <tr className="hover:bg-gray-10 transition-colors duration-150">
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap"> 
                    <div className="flex items-center">
                      <img src={Users} alt="Users Icon" className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                      <div className="text-xs font-medium text-gray-900">Blue Team</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap text-xs text-gray-600">
                    www.blueteam.com
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap hidden sm:table-cell">
                    <img
                      src={BlueTeamImg}
                      alt="Blue Team Logo"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                   
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap"> 
                     <div className=''></div>
                    <ToggleSwitch enabled={true} />
                  </td>
                </tr>


                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={Users} alt="Users Icon" className="w-5 h-5 sm:w-5 sm:w-5 mr-2 sm:mr-3" />
                      <div className="text-xs font-medium text-gray-900">Red Team</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap text-xs text-gray-600">
                    www.redteam.com
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap hidden sm:table-cell">
                    <img
                      src={RedTeamImg}
                      alt="Red Team Logo"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap">
                    <ToggleSwitch enabled={true} />
                  </td>
                </tr>


                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap"> 
                    <div className="flex items-center">
                      <img src={Users} alt="Users Icon" className="w-5 h-5 sm:w-5 sm:w-5 mr-2 sm:mr-3" />
                      <div className="text-xs font-medium text-gray-900">Orange Team</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap text-xs text-gray-600"> 
                    www.orangeteam.com
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap hidden sm:table-cell">
                    <img
                      src={OrangeTeamImg}
                      alt="Orange Team Logo"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap">
                    <ToggleSwitch enabled={true} />
                  </td>
                </tr>


                <tr className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={Users} alt="Users Icon" className="w-5 h-5 sm:w-5 mr-2 sm:mr-3" />
                      <div className="text-xs font-medium text-gray-900">Purple Team</div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap text-xs text-gray-600">
                    www.purpleteam.com
                  </td>
                  <td className="px-4 sm:px-5 py-0.5 whitespace-nowrap hidden sm:table-cell">
                    <img
                      src={PurpleTeamImg}
                      alt="Purple Team Logo"
                      className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover"
                    />
                  </td>
                  <td className="px-0 sm:px-5 py-0.5 whitespace-nowrap">
                    <ToggleSwitch enabled={true} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'authors' && (
          <div className="p-6 text-center">
            <p className="text-gray-500">Contenido de Authors aquí.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TableComponent;