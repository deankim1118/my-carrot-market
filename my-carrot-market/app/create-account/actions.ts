'use server';

import { z } from 'zod';

const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => {
  return password === confirmPassword;
};

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#?!@&^&*])[A-Za-z\d#?!@&^&*]{6,}$/;

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: 'Username should contain the text!' })
      .min(3, 'Username must contain at least 3 characters')
      .toLowerCase()
      .trim()
      .refine(
        (username) => !username.includes('fuck'),
        'You can not use F word'
      ),
    email: z.string().email().toLowerCase(),
    password: z
      .string()
      .min(4, 'Password must contain at least 6 characters')
      .regex(
        passwordRegex,
        'Password must contain lowercase, UPPERCASE, numbers and special characters.'
      ),
    confirmPassword: z.string(),
  })
  .refine(checkPassword, {
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
  } else {
    console.log(result.data);
  }
};
