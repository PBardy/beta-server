import { IAlert } from '../alert/alert.interface';
import { IModel } from '../model.interface';
import { IUser } from '../user/user.interface';

export interface IUserAlert extends IModel {
  userId: number;
  alertId: number;
}

export interface IUserAlertWithRelations extends IUserAlert, IUser, IAlert {}
