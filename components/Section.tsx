import React from 'react';
import Image from 'next/image';
import ContentWrapper from './ContentWrapper';
import { Skeleton } from '@/components/ui/skeleton';
import { ISection } from '@/app/types';

interface SectionProps {
  datas: ISection;
}
export default function Section({ datas }: SectionProps) {
  return (
    <ContentWrapper>
      {datas ? (
        <div className='container flex gap-20 flex-col justify-center mx-auto py-12 lg:py-24 lg:flex-row '>
          <Image
            className='rounded-3xl w-full'
            width={600}
            height={400}
            alt='carring you section image'
            src={datas.image.url}
          />
          <div className='text-primary self-center flex flex-col gap-10 p-2  '>
            <h4 className='font-bold text-3xl md:text-5xl'>{datas.title}</h4>
            <p className='text-xl md:text-2xl'>{datas.description}</p>
            <button className='bg-primary hover:bg-secondary text-white font-bold py-4 px-4 rounded-xl'>
              {datas.button.title}
            </button>
          </div>
        </div>
      ) : (
        <div className='grid lg:grid-cols-2 grid-cols-1 gap-7 p-10'>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className='flex flex-col space-y-3 '>
              <Skeleton className=' h-[10rem] lg:h-[30rem] w-full rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          ))}
        </div>
      )}
    </ContentWrapper>
  );
}
