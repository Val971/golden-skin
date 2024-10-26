'use client';
import React from 'react';
import WrapperContent from './WrapperContent';
import Slider from './Slider';
import { ICategory } from '@/app/types';
import CategoryCard from './CategoryCard';
import { CarouselItem } from './ui/carousel';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';
import Skeleton from './Skeleton';

export default function Categories() {
  const { data, isLoading } = useSWR(
    '/categories?populate=*',
    GlobalApi.getCategoryList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );

  if (isLoading) {
    return (
      <WrapperContent>
        <Slider>
          <div className=' container mx-auto  flex md:gap-7 mt-20 gap-4'>
            <Skeleton length={8} widht='w-48' whidht2='w-32' />
          </div>
        </Slider>
      </WrapperContent>
    );
  }

  return (
    <WrapperContent>
      <div className='mt-10 lg:mt-20'>
        <Slider>
          {data.map((category: ICategory) => {
            return (
              <CarouselItem
                className='basis-auto md:basis-1/2 lg:basis-1/4 '
                key={category.id}>
                <CategoryCard category={category} />
              </CarouselItem>
            );
          })}
        </Slider>
      </div>
    </WrapperContent>
  );
}
