import Link from 'next/link';
import React from 'react';

export default function NotFound() {
  return (
    <section className='bg-white  '>
      <div className='container flex items-center min-h-screen px-6 py-12 mx-auto'>
        <div>
          <p className='text-sm font-bold text-red-600 '>404 error</p>
          <h1 className='mt-3 text-2xl font-semibold text-gray-800  md:text-3xl'>
            Nous ne trouvons pas cette page
          </h1>
          <p className='mt-4 text-gray-500'>
            Désolé, la page que vous recherchez n&aposexiste pas ou a été
            déplacée.
          </p>

          <div className='flex items-center mt-6 gap-x-3'>
            <button className='flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 transition-colors duration-200 bg-white border rounded-lg gap-x-2 sm:w-auto  hover:bg-gray-100'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='w-5 h-5 rtl:rotate-180'>
                <path
                  strokeLinecap='round'
                  stroke-linejoin='round'
                  d='M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18'
                />
              </svg>

              <span>Retour</span>
            </button>

            <Link
              href={'/'}
              className='w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-primary rounded-lg shrink-0 sm:w-auto hover:bg-blue-600'>
              {`Aller á la page d'accueil`}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
