'use client';
import Image from 'next/image';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React, { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useProductContext } from '@/app/_context/ProductListContext';
import { CartItem, IProduct, Size } from '@/app/types';
import { useCartContext } from '@/app/_context/CartContext';
import { notFound } from 'next/navigation';
import GlobalApi from '@/app/_utils/GlobalApi';

export default function ProductDetail({
  params,
}: {
  params: { productId: string };
}) {
  const { loading } = useProductContext();
  const { addToCart, cartLoading } = useCartContext();
  const [productCount, setProductCount] = useState<number>(1);
  const [selectSizeId, setSelectSizeId] = useState<number>(0);
  const [productPrice, setProductPrice] = useState<number>(0);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [notFount, setNotFound] = useState<string | null>(null);

  const getProductPrice = (index: number) => {
    if (product) {
      const price = product.sizes[index].price;
      setSelectSizeId(index);
      setProductPrice(price);
    }
  };

  useEffect(() => {
    setNotFound(null);
    const fetchProduct = async () => {
      GlobalApi.getProductById(params?.productId)
        .then((res) => {
          setProduct(res);
        })
        .catch((error) => {
          if (error.status) {
            setNotFound('Product not found');
          } else {
            setNotFound(error.message);
            throw new Error('An error occurred while fetching the product');
          }
        });
    };

    fetchProduct();
  }, [params?.productId, setNotFound]);
  useEffect(() => {
    getProductPrice(0);
  }, [product]);

  useEffect(() => {
    if (notFount === 'Product not found') {
      return notFound();
    }
  }, [notFount]);

  const handlerAddToCart = () => {
    if (product) {
      const selectedProduct: CartItem = {
        ...product,
        sizes: product.sizes[selectSizeId],
        price: productCount * product.sizes[selectSizeId].price,
        quantity: productCount,
        discountPrice: product.discountPrice,
      };
      addToCart(selectedProduct);
    }
  };
  return (
    <>
      {loading || !product ? (
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
        <>
          {product && (
            <div className=' grid lg:grid-cols-2 grid-cols-1 gap-7'>
              <Image
                className='object-cover w-full h-[20rem] lg:h-[50rem]'
                src={product.images?.url}
                alt={product.name}
                width={600}
                height={800}
                unoptimized={true}
              />
              <div className='p-7 lg:p-10 flex gap-3 flex-col '>
                <h5 className='text-[#C0BBAD] font-semibold'>
                  {product.categories}
                </h5>
                <h3 className='text-primary font-semibold text-3xl'>
                  {product.name}
                </h3>
                <p className='text-textColor text-sm'>{product.description}</p>
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
                  {product.sizes.map((item: Size, index: number) => {
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
                        className={`${
                          productCount === 1 ? 'text-textColor' : ''
                        }`}>
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
      )}
    </>
  );
}