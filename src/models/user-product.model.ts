import type { IUserProduct } from '@/interfaces/user-product/user-product.interface';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { Product } from './product.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';

export class UserProduct extends Model implements IUserProduct {
  public id: number;
  public uuid: string;
  public userId: number;
  public productId: number;
  public expiryDate: Date;
  public bestBeforeDate: Date;
  public quantity: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;
  public createdBy?: number;

  public static idColumn = 'id';
  public static tableName = 'user_products';

  public async $beforeInsert(): Promise<void> {
    this.uuid = uuid();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  public async $beforeUpdate(): Promise<void> {
    this.updatedAt = new Date().toISOString();
  }

  public static get relationMappings(): RelationMappings | RelationMappingsThunk {
    return {
      user: {
        relation: Model.HasManyRelation,
        modelClass: User,
        join: {
          from: 'user_products.user_id',
          to: 'users.id',
        },
      },
      product: {
        relation: Model.HasManyRelation,
        modelClass: Product,
        join: {
          from: 'user_products.product_id',
          to: 'products.id',
        },
      },
    };
  }
}

export type UserProductShape = ModelObject<UserProduct>;
