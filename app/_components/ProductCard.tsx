import React from 'react';
import Image from 'next/image';
import { SkeletonCard } from './SkeletonCard';
import { Product } from '../types';
import { useRouter } from 'next/navigation';

interface ProductCartProps {
  product: Product;
}
export default function ProductCard({ product }: ProductCartProps) {
  const router = useRouter();
  return (
    <div key={product.documentId}>
      {product ? (
        <div key={product.documentId}>
          <div className='text-primary  overflow-hidden '>
            <div className='rounded-3xl'>
              <Image
                onClick={() =>
                  router.push(`/product-detail/${product.documentId}`)
                }
                className='rounded-3xl object-cover h-[10rem] lg:h-[20rem] cursor-pointer'
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL + product.images?.url
                }
                alt={product.name}
                width={600}
                height={400}
                unoptimized={true}
              />
            </div>
            <h4
              onClick={() =>
                router.push(`/product-detail/${product.documentId}`)
              }
              className='font-semibold mt-5 text-sm cursor-pointer'>
              {product.name}
            </h4>
            <p className='text-sm clamp-2 my-2 text-textColor '>
              {product.description}
            </p>
            <p className='font-bold'>{product.price}$</p>
          </div>
        </div>
      ) : (
        <SkeletonCard height='20rem' width='250px' />
      )}
    </div>
  );
}
