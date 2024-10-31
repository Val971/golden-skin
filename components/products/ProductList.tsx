'use client';
import { IProduct } from '@/app/types';
import React, { Suspense, useEffect, useState } from 'react';
import Skeleton from '@/components/Skeleton';
import ProductCard from './ProductCard';
import { useRouter, useSearchParams } from 'next/navigation';

const subCategories = [
  { key: 'all', name: 'Tous les produits' },
  { key: 'visage', name: 'Visage' },
  { key: 'cheveux', name: 'Cheveux' },
  { key: 'suppléments', name: 'Suppléments' },
  { key: 'cadeaux & coffrets', name: 'Cadeaux & coffrets' },
];

interface ProductListProps {
  products: IProduct[];
}
export default function ProductList({ products }: ProductListProps) {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const router = useRouter();

  useEffect(() => {
    if (products)
      if (search && search !== 'all') {
        const filterDatas = products.filter(
          (item: IProduct) =>
            item.categories &&
            item.categories.toLocaleLowerCase().includes(search)
        );
        setFilteredProducts(filterDatas);
      } else {
        setFilteredProducts(products);
      }
  }, [products, search]);

  useEffect(() => {
    if (products)
      products.forEach((product: IProduct) => {
        router.prefetch(`/shop/${product.documentId}`);
      });
  }, [products]);

  const handlerQuery = (key: string) => {
    router.push(`?query=${key}`);
  };
  return (
    <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
      {/* Filters */}
      <form className='hidden lg:block'>
        <h3 className='sr-only'>Categories</h3>
        <ul
          role='list'
          className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium '>
          {subCategories.map((category) => (
            <li onClick={() => handlerQuery(category.key)} key={category.name}>
              <p
                className={`cursor-pointer ${
                  search && category.key.includes(search)
                    ? 'text-secondary'
                    : 'text-gray-900'
                }`}>
                {category.name}
              </p>
            </li>
          ))}
        </ul>
      </form>
      <div className='lg:col-span-3 grid 2xl:grid-cols-4  xl:grid-cols-3 lg:grid-cols-3 grid-cols-2  justify-between gap-4 md:gap-8'>
        <Suspense fallback={<Skeleton length={8} />}>
          {filteredProducts.map((item: IProduct) => {
            return <ProductCard key={item.documentId} product={item} />;
          })}
        </Suspense>
      </div>
    </div>
  );
}
