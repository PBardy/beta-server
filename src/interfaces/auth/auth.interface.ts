import { Request } from 'express';
import { IUser } from '@/interfaces/user/user.interface';

export interface DataStoredInToken {
  id: number;
}

export interface TokenData {
  token: string;
  expiresIn: number;
}

export interface RequestWithUser extends Request {
  user: IUser;
}

export interface SignInData {
  user: IUser;
  token: string;
  cookie: string;
}

export interface SignUpData {
  user: IUser;
  token: string;
  cookie: string;
}
