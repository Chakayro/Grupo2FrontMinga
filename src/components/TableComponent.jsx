// src/components/TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import users from '../assets/users.png';
import { fetchAdminPanel, resetAdminPanel } from '../store/actions/adminAction';

const cellClasses = 'px-4 py-2 whitespace-nowrap text-sm';
const iconClasses = 'w-5 h-5 mr-2';
const logoClasses = 'w-7 h-7 rounded-full object-cover';
const tabButton = (active) =>
  `flex-1 text-center py-2 font-semibold text-sm transition-colors duration-150 ${
    active ? 'bg-orange-500 text-white' : 'text-orange-500 hover:bg-orange-50'
  }`;

export default function TableComponent() {
  const dispatch = useDispatch();
 const { authors = [], companies = [], status,error } = useSelector(state => state.admin || {});
console.log('autores', authors);
console.log('companias', companies);

  const [activeTab, setActiveTab] = useState('companies');

  useEffect(() => {
    dispatch(fetchAdminPanel());
    return () => {
      dispatch(resetAdminPanel());
    };
  }, [dispatch]);

  if (status === 'pending') {
    return <div className="p-4 text-center">Cargando...</div>;
  }
  if (status === 'failed') {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="w-full max-w-3xl bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="flex border-b border-orange-500">
        <button
          className={tabButton(activeTab === 'companies')}
          onClick={() => setActiveTab('companies')}
        >
          Companies
        </button>
        <button
          className={tabButton(activeTab === 'authors')}
          onClick={() => setActiveTab('authors')}
        >
          Authors
        </button>
      </div>

      {activeTab === 'companies' && (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((c) => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className={cellClasses}>
                  <div className="flex items-center">
                    <img src={users} alt="Icon" className={iconClasses} />
                    <span className="font-medium text-gray-900">{c.name}</span>
                  </div>
                </td>
                <td className={`${cellClasses} text-gray-600`}>{c.website}</td>
                <td className={cellClasses}>
                  <img src={c.photo} alt="logo" className={logoClasses} />
                </td>
                <td className={cellClasses}>
                  <ToggleSwitch
                    enabled={c.active}
                    onToggle={() => {
                      /* aquí podrías despachar otra acción para toggle en server */
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === 'authors' && (
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {authors.map((a) => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className={cellClasses}>
                  <div className="flex items-center">
                    <img src={users} alt="Icon" className={iconClasses} />
                    <span className="font-medium text-gray-900">{a.name}</span>
                  </div>
                </td>
                <td className={`${cellClasses} text-gray-600`}>{a.city}</td>
                <td className={`${cellClasses} text-gray-600`}>{a.country}</td>
                <td className={cellClasses}>
                  <img src={a.photo} alt="avatar" className={logoClasses} />
                </td>
                <td className={cellClasses}>
                  <ToggleSwitch
                    enabled={a.active}
                    onToggle={() => {
                      /* idem para authors */
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}


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

