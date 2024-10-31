import GlobalApi from '@/app/api/GlobalApi';
import BreadCrumb from '@/components/BreadCrumb';
import ProductsFilter from '@/components/products/ProductsFilter';
import ProductList from '@/components/products/ProductList';
import { filterUniqueProducts } from '@/app/_utils/filter';
import WrapperContent from '@/components/WrapperContent';
import { Suspense } from 'react';

//export const revalidate = 3600;

export default async function Products() {
  const response = await GlobalApi.getDatas('/products?populate=*');
  const { data } = await response.json();
  return (
    <div>
      <main className='mx-auto px-4 sm:px-6 lg:px-8'>
        <WrapperContent>
          <BreadCrumb />
        </WrapperContent>
        <div className='flex items-baseline justify-between border-b border-gray-200 pb-10 '>
          <h1 className='text-4xl font-bold tracking-tight text-gray-900'>
            Produits
          </h1>
          <div className='flex justify-between w-full pt-10'>
            <Suspense fallback={<p>{'Chargement...'}</p>}>
              <ProductsFilter />
            </Suspense>
          </div>
        </div>
        <section aria-labelledby='products-heading' className='pb-24 pt-6'>
          <h2 id='products-heading' className='sr-only'>
            Products
          </h2>
          {/* Product grid */}
          <Suspense fallback={<p>{'Chargement...'}</p>}>
            <ProductList products={filterUniqueProducts(data)} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
