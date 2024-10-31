import React from 'react';
import WrapperContent from './WrapperContent';
import { IProduct } from '../app/types';
import ProductCard from './products/ProductCard';
import GlobalApi from '@/app/api/GlobalApi';
import { filterUniqueProducts } from '@/app/_utils/filter';

interface FamousProductList {
  products: IProduct[];
}
export default async function FamousProductList() {
  const response = await GlobalApi.getDatas(
    '/products?filters[state][$eq]=Famous&populate=images'
  );
  const { data } = await response.json();
  const filteredDataa = filterUniqueProducts(data);
  return (
    <WrapperContent>
      <div className='container mx-auto  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 md:gap-7 mt-20 gap-4'>
        {filteredDataa.map((product: IProduct, index: number) => {
          return <ProductCard key={index} product={product} />;
        })}
      </div>
    </WrapperContent>
  );
}
