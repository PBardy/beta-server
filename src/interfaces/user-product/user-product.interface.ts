import { IModel } from '../model.interface';
import { IProduct } from '../product/product.interface';
import { IUser } from '../user/user.interface';

export interface IUserProduct extends IModel {
  userId: number;
  productId: number;
  expiryDate: Date;
  bestBeforeDate: Date;
  quantity: number;
}

export interface IUserProductWithRelations extends IUserProduct, IUser, IProduct {}
