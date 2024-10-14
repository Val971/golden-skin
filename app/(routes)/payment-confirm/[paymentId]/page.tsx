'use client';
import { useOrderContext } from '@/app/_context/OrderContext';
import { Order } from '@/app/types';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export default function PaymentConfirm({
  params,
}: {
  params: { paymentId: string };
}) {
  const [order, setOrder] = useState<Order | undefined>(undefined);
  const { orders } = useOrderContext();
  const router = useRouter();
  useEffect(() => {
    setOrder(orders.find((ord) => ord.id === params.paymentId));
  }, [router, orders, params]);

  return (
    <section className='bg-white py-8 antialiased dark:bg-gray-900 md:py-16'>
      {order ? (
        <div className='mx-auto max-w-2xl px-4 2xl:px-0'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-2'>
            Merci pour votre commande !
          </h2>
          <p className='text-gray-500 dark:text-gray-400 mb-6 md:mb-8'>
            Votre commande{' '}
            <a
              href='#'
              className='font-medium text-gray-900 dark:text-white hover:underline'>
              {`#${order.id}`}
            </a>{' '}
            sera traitée dans les 24 heures pendant les jours ouvrables. Nous
            vous informerons par e-mail une fois votre commande expédiée.
          </p>
          <div className='space-y-4 sm:space-y-2 rounded-lg border border-gray-100 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800 mb-6 md:mb-8'>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Date
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {new Date(order.date).toLocaleDateString()}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Payment Method
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                JPMorgan monthly installments
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Name
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {order.name}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Address
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {order.address}
              </dd>
            </dl>
            <dl className='sm:flex items-center justify-between gap-4'>
              <dt className='font-normal mb-1 sm:mb-0 text-gray-500 dark:text-gray-400'>
                Phone
              </dt>
              <dd className='font-medium text-gray-900 dark:text-white sm:text-end'>
                {order.phone}
              </dd>
            </dl>
          </div>
          <div className='flex items-center space-x-4'>
            <div
              onClick={() => router.push('/')}
              className='py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer'>
              {`Retour à l'accueil`}
            </div>
          </div>
        </div>
      ) : (
        <>
          {Array.from({ length: 1 }).map((_, index) => (
            <div key={index} className='mx-auto max-w-2xl px-4 2xl:px-0'>
              <Skeleton className=' h-[10rem] lg:h-[30rem] w-full rounded-xl' />
              <div className='space-y-2'>
                <Skeleton className='h-4 w-full' />
                <Skeleton className='h-4 w-full' />
              </div>
            </div>
          ))}
        </>
      )}
    </section>
  );
}