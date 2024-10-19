import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4'>
      <div className='max-w-lg mx-auto'>
        <h1 className='text-6xl font-bold text-gray-800 mb-4'>404</h1>
        <h2 className='text-2xl font-semibold text-gray-700 mb-6'>
          {`Oups ! Cette page n'existe pas.`}
        </h2>
        <p className='text-gray-600 mb-8'>
          {` Nous n'avons pas pu trouver le produit que vous recherchez. Il a peut-être été
        supprimé ou n'a jamais existé.`}
        </p>
        <Link href={'/'}>
          <p className='px-6 py-3 bg-primary text-white font-semibold rounded-md hover:bg-secondary transition duration-300 ease-in-out'>
            {`Retour à la page d'accueil`}
          </p>
        </Link>
      </div>
    </div>
  );
}
