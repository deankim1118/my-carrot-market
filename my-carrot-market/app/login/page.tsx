'use client';

import FormInput from '@/components/form-input';
import FormButton from '@/components/form-btn';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { handleForm } from './actions';

export default function Login() {
  const [state, dispatch] = useFormState(handleForm, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>Hello</h1>
        <h2>Login with email and password</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <FormInput name='email' type='email' placeholder='Email' required />
        <FormInput
          name='password'
          type='password'
          placeholder='Password'
          required
        />

        <FormButton text='Login' />
      </form>
      <SocialLogin />
    </div>
  );
}
