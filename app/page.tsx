import type { Metadata } from 'next';
import Banner from '../components/Banner';
import Categories from '../components/Categories';
import FamousProductList from '../components/FamousProductList';
import Hero from '../components/Hero';
import Section from '../components/Section';
import GlobalApi from './_utils/GlobalApi';

export const metadata: Metadata = {
  title: 'GoldenSkin Ecommerce',
  description:
    'Découvrez une large gamme de produits de beauté haut de gamme pour sublimer votre peau, vos cheveux et votre bien-être. Maquillage, soins de la peau, parfums et accessoires – offrez-vous le meilleur de la beauté à prix accessibles. Livraison rapide et service client de qualité.',
};
const Home = async () => {
  const heroDatasResponse = await GlobalApi.getHomePageHeroDatas();
  const categoriesDatasResonse = await GlobalApi.getCategoryList();
  const famousProductsDatasResonse = await GlobalApi.getFamousProduct();
  const sectionsDatasResonse = await GlobalApi.getHomePageSectionsDatas();

  return (
    <div>
      <Hero heroDatas={heroDatasResponse} />
      <Categories categories={categoriesDatasResonse} />
      <Banner />
      <FamousProductList products={famousProductsDatasResonse} />
      <Section datas={sectionsDatasResonse} />
    </div>
  );
};
export default Home;
