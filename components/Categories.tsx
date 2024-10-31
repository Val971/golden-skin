import React from 'react';
import WrapperContent from './WrapperContent';
import Slider from './Slider';
import { ICategory } from '@/app/types';
import CategoryCard from './CategoryCard';
import { CarouselItem } from './ui/carousel';
import GlobalApi from '@/app/api/GlobalApi';

export default async function Categories() {
  const response = await GlobalApi.getDatas('/categories?populate=*');
  const { data } = await response.json();
  //await new Promise((resolve) => setTimeout(resolve, 5000));

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
