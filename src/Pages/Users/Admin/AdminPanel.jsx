// src/pages/Panel.jsx
import React from 'react';
import TableComponent from '../../../components/TableComponent';
import backgroundPanel from '../../../assets/backgroundpanel.png';

export default function Panel() {
  return (
    <div className="w-screen min-h-screen bg-gray-100 relative flex flex-col items-center">
      {/* Top background section */}
      <div className="absolute top-0 w-full h-8/12">
        <img
          src={backgroundPanel}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div
          className="
            absolute
            top-1/4
            sm:top-1/3
            inset-x-0
            flex
            justify-center
          "
        >
          <h1 className="text-5xl font-bold text-white">Admin Panel</h1>
        </div>
      </div>

      {/* Content card, grows with content */}
      <div className="relative w-full md:w-11/12 bg-white rounded-t-xl shadow-lg mt-[60vh]">
        <div className="w-full flex flex-col items-center p-6">
          <h2 className="text-3xl font-bold text-orange-500 mb-1">Entities</h2>
          <div className="h-1 w-24 bg-orange-600 mb-6 rounded" />
          <TableComponent />
        </div>
      </div>
    </div>
  );
}
