import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';

interface SearchCardProductProps {
  searchTerm: string;
}

export default function SearchCardProduct({
  searchTerm,
}: SearchCardProductProps) {
  const { isLoading, error, data } = useSWR(
    searchTerm ? searchTerm : null,
    GlobalApi.getSearchProducts
  );

  let content;
  if (isLoading) content = <p className='p-4'>Chargement...</p>;
  else if (error) content = <p>{error.message}</p>;
  else if (data) {
    content = (
      <ul>
        {data.length === 0 ? (
          <>{'Aucun article trouvé'}</>
        ) : (
          data.map((product, index) => {
            return (
              <Link
                href={`/shop/${product.documentId}`}
                key={index}
                className='w-5 cursor-pointer'>
                <div className='flex gap-5 my-3 p-2 hover:bg-slate-400'>
                  <Image
                    alt='item cart'
                    width={150}
                    height={100}
                    src={product.images.url}
                    className='w-[5rem] h-[5rem] rounded-xl'
                  />
                  <div>
                    <h5 className='text-primary font-bold '>{product.name}</h5>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </ul>
    );
  }

  return content;
}
