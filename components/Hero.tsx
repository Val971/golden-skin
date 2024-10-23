'use client';
import React from 'react';
import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import Button from './Button';
import GlobalApi from '@/app/api/GlobalApi';

export default function Hero() {
  const { data, isLoading } = useSWR(
    '/home-pages?populate=hero.button&populate=hero.image',
    GlobalApi.getHomePageHeroDatas
  );

  return (
    <section className='bg-gray-50'>
      {isLoading ? (
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
      ) : (
        <div
          style={{
            backgroundImage: `url(${data.image.url})`,
          }}
          className={`mx-auto px-4 py-24 lg:flex lg:h-[43rem] lg:items-center
       bg-cover bg-center `}>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-3xl font-extrabold sm:text-5xl text-white'>
              {data.title}
            </h1>

            <p className='mt-4 sm:text-xl/relaxed text-white'>
              {data.description}
            </p>

            <div className='mt-8 flex flex-wrap justify-center gap-4'>
              <Button
                text={data.button.title}
                link={`${data.button.link}`}
                query='?query=all'
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
