import { CreateUserDto } from '@/dtos/users.dto';
import type { IUser } from '../user/user.interface';
import type { SignInData, SignUpData } from './auth.interface';

export interface IAuthService {
  signIn(data: CreateUserDto): Promise<SignInData>;
  signUp(data: CreateUserDto): Promise<SignUpData>;
  signOut(data: IUser): Promise<IUser>;
}
