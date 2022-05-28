import { ILocation } from '../location/location.interface';
import type { IModel } from '../model.interface';
import { IUser } from '../user/user.interface';

export interface IUserLocation extends IModel {
  userId: number;
  locationId: number;
}

export interface IUserLocationWithRelations extends IUserLocation, IUser, ILocation {}
