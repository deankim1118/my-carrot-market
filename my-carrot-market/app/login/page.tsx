import FormInput from '@/components/form-input';
import FormButton from '@/components/form-btn';
import SocialLogin from '@/components/social-login';

export default function Login() {
  const handleForm = async (formData: FormData) => {
    'use server';
    console.log(formData.get('email'), formData.get('password'));
  };

  return (
    <div className='flex flex-col gap-10 py-8 px-6'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1>Hello</h1>
        <h2>Login with email and password</h2>
      </div>
      <form action={handleForm} className='flex flex-col gap-3'>
        <FormInput
          name='email'
          type='email'
          placeholder='Email'
          required
          errors={[]}
        />
        <FormInput
          name='password'
          type='password'
          placeholder='Password'
          required
          errors={[]}
        />

        <FormButton loading={false} text='Login' />
      </form>
      <SocialLogin />
    </div>
  );
}
