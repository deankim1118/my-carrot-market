'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-btn';
import SocialLogin from '@/components/social-login';
import { createAccount } from './actions';
import { useFormState } from 'react-dom';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>Hello</h1>
        <h2>Fill in the form below to join</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <FormInput
          name='username'
          type='text'
          placeholder='Username'
          required
        />
        <FormInput name='email' type='email' placeholder='Email' required />
        <FormInput
          name='password'
          type='password'
          placeholder='Password'
          required
        />
        <FormInput
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          required
        />
        <FormButton text='Create account' />
      </form>
      <SocialLogin />
    </div>
  );
}
