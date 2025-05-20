// src/components/TableComponent.jsx
import React, { useState } from 'react';
import Users from '../assets/users.png';
import RedTeamImg from '../assets/redteam.jpg';
import BlueTeamImg from '../assets/blueteam.jpg';
import OrangeTeamImg from '../assets/orangeteam.jpg';
import PurpleTeamImg from '../assets/purpleteam.jpg';

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition-colors duration-200 ease-in-out focus:outline-none ${
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

const cellClasses = 'px-4 py-2 whitespace-nowrap text-sm';
const iconClasses = 'w-5 h-5 mr-2';
const logoClasses = 'w-7 h-7 rounded-full object-cover';
const tabButton = (active) =>
  `flex-1 text-center py-2 font-semibold text-sm transition-colors duration-150 ${
    active ? 'bg-orange-500 text-white' : 'text-orange-500 hover:bg-orange-50'
  }`;

export default function TableComponent() {
  const [activeTab, setActiveTab] = useState('companies');

  const [companies, setCompanies] = useState([
    { id: 1, name: 'Blue Team', website: 'www.blueteam.com', logo: BlueTeamImg, active: true },
    { id: 2, name: 'Red Team', website: 'www.redteam.com', logo: RedTeamImg, active: true },
    { id: 3, name: 'Orange Team', website: 'www.orangeteam.com', logo: OrangeTeamImg, active: true },
    { id: 4, name: 'Purple Team', website: 'www.purpleteam.com', logo: PurpleTeamImg, active: true },
  ]);

  const [authors, setAuthors] = useState([
    { id: 1, name: 'Lucas Silva', date: '16/02/2000', location: 'Caseros', avatar: 'https://thispersondoesnotexist.com/', active: true },
    { id: 2, name: 'Alejo Villafañe', date: '11/06/1981', location: 'CABA', avatar: 'https://thispersondoesnotexist.com/', active: true },
    { id: 3, name: 'Ignacio Borraz', date: '25/04/1990', location: 'Cordoba', avatar: 'https://thispersondoesnotexist.com/', active: false },
    { id: 4, name: 'Eric Rodriguez 👽', date: '04/01/2000', location: 'Corrientes', avatar: 'https://thispersondoesnotexist.com/', active: true },
  ]);

  const toggleActive = (list, setList, id) => {
    setList(list.map(item =>
      item.id === id ? { ...item, active: !item.active } : item
    ));
  };

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="flex border-b border-orange-500">
        <button className={tabButton(activeTab === 'companies')} onClick={() => setActiveTab('companies')}>Companies</button>
        <button className={tabButton(activeTab === 'authors')} onClick={() => setActiveTab('authors')}>Authors</button>
      </div>

      {activeTab === 'companies' && (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map(c => (
              <tr key={c.id} className="hover:bg-gray-50">
                <td className={cellClasses}>
                  <div className="flex items-center">
                    <img src={Users} alt="Icon" className={iconClasses} />
                    <span className="font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className={`${cellClasses} text-gray-600`}>{c.website}</td>
                <td className={cellClasses}><img src={c.logo} alt="logo" className={logoClasses} /></td>
                <td className={cellClasses}>
                  <ToggleSwitch enabled={c.active} onToggle={() => toggleActive(companies, setCompanies, c.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'authors' && (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map(a => (
              <tr key={a.id} className="hover:bg-gray-50">
                <td className={cellClasses}>
                  <div className="flex items-center">
                    <img src={Users} alt="Icon" className={iconClasses} />
                    <span className="font-medium text-gray-900">{a.name}</span>
                  </div>
                </td>
                <td className={`${cellClasses} text-gray-600`}>{a.date}</td>
                <td className={`${cellClasses} text-gray-600`}>{a.location}</td>
                <td className={cellClasses}><img src={a.avatar} alt="avatar" className={logoClasses} /></td>
                <td className={cellClasses}>
                  <ToggleSwitch enabled={a.active} onToggle={() => toggleActive(authors, setAuthors, a.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
