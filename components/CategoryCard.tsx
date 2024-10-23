import React from 'react';
import Image from 'next/image';
import { ICategory } from '../app/types';

interface CategoryCardProps {
  category: ICategory;
}
export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <div key={category.id} className='text-primary w-fit overflow-hidden '>
      <div className='rounded-3xl'>
        <Image
          className='rounded-3xl w-56 md:w-auto transition-transform duration-500 ease-in-out transform hover:scale-105 object-cover h-full'
          src={category.images?.url}
          alt={category.name}
          width={400}
          height={300}
          unoptimized={true}
          priority
          loading='eager'
        />
      </div>
      <h4 className='text-xl font-semibold mb-2 mt-5'>{category.name}</h4>
      <p className='hidden lg:block'>{category.description}</p>
    </div>
  );
}
