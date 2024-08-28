import { Theme } from '@prisma/client';
import { z } from 'zod';

const password = z.string().min(6).max(128);
const email = z.string().email();
const name = z.string().min(1).max(128);
const date = z.date();
const phone = z.string().min(6);
const address = z.string().min(6);
const username = z.string().min(3).max(128);
const description = z.string().min(0).max(1024);
const theme = z.enum(Object.values(Theme) as [Theme, ...Theme[]]);

export default {
  password,
  email,
  name,
  date,
  phone,
  address,
  username,
  description,
  theme,
};
