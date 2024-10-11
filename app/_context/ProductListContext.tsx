import {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import GlobalApi from '../_utils/GlobalApi';
import { Product } from '../types';

export interface ProductContextType {
  products: Product[];
  loading: boolean;
  error: SetStateAction<undefined>;
  famousproduct: Product[];
  getProductById: (is: string) => Promise<void>;
  productDetail: Product | undefined;
  categoriesLoading: boolean;
  categories: [];
  fetchCategories: () => Promise<void>;
  filterProductsByCategories: (filter: string) => void;
  productFilterByCategories: Product[];
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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<[]>([]);
  const [productFilterByCategories, setProductFilterByCategories] = useState<
    Product[]
  >([]);
  const [productDetail, setProductDetail] = useState<Product>();
  const [famousproduct, setFamousproduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [categoriesLoading, setCategoriesLoading] = useState<boolean>(true);
  const [error, setError] = useState<SetStateAction<undefined>>();

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    const storedProductCategories = localStorage.getItem('categories');
    if (storedProducts) {
      const storedProductsList = JSON.parse(storedProducts);
      setProducts(storedProductsList);
      setProductFilterByCategories(storedProductsList);
      setFamousproduct(
        storedProductsList.filter((item: Product) => item.state === 'Famous')
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
      if (response) {
        localStorage.setItem('products', JSON.stringify(response));
      }
      setProducts(response);
      setProductFilterByCategories(response);
      setFamousproduct(
        response.filter((item: Product) => item.state === 'Famous')
      );
    } catch (error) {
      setError(error as undefined);
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
    } catch (err) {
      setError(err as undefined);
    } finally {
      setCategoriesLoading(false);
    }
  };

  const getProductById = async (id: string) => {
    setLoading(true);
    GlobalApi.getProductById(id)
      .then((resp) => {
        setProductDetail(resp);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Fournir l'état et les fonctions au reste de l'application
  return (
    <ProductContext.Provider
      value={{
        products,
        loading,
        error,
        famousproduct,
        getProductById,
        productDetail,
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
