import React, { FormEvent, useContext } from 'react';
import { Product } from '@/types/product';
import { ProductsContext } from '@/providers/ProductsProvider';

const ProductsPreview = () => {
  const { products } = useContext(ProductsContext);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <p className="text-neutral-500 font-light text-center text-sm pb-10">
        Please check if prices are correctly detected, and if not, please manually enter the correct price
      </p>
      <form onSubmit={onSubmit} className="w-full flex items-center justify-center flex-col gap-5">
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
              />
            </div>
          </div>
        ))}
        <button className="bg-gradient-to-r from-pink-500 to-violet-500 px-12 py-3 text-bold text-white text-sm rounded-xl shadow-xl" type="submit">
          ADD PEOPLE
        </button>
      </form>
    </>
  );
};

export default ProductsPreview;
