'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import uploadeProduct from './actions';

export default function AddProduct() {
  const [preview, setPreview] = useState('');

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) {
      return;
    }
    const file = files[0];
    if (file.size < 30000000) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };
  return (
    <div>
      <form action={uploadeProduct} className='flex flex-col gap-5 p-5'>
        <label
          htmlFor='photo'
          className='border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover'
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview ? (
            <>
              <PhotoIcon className='w-20' />
              <div className='text-neutral-400 text-sm'>
                Add Photo here
              </div>{' '}
            </>
          ) : null}
        </label>
        <input
          onChange={onImageChange}
          type='file'
          id='photo'
          name='photo'
          className='hidden'
        />
        <Input name='title' required placeholder='Title' type='text' />
        <Input name='price' required placeholder='Price' type='number' />
        <Input
          name='description'
          required
          placeholder='Description'
          type='text'
        />
        <Button text='Add Product' />
      </form>
    </div>
  );
}
