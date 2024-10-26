import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LogoProps {
  width: number;
  height: number;
  position?: string;
}
export default function Logo({ width, height, position }: LogoProps) {
  return (
    <Link
      href={'/'}
      className={`ml-4 flex justify-center gap-4 lg:ml-0 cursor-pointer ${position}`}>
      <span className='sr-only'>Golden Skin</span>
      <Image
        alt='logo'
        width={width}
        height={height}
        src='/goldenSkin.svg'
        className='h-8 w-auto cursor-pointer'
      />
      <p className='self-center text-primary font-extrabold text-xl'>
        Golden Skin
      </p>
    </Link>
  );
}
