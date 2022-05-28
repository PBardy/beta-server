import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { CreateLocationsDto } from '@/dtos/location/create-locations.dto';
import { UpdateLocationDto } from '@/dtos/location/update-location.dto';
import { UpdateLocationsDto } from '@/dtos/location/update-locations.dto';
import { ILocation } from './location.interface';

// Alias model
type M = ILocation;

export interface ILocationService {
  getAll(): Promise<Array<M>>;
  getOne(uuid: string): Promise<M>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateLocationDto): Promise<M>;
  createMany(userId: number, data: CreateLocationsDto): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateLocationDto): Promise<M>;
  updateMany(userId: number, data: UpdateLocationsDto): Promise<Array<M>>;
  deleteOne(userId: number, uuid: string): Promise<M>;
  deleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, uuid: string): Promise<M>;
  softDeleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
}
