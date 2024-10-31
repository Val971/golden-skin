import React, { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { IProduct } from '@/app/types';
import GlobalApi from '../../../api/GlobalApi';
import BreadCrumb from '@/components/BreadCrumb';
import ProductDetails from '@/components/products/ProductDetails';
import WrapperContent from '@/components/WrapperContent';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const products = await GlobalApi.getDatas('/products?populate=*').then(
    (res) => res.json()
  );
  return products.data.map((product: IProduct) => ({
    id: String(product.documentId),
  }));
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const response = await GlobalApi.getDataById(
    '/products/' + params.id + '?populate=*'
  );
  const { data } = await response.json();

  return (
    <WrapperContent>
      <BreadCrumb productName={data.name} />
      <Suspense
        fallback={
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
        }>
        <ProductDetails product={data} />
      </Suspense>
    </WrapperContent>
  );
}
