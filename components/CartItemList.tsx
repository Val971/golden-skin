'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { CartItem } from '../app/types';
import { SheetClose, SheetFooter } from '@/components/ui/sheet';
import { Trash2 } from 'lucide-react';
import { useCartContext } from '../app/_context/CartContext';
import { useAuthContext } from '../app/_context/AuthContext';

export interface CartItemListProps {
  cartItemList: CartItem[];
}
export default function CartItemList(props: CartItemListProps) {
  const { cartItemList } = props;
  const { increaseQuantity, removeFromCart, decreaseQuantity } =
    useCartContext();
  const { user } = useAuthContext();
  const [subTotal, setSubTotal] = useState<number>(0);
  const jwt = sessionStorage.getItem('jwt');
  const router = useRouter();

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total = total + item.quantity * item.price;
    });
    setSubTotal(total);
  }, [cartItemList]);
  return (
    <div className='overflow-y-auto h-screen'>
      <div className='flex-1 overflow-y-auto mt-4 space-y-4 h-[70%]'>
        {cartItemList.length > 0 ? (
          cartItemList.map((item, index) => {
            return (
              <div key={index}>
                <div className='flex gap-5 my-3'>
                  <Image
                    alt='item cart'
                    width={150}
                    height={100}
                    src={item.images.url}
                    className='w-[8rem] h-[8rem] rounded-xl'
                  />
                  <div className='flex flex-col justify-between flex-1'>
                    <div className='flex justify-between'>
                      <div>
                        <h5 className='text-primary font-bold  max-w-20'>
                          {item.name}
                        </h5>
                        <h5 className='text-textColor text-sm mt-2'>
                          {item.sizes.name}
                        </h5>
                      </div>
                      <Trash2
                        className='cursor-pointer'
                        onClick={() =>
                          removeFromCart(item.documentId, item.sizes.documentId)
                        }
                      />
                    </div>
                    <div className='flex justify-between items-end '>
                      <p className='text-primary font-bold'>{item.price}$</p>
                      <div className='p-2 border border-[0.2] border-textColor rounded-lg flex gap-3 max-w-36'>
                        <button
                          disabled={item.quantity === 1 ? true : false}
                          onClick={() =>
                            decreaseQuantity(
                              item.documentId,
                              item.sizes.documentId
                            )
                          }>
                          <span
                            className={`${
                              item.quantity === 1 ? 'text-textColor' : ''
                            }`}>
                            -
                          </span>
                        </button>
                        {item.quantity}
                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.documentId,
                              item.sizes.documentId
                            )
                          }>
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='text-center text-gray-500'>
            Votre panier est vide.
          </div>
        )}
      </div>
      <SheetFooter>
        <SheetClose asChild>
          <div className=' flex flex-col w-full gap-5 mt-0'>
            <div className='flex justify-between'>
              <p className='text-primary font-bold'>Total</p>
              <p className='text-primary font-bold'>{subTotal}$</p>
            </div>
            <button
              disabled={cartItemList.length == 0}
              onClick={() =>
                router.push(
                  jwt ? `/checkout/${user?.documentId}` : '/auth/sign-in'
                )
              }
              className={`${
                cartItemList.length == 0
                  ? 'bg-gray-500'
                  : 'bg-primary hover:bg-secondary'
              }  w-full uppercase text-white font-bold py-4 px-4 rounded-xl`}>
              Commander
            </button>
          </div>
        </SheetClose>
      </SheetFooter>
    </div>
  );
}
