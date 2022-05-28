import { CreateUsersDto } from '@/dtos/user/create-users.dto';
import { UpdateUserDto } from '@/dtos/user/update-user.dto';
import { UpdateUsersDto } from '@/dtos/user/update-users.dto';
import { CreateUserDto } from '@/dtos/users.dto';
import { IUser } from './user.interface';

export interface IUserService {
  getAll(): Promise<Array<IUser>>;
  getOne(uuid: string): Promise<IUser>;
  getMany(uuids: Array<string>): Promise<Array<IUser>>;
  createOne(data: CreateUserDto): Promise<IUser>;
  createMany(userId: number, data: CreateUsersDto): Promise<Array<IUser>>;
  updateOne(userId: number, data: UpdateUserDto): Promise<IUser>;
  updateMany(userId: number, data: UpdateUsersDto): Promise<Array<IUser>>;
  deleteOne(userId: number, uuid: string): Promise<IUser>;
  deleteMany(userId: number, uuids: Array<string>): Promise<Array<IUser>>;
  softDeleteOne(userId: number, uuid: string): Promise<IUser>;
  softDeleteMany(userId: number, uuids: Array<string>): Promise<Array<IUser>>;
}
