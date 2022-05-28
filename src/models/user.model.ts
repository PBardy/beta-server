import type { IUser } from '@/interfaces/user/user.interface';
import { Model, ModelObject } from 'objection';
import { v4 as uuid } from 'uuid';

export class User extends Model implements IUser {
  public id: number;
  public uuid: string;
  public email: string;
  public password: string;
  public createdBy?: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;

  public static idColumn = 'id';
  public static tableName = 'users';

  public async $beforeInsert(): Promise<void> {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public async $beforeUpdate(): Promise<void> {
    this.updatedAt = new Date().toISOString();
  }
}

export type UserShape = ModelObject<User>;
