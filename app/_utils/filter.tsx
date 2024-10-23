import { IProduct } from '../types';

export const filterUniqueProducts = (products: IProduct[]) => {
  return (
    products &&
    products.reduce((acc: IProduct[], current: IProduct) => {
      if (!acc.find((item) => item.documentId === current.documentId)) {
        acc.push(current);
      }
      return acc;
    }, [])
  );
};
