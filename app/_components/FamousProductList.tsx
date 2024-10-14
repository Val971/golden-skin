'use client';
import React from 'react';
import ContentWrapper from './ContentWrapper';
import { Product } from '../types';
import { Skeleton } from '@/components/ui/skeleton';
import { useProductContext } from '../_context/ProductListContext';
import ProductCard from './ProductCard';

export default function FamousProductList() {
  const { famousproduct, loading } = useProductContext();

  return (
    <ContentWrapper>
      {loading ? ( // Display skeletons if loading
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
      ) : (
        <div className='max-w-screen-2xl grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 gap-7 mt-20'>
          {famousproduct.map((product: Product, index: number) => {
            return <ProductCard key={index} product={product} />;
          })}
        </div>
      )}
    </ContentWrapper>
  );
}
