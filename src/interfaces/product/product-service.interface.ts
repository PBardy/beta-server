import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { CreateProductsDto } from '@/dtos/product/create-products.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { UpdateProductsDto } from '@/dtos/product/update-products.dto';
import { IProduct } from './product.interface';

// Alias model
type M = IProduct;

export interface IProductService {
  getAll(): Promise<Array<M>>;
  getOne(uuid: string): Promise<M>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateProductDto): Promise<M>;
  createMany(userId: number, data: CreateProductsDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateProductDto): Promise<M>;
  updateMany(userId: number, data: UpdateProductsDto): Promise<Array<M>>;
  deleteOne(userId: number, uuid: string): Promise<M>;
  deleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, uuid: string): Promise<M>;
  softDeleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
}
