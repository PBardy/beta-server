import { CreateCategoriesDto } from '@/dtos/category/create-categories.dto';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { UpdateCategoriesDto } from '@/dtos/category/update-categories.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';
import { UpdateLocationDto } from '@/dtos/location/update-location.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ICategoryService } from '@/interfaces/category/category-service.interface';
import { ICategory } from '@/interfaces/category/category.interface';
import { Category } from '@/models/category.model';
import { Location } from '@/models/location.model';
import { isEmpty } from 'class-validator';

export class CategoryService implements ICategoryService {
  /**
   * Get all categories.
   *
   * @returns
   */
  public async getAll(): Promise<ICategory[]> {
    return await Category.query().select();
  }

  /**
   * Get a category by its UUID
   *
   * @param uuid
   * @returns
   */
  public async getOne(uuid: string): Promise<ICategory> {
    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find category');
    }

    return category;
  }

  /**
   * Get many locations by UUID
   *
   * @param uuids
   * @returns
   */
  public async getMany(uuids: string[]): Promise<ICategory[]> {
    const categories = await Category.query().whereIn('uuid', uuids);
    return categories;
  }

  /**
   * Create a category
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createOne(userId: number, data: CreateCategoryDto): Promise<ICategory> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    const category: ICategory = await Category.query().insertAndFetch({
      ...data,
      createdBy: userId,
    });

    return category;
  }

  /**
   * Create lots of categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createMany(userId: number, data: CreateCategoriesDto): Promise<ICategory[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Update a location
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateOne(userId: number, data: UpdateLocationDto): Promise<ICategory> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    const category: Category = await Category.query().where('uuid', data.uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find location');
    }

    const updated: ICategory = await category.$query().updateAndFetch(data);

    return updated;
  }

  /**
   * Update many categories
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateMany(userId: number, data: UpdateCategoriesDto): Promise<ICategory[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Delete a category.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async deleteOne(userId: number, uuid: string): Promise<ICategory> {
    const category: ICategory = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find category to delete');
    }

    await Category.query().deleteById(category.id);

    return category;
  }

  /**
   * Delete many locations.
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async deleteMany(userId: number, uuids: string[]): Promise<ICategory[]> {
    return [];
  }

  /**
   * Soft delete a category.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async softDeleteOne(userId: number, uuid: string): Promise<ICategory> {
    const category = await Category.query().where('uuid', uuid).first();
    if (isEmpty(category)) {
      throw new HttpException(404, 'Could not find location to soft delete');
    }

    const deleted: ICategory = await category.$query().updateAndFetch({
      deletedAt: new Date().toISOString(),
    });

    return deleted;
  }

  public async softDeleteMany(userId: number, uuids: string[]): Promise<Array<ICategory>> {
    return [];
  }
}
