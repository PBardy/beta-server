import { CreateUserProductDto } from '@/dtos/user-product/create-user-product.dto';
import { UpdateUserProductDto } from '@/dtos/user-product/update-user-product.dto';
import { UpdateUserProductsDto } from '@/dtos/user-product/update-user-products.dto';
import { IUserProductWithRelations } from './user-product.interface';

// Alias model
type M = IUserProductWithRelations;

export interface IUserProductService {
  getOne(uuid: string): Promise<M>;
  getAll(userId: number): Promise<Array<M>>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateUserProductDto): Promise<M>;
  createMany(userId: number, data: CreateUserProductDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateUserProductDto): Promise<M>;
  updateMany(userId: number, data: UpdateUserProductsDto): Promise<Array<M>>;
  deleteOne(userId: number, data: string): Promise<M>;
  deleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, data: string): Promise<M>;
  softDeleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
}
