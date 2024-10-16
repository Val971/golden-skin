import React from 'react';
import Image from 'next/image';
import { SkeletonCard } from './SkeletonCard';
import { IProduct } from '../types';
import { useRouter } from 'next/navigation';

interface ProductCartProps {
  product: IProduct;
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
                onClick={() => router.push(`/shop/${product.documentId}`)}
                className='rounded-3xl object-cover h-[10rem] lg:h-[20rem] cursor-pointer'
                src={product.images?.url}
                alt={product.name}
                width={600}
                height={400}
                unoptimized={true}
              />
            </div>
            <h4
              onClick={() => router.push(`/shop/${product.documentId}`)}
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
