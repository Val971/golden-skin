import React from 'react';
import ContentWrapper from './ContentWrapper';

export default function Banner() {
  return (
    <div className=' bg-lightBackground md:mt-20 mt-8 text-primary py-14'>
      <ContentWrapper>
        <p className=' md:text-3xl text-xl'>
          Différents corps, différents besoins.
          <br />
          <span className='font-bold'>Trouvez quels sont vos besoins.</span>
        </p>
      </ContentWrapper>
    </div>
  );
}
