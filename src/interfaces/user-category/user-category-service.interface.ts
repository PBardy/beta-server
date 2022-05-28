import { CreateCategoriesDto } from '@/dtos/category/create-categories.dto';
import { CreateUserCategoryDto } from '@/dtos/user-category/create-user-category.dto';
import { UpdateUserCategoriesDto } from '@/dtos/user-category/update-user-categories.dto';
import { UpdateUserCategoryDto } from '@/dtos/user-category/update-user-category.dto';
import type { IUserCategory, IUserCategoryWithRelations } from './user-category.interface';

// Alias model
type M = IUserCategory;
type MR = IUserCategoryWithRelations;

export interface IUserCategoryService {
  getOne(userId: number, uuid: string): Promise<MR>;
  getAll(userId: number): Promise<Array<MR>>;
  getMany(userId: number, uuids: Array<string>): Promise<Array<MR>>;
  createOne(userId: number, data: CreateUserCategoryDto): Promise<M>;
  createMany(userId: number, data: CreateCategoriesDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateUserCategoryDto): Promise<M>;
  updateMany(userId: number, data: UpdateUserCategoriesDto): Promise<Array<M>>;
  deleteOne(userId: number, data: string): Promise<M>;
  deleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, data: string): Promise<M>;
  softDeleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
}
