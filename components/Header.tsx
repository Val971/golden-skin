'use client';

import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  ssr: false,
});
const FloatMenu = dynamic(() => import('./FloatMenu'), {
  ssr: false,
});

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <MobileMenu setOpen={setOpen} open={open} />
      {/*End Mobile menu */}
      <header className='relative bg-white'>
        <p className='flex h-10 items-center justify-center text-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
          Bénéficiez de la livraison gratuite sur les commandes de plus de 100 $
        </p>

        <nav aria-label='Top' className='mx-auto  px-4 sm:px-6 lg:px-8'>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <button
                type='button'
                onClick={() => setOpen(true)}
                className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'>
                <span className='absolute -inset-0.5' />
                <span className='sr-only'>Open menu</span>
                <Bars3Icon aria-hidden='true' className='h-6 w-6' />
              </button>

              {/* Logo */}
              <Link
                href={'/'}
                className='ml-4 flex justify-center gap-4 lg:ml-0 cursor-pointer'>
                <span className='sr-only'>Golden Skin</span>
                <Image
                  alt='logo'
                  width={90}
                  height={100}
                  src='/goldenSkin.svg'
                  className='h-8 w-auto cursor-pointer'
                />
                <span className='self-center font-extrabold text-xl'>
                  Golden Skin
                </span>
              </Link>

              {/* Flyout menus */}
              <FloatMenu />
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
