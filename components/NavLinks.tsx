'use client';
import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const navigation = {
  pages: [
    { name: 'Boutique', href: '/shop' },
    { name: 'À propos', href: '/about' },
  ],
};
export default function NavLinks() {
  const router = useRouter();
  const params = usePathname();
  const handlerNav = (link: string) => {
    if (link)
      router.push(`${link.includes('shop') ? `${link}?query=all` : link}`);
  };
  return (
    <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
      <div className='flex h-full space-x-8'>
        {navigation.pages.map((page) => (
          <a
            onClick={() => handlerNav(page.href)}
            key={page.name}
            className={`flex items-center text-sm font-medium cursor-pointer  hover:text-secondary ${
              params === page.href ? 'text-secondary' : 'text-gray-700'
            }`}>
            {page.name}
          </a>
        ))}
      </div>
    </div>
  );
}
