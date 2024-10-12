'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const CreateAccountForm = dynamic(
  () => import('@/app/_components/CreateAccountForm'),
  {
    ssr: false,
  }
);

export default function CreateAccount() {
  return (
    <div className='bg-lightBackground p-10 items-center flex justify-center'>
      <div className='flex flex-col items-center justify-center bg-white max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800'>
        <div className='mb-8 text-center'>
          <Link href={`/`} className='flex flex-col items-center gap-5'>
            <Image
              alt='logo'
              width={150}
              height={100}
              src='/goldenSkin.svg'
              className='h-10 w-auto'
            />
            <p className='text-primary font-semibold text-xl'>Golden Skin</p>
          </Link>
          <h1 className='my-3 text-4xl font-bold'>Inscription</h1>
          <p className='text-sm dark:text-gray-600'>
            Entrez vos informations pour créer un compte.
          </p>
        </div>
        <CreateAccountForm />
      </div>
    </div>
  );
}
