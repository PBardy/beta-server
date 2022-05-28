import type { IUserCategory } from '@/interfaces/user-category/user-category.interface';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { Category } from './category.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';

export class UserCategory extends Model implements IUserCategory {
  public id: number;
  public uuid: string;
  public userId: number;
  public categoryId: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;
  public createdBy?: number;

  public static idColumn = 'id';
  public static tableName = 'user_categories';

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
          from: 'user_categories.user_id',
          to: 'users.id',
        },
      },
      category: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'user_categories.category_id',
          to: 'categories.id',
        },
      },
    };
  }
}

export type UserCategoryShape = ModelObject<UserCategory>;
