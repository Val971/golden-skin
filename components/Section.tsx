import React from 'react';
import Image from 'next/image';
import WrapperContent from './WrapperContent';
import GlobalApi from '@/app/api/GlobalApi';

export default async function Section() {
  const response = await GlobalApi.getDatas(
    '/home-pages?populate=section.button&populate=section.image'
  );
  const { data } = await response.json();
  const sectionDatas = data[0].section;
  return (
    <WrapperContent>
      <div className='container flex gap-20 flex-col justify-center mx-auto py-12 lg:py-24 lg:flex-row '>
        <Image
          className='rounded-3xl w-full'
          width={600}
          height={400}
          alt='carring you section image'
          src={sectionDatas.image.url}
        />
        <div className='text-primary self-center flex flex-col gap-10 p-2  '>
          <h4 className='font-bold text-3xl md:text-5xl'>
            {sectionDatas.title}
          </h4>
          <p className='text-xl md:text-2xl'>{sectionDatas.description}</p>
          <button className='bg-primary hover:bg-secondary text-white font-bold py-4 px-4 rounded-xl'>
            {sectionDatas.button.title}
          </button>
        </div>
      </div>
    </WrapperContent>
  );
}
