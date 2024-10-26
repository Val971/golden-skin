'use client';
import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import ProductCard from '@/components/products/ProductCard';
import { IProduct } from '@/app/types';
import { useRouter, useSearchParams } from 'next/navigation';
import useSWR from 'swr';
import GlobalApi from '@/app/api/GlobalApi';
import { filterUniqueProducts } from '@/app/_utils/filter';
import Skeleton from '@/components/Skeleton';
import BreadCrumb from '@/components/BreadCrumb';

const subCategories = [
  { key: 'all', name: 'Tous les produits' },
  { key: 'visage', name: 'Visage' },
  { key: 'cheveux', name: 'Cheveux' },
  { key: 'suppléments', name: 'Suppléments' },
  { key: 'cadeaux & coffrets', name: 'Cadeaux & coffrets' },
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
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchParams = useSearchParams();
  const search = searchParams.get('query');
  const router = useRouter();
  const { data, isLoading } = useSWR(
    '/products?populate=*',
    GlobalApi.getAllProducts
  );

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
            </form>
          </DialogPanel>
        </div>
      </Dialog>

      <main className='mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-baseline justify-between border-b border-gray-200 pb-10 flex-col'>
          <BreadCrumb />
          <div className='flex justify-between w-full pt-10'>
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
            </form>

            {/* Product grid */}
            <div className='lg:col-span-3 grid 2xl:grid-cols-4  xl:grid-cols-3 lg:grid-cols-3 grid-cols-2  justify-between gap-4 md:gap-8'>
              {isLoading ? (
                <Skeleton length={8} />
              ) : (
                <>
                  {filteredProducts.map((item: IProduct) => {
                    return <ProductCard key={item.documentId} product={item} />;
                  })}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
