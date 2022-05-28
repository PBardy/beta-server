import type { IUserLocation } from '@/interfaces/user-location/user-location.interface';
import { Model, ModelObject, RelationMappings, RelationMappingsThunk } from 'objection';
import { Location } from './location.model';
import { User } from './user.model';
import { v4 as uuid } from 'uuid';

export class UserLocation extends Model implements IUserLocation {
  public id: number;
  public uuid: string;
  public userId: number;
  public locationId: number;
  public createdAt: string;
  public updatedAt: string;
  public deletedAt?: string;
  public createdBy?: number;

  public static idColumn = 'id';
  public static tableName = 'user_locations';

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
          from: 'user_locations.user_id',
          to: 'users.id',
        },
      },
      location: {
        relation: Model.HasManyRelation,
        modelClass: Location,
        join: {
          from: 'user_locations.location_id',
          to: 'locations.id',
        },
      },
    };
  }
}

export type UserLocationShape = ModelObject<UserLocation>;
