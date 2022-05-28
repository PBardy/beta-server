import { IModel } from '../model.interface';

export interface IUser extends IModel {
  email: string;
  password: string;
}
