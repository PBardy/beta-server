import { ICategory } from '../category/category.interface';
import type { IModel } from '../model.interface';
import { IUser } from '../user/user.interface';

export interface IUserCategory extends IModel {
  userId: number;
  categoryId: number;
}

export interface IUserCategoryWithRelations extends IUserCategory, IUser, ICategory {}
