import { createContext, useContext, useState, useEffect } from 'react';
import GlobalApi from '../api/GlobalApi';
import { IProduct } from '../types';
import { filterUniqueProducts } from '../_utils/filter';

export interface ProductContextType {
  products: IProduct[];
  loading: boolean;
  error: string | null;
  famousproduct: IProduct[];
  categoriesLoading: boolean;
  categories: [];
  fetchCategories: () => Promise<void>;
  filterProductsByCategories: (filter: string) => void;
  setError: (error: string | null) => void;
  productFilterByCategories: IProduct[];
  selectedFilter: string;
}

const ProductContext = createContext<ProductContextType | null>(null);

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within an AuthProvider');
  }
  return context;
};

export const ProductProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<[]>([]);
  const [productFilterByCategories, setProductFilterByCategories] = useState<
    IProduct[]
  >([]);
  const [famousproduct, setFamousproduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedProductCategories = localStorage.getItem('categories');
    if (storedProducts) {
      const storedProductsList = JSON.parse(storedProducts);
      setProducts(storedProductsList);
      setProductFilterByCategories(storedProductsList);
      setFamousproduct(
        storedProductsList.filter((item: IProduct) => item.state === 'Famous')
      );
      setLoading(false);
    } else {
      fetchProducts();
    }
    if (storedProductCategories) {
      const storedProductsList = JSON.parse(storedProductCategories);
      setCategories(storedProductsList);
      setCategoriesLoading(false);
    } else {
      fetchCategories();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await GlobalApi.getAllProducts();
      const uniqueProducts = filterUniqueProducts(response);
      localStorage.setItem('products', JSON.stringify(uniqueProducts));

      setProducts(uniqueProducts);
      setProductFilterByCategories(uniqueProducts);
      setFamousproduct(
        uniqueProducts.filter((item: IProduct) => item.state === 'Famous')
      );
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const filterProductsByCategories = (filter: string) => {
    setLoading(true);
    setSelectedFilter(filter);
    if (filter === 'all') {
      setProductFilterByCategories(products);
    } else {
      const filteredProducts = products.filter(
        (item) =>
          item.categories && item.categories.toLocaleLowerCase() === filter
      );
      setProductFilterByCategories(filteredProducts);
    }
    setLoading(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await GlobalApi.getCategoryList();
      if (response) {
        localStorage.setItem('categories', JSON.stringify(response));
      }
      setCategories(response);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Fournir l'état et les fonctions au reste de l'application
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        setError,
        famousproduct,
        categoriesLoading,
        categories,
        fetchCategories,
        filterProductsByCategories,
        productFilterByCategories,
        selectedFilter,
      }}>
      {children}
    </ProductContext.Provider>
  );
};
