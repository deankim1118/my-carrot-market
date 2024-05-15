'use server';
import { z } from 'zod';

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: 'Username should contain the text!' })
      .min(3, 'Username must contain at least 3 characters')
      .refine(
        (username) => !username.includes('fuck'),
        'You can not use F word'
      ),
    email: z.string().email(),
    password: z.string().min(6, 'Password must contain at least 6 characters'),
    confirmPassword: z
      .string()
      .min(6, 'Password must contain at least 6 characters'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'Both password must be same',
    path: ['confirmPassword'],
  });

export const createAccount = async (prevState: any, formData: FormData) => {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };
  const result = formSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  }
};
