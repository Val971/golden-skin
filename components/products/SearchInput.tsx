import React from 'react';

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}
export default function SearchInput({
  searchValue,
  setSearchValue,
}: SearchInputProps) {
  return (
    <>
      <input
        type='text'
        className='w-full border border-gray-300 rounded-md p-2'
        placeholder='Rechercher un produit...'
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        //onFocus={() => setMobilePopoverOpen(true)}
      />
    </>
  );
}
