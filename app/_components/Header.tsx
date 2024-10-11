'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  TabGroup,
  TabList,
} from '@headlessui/react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useRouter } from 'next/navigation';
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import CartItemList from './CartItemList';

import { useCartContext } from '../_context/CartContext';
import { useAuthContext } from '../_context/AuthContext';

const navigation = {
  pages: [
    { name: 'Boutique', href: '/products' },
    { name: 'À propos', href: '#' },
  ],
};

export default function Header() {
  const [open, setOpen] = useState(false);
  const { cart, totalCartItem } = useCartContext();
  const { user, logout } = useAuthContext();
  const router = useRouter();
  const jwt = sessionStorage.getItem('jwt');

  return (
    <div className='bg-white'>
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className='relative z-40 lg:hidden'>
        <DialogBackdrop
          transition
          className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
        />

        <div className='fixed inset-0 z-40 flex'>
          <DialogPanel
            transition
            className='relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full'>
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
                  <div
                    className='ml-4 flex gap-4 lg:ml-0 cursor-pointer'
                    onClick={() => router.push('/')}>
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
                  </div>
                </TabList>
              </div>
            </TabGroup>

            <div className='space-y-6 border-t border-gray-200 px-4 py-6'>
              {navigation.pages.map((page) => (
                <div key={page.name} className='flow-root'>
                  <a
                    href={page.href}
                    className='-m-2 block p-2 font-medium text-gray-900'>
                    {page.name}
                  </a>
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
                      <p className='font-semibold text-gray-700'>
                        Mes commandes
                      </p>
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
                    <button
                      onClick={() => router.push('/sign-in')}
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Connexion
                    </button>
                  </div>
                  <div className='flow-root'>
                    <button
                      onClick={() => router.push('/create-account')}
                      className='-m-2 block p-2 font-medium text-gray-900'>
                      Inscription
                    </button>
                  </div>
                </>
              )}
            </div>

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
            </div>
          </DialogPanel>
        </div>
      </Dialog>
      {/*End Mobile menu */}
      <header className='relative bg-white'>
        <p className='flex h-10 items-center justify-center bg-primary px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
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
              <div
                className='ml-4 flex justify-center gap-4 lg:ml-0 cursor-pointer'
                onClick={() => router.push('/')}>
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
              </div>

              {/* Flyout menus */}
              <PopoverGroup className='hidden lg:ml-8 lg:block lg:self-stretch'>
                <div className='flex h-full space-x-8'>
                  {navigation.pages.map((page) => (
                    <button
                      onClick={() => router.push(page.href)}
                      key={page.name}
                      className='flex items-center text-sm font-medium text-gray-700 hover:text-secondary'>
                      {page.name}
                    </button>
                  ))}
                </div>
              </PopoverGroup>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                  {jwt ? (
                    <>
                      <div className=''>
                        <Popover>
                          <PopoverButton className=' flex text-sm justify-center items-center gap-2 font-semibold text-gray-700 focus:outline-none data-[active]:text-secondary data-[hover]:text-secondary data-[focus]:outline-1 data-[focus]:outline-secondary'>
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
                          </PopoverButton>
                          <PopoverPanel
                            transition
                            anchor='bottom'
                            className='divide-y mt-6 divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0'>
                            <div className='p-3'>
                              <p className='font-bold text-black'>Mon compte</p>
                              <hr />
                              <a className='flex gap-2 mt-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground'>
                                <p className='font-semibold text-gray-700'>
                                  Profile
                                </p>
                              </a>
                              <a className='flex gap-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground'>
                                <p className='font-semibold text-gray-700'>
                                  Mes commandes
                                </p>
                              </a>
                              <a
                                onClick={() => logout()}
                                className='flex gap-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground'>
                                <p className='font-semibold text-gray-700'>
                                  Déconnexion
                                </p>
                              </a>
                            </div>
                          </PopoverPanel>
                        </Popover>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => router.push('/sign-in')}
                        className='text-sm font-medium text-gray-700 hover:text-secondary'>
                        Connexion
                      </button>
                      <span
                        aria-hidden='true'
                        className='h-6 w-px bg-gray-200'
                      />
                      <button
                        onClick={() => router.push('/create-account')}
                        className='text-sm font-medium text-gray-700 hover:text-secondary'>
                        Inscription
                      </button>
                    </>
                  )}
                </div>

                <div className='hidden lg:ml-8 lg:flex'>
                  <a className='flex items-center text-gray-700 hover:text-secondary'>
                    <img
                      alt=''
                      src='https://tailwindui.com/img/flags/flag-canada.svg'
                      className='block h-auto w-5 flex-shrink-0'
                    />
                    <span className='ml-3 block text-sm font-medium'>CAD</span>
                    <span className='sr-only'>, change currency</span>
                  </a>
                </div>

                {/* Search */}
                <div className='flex lg:ml-6'>
                  <a className='p-2 text-gray-400 hover:text-secondary'>
                    <span className='sr-only'>Search</span>
                    <MagnifyingGlassIcon
                      aria-hidden='true'
                      className='h-6 w-6'
                    />
                  </a>
                </div>

                <Sheet>
                  <SheetTrigger asChild>
                    {/* Cart */}
                    <div className='ml-4 flow-root lg:ml-6'>
                      <a className='group -m-2 flex items-center p-2 cursor-pointer'>
                        <ShoppingBagIcon
                          aria-hidden='true'
                          className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-secondary'
                        />
                        <span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-secondary'>
                          {totalCartItem}
                        </span>
                        <span className='sr-only'>items in cart, view bag</span>
                      </a>
                    </div>
                  </SheetTrigger>
                  <SheetContent className='flex flex-col h-screen w-96'>
                    <div className='flex flex-col justify-between'>
                      <SheetHeader>
                        <SheetTitle className='flex gap-5'>
                          <ShoppingBagIcon
                            aria-hidden='true'
                            className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-secondary'
                          />{' '}
                          <p className='uppercase'>votre pannier</p>
                        </SheetTitle>
                        <hr />
                        <SheetDescription></SheetDescription>
                      </SheetHeader>
                    </div>
                    {/* Liste des articles du panier */}
                    <CartItemList cartItemList={cart} />
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
