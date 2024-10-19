import React from 'react';

export default function loading() {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-100'>
      <div className='flex flex-col justify-center text-center'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-solid self-center'></div>
        <h2 className='mt-4 text-2xl font-semibold text-gray-700'>
          Chargement...
        </h2>
        <p className='mt-2 text-gray-500'>
          Veuillez patienter pendant que nous préparons vos données.
        </p>
      </div>
    </div>
  );
}
