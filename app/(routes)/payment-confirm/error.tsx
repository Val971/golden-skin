'use client';
import React from 'react';

export default function AuthError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='max-w-md w-full text-center p-6 bg-white shadow-lg rounded-lg'>
        <h1 className='text-5xl font-bold text-red-500 mb-4'>Oops!</h1>
        <p className='text-xl text-gray-700 mb-6'>Something went wrong!</p>
        <button
          onClick={() => reset()}
          className='bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary focus:outline-none focus:ring focus:ring-blue-300'>
          Try Again
        </button>
      </div>
    </div>
  );
}
