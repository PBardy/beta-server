import { IProduct } from '@/interfaces/product/product.interface';
import { Model, ModelObject } from 'objection';
import { v4 as uuid } from 'uuid';

export class Product extends Model implements IProduct {
  public id: number;
  public uuid: string;
  public name: string;
  public thumbnail?: string;
  public description?: string;
  public createdBy?: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;

  public static idColumn = 'id';
  public static tableName = 'products';

  $beforeInsert(): void {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  $beforeUpdate(): void {
    this.updatedAt = new Date().toISOString();
  }
}

export type ProductShape = ModelObject<Product>;
