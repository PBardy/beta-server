import { IModel } from '../model.interface';

export interface ILocation extends IModel {
  name: string;
  color: string;
  thumbnail?: string;
  description?: string;
}
