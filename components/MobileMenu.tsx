'use client';
import React from 'react';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TabGroup,
  TabList,
} from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useAuthContext } from '../app/_context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = {
  pages: [
    { name: 'Boutique', href: '/shop' },
    { name: 'À propos', href: '/about' },
  ],
};

interface MobileMenuProps {
  open: boolean;
  setOpen: (value: boolean) => void;
}
export default function MobileMenu({ open, setOpen }: MobileMenuProps) {
  const { user, logout } = useAuthContext();
  const params = usePathname();
  const jwt = sessionStorage.getItem('jwt');
  return (
    <Dialog open={open} onClose={setOpen} className='relative z-40 lg:hidden'>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
      />

      <div className='fixed inset-0 z-40 flex'>
        <DialogPanel
          transition
          className='relative flex w-full max-w-xs transform flex-col  bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full'>
          <div className='flex px-4 pb-2 pt-5'>
            <button
              type='button'
              onClick={() => setOpen(false)}
              className='relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400'>
              <span className='absolute -inset-0.5' />
              <span className='sr-only'>Close menu</span>
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>

          {/* Links */}
          <TabGroup className='mt-2'>
            <div className='border-b border-gray-200'>
              <TabList className='flex  mb-4 space-x-8 px-4'>
                <Link
                  href='/'
                  className='ml-4 flex gap-4 lg:ml-0 cursor-pointer'>
                  <span className='sr-only'>Golden Skin</span>
                  <Image
                    alt='logo'
                    width={90}
                    height={100}
                    src='/goldenSkin.svg'
                    className='h-8 w-auto cursor-pointer'
                  />
                  <p className='self-center font-extrabold text-xl'>
                    Golden Skin
                  </p>
                </Link>
              </TabList>
            </div>
          </TabGroup>

          <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
            {navigation.pages.map((page) => (
              <div key={page.name} className='flow-root'>
                <Link
                  href={page.href}
                  className={`-m-2 block p-2 font-medium  ${
                    params === page.href ? 'text-secondary' : 'text-gray-900'
                  }`}>
                  {page.name}
                </Link>
              </div>
            ))}
          </div>

          <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
            {jwt ? (
              <>
                <div className='flex gap-4'>
                  <svg
                    width='30px'
                    height='30px'
                    viewBox='0 0 48 48'
                    xmlns='http://www.w3.org/2000/svg'>
                    <title>user-profile-circle</title>
                    <g id='Layer_2' data-name='Layer 2'>
                      <g id='invisible_box' data-name='invisible box'>
                        <rect width='48' height='48' fill='none' />
                      </g>
                      <g id='icons_Q2' data-name='icons Q2'>
                        <g>
                          <path d='M24,10a8,8,0,1,0,8,8A8,8,0,0,0,24,10Zm0,12a4,4,0,1,1,4-4A4,4,0,0,1,24,22Z' />
                          <path d='M24,2A22,22,0,1,0,46,24,21.9,21.9,0,0,0,24,2ZM11.8,37.2A26.4,26.4,0,0,1,24,34a26.4,26.4,0,0,1,12.2,3.2,17.9,17.9,0,0,1-24.4,0Zm27.1-3.1h0A30.7,30.7,0,0,0,24,30,30.7,30.7,0,0,0,9.1,34.1h0A17.7,17.7,0,0,1,6,24a18,18,0,0,1,36,0,17.7,17.7,0,0,1-3.1,10.1Z' />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <div className='flex gap-2'>
                    <p>Bonjour </p>
                    <p>{user && user.username} !</p>
                  </div>
                </div>
                <div className='p-3'>
                  <p className='font-bold text-black'>Mon compte</p>
                  <hr />
                  <a className='flex gap-2 mt-2 rounded-lg py-2 px-3 cursor-pointer transition hover:bg-lightBackground'>
                    <p className='font-semibold text-gray-700'>Profile</p>
                  </a>
                  <a className='flex gap-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground cursor-pointer'>
                    <p className='font-semibold text-gray-700'>Mes commandes</p>
                  </a>
                  <a
                    onClick={() => logout()}
                    className='flex gap-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground cursor-pointer'>
                    <p className='font-semibold text-gray-700'>Déconnexion</p>
                  </a>
                </div>
              </>
            ) : (
              <>
                <div className='flow-root'>
                  <Link
                    href={'/auth/sign-in'}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Connexion
                  </Link>
                </div>
                <div className='flow-root'>
                  <Link
                    href='/auth/create-account'
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    Inscription
                  </Link>
                </div>
              </>
            )}
          </div>
          {/* 
          <div className='border-t border-gray-200 px-4 py-6'>
            <a className='-m-2 flex items-center p-2'>
              <Image
                alt=''
                src='https://tailwindui.com/img/flags/flag-canada.svg'
                className='block h-auto w-5 flex-shrink-0'
              />
              <span className='ml-3 block text-base font-medium text-gray-900'>
                CAD
              </span>
              <span className='sr-only'>, change currency</span>
            </a>
          </div> */}
        </DialogPanel>
      </div>
    </Dialog>
  );
}
