'use client';

import Button from '@/components/button';
import SocialLogin from '@/components/social-login';
import { useFormState } from 'react-dom';
import { login } from './actions';
import Input from '@/components/input';
import { PASSWORD_MIN_LENTH } from '@/lib/constants';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>Hello</h1>
        <h2>Login with email and password</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        <Input name='email' type='email' placeholder='Email' required />
        <Input
          name='password'
          type='password'
          placeholder='Password'
          minLength={PASSWORD_MIN_LENTH}
          required
        />

        <Button text='Login' />
      </form>
      <SocialLogin />
    </div>
  );
}
