'use client';

import Input from '@/components/input';
import Button from '@/components/button';
import { useFormState } from 'react-dom';
import { smsLogin } from './action';

const initialState = { token: false, error: undefined };

export default function SMSLogin() {
  const [state, dispatch] = useFormState(smsLogin, initialState);
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form action={dispatch} className='flex flex-col gap-3'>
        {state.token ? (
          <Input
            name='token'
            type='number'
            placeholder='Verification code'
            required
            min={100000}
            max={999999}
            errors={state.error?.formErrors}
          />
        ) : (
          <Input
            key={Math.random()}
            name='phone'
            type='text'
            placeholder='Phone Number'
            required
            errors={state.error?.formErrors}
          />
        )}
        <Button text={state.token ? 'Verify' : 'Send Verification Code'} />
      </form>
    </div>
  );
}
