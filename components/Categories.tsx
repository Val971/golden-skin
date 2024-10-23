'use client';
import React from 'react';
import ContentWrapper from './ContentWrapper';
import Slider from './Slider';
import { ICategory } from '@/app/types';
import CategoryCard from './CategoryCard';
import { CarouselItem } from './ui/carousel';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';
import { SkeletonCard } from './SkeletonCard';

export default function Categories() {
  const { data, isLoading } = useSWR(
    '/categories?populate=*',
    GlobalApi.getCategoryList,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  return (
    <ContentWrapper>
      {isLoading ? (
        <div className='flex justify-between mt-10 lg:mt-20'>
          <SkeletonCard
            length={4}
            styleBloc1='h-[125px] lg:w-[250px]'
            styleBloc2='h-4 lg:w-[250px] w-20'
          />
        </div>
      ) : (
        <div className='flex justify-center mt-10  lg:mt-20'>
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
      )}
    </ContentWrapper>
  );
}
