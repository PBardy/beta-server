import { ERRORS } from '@/constants/errors';
import { CreateCategoriesDto } from '@/dtos/category/create-categories.dto';
import { CreateUserCategoryDto } from '@/dtos/user-category/create-user-category.dto';
import { UpdateUserCategoriesDto } from '@/dtos/user-category/update-user-categories.dto';
import { UpdateUserCategoryDto } from '@/dtos/user-category/update-user-category.dto';
import { HttpException } from '@/exceptions/HttpException';
import type { IUserCategoryService } from '@/interfaces/user-category/user-category-service.interface';
import type { IUserCategory, IUserCategoryWithRelations } from '@/interfaces/user-category/user-category.interface';
import { Category } from '@/models/category.model';
import { UserCategory } from '@/models/user-category.model';
import { isEmpty } from 'class-validator';

// Alias models
type M = IUserCategory;
type MR = IUserCategoryWithRelations;

class UserCategoryService implements IUserCategoryService {
  /**
   * Get a category.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async getOne(userId: number, uuid: string): Promise<MR> {
    const category: M = await UserCategory.query().where('uuid', uuid).joinRelated('user').joinRelated('category').first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find user category');
    }

    if (category.userId !== userId) {
      throw new HttpException(403, 'Forbidden');
    }

    return category as MR;
  }

  /**
   * Get all user categories
   *
   * @param userId
   * @returns
   */
  public async getAll(userId: number): Promise<Array<MR>> {
    const category: Array<M> = await UserCategory.query().where('userId', userId).joinRelated('user').joinRelated('category');

    return category as Array<MR>;
  }

  /**
   * Get many user categories
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async getMany(userId: number, uuids: string[]): Promise<Array<MR>> {
    const categories: Array<M> = await UserCategory.query()
      .where('userId', userId)
      .whereIn('uuid', uuids)
      .joinRelated('user')
      .joinRelated('category');

    return categories as Array<MR>;
  }

  /**
   * Create a user category
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createOne(userId: number, data: CreateUserCategoryDto): Promise<IUserCategory> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid user category data');
    }

    const category = await Category.query().where('uuid', data.categoryId).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Category not found');
    }

    const userCategory = await UserCategory.query().insertAndFetch({
      userId: userId,
      createdBy: userId,
      categoryId: category.id,
    });

    return userCategory;
  }

  /**
   * Create many user categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createMany(userId: number, data: CreateCategoriesDto): Promise<IUserCategory[]> {
    return [];
  }

  /**
   * Update a user category.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateOne(userId: number, data: UpdateUserCategoryDto): Promise<IUserCategory> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid user category data');
    }

    const userCategory = await UserCategory.query().where('uuid', data.uuid).first();
    if (isEmpty(userCategory)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const category = await Category.query().where('uuid', data.categoryId).first();
    if (isEmpty(category)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userCategory.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const updated = await userCategory.$query().updateAndFetch({
      categoryId: category.id,
    });

    return updated;
  }

  /**
   * Update many user categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateMany(userId: number, data: UpdateUserCategoriesDto): Promise<IUserCategory[]> {
    return [];
  }

  /**
   * Delete a user category
   *
   * @param userId
   * @param data
   */
  public async deleteOne(userId: number, data: string): Promise<IUserCategory> {
    const userCategory = await UserCategory.query().where('uuid', data).first();
    if (isEmpty(userCategory)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userCategory.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    await userCategory.$query().delete();

    return userCategory;
  }

  /**
   * Delete many user categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async deleteMany(userId: number, data: string[]): Promise<IUserCategory[]> {
    return [];
  }

  /**
   * Soft delete a user category
   *
   * @param userId
   * @param data
   * @returns
   */
  public async softDeleteOne(userId: number, data: string): Promise<IUserCategory> {
    const category = await UserCategory.query().where('uuid', data).first();
    if (isEmpty(category)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (category.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const updated = await category.$query().updateAndFetch({
      deletedAt: new Date(),
    });

    return updated;
  }

  /**
   * Soft delete many user categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async softDeleteMany(userId: number, data: string[]): Promise<IUserCategory[]> {
    return [];
  }
}

export default UserCategoryService;
