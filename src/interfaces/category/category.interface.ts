import { IModel } from '../model.interface';

export interface ICategory extends IModel {
  name: string;
  color: string;
  description?: string;
}
