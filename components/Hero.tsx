import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { ISection } from '@/app/types';

interface HeroProps {
  heroDatas: ISection;
}
export default function Hero({ heroDatas }: HeroProps) {
  return (
    <section className='bg-gray-50'>
      {heroDatas ? (
        <>
          <div
            style={{
              backgroundImage: `url(${heroDatas.image.url})`,
            }}
            className={`mx-auto px-4 py-24 lg:flex lg:h-[43rem] lg:items-center 
       bg-cover bg-center `}>
            <div className='mx-auto max-w-2xl text-center'>
              <h1 className='text-3xl font-extrabold sm:text-5xl text-white'>
                {heroDatas.title}
              </h1>

              <p className='mt-4 sm:text-xl/relaxed text-white'>
                {heroDatas.description}
              </p>

              <div className='mt-8 flex flex-wrap justify-center gap-4'>
                <Link
                  href={`${heroDatas.button.link}`}
                  className='block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-secondary focus:outline-none focus:ring active:bg-red-500 sm:w-auto'>
                  {heroDatas.button.title}
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className='mx-auto m animate-pulse px-4 2xl:px-0'>
              <Skeleton className=' h-[10rem] lg:h-[30rem] w-full rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}
