import React from 'react';
import ContentWrapper from './ContentWrapper';
import Slider from './Slider';
import { ICategory } from '@/app/types';
import CategoryCard from './CategoryCard';
import { CarouselItem } from './ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoriesProps {
  categories: ICategory[];
}
export default function Categories({ categories }: CategoriesProps) {
  return (
    <ContentWrapper>
      {categories ? (
        <div className='flex justify-center mt-10  lg:mt-20'>
          <Slider>
            {categories.map((category: ICategory) => {
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
      ) : (
        <div className='flex justify-between mt-10 lg:mt-20'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='flex flex-col space-y-3 '>
              <Skeleton className='h-[125px] lg:w-[250px] rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 lg:w-[250px] w-20' />
                <Skeleton className='h-4 lg:w-[200px] w-20' />
              </div>
            </div>
          ))}
        </div>
      )}
    </ContentWrapper>
  );
}
