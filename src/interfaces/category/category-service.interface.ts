import { CreateCategoriesDto } from '@/dtos/category/create-categories.dto';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { UpdateCategoriesDto } from '@/dtos/category/update-categories.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';
import { ICategory } from './category.interface';

// Alias modal
type M = ICategory;

export interface ICategoryService {
  getOne(uuid: string): Promise<M>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateCategoryDto): Promise<M>;
  createMany(userId: number, data: CreateCategoriesDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateCategoryDto): Promise<M>;
  updateMany(userId: number, data: UpdateCategoriesDto): Promise<Array<M>>;
  deleteOne(userId: number, uuid: string): Promise<M>;
  deleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, uuid: string): Promise<M>;
  softDeleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
}
