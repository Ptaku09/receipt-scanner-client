import { createContext, ReactNode, useState } from 'react';
import { Product } from '@/types/product';

interface ProductsContextProps {
  products: Product[];
  setProducts: (products: Product[]) => void;
  handlePriceChange: (index: number, price: string) => void;
}

export const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  setProducts: (products: Product[]) => {},
  handlePriceChange: (index: number, price: string) => {},
});

const ProductsProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);

  const handlePriceChange = (index: number, price: string) => {
    const newProducts = [...products];
    newProducts[index].price = parseFloat(price || '0');
    setProducts(newProducts);
  };

  return <ProductsContext.Provider value={{ products, setProducts, handlePriceChange }}>{children}</ProductsContext.Provider>;
};

export default ProductsProvider;
