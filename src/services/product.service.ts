import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { CreateProductsDto } from '@/dtos/product/create-products.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { UpdateProductsDto } from '@/dtos/product/update-products.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IProductService } from '@/interfaces/product/product-service.interface';
import { IProduct } from '@/interfaces/product/product.interface';
import { Product } from '@/models/product.model';
import { isEmpty } from 'class-validator';

export class ProductService implements IProductService {
  /**
   * Get all products
   *
   * @returns
   */
  public async getAll(): Promise<IProduct[]> {
    return await Product.query().select();
  }

  /**
   * Get a product by its UUID
   *
   * @param uuid
   * @returns
   */
  public async getOne(uuid: string): Promise<IProduct> {
    const product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    return product;
  }

  /**
   * Get multiple products by their UUIDs
   *
   * @param uuids
   * @returns
   */
  public async getMany(uuids: string[]): Promise<IProduct[]> {
    const products = await Product.query().whereIn('uuid', uuids);
    return products;
  }

  public async createOne(userId: number, data: CreateProductDto): Promise<IProduct> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid user data');
    }

    const product: IProduct = await Product.query().insertAndFetch({
      ...data,
      createdBy: userId,
    });

    return product;
  }

  /**
   * Create multiple products at once.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createMany(userId: number, data: CreateProductsDto): Promise<IProduct[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Update a product
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateOne(userId: number, data: UpdateProductDto): Promise<IProduct> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    const product: Product = await Product.query().where('uuid', data.uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product');
    }

    const updated: IProduct = await product.$query().updateAndFetch(data);

    return updated;
  }

  /**
   * Update many products at once.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateMany(userId: number, data: UpdateProductsDto): Promise<IProduct[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Delete a product by its UUID
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async deleteOne(userId: number, uuid: string): Promise<IProduct> {
    const product: IProduct = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product to delete');
    }

    await Product.query().deleteById(product.id);

    return product;
  }

  /**
   * Delete many products at once.
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async deleteMany(userId: number, uuids: string[]): Promise<IProduct[]> {
    return [];
  }

  /**
   * Soft delete one product by its UUID.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async softDeleteOne(userId: number, uuid: string): Promise<IProduct> {
    const product: Product = await Product.query().where('uuid', uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, 'Could not find product to soft delete');
    }

    const deleted: IProduct = await product.$query().updateAndFetch({
      deletedAt: new Date().toISOString(),
    });

    return deleted;
  }

  /**
   * Soft delete many products.
   *
   * @param userId
   * @param uuids
   */
  public async softDeleteMany(userId: number, uuids: string[]): Promise<Array<IProduct>> {
    return [];
  }
}
