import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import dynamic from 'next/dynamic';
import Logo from './Logo';
import NavLinks from './NavLinks';

const MobileMenu = dynamic(() => import('./MobileMenu'), {
  loading: () => <p>Chargement...</p>,
  ssr: false,
});
const FloatMenu = dynamic(() => import('./FloatMenu'), {
  loading: () => <p>Chargement...</p>,
  ssr: false,
});

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav className='bg-white shadow-lg'>
      {/* Mobile menu */}
      <MobileMenu setOpen={setOpen} open={open} />
      <p className='flex h-10 items-center justify-center text-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
        Bénéficiez de la livraison gratuite sur les commandes de plus de 100 $
      </p>
      <div className=' mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <button
            type='button'
            onClick={() => setOpen(true)}
            className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'>
            <span className='absolute -inset-0.5' />
            <span className='sr-only'>Open menu</span>
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
          <div className='flex h-16 items-center'>
            <Logo width={90} height={100} />
            {/* Menu de navigation */}
            <NavLinks />
          </div>
          <FloatMenu />
        </div>
      </div>
    </nav>
  );
}
