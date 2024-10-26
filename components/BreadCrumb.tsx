'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface BreadCrumbProps {
  productName?: string;
}
export default function BreadCrumb({ productName }: BreadCrumbProps) {
  const [BreadCrumbPathNames, setBreadCrumbPathNames] = useState<string[]>([]);
  const paths = usePathname();
  const pathNames = paths.split('/').filter((path) => path);

  useEffect(() => {
    if (productName) {
      pathNames[pathNames.length - 1] = productName;
    }
    setBreadCrumbPathNames(pathNames);
  }, []);

  return (
    <nav
      aria-label='breadcrumb'
      className='w-full p-4 dark:bg-gray-100 dark:text-gray-800'>
      <ol className='flex h-8 space-x-2 dark:text-gray-800 max-w-full'>
        <li className='flex items-center'>
          <Link
            rel='noopener noreferrer'
            href='/'
            title='Back to homepage'
            className='flex items-center hover:underline'>
            Home
          </Link>
        </li>
        {BreadCrumbPathNames.map((link, index) => {
          return (
            <li key={index} className='flex items-center space-x-1'>
              <span className='dark:text-gray-600'>/</span>
              <Link
                rel='noopener noreferrer'
                href={`/${link}`}
                className={`flex items-center px-1 capitalize hover:underline ${
                  index === BreadCrumbPathNames.length - 1
                    ? 'pointer-events-none text-blue-500'
                    : ''
                }`}>
                {link}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
