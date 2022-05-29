import type { ICategory } from '@/interfaces/category/category.interface';
import { Model, ModelObject } from 'objection';
import { v4 as uuid } from 'uuid';

export class Category extends Model implements ICategory {
  public id: number;
  public uuid: string;
  public name: string;
  public color: string;
  public description?: string;
  public createdBy?: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;

  public static idColumn = 'id';
  public static tableName = 'categories';

  $beforeInsert() {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

export type CategoryShape = ModelObject<Category>;
