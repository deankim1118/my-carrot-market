'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import uploadeProduct from './actions';
import { useFormState } from 'react-dom';

export default function AddProduct() {
  const [preview, setPreview] = useState('');
  const [state, dispatch] = useFormState(uploadeProduct, null);

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
      <form action={dispatch} className='flex flex-col gap-5 p-5'>
        <label
          htmlFor='photo'
          className='border-2 aspect-square flex flex-col items-center justify-center text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover'
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
          errors={state?.fieldErrors.title}
        />
        <Input
          name='price'
          required
          placeholder='Price'
          type='number'
          errors={state?.fieldErrors.price}
        />
        <Input
          name='description'
          required
          placeholder='Description'
          type='text'
          errors={state?.fieldErrors.description}
        />
        <Button text='Add Product' />
      </form>
    </div>
  );
}
