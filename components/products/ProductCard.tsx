import React from 'react';
import Image from 'next/image';
import { IProduct } from '../../app/types';
import Link from 'next/link';

interface ProductCartProps {
  product: IProduct;
}
export default function ProductCard({ product }: ProductCartProps) {
  return (
    <div className='text-primary  overflow-hidden '>
      <Link href={`/shop/${product.documentId}`} className='rounded-3xl'>
        <Image
          className='rounded-3xl object-cover h-[10rem] lg:h-[20rem] cursor-pointer'
          src={product.images?.url}
          alt={product.name}
          width={600}
          height={400}
          unoptimized={true}
        />
        <h4 className='font-semibold mt-5 text-sm cursor-pointer'>
          {product.name}
        </h4>
      </Link>
      <p className='text-sm clamp-2 my-2 text-textColor '>
        {product.description}
      </p>
      <p className='font-bold'>{product.price}$</p>
    </div>
  );
}
