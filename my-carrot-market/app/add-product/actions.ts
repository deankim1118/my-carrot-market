'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import db from '@/lib/db';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

const productSchema = z.object({
  photo: z.string(),
  title: z.string(),
  price: z.coerce.number(),
  description: z.string(),
});

export default async function uploadeProduct(
  prevState: any,
  formData: FormData
) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }

  const results = productSchema.safeParse(data);
  if (!results.success) {
    return results.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          title: results.data.title,
          description: results.data.description,
          price: results.data.price,
          photo: results.data.photo,
          user: {
            connect: {
              id: session.id,
            },
          },
        },
        select: {
          id: true,
        },
      });
      redirect(`/products/${product.id}`);
    }
  }
}
