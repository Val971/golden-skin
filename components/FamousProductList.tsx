import React from 'react';
import ContentWrapper from './ContentWrapper';
import { IProduct } from '../app/types';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from './products/ProductCard';

interface FamousProductList {
  products: IProduct[];
}
export default function FamousProductList({ products }: FamousProductList) {
  return (
    <ContentWrapper>
      {products ? (
        <div className='max-w-screen-2xl grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-7 mt-20'>
          {products.map((product: IProduct, index: number) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      ) : (
        <div className='max-w-screen-2xl grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-7 mt-20'>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className='flex flex-col space-y-3 '>
              <Skeleton className=' h-[10rem] lg:h-[20rem] lg:w-[250px] rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 lg:w-[250px]' />
                <Skeleton className='h-4 lg:w-[200px]' />
              </div>
            </div>
          ))}
        </div>
      )}
    </ContentWrapper>
  );
}
