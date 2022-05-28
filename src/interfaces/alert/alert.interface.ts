import type { IModel } from '../model.interface';

export interface IAlert extends IModel {
  title: string;
  description?: string;
  data?: any;
  dateRead?: Date;
  dateSent?: Date;
  dateQueued?: Date;
}
