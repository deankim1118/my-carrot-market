'use client';

import { useState } from 'react';
import ListProduct from './listProduct';
import { getMoreProducts } from '@/app/products/[id]/action';
import { InitialProducts } from '@/app/(tabs)/products/page';

interface IProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const onLoadMoreClick = async () => {
    setIsLoading(true);
    const newProducts = await getMoreProducts(page + 1);
    if (newProducts.length !== 0) {
      setPage((prevPage) => prevPage + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLastPage(true);
    }
    setIsLoading(false);
  };

  return (
    <div className='p-5 flex flex-col gap-5'>
      {products.map((product, index) => (
        <ListProduct key={index} {...product} />
      ))}
      {isLastPage ? (
        'No more Products'
      ) : (
        <button
          onClick={onLoadMoreClick}
          disabled={isLoading}
          className='text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95'
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </button>
      )}
    </div>
  );
}
