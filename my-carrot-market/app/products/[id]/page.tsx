import Image from 'next/image';
import db from '@/lib/db';
import { notFound, redirect } from 'next/navigation';
import { UserIcon } from '@heroicons/react/24/solid';
import { formatToUSD } from '@/lib/utils';
import Link from 'next/link';
import { unstable_cache as nextCache, revalidatePath } from 'next/cache';
import { getSession } from '@/lib/session';
import BackButton from '@/components/back-button';

async function getIsOwner(userId: number): Promise<boolean> {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}

export async function getProduct(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

async function getProductTitle(id: number) {
  const product = await db.product.findUnique({
    where: { id },
    select: { title: true },
  });
  return product;
}

const getCachedProduct = nextCache(getProduct, ['product-detail'], {
  tags: ['productDetail'],
});

const getCachedProductTitle = nextCache(getProductTitle, ['product-title'], {
  tags: ['productTitle'],
});

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getCachedProductTitle(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);

  if (isNaN(id)) {
    return notFound();
  }

  const product = await getCachedProduct(id);
  if (!product) {
    return notFound();
  }
  const isOwner = await getIsOwner(product.userId);

  const deleteProduct = async () => {
    'use server';
    await db.product.delete({ where: { id } });
    revalidatePath('/home');
    redirect('/home');
  };

  const editProduct = async () => {
    'use server';
    redirect(`/edit-product/${id}`);
  };

  // const revalidate = async () => {
  //   'use server';
  //   revalidateTag('productTitle');
  // };

  return (
    <div className='relative max-w-screen-md h-screen flex flex-col justify-center '>
      <BackButton />
      <div className='relative w-full h-1/2'>
        <Image
          fill
          src={product.photo}
          alt={product.title}
          className='object-cover'
        />
      </div>
      <div className='p-5 flex items-center gap-3 border-b border-neutral-700'>
        <div className='size-10 rounded-full overflow-hidden'>
          {product.user.avatar !== null ? (
            <Image
              src={product.user.avatar}
              width={40}
              height={40}
              alt={product.user.username}
            />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className='p-5'>
        <h1 className='text-2xl font-semibold'>{product.title}</h1>
        <p>{product.description}</p>
      </div>

      <div className='fixed bottom-0 self-center w-full p-5 bg-neutral-800 flex justify-between items-center max-w-screen-md '>
        <span className='font-semibold text-xl'>
          ${formatToUSD(product.price)}
        </span>
        {isOwner ? (
          <>
            {/* <form action={editProduct}>
              <button className='bg-blue-500 px-3 py-2.5 rounded-md text-white font-semibold'>
                Edit product
              </button>
            </form> */}
            {/* <form action={editProduct}>
              <button className='bg-red-500 px-3 py-2.5 rounded-md text-white font-semibold'>
                Edit product
              </button>
            </form> */}
            <form action={deleteProduct}>
              <button className='bg-red-500 px-3 py-2.5 rounded-md text-white font-semibold'>
                Delete product
              </button>
            </form>
          </>
        ) : null}
        <Link
          className='bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold'
          href={``}
        >
          Chats
        </Link>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { id: true },
  });
  return products.map((product) => ({ id: product.id + '' }));
}
