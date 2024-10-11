import type { Metadata } from 'next';
import Banner from './_components/Banner';
import Categories from './_components/Categories';
import FamousProductList from './_components/FamousProductList';
import Hero from './_components/Hero';
import Section from './_components/Section';

export const metadata: Metadata = {
  title: 'GoldenSkin Ecommerce',
  description:
    'Découvrez une large gamme de produits de beauté haut de gamme pour sublimer votre peau, vos cheveux et votre bien-être. Maquillage, soins de la peau, parfums et accessoires – offrez-vous le meilleur de la beauté à prix accessibles. Livraison rapide et service client de qualité.',
};
export default function Home() {
  return (
    <div>
      <Hero />
      <Categories />
      <Banner />
      <FamousProductList />
      <Section />
    </div>
  );
}
