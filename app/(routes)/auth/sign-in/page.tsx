import React from 'react';
import SignInForm from '@/components/SignInForm';
import Logo from '@/components/Logo';

const SignIn = () => {
  return (
    <div className='bg-lightBackground p-10 items-center flex justify-center'>
      <div className='flex flex-col items-center justify-center bg-white max-w-md p-6 rounded-md sm:p-10 dark:bg-gray-50 dark:text-gray-800'>
        <div className='mb-8 text-center'>
          <Logo width={150} height={100} position='flex-col' />
          <h1 className='my-3 text-4xl font-bold'>Connexion</h1>
          <p className='text-sm dark:text-gray-600'>
            Connextez-vous pour acceder à votre compte.
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  );
};

export default SignIn;
