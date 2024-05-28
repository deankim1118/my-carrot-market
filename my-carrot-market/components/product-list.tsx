'use client';

import { useEffect, useRef, useState } from 'react';
import ListProduct from './listProduct';
import { InitialProducts } from '@/app/(tabs)/home/page';
import { getMoreProducts } from '@/app/(tabs)/home/action';

interface IProductListProps {
  initialProducts: InitialProducts;
}

export default function ProductList({ initialProducts }: IProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const obsever = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prevPage) => prevPage + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      },
      { threshold: 1.0, rootMargin: '0px 0px -100px 0px' }
    );
    if (trigger.current) {
      obsever.observe(trigger.current);
    }
    return () => {
      obsever.disconnect();
    };
  }, [page]);

  return (
    <div className='p-5 flex flex-col gap-5'>
      {products.map((product, index) => (
        <ListProduct key={index} {...product} />
      ))}

      {/* {!isLastPage ? (
        <span
          ref={trigger}
          className='text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95'
        >
          {isLoading ? 'Loading...' : 'Load More'}
        </span>
      ) : null} */}
    </div>
  );
}
