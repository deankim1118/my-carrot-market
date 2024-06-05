'use client';

import { useFormState } from 'react-dom';
import ProductForm from '@/components/product-form';
import editProduct from './action';

export default function AddProduct() {
  const [state, dispatch] = useFormState(editProduct, null);

  return (
    <div className='relative flex flex-col justify-center h-screen'>
      <form action={dispatch}>
        <ProductForm
          title={state?.fieldErrors.title}
          price={state?.fieldErrors.price}
          description={state?.fieldErrors.description}
        />
      </form>
    </div>
  );
}
