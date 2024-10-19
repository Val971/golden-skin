import React, { ReactNode } from 'react';

interface MyComponentProps {
  children: ReactNode;
}

const ContentWrapper: React.FC<MyComponentProps> = ({ children }) => {
  return (
    <div className='container mx-auto px-4 sm:px-6 lg:px-8'>{children}</div>
  );
};

export default ContentWrapper;
