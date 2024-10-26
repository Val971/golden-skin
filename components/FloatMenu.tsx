'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import SearchCardProduct from './products/SearchCardProduct';
import Cart from './Cart';
import { useAuthContext } from '../app/_context/AuthContext';
import Link from 'next/link';
import useDebounce from '@/hook/useDebounce';

export default function FloatMenu() {
  const { user, logout } = useAuthContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isMobilePopoverOpen, setMobilePopoverOpen] = useState(false);
  const jwt = sessionStorage.getItem('jwt');
  const popoverRef = useRef<HTMLDivElement | null>(null);
  const mobilePopoverRef = useRef<HTMLDivElement | null>(null);
  const debouncedSearchValue = useDebounce(searchQuery, 1000);

  // Fermer le popover lorsqu'on clique à l'extérieur
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setPopoverOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popoverRef]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobilePopoverRef.current &&
        !mobilePopoverRef.current.contains(event.target as Node)
      ) {
        setMobilePopoverOpen(false);
        setSearchQuery('');
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobilePopoverRef]);

  return (
    <>
      <div className='ml-auto flex items-center'>
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
          {jwt ? (
            <>
              <div className=''>
                <Popover>
                  <PopoverButton className='flex text-sm justify-center  items-center gap-2 font-semibold text-gray-700 focus:outline-none data-[active]:text-secondary data-[hover]:text-secondary data-[focus]:outline-1 data-[focus]:outline-secondary w-[10rem]'>
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
                    <p className='min-w-48'>
                      {`Bonjour ${user && user.username} !`}{' '}
                    </p>
                  </PopoverButton>
                  <PopoverPanel
                    transition
                    anchor='bottom'
                    className='divide-y mt-6 divide-white/5 rounded-xl bg-white text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 shadow-lg'>
                    <div className='p-3'>
                      <p className='font-bold text-black'>Mon compte</p>
                      <hr />
                      <a className='flex gap-2 mt-2 rounded-lg py-2 px-3 transition hover:bg-lightBackground cursor-pointer'>
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
              <Link
                href={'/auth/sign-in'}
                className='text-sm font-medium text-gray-700 hover:text-secondary'>
                Connexion
              </Link>
              <span aria-hidden='true' className='h-6 w-px bg-gray-200' />
              <Link
                href={'/auth/create-account'}
                className='text-sm font-medium text-gray-700 hover:text-secondary'>
                Inscription
              </Link>
            </>
          )}
          {/* Champ de recherche */}
          <div className='relative'>
            <input
              type='text'
              className='hidden lg:flex w-full md:w-64 border border-gray-300 rounded-md p-2'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setPopoverOpen(true)}
            />
            <button
              type='submit'
              className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800'>
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z'
                />
              </svg>
            </button>
            {/* Popover des résultats de recherche */}
            {isPopoverOpen && searchQuery && (
              <div
                ref={popoverRef}
                className='absolute z-10 mt-1 w-full md:w-64 bg-white border border-gray-300 rounded-md shadow-lg'>
                <SearchCardProduct searchTerm={debouncedSearchValue} />
              </div>
            )}
          </div>
        </div>

        {/* Champ de recherche et icône pour mobile */}
        <div className='relative w-full md:w-auto flex-1'>
          <button
            type='submit'
            onClick={() => {
              setMobilePopoverOpen(true);
            }}
            className='flex lg:hidden text-gray-500 hover:text-secondary'>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M21 21l-4.35-4.35M10.5 18A7.5 7.5 0 1010.5 3a7.5 7.5 0 000 15z'
              />
            </svg>
          </button>
        </div>

        {/* Popover des résultats de recherche */}
        {isMobilePopoverOpen && (
          <div
            ref={mobilePopoverRef}
            className='absolute right-0 w-full mx-auto md:max-w-xs bg-white border border-gray-300 rounded-md shadow-lg top-28 z-10 overflow-hidden'>
            <input
              type='text'
              className='w-full border border-gray-300 rounded-md p-2'
              placeholder='Search...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setMobilePopoverOpen(true)}
            />

            <SearchCardProduct searchTerm={debouncedSearchValue} />
          </div>
        )}

        {/* Panier et bouton */}
        <Cart />
      </div>
    </>
  );
}
