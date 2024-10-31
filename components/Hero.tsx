import React from 'react';
import Button from './Button';
import GlobalApi from '@/app/api/GlobalApi';

export default async function Hero() {
  const response = await GlobalApi.getDatas(
    '/home-pages?populate=hero.button&populate=hero.image'
  );
  const { data } = await response.json();
  const heroDatas = data[0].hero;
  return (
    <section className='bg-gray-50'>
      <div
        style={{
          backgroundImage: `url(${heroDatas.image?.url})`,
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
            <Button
              text={heroDatas.button?.title}
              link={`${heroDatas.button?.link}`}
              query='?query=all'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
