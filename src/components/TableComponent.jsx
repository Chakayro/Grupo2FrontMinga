// src/components/TableComponent.jsx
import React, { useState } from 'react';
import Users from '../assets/Users.png'; 
import RedTeamImg from '../assets/redteam.jpg'; 
import BlueTeamImg from '../assets/blueteam.jpg'; 
import OrangeTeamImg from '../assets/orangeteam.jpg';
import PurpleTeamImg from '../assets/purpleteam.jpg';

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-200 ease-in-out focus:outline-none ${
      enabled ? 'bg-orange-500' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-200 ease-in-out ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

// Clases comunes para mantener consistencia y facilitar ajustes de tamaño
const commonCellClasses = "px-1 md:px-5 py-1 whitespace-nowrap text-xs md:text-sm "; 
const iconInCellClasses = "w-4 h- md:w-6 md:h-6 mr-1.5 md:mr-3";
const logoInCellClasses = "w-5 h-5 md:w-7 md:h-7 rounded-full object-cover"; // Para logos y avatares

const TableComponent = () => {
  const [activeTab, setActiveTab] = useState('companies');
  
  const [companies, setCompanies] = useState([
    { id: 1, name: 'Blue Team', website: 'www.blueteam.com', teamLogo: BlueTeamImg, active: true },
    { id: 2, name: 'Red Team', website: 'www.redteam.com', teamLogo: RedTeamImg, active: true },
    { id: 3, name: 'Orange Team', website: 'www.orangeteam.com', teamLogo: OrangeTeamImg, active: true },
    { id: 4, name: 'Purple Team', website: 'www.purpleteam.com', teamLogo: PurpleTeamImg, active: true },
  ]);

  const [authors, setAuthors] = useState([
   
    { id: 1, name: 'Lucas Silva', date: '16/02/2000', location: 'Caseros', avatarUrl: 'https://thispersondoesnotexist.com/', active: true },
    { id: 2, name: 'Alejo Villafañe', date: '11/06/1981', location: 'CABA', avatarUrl: 'https://thispersondoesnotexist.com/', active: true },
    { id: 3, name: 'Ignacio Borraz', date: '25/04/1990', location: 'Cordoba', avatarUrl: 'https://thispersondoesnotexist.com/', active: false },
    { id: 4, name: 'Eric Rodriguez 👽', date: '04/01/2000', location: 'Corrientes', avatarUrl: 'https://thispersondoesnotexist.com/', active: true },
  ]);

  const handleCompanyToggle = (companyId) => {
    setCompanies(prevCompanies => 
      prevCompanies.map(company => 
        company.id === companyId ? { ...company, active: !company.active } : company
      )
    );
  };

  const handleAuthorToggle = (authorId) => {
    setAuthors(prevAuthors =>
      prevAuthors.map(author => 
        author.id === authorId ? { ...author, active: !author.active } : author
      )
    );
  };

  return (
    <div className="w-full md:w-xl"> {/* Puedes ajustar max-w-xl, max-w-2xl, etc. */}
      <div className="bg-gray-100 shadow-lg rounded-lg overflow-hidden border border-gray-300">
        <div className="flex border-b border-orange-600">
          {/* Botones de Pestañas Optimizados */}
          {[{id: 'companies', label: 'Companies'}, {id: 'authors', label: 'Authors'}].map((tabInfo, index) => (
            <button
              key={tabInfo.id}
              onClick={() => setActiveTab(tabInfo.id)}
              className={`py-2 px-6 font-semibold text-sm w-1/2 text-center transition-colors duration-150
                ${activeTab === tabInfo.id ? 'bg-orange-500 text-white' : 'text-orange-500 hover:bg-orange-50'}
                ${index === 0 && activeTab === tabInfo.id ? 'rounded-tl-lg' : ''}
                ${index === 1 && activeTab === tabInfo.id ? 'rounded-tr-lg' : ''}
              `}
            >
              {tabInfo.label}
            </button>
          ))}
        </div>

        {/* Contenedor para las tablas (usando 'hidden') */}
        <div>
          {/* Tabla de Companies */}
          <div className={`overflow-x-auto ${activeTab === 'companies' ? '' : 'hidden'}`}>
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-gray-100 divide-y divide-gray-200">
                {companies.map((company) => (
                  <tr key={`company-${company.id}`} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className={commonCellClasses}> 
                      <div className="flex items-center">
                        <img src={Users} alt="Users Icon" className={iconInCellClasses} />
                        <div className="font-medium text-gray-900">{company.name}</div>
                      </div>
                    </td>
                    <td className={`${commonCellClasses} text-gray-600`}>{company.website}</td>
                    {/* Celda de Logo específica para Companies */}
                    <td className={`${commonCellClasses}  sm:table-cell`}>
                      <img src={company.teamLogo} alt={`${company.name} Logo`} className={logoInCellClasses} />
                    </td>
                    <td className={commonCellClasses}> 
                      <ToggleSwitch enabled={company.active} onToggle={() => handleCompanyToggle(company.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tabla de Authors */}
          <div className={`overflow-x-auto ${activeTab === 'authors' ? '' : 'hidden'}`}>
            <table className="min-w-full divide-y divide-gray-200">
              <tbody className="bg-gray-100 divide-y divide-gray-200">
                {authors.map((author) => ( 
                  <tr key={`author-${author.id}`} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className={commonCellClasses}>
                      <div className="flex items-center">
                        <img src={Users} alt="User Icon" className={iconInCellClasses} />
                        <div className="font-medium text-gray-900">{author.name}</div>
                      </div>
                    </td>
                    {/* Celdas específicas para Authors */}
                    <td className={`${commonCellClasses} text-gray-600`}>{author.date}</td>
                    <td className={`${commonCellClasses} text-gray-600`}>{author.location}</td>
                    <td className={commonCellClasses}> {/* Celda para Avatar */}
                      <img src={author.avatarUrl} alt={`${author.name} Avatar`} className={logoInCellClasses} />
                    </td>
                    <td className={commonCellClasses}>
                      <ToggleSwitch enabled={author.active} onToggle={() => handleAuthorToggle(author.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;