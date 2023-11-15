import { User } from '@prisma/client';

export interface ICreateUser
  extends Pick<User, 'name' | 'nickname' | 'password' | 'email' | 'tel' | 'address' | 'subAddress' | 'role'> {}
