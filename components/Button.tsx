'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

interface ButtonProps {
  link: string;
  text: string;
  query?: string;
}
export default function Button({ text, link, query }: ButtonProps) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`${link}${query}`)}
      className='block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto'>
      {text}
    </button>
  );
}
