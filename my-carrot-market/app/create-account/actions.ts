'use server';

import {
  PASSWORD_MIN_LENTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
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

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  // if (user) {
  //   return false;
  // } else {
  //   return true;
  // }
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({ invalid_type_error: 'Username should contain the text!' })
      .toLowerCase()
      .trim()
      .refine(checkUniqueUsername, 'This Username is already taken.'),
    email: z
      .string()
      .email()
      .toLowerCase()
      .refine(checkUniqueEmail, 'This Email is already taken.'),
    password: z
      .string()
      .min(PASSWORD_MIN_LENTH)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
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

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // 1. check if username is taken & show an error message
    /// You can do this in validation of zod.refine(boolean, errorMessage) ///
    // 2. ckeck if email is already used
    /// You can do this in validation of zod.refine(boolean, errorMessage) ///
    // 3. hash password
    // 4. save the user to db
    // 5. log the user in
    // 6. redirect to '/home'
  }
};
