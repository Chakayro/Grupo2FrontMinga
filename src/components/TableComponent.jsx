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

  const [localAuthors, setLocalAuthors]     = useState([]);
  const [localCompanies, setLocalCompanies] = useState([]);
  const [tab, setTab]                       = useState('companies');

  useEffect(() => {
    dispatch(fetchAdminPanel());
    return () => { dispatch(resetAdminPanel()); };
  }, [dispatch]);

  useEffect(() => {
    if (status === 'succeeded') {
      setLocalAuthors(authors);
      setLocalCompanies(companies);
    }
  }, [status, authors, companies]);

  if (status === 'pending') return <div className="p-4 text-center">Cargando...</div>;
  if (status === 'failed')  return <div className="p-4 text-red-500">Error: {error}</div>;

  const handleToggle = (typeUser, iduser) => {
    if (typeUser === 'company_id') {
      setLocalCompanies(comps =>
        comps.map(c => c._id === iduser ? { ...c, active: !c.active } : c)
      );
    } else {
      setLocalAuthors(aus =>
        aus.map(a => a._id === iduser ? { ...a, active: !a.active } : a)
      );
    }
    dispatch(toggleUser({ typeUser, iduser }));
  };

  return (
    <div className="mx-auto bg-white rounded shadow py-4 px-2 max-w-3xl">
      {/* Pestañas centradas y ancho fijo */}
      <div className="flex mb-4 w-full max-w-xs mx-auto">
        <button
          className={`flex-1 text-center py-2 rounded-l ${
            tab === 'companies'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setTab('companies')}
        >
          Companies
        </button>
        <button
          className={`flex-1 text-center py-2 rounded-r ${
            tab === 'authors'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
          onClick={() => setTab('authors')}
        >
          Authors
        </button>
      </div>

      {/* Scroll horizontal en móvil, ancho mínimo para tablas */}
      <div className="overflow-x-auto">
        <table className="min-w-[300px] w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            {(tab === 'companies' ? localCompanies : localAuthors).map(item => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className={cell}>
                  <div className="flex items-center">
                    <img src={usersIcon} className={icon} alt="icon" />
                    <span>{item.name}</span>
                  </div>
                </td>

                {/* En md+ muestro las columnas extra en orden */}
                {tab === 'companies' ? (
                  <>
                    <td className={`${cell} hidden md:table-cell text-gray-600`}>
                      {item.website}
                    </td>
                  </>
                ) : (
                  <>
                    <td className={`${cell} hidden md:table-cell text-gray-600`}>
                      {item.city}
                    </td>
                    <td className={`${cell} hidden md:table-cell text-gray-600`}>
                      {item.country}
                    </td>
                  </>
                )}

                <td className={`${cell} hidden md:table-cell`}>
                  <img
                    src={tab === 'companies' ? item.photo : item.photo}
                    className={logo}
                    alt="avatar/logo"
                  />
                </td>

                <td className={cell}>
                  <ToggleSwitch
                    enabled={item.active}
                    onToggle={() =>
                      handleToggle(
                        tab === 'companies' ? 'company_id' : 'author_id',
                        item._id
                      )
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
