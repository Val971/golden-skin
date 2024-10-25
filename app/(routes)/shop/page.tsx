'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';
import { IProduct } from '@/app/types';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';
import { filterUniqueProducts } from '@/app/_utils/filter';

const subCategories = [
  { key: 'all', name: 'Tous les produits' },
  { key: 'visage', name: 'Visage' },
  { key: 'cheveux', name: 'Cheveux' },
  { key: 'suppléments', name: 'Suppléments' },
  { key: 'cadeaux & coffrets', name: 'Cadeaux & coffrets' },
];
const filters = [
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: true },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '2l', label: '2L', checked: false },
      { value: '6l', label: '6L', checked: false },
      { value: '12l', label: '12L', checked: false },
      { value: '18l', label: '18L', checked: false },
      { value: '20l', label: '20L', checked: false },
      { value: '40l', label: '40L', checked: true },
    ],
  },
];
const sortOptions = [
  { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const router = useRouter();
  const { data, isLoading } = useSWR(
    '/products?populate=*',
    GlobalApi.getAllProducts
  );
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const uniqueData = filterUniqueProducts(data);
    if (uniqueData)
      if (search && search !== 'all') {
        const filterDatas = uniqueData.filter(
          (item: IProduct) =>
            item.categories &&
            item.categories.toLocaleLowerCase().includes(search)
        );
        setFilteredProducts(filterDatas);
      } else {
        setFilteredProducts(uniqueData);
      }
  }, [data, search]);

  useEffect(() => {
    if (data)
      filterUniqueProducts(data).forEach((product: IProduct) => {
        router.prefetch(`/shop/${product.documentId}`);
      });
  }, [data]);

  const handlerQuery = (key: string) => {
    router.push(`?query=${key}`);
  };
  return (
    <div>
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className='relative z-40 lg:hidden'>
          <DialogBackdrop
            transition
            className='fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0'
          />

          <div className='fixed inset-0 z-40 flex'>
            <DialogPanel
              transition
              className='relative ml-auto flex h-full w-full max-w-xs transform flex-col  bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full'>
              <div className='flex items-center justify-between px-4'>
                <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                <button
                  type='button'
                  onClick={() => {
                    setMobileFiltersOpen(false);
                  }}
                  className='-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400'>
                  <span className='sr-only'>Close menu</span>
                  <XMarkIcon aria-hidden='true' className='h-6 w-6' />
                </button>
              </div>

              {/* Filters */}
              <form className='mt-4 border-t border-gray-200'>
                <h3 className='sr-only'>Categories</h3>
                <ul role='list' className='px-2 py-3 font-medium text-gray-900'>
                  {subCategories.map((category) => (
                    <li
                      onClick={() => router.push(`?query=${category.key}`)}
                      key={category.name}>
                      <p className='block px-2 py-3'>{category.name}</p>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as='div'
                    className='border-t border-gray-200 px-4 py-6'>
                    <h3 className='-mx-2 -my-3 flow-root'>
                      <DisclosureButton className='group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500'>
                        <span className='font-medium text-gray-900'>
                          {section.name}
                        </span>
                        <span className='ml-6 flex items-center'>
                          <PlusIcon
                            aria-hidden='true'
                            className='h-5 w-5 group-data-[open]:hidden'
                          />
                          <MinusIcon
                            aria-hidden='true'
                            className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className='pt-6'>
                      <div className='space-y-6'>
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className='flex items-center'>
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type='checkbox'
                              className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className='ml-3 min-w-0 flex-1 text-gray-500'>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className='mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24'>
            <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
              Produits
            </h1>

            <div className='flex items-center'>
              <Menu as='div' className='relative inline-block text-left'>
                <div>
                  <MenuButton className='group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900'>
                    Sort
                    <ChevronDownIcon
                      aria-hidden='true'
                      className='-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className='absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in'>
                  <div className='py-1'>
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? 'font-medium text-gray-900'
                              : 'text-gray-500',
                            'block px-4 py-2 text-sm data-[focus]:bg-gray-100'
                          )}>
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type='button'
                onClick={() => setMobileFiltersOpen(true)}
                className='-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden'>
                <span className='sr-only'>Filters</span>
                <FunnelIcon aria-hidden='true' className='h-5 w-5' />
              </button>
            </div>
          </div>

          <section aria-labelledby='products-heading' className='pb-24 pt-6'>
            <h2 id='products-heading' className='sr-only'>
              Products
            </h2>

            <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4'>
              {/* Filters */}
              <form className='hidden lg:block'>
                <h3 className='sr-only'>Categories</h3>
                <ul
                  role='list'
                  className='space-y-4 border-b border-gray-200 pb-6 text-sm font-medium '>
                  {subCategories.map((category) => (
                    <li
                      onClick={() => handlerQuery(category.key)}
                      key={category.name}>
                      <p
                        className={`cursor-pointer ${
                          search && category.key.includes(search)
                            ? 'text-secondary'
                            : 'text-gray-900'
                        }`}>
                        {category.name}
                      </p>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as='div'
                    className='border-b border-gray-200 py-6'>
                    <h3 className='-my-3 flow-root'>
                      <DisclosureButton className='group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500'>
                        <span className='font-medium text-gray-900'>
                          {section.name}
                        </span>
                        <span className='ml-6 flex items-center'>
                          <PlusIcon
                            aria-hidden='true'
                            className='h-5 w-5 group-data-[open]:hidden'
                          />
                          <MinusIcon
                            aria-hidden='true'
                            className='h-5 w-5 [.group:not([data-open])_&]:hidden'
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className='pt-6'>
                      <div className='space-y-4'>
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className='flex items-center'>
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type='checkbox'
                              className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                            />
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className='ml-3 text-sm text-gray-600'>
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>

              {/* Product grid */}
              <div className='lg:col-span-3'>
                {isLoading ? (
                  <div className='grid 2xl:grid-cols-4  xl:grid-cols-3 lg:grid-cols-3 grid-cols-2  justify-between gap-4 md:gap-8'>
                    {Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        role='status'
                        className='max-w-sm border border-gray-300 rounded-lg p-4  md:mx-4'>
                        <div className='animate-pulse w-full bg-gray-300 h-48 rounded-lg mb-5 flex justify-center items-center'>
                          <svg
                            className='w-8 h-8 stroke-gray-400'
                            viewBox='0 0 24 24'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'>
                            <path
                              d='M20.5499 15.15L19.8781 14.7863C17.4132 13.4517 16.1808 12.7844 14.9244 13.0211C13.6681 13.2578 12.763 14.3279 10.9528 16.4679L7.49988 20.55M3.89988 17.85L5.53708 16.2384C6.57495 15.2167 7.09388 14.7059 7.73433 14.5134C7.98012 14.4396 8.2352 14.4011 8.49185 14.3993C9.16057 14.3944 9.80701 14.7296 11.0999 15.4M11.9999 21C12.3154 21 12.6509 21 12.9999 21C16.7711 21 18.6567 21 19.8283 19.8284C20.9999 18.6569 20.9999 16.7728 20.9999 13.0046C20.9999 12.6828 20.9999 12.3482 20.9999 12C20.9999 11.6845 20.9999 11.3491 20.9999 11.0002C20.9999 7.22883 20.9999 5.34316 19.8283 4.17158C18.6568 3 16.7711 3 12.9998 3H10.9999C7.22865 3 5.34303 3 4.17145 4.17157C2.99988 5.34315 2.99988 7.22877 2.99988 11C2.99988 11.349 2.99988 11.6845 2.99988 12C2.99988 12.3155 2.99988 12.651 2.99988 13C2.99988 16.7712 2.99988 18.6569 4.17145 19.8284C5.34303 21 7.22921 21 11.0016 21C11.3654 21 11.7021 21 11.9999 21ZM7.01353 8.85C7.01353 9.84411 7.81942 10.65 8.81354 10.65C9.80765 10.65 10.6135 9.84411 10.6135 8.85C10.6135 7.85589 9.80765 7.05 8.81354 7.05C7.81942 7.05 7.01353 7.85589 7.01353 8.85Z'
                              stroke='stroke-current'
                              strokeWidth='1.6'
                              stroke-linecap='round'></path>
                          </svg>
                        </div>
                        <div className=' w-full flex justify-between items-start animate-pulse'>
                          <div className='block'>
                            <h3 className='h-3 bg-gray-300 rounded-full  md:w-48 mb-4'></h3>
                            <p className='h-2 bg-gray-300 rounded-full w-32 mb-2.5'></p>
                          </div>
                          <span className='h-2 bg-gray-300 rounded-full hidden  w-16 '></span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className='grid 2xl:grid-cols-4  xl:grid-cols-3 lg:grid-cols-3 grid-cols-2  justify-between gap-8'>
                    {filteredProducts.map((item: IProduct) => {
                      return (
                        <ProductCard key={item.documentId} product={item} />
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
