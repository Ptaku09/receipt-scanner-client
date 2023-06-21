import React, { FormEvent, useContext } from 'react';
import { Product } from '@/types/product';
import { ProductsContext } from '@/providers/ProductsProvider';
import Button from '@/components/Button';

interface ProductsPreviewProps {
  onProductsConfirmed: (e: FormEvent) => void;
  onPreviewCancel: () => void;
}

const ProductsPreview = ({ onProductsConfirmed, onPreviewCancel }: ProductsPreviewProps) => {
  const { products, handlePriceChange } = useContext(ProductsContext);

  return (
    <>
      <p className="text-neutral-500 font-light text-center text-sm pb-10">
        Please check if prices are correctly detected, and if not, please manually enter the correct price
      </p>
      <form onSubmit={onProductsConfirmed} className="w-full flex items-center justify-center flex-col gap-5">
        {products.map((product: Product, index: number) => (
          <div
            key={index}
            className="w-full bg-stone-200 rounded-xl shadow-sm grid grid-cols-[1fr_100px] gap-5 text-md [&>*]:flex [&>*]:items-center"
          >
            <label className="col-start-1 px-2 py-3" htmlFor={product.name + index}>
              {product.name}
            </label>
            <div className="w-full h-full col-start-2 p-1 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500">
              <input
                className="w-full h-full rounded-lg px-2"
                id={product.name + index}
                type="number"
                defaultValue={product.price}
                step={0.01}
                min={0}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
        <div className="w-full flex items-center justify-center gap-7">
          <Button func={onPreviewCancel}>BACK</Button>
          <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-12 py-3 text-bold text-white text-sm rounded-xl shadow-xl" type="submit">
            ADD PEOPLE
          </button>
        </div>
      </form>
    </>
  );
};

export default ProductsPreview;
