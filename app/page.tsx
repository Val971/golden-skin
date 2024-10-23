import type { Metadata } from 'next';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FamousProductList from '../components/FamousProductList';
import Hero from '../components/Hero';
import Section from '../components/Section';

export const metadata: Metadata = {
  title: 'GoldenSkin Ecommerce',
  description:
    'Découvrez une large gamme de produits de beauté haut de gamme pour sublimer votre peau, vos cheveux et votre bien-être. Maquillage, soins de la peau, parfums et accessoires – offrez-vous le meilleur de la beauté à prix accessibles. Livraison rapide et service client de qualité.',
};
const Home = async () => {
  return (
    <div>
      <Hero />
      <Categories />
      <Banner />
      <FamousProductList />
      <Section />
    </div>
  );
};
export default Home;
