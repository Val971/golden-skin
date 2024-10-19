import ContentWrapper from '@/components/ContentWrapper';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <ContentWrapper>
      <h1 className='text-5xl font-bold leading-none sm:text-6xl text-center mt-8 mb-20'>
        À Propos de Golden Skin
      </h1>
      {/* Section Produits Bio */}
      <section className='mb-16'>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 mb-4 md:mb-0'>
            <Image
              width={650}
              height={100}
              src='/about1.jpg'
              alt='Produits Bio'
              className='w-full rounded-lg shadow-lg'
            />
          </div>
          <div className='md:w-1/2 md:pl-8'>
            <h2 className='text-4xl mb-8 font-semibold'>Nos Produits Bio</h2>
            <p className='text-lg'>
              {`Chez Golden Skin, nous croyons en la puissance des ingrédients naturels. Tous nos produits sont formulés à partir d'extraits biologiques de haute qualité, soigneusement sélectionnés pour leurs bienfaits pour la peau. Nous nous engageons à offrir des produits efficaces, respectueux de l'environnement et de votre santé. Chaque produit est 100% naturel, sans agents chimiques ni parabènes.`}
            </p>
          </div>
        </div>
      </section>

      {/* Section Politique de la Marque */}
      <section>
        <div className='flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 md:pr-8'>
            <h2 className='text-4xl mb-8 font-semibold'>
              Notre Politique de Marque
            </h2>
            <p className='text-lg'>
              {`Notre marque s'engage à promouvoir la transparence et la responsabilité. Nous travaillons directement avec des producteurs locaux pour garantir que nos ingrédients proviennent de sources éthiques et durables. Chaque étape de notre processus de fabrication est soigneusement surveillée pour s'assurer que nous respectons les normes les plus strictes en matière de qualité et de sécurité. Chez Golden Skin, nous nous engageons à créer un impact positif dans le monde de la beauté.`}
            </p>
          </div>
          <div className='md:w-1/2 mb-4 md:mb-0'>
            <Image
              width={650}
              height={100}
              src='/about2.jpg'
              alt='Politique de Marque'
              className='w-full rounded-lg shadow-lg'
            />
          </div>
        </div>
      </section>
    </ContentWrapper>
  );
};

export default About;
