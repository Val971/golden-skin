import React from 'react';
import Button from './Button';

export default function Hero() {
  return (
    <section className='bg-gray-50'>
      <div
        className={`mx-auto px-4 py-24 lg:flex lg:h-[43rem] lg:items-center
       bg-cover bg-center heroBG`}>
        <div className='mx-auto max-w-2xl text-center'>
          <h1 className='text-3xl font-extrabold sm:text-5xl text-white'>
            Aucun corps n&apos;est pareil.
          </h1>

          <p className='mt-4 sm:text-xl/relaxed text-white'>
            Chaque corps a ses propres besoins. Répondez au questionnaire pour
            découvrir comment nous pouvons vous aider à répondre aux vôtres.
          </p>

          <div className='mt-8 flex flex-wrap justify-center gap-4'>
            <Button text='Boutique' link={`/shop`} query='?query=all' />
          </div>
        </div>
      </div>
    </section>
  );
}
