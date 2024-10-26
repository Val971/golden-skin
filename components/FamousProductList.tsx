'use client';
import React from 'react';
import WrapperContent from './WrapperContent';
import { IProduct } from '../app/types';
import ProductCard from './products/ProductCard';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';
import { filterUniqueProducts } from '@/app/_utils/filter';
import Skeleton from '@/components/Skeleton';

interface FamousProductList {
  products: IProduct[];
}
export default function FamousProductList() {
  const { data, isLoading } = useSWR(
    '/products?filters[state][$eq]=Famous&populate=images',
    GlobalApi.getFamousProduct,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000,
    }
  );
  const filterProducts = filterUniqueProducts(data);

  return (
    <WrapperContent>
      <div className='container mx-auto  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 md:gap-7 mt-20 gap-4'>
        {isLoading ? (
          <Skeleton length={4} widht='w-32 md:w-48' />
        ) : (
          filterProducts.map((product: IProduct, index: number) => {
            return <ProductCard key={index} product={product} />;
          })
        )}
      </div>
    </WrapperContent>
  );
}
