import { CreateAlertDto } from '@/dtos/alerts/create-alert.dto';
import { UpdateAlertDto } from '@/dtos/alerts/update-alert.dto';
import type { IAlert } from './alert.interface';

// Alias model
type M = IAlert;

export interface IAlertService {
  getAll(): Promise<Array<M>>;
  getOne(uuid: string): Promise<M>;
  getMany(uuids: Array<string>): Promise<Array<M>>;
  createOne(userId: number, data: CreateAlertDto): Promise<M>;
  createMany(userId: number, data: Array<CreateAlertDto>): Promise<Array<M>>;
  updateOne(userId: number, data: UpdateAlertDto): Promise<M>;
  updateMany(userId: number, data: Array<UpdateAlertDto>): Promise<Array<M>>;
  deleteOne(userId: number, uuid: string): Promise<M>;
  deleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
  softDeleteOne(userId: number, uuid: string): Promise<M>;
  softDeleteMany(userId: number, uuids: Array<string>): Promise<Array<M>>;
}
