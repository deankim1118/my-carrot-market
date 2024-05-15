import Input from '@/components/input';
import Button from '@/components/button';

export default function SMSLogin() {
  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>SMS Login</h1>
        <h2>Verify your phone number.</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <Input
          name='phoneNumber'
          type='number'
          placeholder='Phone Number'
          required
          errors={[]}
        />
        <Input
          name='code'
          type='number'
          placeholder='Verification code'
          required
          errors={[]}
        />
        <Button text='Verify' />
      </form>
    </div>
  );
}
