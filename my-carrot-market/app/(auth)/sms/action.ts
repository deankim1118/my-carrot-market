'use server';

import crypto from 'crypto';
import { z } from 'zod';
import validator from 'validator';
import { redirect } from 'next/navigation';
import db from '@/lib/db';
import { loginWithId } from '@/lib/session';

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phoneNumber) => validator.isMobilePhone(phoneNumber, 'en-US'),
    'Phone number is not valid'
  );

async function tokenExists(token: number) {
  const exists = await db.sMSToken.findUnique({
    where: { token: token.toString() },
    select: { id: true },
  });
  return Boolean(exists);
}

// You can change the type with using coerce!!
const tokenSchema = z.coerce
  .number()
  .min(100000)
  .max(999999)
  .refine(tokenExists, 'Token is not valid');

interface ActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  const exists = await db.sMSToken.findUnique({
    where: { token },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phone = formData.get('phone');
  const token = formData.get('token');
  if (!prevState.token) {
    const result = phoneSchema.safeParse(phone);
    if (!result.success) {
      return { token: false, error: result.error.flatten() };
    } else {
      // 1. delete previous token
      await db.sMSToken.deleteMany({
        where: { user: { phone: result.data } },
      });
      // 2. create new token
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data,
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: result.data,
              },
            },
          },
        },
      });
      // 3. send the token using twilio
      return { token: true };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
      return {
        token: true,
        error: result.error.flatten(),
      };
    } else {
      // 1. get the userId of token
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data.toString(),
        },
        select: {
          id: true,
          userId: true,
        },
      });
      // 2. log the user in
      loginWithId(token!);
      await db.sMSToken.delete({
        where: {
          id: token!.id,
        },
      });

      redirect('/profile');
    }
  }
}
