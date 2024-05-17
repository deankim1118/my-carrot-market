'use server';

import {
  PASSWORD_MIN_LENTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

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
    return result.error.flatten();
  } else {
    // 1. check if username is taken & show an error message
    /// You can do this in validation of zod.refine(boolean, errorMessage) ///
    // 2. ckeck if email is already used
    /// You can do this in validation of zod.refine(boolean, errorMessage) ///
    // 3. hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    // 4. save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    // 5. log the user in with cookie
    const cookie = await getIronSession(cookies(), {
      cookieName: 'yummy-carrot',
      password: process.env.COOKIE_PASSWORD!,
    });
    //@ts-ignore
    cookie.id = user.id;
    await cookie.save();
    // 6. redirect to '/home'
    redirect('/profile');
  }
};
