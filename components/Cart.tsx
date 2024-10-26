import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import CartItemList from './CartItemList';
import { useCartContext } from '@/app/_context/CartContext';

export default function Cart() {
  const { cart, totalCartItem } = useCartContext();
  return (
    <Sheet>
      <SheetTrigger asChild>
        {/* Cart */}
        <div className='ml-4 flow-root lg:ml-6'>
          <a className='group -m-2 flex items-center p-2 cursor-pointer'>
            <ShoppingBagIcon
              aria-hidden='true'
              className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-secondary'
            />
            <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-secondary'>
              {totalCartItem}
            </span>
            <span className='sr-only'>items in cart, view bag</span>
          </a>
        </div>
      </SheetTrigger>
      <SheetContent className='flex flex-col h-screen w-96 '>
        <div className='flex flex-col justify-between  '>
          <SheetHeader>
            <SheetTitle className='flex gap-5'>
              <ShoppingBagIcon
                aria-hidden='true'
                className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-secondary'
              />{' '}
              <p className='uppercase'>votre pannier</p>
            </SheetTitle>
            <hr />
            <SheetDescription></SheetDescription>
          </SheetHeader>
        </div>
        {/* Liste des articles du panier */}
        <CartItemList cartItemList={cart} />
      </SheetContent>
    </Sheet>
  );
}
