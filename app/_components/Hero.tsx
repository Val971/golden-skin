'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDatasContentContext } from '../_context/DataContentContext';
import { Skeleton } from '@/components/ui/skeleton';

export default function Hero() {
  const { hero, loading } = useDatasContentContext();
  const router = useRouter();
  return (
    <section className='bg-gray-50'>
      {!hero || loading ? (
        <>
          {' '}
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className='mx-auto max-w-2xl px-4 2xl:px-0'>
              <Skeleton className=' h-[10rem] lg:h-[30rem] w-full rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          ))}
        </>
      ) : (
        <div
          style={{
            backgroundImage: `url(${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}${hero.image.url})`,
          }}
          className={`mx-auto px-4 py-24 lg:flex lg:h-[43rem] lg:items-center 
       bg-cover bg-center `}>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-3xl font-extrabold sm:text-5xl text-white'>
              {hero.title}
            </h1>

            <p className='mt-4 sm:text-xl/relaxed text-white'>
              {hero.description}
            </p>

            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <button
                onClick={() => router.push(`${hero.button.link}`)}
                className='block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto'>
                {hero.button.title}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
