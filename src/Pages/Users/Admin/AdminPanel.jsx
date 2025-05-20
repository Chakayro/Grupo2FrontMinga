// src/pages/Panel.jsx
import React from 'react';
import TableComponent from '../../../components/TableComponent';
import backgroundPanel from '../../../assets/backgroundpanel.png';

export default function Panel() {
  return (
    <div className="w-screen h-screen bg-gray-100 relative flex flex-col items-center justify-end">
      <div className="absolute top-0 w-full h-8/12">
        <img
          src={backgroundPanel}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl font-bold text-white">Panel</h1>
        </div>
      </div>

    <div className="absolute w-full h-full md:w-11/12 md:h-7/12 bg-white rounded-t-xl shadow-lg md:shadow-lg">
     <div className="w-full h-full flex flex-col items-center justify-center pt-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-1">Entities</h2>
        <div className="h-1 w-24 bg-orange-600 mb-6 rounded" />
        <TableComponent />
      </div>
    </div>

     
    </div>
  );
}