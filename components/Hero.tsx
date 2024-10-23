'use client';
import React from 'react';
import useSWR from 'swr';
import Button from './Button';
import GlobalApi from '@/app/api/GlobalApi';
import { SkeletonCard } from './SkeletonCard';

export default function Hero() {
  const { data, isLoading } = useSWR(
    '/home-pages?populate=hero.button&populate=hero.image',
    GlobalApi.getHomePageHeroDatas,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  return (
    <section className='bg-gray-50'>
      {isLoading ? (
        <SkeletonCard
          styleBloc1='h-[10rem] lg:h-[30rem] w-full'
          styleBloc2='h-4 w-full'
        />
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
