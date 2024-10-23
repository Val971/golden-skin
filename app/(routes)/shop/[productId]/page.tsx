'use client';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { CartItem, Size } from '@/app/types';
import { useCartContext } from '@/app/_context/CartContext';
import { notFound } from 'next/navigation';
import GlobalApi from '../../../api/GlobalApi';
import useSWR from 'swr';

export default function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const { addToCart, cartLoading } = useCartContext();
  const [productCount, setProductCount] = useState<number>(1);
  const [selectSizeId, setSelectSizeId] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);

  const { data, isLoading, error } = useSWR(
    params?.productId,
    GlobalApi.getProductById
  );

  useEffect(() => {
    getProductPrice(0);
  }, [data]);
  const getProductPrice = (index: number) => {
    if (data) {
      const price = data.sizes[index].price;
      setSelectSizeId(index);
      setProductPrice(price);
    }
  };
  if (error) {
    return notFound();
  }

  const handlerAddToCart = () => {
    if (data) {
      const selectedProduct: CartItem = {
        ...data,
        sizes: data.sizes[selectSizeId],
        price: productCount * data.sizes[selectSizeId].price,
        quantity: productCount,
        discountPrice: data.discountPrice,
      };
      addToCart(selectedProduct);
    }
  };
  return (
    <>
      {isLoading ? (
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
      ) : (
        <div className=' grid lg:grid-cols-2 grid-cols-1 gap-7'>
          <Image
            className='object-cover w-full h-[20rem] lg:h-[50rem]'
            src={data.images?.url}
            alt={data.name}
            width={600}
            height={800}
            unoptimized={true}
          />
          <div className='p-7 lg:p-10 flex gap-3 flex-col '>
            <h5 className='text-[#C0BBAD] font-semibold'>{data.categories}</h5>
            <h3 className='text-primary font-semibold text-3xl'>{data.name}</h3>
            <p className='text-textColor text-sm'>{data.description}</p>
            <div className='flex flex-col bg-lightBackground p-5 text-center my-5'>
              <p className='text-primary font-semibold text-lg'>
                Essayez pendant 30 jours
              </p>
              <p className='text-xs'>
                {`Vous n'aimez pas ? Annulez à tout moment.`}{' '}
                <span className='underline'>En savoir plus</span>
              </p>
            </div>
            <p className='text-primary uppercase font-semibold'>Size</p>
            <div className='flex gap-2'>
              {data.sizes.map((item: Size, index: number) => {
                return (
                  <div key={index}>
                    <RadioGroup defaultValue='comfortable'>
                      <button
                        onClick={() => getProductPrice(index)}
                        className={`${
                          selectSizeId === index
                            ? 'bg-primary text-white'
                            : 'border border-primary text-primary'
                        }  text-sm rounded-xl p-3 w-fit`}>
                        {item.name}
                      </button>
                    </RadioGroup>
                  </div>
                );
              })}
            </div>
            <div className='flex border border-primary rounded-lg p-3 my-2 justify-between'>
              <RadioGroup defaultValue='default'>
                <div className='flex items-center space-x-2'>
                  <RadioGroupItem value='default' id='r1' />
                  <p>one time</p>
                </div>
              </RadioGroup>
              <p>{productPrice}$</p>
            </div>
            <div className='flex gap-3'>
              <div className='p-4 border border-[0.2] border-textColor rounded-lg flex gap-3 max-w-36'>
                <button
                  disabled={productCount === 1 ? true : false}
                  onClick={() => setProductCount((prev) => prev - 1)}>
                  <span
                    className={`${productCount === 1 ? 'text-textColor' : ''}`}>
                    -
                  </span>
                </button>
                {productCount}
                <button onClick={() => setProductCount((prev) => prev + 1)}>
                  +
                </button>
              </div>
              <button
                onClick={() => handlerAddToCart()}
                className='bg-primary w-full flex justify-center uppercase hover:bg-secondary text-white font-bold py-4 px-4 rounded-xl'>
                {cartLoading ? (
                  <Loader className='animate-spin' />
                ) : (
                  ' Ajouter au pannier'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
