'use client';

import { PhotoIcon } from '@heroicons/react/24/solid';
import BackButton from './back-button';
import Input from './input';
import { useState } from 'react';
import Button from './button';

interface IInputType {
  photo?: string[] | undefined;
  title?: string[] | undefined;
  price?: string[] | undefined;
  description?: string[] | undefined;
}

export default function ProductForm(errors: IInputType) {
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
    <div className='flex flex-col gap-5 p-5'>
      <BackButton />
      <label
        htmlFor='photo'
        className='border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover h-full'
        style={{ backgroundImage: `url(${preview})` }}
      >
        {!preview ? (
          <>
            <PhotoIcon className='w-20' />
            <div className='text-neutral-400 text-sm'>Add Photo here</div>
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
      <Input
        name='title'
        required
        placeholder='Title'
        type='text'
        errors={errors.title}
      />
      <Input
        name='price'
        required
        placeholder='Price'
        type='number'
        errors={errors.price}
      />
      <Input
        name='description'
        required
        placeholder='Description'
        type='text'
        errors={errors.description}
      />
      <Button text='Add Product' />
    </div>
  );
}
