import { CreateUserLocationDto } from '@/dtos/user-location/create-user-location.dto';
import { CreateUserLocationsDto } from '@/dtos/user-location/create-user-locations.dto';
import { UpdateUserLocationDto } from '@/dtos/user-location/update-user-location.dto';
import { UpdateUserLocationsDto } from '@/dtos/user-location/update-user-locations.dto';
import { IUserLocation } from './user-location.interface';

// Alias model
type M = IUserLocation;

export interface IUserLocationService {
  getOne(uuid: string): Promise<M>;
  getAll(userId: number): Promise<Array<M>>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateUserLocationDto): Promise<M>;
  createMany(userId: number, data: CreateUserLocationsDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateUserLocationDto): Promise<M>;
  updateMany(userId: number, data: UpdateUserLocationsDto): Promise<Array<M>>;
  deleteOne(userId: number, data: string): Promise<M>;
  deleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, data: string): Promise<M>;
  softDeleteMany(userId: number, data: Array<string>): Promise<Array<M>>;
}
