import type { ILocation } from '@/interfaces/location/location.interface';
import { Model, ModelObject } from 'objection';
import { v4 as uuid } from 'uuid';

export class Location extends Model implements ILocation {
  public id: number;
  public uuid: string;
  public name: string;
  public color: string;
  public thumbnail?: string;
  public description?: string;
  public createdBy?: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;

  public static idColumn = 'id';
  public static tableName = 'products';

  public async $beforeInsert(): Promise<void> {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public async $beforeUpdate(): Promise<void> {
    this.updatedAt = new Date().toISOString();
  }
}

export type LocationShape = ModelObject<Location>;
