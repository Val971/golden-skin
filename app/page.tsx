import type { Metadata } from 'next';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Banner from '../components/Banner';
import { SkeletonCard } from '@/components/SkeletonCard';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });
const Categories = dynamic(() => import('../components/Categories'), {
  ssr: false,
});
const FamousProductList = dynamic(
  () => import('../components/FamousProductList'),
  { ssr: false }
);
const Section = dynamic(() => import('../components/Section'), { ssr: false });

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
          <SkeletonCard
            styleBloc1='h-[10rem] lg:h-[30rem] w-full'
            styleBloc2='h-4 w-full'
          />
        }>
        <Hero />
      </Suspense>
      <Suspense
        fallback={
          <SkeletonCard
            length={4}
            styleBloc1='h-[125px] lg:w-[250px]'
            styleBloc2='h-4 lg:w-[250px] w-20'
          />
        }>
        <Categories />
      </Suspense>
      <Banner />
      <Suspense
        fallback={
          <SkeletonCard
            length={4}
            styleBloc1='h-[10rem] lg:h-[20rem] lg:w-[250px]'
            styleBloc2='h-4 lg:w-[250px]'
          />
        }>
        <FamousProductList />
      </Suspense>
      <Suspense
        fallback={
          <SkeletonCard
            length={2}
            styleBloc1='h-[10rem] lg:h-[30rem] w-full'
            styleBloc2='h-4 w-full'
          />
        }>
        <Section />
      </Suspense>
    </div>
  );
};
export default Home;
