import React, { useEffect, useRef, useState } from 'react';

export default function SearchProduct() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = useState('');

  // Ferme le popover de recherche quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Exemple de fonction pour rechercher
  const handleSearch = (query: string) => {
    if (query.length > 0) {
      setSearchResults(['Result 1', 'Result 2', 'Result 3']);
      setIsSearchOpen(true);
    } else {
      setSearchResults([]);
      setIsSearchOpen(false);
    }
  };

  return (
    <div className='hidden md:block w-full max-w-xs px-10'>
      <div className='relative p-2'>
        <input
          type='text'
          value={searchValue}
          placeholder='Rechercher un produit...'
          onChange={(e) => setSearchValue(e.target.value)}
          className='p-2 border border-gray-300 rounded-lg focus:outline-none'
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
      </div>

      <div className='block md:hidden relative' ref={searchRef}>
        <input
          type='text'
          placeholder='Search...'
          onChange={(e) => handleSearch(e.target.value)}
          className='w-full px-3 py-2 rounded-md text-gray-800'
        />

        {/* Popover results */}
        {isSearchOpen && (
          <div className='absolute top-full left-0 w-full bg-white shadow-lg rounded-md mt-1 p-2 z-10'>
            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <div
                  key={index}
                  className='p-2 border-b hover:bg-gray-100 cursor-pointer'>
                  {result}
                </div>
              ))
            ) : (
              <div className='p-2 text-gray-500'>No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
    // <PopoverGroup className='lg:ml-8  lg:self-stretch'>
    //   <div className='flex h-full space-x-8'>
    //     <Popover className='flex'>
    //       <div className='relative flex'>
    //         <PopoverButton className='relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-[open]:border-indigo-600 data-[open]:text-indigo-600'>
    //           <MagnifyingGlassIcon aria-hidden='true' className='h-6 w-6' />
    //         </PopoverButton>
    //       </div>

    //       {
    //         <PopoverPanel
    //           transition
    //           className='absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in p-2 lg:w-1/2 lg:left-1/2'>
    //           <div
    //             aria-hidden='true'
    //             className='absolute inset-0 top-1/2 shadow '
    //           />
    //           <div className='bg-white max-h-screen overflow-y-auto rounded-lg'>
    //             <SearchInput
    //               searchValue={searchValue}
    //               setSearchValue={setSearchValue}
    //             />
    //             <SearchCardProduct searchTerm={debouncedSearchValue} />
    //           </div>
    //         </PopoverPanel>
    //       }
    //     </Popover>
    //   </div>
    // </PopoverGroup>
  );
}
