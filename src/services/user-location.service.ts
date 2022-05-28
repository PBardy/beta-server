import { ERRORS } from '@/constants/errors';
import { CreateUserLocationDto } from '@/dtos/user-location/create-user-location.dto';
import { CreateUserLocationsDto } from '@/dtos/user-location/create-user-locations.dto';
import { UpdateUserLocationDto } from '@/dtos/user-location/update-user-location.dto';
import { UpdateUserLocationsDto } from '@/dtos/user-location/update-user-locations.dto';
import { HttpException } from '@/exceptions/HttpException';
import type { IUserLocationService } from '@/interfaces/user-location/user-location-service.interface';
import type { IUserLocation } from '@/interfaces/user-location/user-location.interface';
import { Location } from '@/models/location.model';
import { UserLocation } from '@/models/user-location.model';
import { isEmpty } from 'class-validator';

class UserLocationService implements IUserLocationService {
  /**
   * Get a user location.
   *
   * @param uuid
   */
  public async getOne(uuid: string): Promise<IUserLocation> {
    const userLocation = await UserLocation.query().where('uuid', uuid).first();
    if (isEmpty(userLocation)) {
      throw new HttpException(404, ERRORS[404]);
    }

    return userLocation;
  }

  /**
   * Get all user locations
   */
  public async getAll(userId: number): Promise<IUserLocation[]> {
    return await UserLocation.query().where('userId', userId);
  }

  /**
   * Get many user locations
   *
   * @param uuids
   */
  public async getMany(uuids: string[]): Promise<IUserLocation[]> {
    return await UserLocation.query().whereIn('uuid', uuids);
  }

  /**
   * Create a user location.
   *
   * @param userId
   * @param data
   */
  public async createOne(userId: number, data: CreateUserLocationDto): Promise<IUserLocation> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[422]);
    }

    const location = await Location.query().where('uuid', data.locationId).first();
    if (isEmpty(location)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const userLocation = await UserLocation.query().insertAndFetch({
      createdBy: userId,
      locationId: location.id,
    });

    return userLocation;
  }

  /**
   * Create many user locations
   *
   * @param userId
   * @param data
   */
  public async createMany(userId: number, data: CreateUserLocationsDto): Promise<IUserLocation[]> {
    return [];
  }

  /**
   * Update a user location
   *
   * @param userId
   * @param data
   */
  public async updateOne(userId: number, data: UpdateUserLocationDto): Promise<IUserLocation> {
    if (isEmpty(data)) {
      throw new HttpException(422, ERRORS[404]);
    }

    const userLocation = await UserLocation.query().where('uuid', data.uuid).first();
    if (isEmpty(userLocation)) {
      throw new HttpException(404, ERRORS[404]);
    }

    if (userLocation.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const location = await Location.query().where('uuid', data.locationId).first();
    if (isEmpty(location)) {
      throw new HttpException(404, ERRORS[404]);
    }

    const updated = userLocation.$query().updateAndFetch({
      locationId: location.id,
    });

    return updated;
  }

  /**
   * Update many user locations.
   *
   * @param userId
   * @param data
   */
  public async updateMany(userId: number, data: UpdateUserLocationsDto): Promise<IUserLocation[]> {
    return [];
  }

  /**
   * Delete a user location.
   *
   * @param userId
   * @param data
   */
  public async deleteOne(userId: number, data: string): Promise<IUserLocation> {
    const userLocation = await UserLocation.query().where('uuid', data).first();
    if (isEmpty(userLocation)) {
      throw new HttpException(422, ERRORS[422]);
    }

    if (userLocation.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    await userLocation.$query().delete();

    return userLocation;
  }

  /**
   * Delete many user locations.
   *
   * @param userId
   * @param data
   */
  public async deleteMany(userId: number, data: string[]): Promise<IUserLocation[]> {
    return [];
  }

  /**
   * Soft delete a user location.
   *
   * @param userId
   * @param data
   */
  public async softDeleteOne(userId: number, data: string): Promise<IUserLocation> {
    const userLocation = await UserLocation.query().where('uuid', data).first();
    if (isEmpty(userLocation)) {
      throw new HttpException(422, ERRORS[422]);
    }

    if (userLocation.userId !== userId) {
      throw new HttpException(403, ERRORS[403]);
    }

    const updated = userLocation.$query().updateAndFetch({
      deletedAt: new Date(),
    });

    return updated;
  }

  /**
   * Soft delete many user locations.
   *
   * @param userId
   * @param data
   */
  public async softDeleteMany(userId: number, data: string[]): Promise<IUserLocation[]> {
    return [];
  }
}

export default UserLocationService;
