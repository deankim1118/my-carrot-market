'use client';

import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { createAccount } from './actions';
import { useFormState } from 'react-dom';
import Button from '@/components/button';
import { PASSWORD_MIN_LENTH } from '@/lib/constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>Hello</h1>
        <h2>Fill in the form below to join</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input
          name='username'
          type='text'
          placeholder='Username'
          minLength={3}
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          minLength={PASSWORD_MIN_LENTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name='confirmPassword'
          type='password'
          placeholder='Confirm Password'
          required
          errors={state?.fieldErrors.confirmPassword}
        />
        <Button text='Create account' />
      </form>
      <SocialLogin />
    </div>
  );
}
