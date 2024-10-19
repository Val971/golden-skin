import React, { ReactNode } from 'react';
import { Carousel, CarouselContent } from './ui/carousel';

interface MyComponentProps {
  children: ReactNode;
}

const Slider: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div>
      <Carousel>
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
    </div>
  );
};
export default Slider;
