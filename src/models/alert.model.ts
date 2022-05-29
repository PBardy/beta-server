import type { IAlert } from '@/interfaces/alert/alert.interface';
import { Model, ModelObject } from 'objection';
import { v4 as uuid } from 'uuid';

export class Alert extends Model implements IAlert {
  public id: number;
  public uuid: string;
  public title: string;
  public data?: string;
  public description?: string;
  public dateRead?: Date;
  public dateSent?: Date;
  public dateQueued?: Date;
  public createdBy?: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;

  public static idColumn = 'id';
  public static tableName = 'alerts';

  public async $beforeInsert(): Promise<void> {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public async $beforeUpdate(): Promise<void> {
    this.updatedAt = new Date().toISOString();
  }
}

export type AlertShape = ModelObject<Alert>;
