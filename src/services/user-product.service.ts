import { ERRORS } from '@/constants/errors';
import { CreateUserProductDto } from '@/dtos/user-product/create-user-product.dto';
import { UpdateUserProductDto } from '@/dtos/user-product/update-user-product.dto';
import { UpdateUserProductsDto } from '@/dtos/user-product/update-user-products.dto';
import { HttpException } from '@/exceptions/HttpException';
import type { IUserProductService } from '@/interfaces/user-product/user-product-service.interface';
import type { IUserProduct, IUserProductWithRelations } from '@/interfaces/user-product/user-product.interface';
import { Product } from '@/models/product.model';
import { UserProduct } from '@/models/user-product.model';
import { isEmpty } from 'class-validator';

class UserProductService implements IUserProductService {
  /**
   * Get a user product
   *
   * @param uuid
   */
  public async getOne(uuid: string): Promise<IUserProductWithRelations> {
    const userProduct = await UserProduct.query().where('uuid', uuid).joinRelated('user').joinRelated('product').first();
    if (isEmpty(userProduct)) {
      throw new HttpException(404, ERRORS[404]);
    }

    return userProduct as unknown as IUserProductWithRelations;
  }

  /**
   * Get all user products
   *
   * @param userId
   */
  public async getAll(userId: number): Promise<IUserProductWithRelations[]> {
    const products = await UserProduct.query().where('userId', userId).joinRelated('user').joinRelated('product');
    return products as Array<unknown> as Array<IUserProductWithRelations>;
  }

  /**
   * Get many user products.
   *
   * @param uuids
   */
  public async getMany(uuids: string[]): Promise<IUserProductWithRelations[]> {
    const products = await UserProduct.query().whereIn('uuid', uuids).joinRelated('user').joinRelated('product');
    return products as Array<unknown> as Array<IUserProductWithRelations>;
  }

  /**
   * Create a user product
   *
   * @param userId
   * @param data
   */
  public async createOne(userId: number, data: CreateUserProductDto): Promise<IUserProductWithRelations> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    const product = await Product.query().where('uuid', data.uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const userProduct = await UserProduct.query()
      .insertAndFetch({
        userId: userId,
        productId: product.id,
        createdBy: userId,
      })
      .joinRelated('user')
      .joinRelated('product');

    return userProduct as unknown as IUserProductWithRelations;
  }

  /**
   * Create many user products.
   *
   * @param userId
   * @param data
   */
  public async createMany(userId: number, data: CreateUserProductDto): Promise<IUserProductWithRelations[]> {
    return [];
  }

  /**
   * Update a user product.
   *
   * @param userId
   * @param data
   */
  public async updateOne(userId: number, data: UpdateUserProductDto): Promise<IUserProductWithRelations> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    const product = await Product.query().where('uuid', data.uuid).first();
    if (isEmpty(product)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const userProduct = await UserProduct.query().where('uuid', data.productId).first();
    if (isEmpty(userProduct)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userProduct.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const updated = userProduct
      .$query()
      .updateAndFetch({
        productId: userProduct.id,
      })
      .joinRelated('user')
      .joinRelated('products');

    return updated as unknown as IUserProductWithRelations;
  }

  /**
   * Update many user products.
   *
   * @param userId
   * @param data
   */
  public async updateMany(userId: number, data: UpdateUserProductsDto): Promise<IUserProductWithRelations[]> {
    return [];
  }

  /**
   * Delete a user product.
   *
   * @param userId
   * @param data
   */
  public async deleteOne(userId: number, data: string): Promise<IUserProductWithRelations> {
    const userProduct = await UserProduct.query().where('uuid', data).joinRelated('user').joinRelated('product').first();
    if (isEmpty(userProduct)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userProduct.id !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    await userProduct.$query().delete();

    return userProduct as unknown as IUserProductWithRelations;
  }

  /**
   * Delete many user products.
   *
   * @param userId
   * @param data
   */
  public async deleteMany(userId: number, data: string[]): Promise<IUserProductWithRelations[]> {
    return [];
  }

  /**
   * Soft delete a user product.
   *
   * @param userId
   * @param data
   */
  public async softDeleteOne(userId: number, data: string): Promise<IUserProductWithRelations> {
    const userProduct = await UserProduct.query().where('uuid', data).first();
    if (isEmpty(userProduct)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userProduct.id !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const updated = await userProduct
      .$query()
      .updateAndFetch({
        deletedAt: new Date().toISOString(),
      })
      .joinRelated('user')
      .joinRelated('product');

    return updated as unknown as IUserProductWithRelations;
  }

  /**
   * Soft delete many user products.
   *
   * @param userId
   * @param data
   */
  public async softDeleteMany(userId: number, data: string[]): Promise<IUserProductWithRelations[]> {
    return [];
  }
}

export default UserProductService;
