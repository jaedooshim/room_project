import { Request } from 'express';

export interface IRequest extends Request {
  user?: {
    id: string;
    name: string;
    nickname: string;
    password: string;
    email: string;
    tel: string;
    address: string;
    subAddress: string;
    role: boolean;
  };

  // 가드적용시 쿠키
  // cookies:{
  //   [key: string]: string
  // }
}
