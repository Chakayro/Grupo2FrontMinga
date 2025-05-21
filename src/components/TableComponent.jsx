// src/components/TableComponent.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usersIcon from '../assets/users.png';
import { fetchAdminPanel, resetAdminPanel, toggleUser } from '../store/actions/adminAction';

const cell = 'px-4 py-2 whitespace-nowrap text-sm';
const icon = 'w-5 h-5 mr-2';
const logo = 'w-7 h-7 rounded-full object-cover';

const ToggleSwitch = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative inline-flex items-center h-6 w-11 rounded-full transition ${
      enabled ? 'bg-orange-500' : 'bg-gray-300'
    }`}
  >
    <span
      className={`inline-block w-4 h-4 transform bg-white rounded-full transition ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
);

export default function TableComponent() {
  const dispatch = useDispatch();
  const { authors, companies, status, error } = useSelector(s => s.admin);

  // **Estado local** para renderizado inmediato
  const [localAuthors, setLocalAuthors]     = useState([]);
  const [localCompanies, setLocalCompanies] = useState([]);
  const [tab, setTab]                       = useState('companies');

  // Al montar: traer panel y poblar estado local
  useEffect(() => {
    dispatch(fetchAdminPanel());
    return () => { dispatch(resetAdminPanel()); };
  }, [dispatch]);

  // Cuando cambie el store, sincronizar el local
  useEffect(() => {
    if (status === 'succeeded') {
      setLocalAuthors(authors);
      setLocalCompanies(companies);
    }
  }, [status, authors, companies]);

  if (status === 'pending') return <div>Cargando...</div>;
  if (status === 'failed')  return <div>Error: {error}</div>;

  const handleToggle = (typeUser, iduser) => {
    // 1) Optimistically actualizo UI local
    if (typeUser === 'company_id') {
      setLocalCompanies(comps =>
        comps.map(c => c._id === iduser ? { ...c, active: !c.active } : c)
      );
    } else {
      setLocalAuthors(aus =>
        aus.map(a => a._id === iduser ? { ...a, active: !a.active } : a)
      );
    }
    // 2) Despacho la acción al backend (el store también se actualizará cuando llegue la respuesta)
    dispatch(toggleUser({ typeUser, iduser }));
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded shadow p-4">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 ${tab==='companies'? 'bg-orange-500 text-white':'text-orange-500'}`}
          onClick={()=>setTab('companies')}
        >Companies</button>
        <button
          className={`flex-1 py-2 ${tab==='authors'? 'bg-orange-500 text-white':'text-orange-500'}`}
          onClick={()=>setTab('authors')}
        >Authors</button>
      </div>

      {tab === 'companies' && (
        <table className="w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {localCompanies.map(c => (
              <tr key={c._id} className="hover:bg-gray-50">
                <td className={cell}>
                  <div className="flex items-center">
                    <img src={usersIcon} className={icon} />
                    <span>{c.name}</span>
                  </div>
                </td>
                <td className={`${cell} text-gray-600`}>{c.website}</td>
                <td className={cell}>
                  <img src={c.photo} className={logo} />
                </td>
                <td className={cell}>
                  <ToggleSwitch
                      enabled={c.active}         
                      onToggle={()=>handleToggle('company_id',c._id)}
                    />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {tab === 'authors' && (
        <table className="w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {localAuthors.map(a => (
              <tr key={a._id} className="hover:bg-gray-50">
                <td className={cell}>
                  <div className="flex items-center">
                    <img src={usersIcon} className={icon} />
                    <span>{a.name}</span>
                  </div>
                </td>
                <td className={`${cell} text-gray-600`}>{a.city}</td>
                <td className={`${cell} text-gray-600`}>{a.country}</td>
                <td className={cell}>
                  <img src={a.photo} className={logo} />
                </td>
                <td className={cell}>
                  <ToggleSwitch
                    enabled={a.active}
                    onToggle={()=>handleToggle('author_id',a._id)}
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
