import Button from '@/components/button';
import ProductList from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
import Link from 'next/link';

const getCachedProducts = nextCache(getInitialProducts, ['home-products']);

// // You can use unstable_cache in fetch() as well.
// async function getProduct() {
//   fetch("https://api.com", {
//     next: {
//       revalidate: 60,
//       tags: ["hello"],
//     },
//   });
// }

async function getInitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getCachedProducts();
  const revalidate = async () => {
    'use server';
    revalidatePath('/products');
  };
  return (
    <div className='relative'>
      <ProductList initialProducts={initialProducts} />
      <form action={revalidate}>
        <Button text='Revalidate all data' />
      </form>
      <Link
        href='/products/add'
        className='bg-orange-500 flex items-center justify-center rounded-full size-16  absolute -bottom-20 right-5 text-white transition-colors hover:bg-orange-400'
      >
        <PlusIcon className='size-10' />
      </Link>
    </div>
  );
}
