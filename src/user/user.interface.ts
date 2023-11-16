import { User } from '@prisma/client';
import { User as PrismaUser } from '@prisma/client';
export interface ICreateUser
  extends Pick<User, 'name' | 'nickname' | 'password' | 'email' | 'tel' | 'address' | 'subAddress' | 'role'> {}

export interface IFindUser extends PrismaUser {
  Id?: string;
}
