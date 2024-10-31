import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import Banner from '../components/Banner';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import FamousProductList from '@/components/FamousProductList';
import Section from '@/components/Section';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import WrapperContent from '@/components/WrapperContent';

export const metadata: Metadata = {
  title: 'GoldenSkin Ecommerce',
  description:
    'Découvrez une large gamme de produits de beauté haut de gamme pour sublimer votre peau, vos cheveux et votre bien-être. Maquillage, soins de la peau, parfums et accessoires – offrez-vous le meilleur de la beauté à prix accessibles. Livraison rapide et service client de qualité.',
};
const Home = async () => {
  return (
    <div>
      <Suspense
        fallback={
          <div role='status' className='rounded-lg p-4 mx-auto px-4 py-8  '>
            <div className='animate-pulse w-full bg-gray-300 h-56 lg:h-[43rem] rounded-lg mb-5 flex justify-center items-center'>
              <svg
                className='w-8 h-8 stroke-gray-400'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z'
                  stroke='stroke-current'
                  stroke-width='1.6'
                  stroke-linecap='round'></path>
              </svg>
            </div>
          </div>
        }>
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <WrapperContent>
            <Slider>
              <div className=' container mx-auto  flex md:gap-7 mt-20 gap-4'>
                <Skeleton length={8} widht='w-48' whidht2='w-32' />
              </div>
            </Slider>
          </WrapperContent>
        }>
        <Categories />
      </Suspense>

      <Banner />
      <Suspense
        fallback={
          <div className='container mx-auto  grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 grid-cols-2 md:gap-7 mt-20 gap-4'>
            <Skeleton length={4} widht='w-32 md:w-48' />
          </div>
        }>
        <FamousProductList />
      </Suspense>
      <Suspense
        fallback={
          <WrapperContent>
            <div className='grid lg:grid-cols-2 grid-cols-1 gap-7 pt-20'>
              <div
                role='status'
                className='max-w-sm  rounded-lg  grid md:grid-cols-2 gap-5'>
                <div className='animate-pulse  bg-gray-300 h-48 md:h-[40rem] md:w-[40rem] rounded-lg mb-5 flex justify-center items-center'>
                  <svg
                    className='w-8 h-8 stroke-gray-400'
                    viewBox='0 0 24 24'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      d='M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z'
                      stroke='stroke-current'
                      strokeWidth='1.6'
                      strokeLinecap='round'></path>
                  </svg>
                </div>
              </div>
              <div role='status' className='max-w-sm animate-pulse self-center'>
                <p className='h-4 bg-gray-300 rounded-full max-w-[380px] mb-2.5'></p>
                <p className='h-4 bg-gray-300 rounded-full max-w-[380px] mb-2.5'></p>
                <p className='h-4 bg-gray-300 rounded-full max-w-[340px] mb-2.5'></p>
                <p className='h-4 bg-gray-300 rounded-full max-w-[320px] mb-2.5'></p>
                <h3 className='h-6 bg-gray-300 rounded-full  w-48 mb-4'></h3>
              </div>
            </div>
          </WrapperContent>
        }>
        <Section />
      </Suspense>
    </div>
  );
};
export default Home;
