import { IModel } from '../model.interface';

export interface IProduct extends IModel {
  name: string;
  thumbnail?: string;
  description?: string;
}
