import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { CreateLocationsDto } from '@/dtos/location/create-locations.dto';
import { UpdateLocationDto } from '@/dtos/location/update-location.dto';
import { UpdateLocationsDto } from '@/dtos/location/update-locations.dto';
import { HttpException } from '@/exceptions/HttpException';
import { ILocationService } from '@/interfaces/location/location-service.interface';
import { ILocation } from '@/interfaces/location/location.interface';
import { Location } from '@/models/location.model';
import { isEmpty } from 'class-validator';

export class LocationService implements ILocationService {
  /**
   * Get all locations.
   *
   * @returns
   */
  public async getAll(): Promise<ILocation[]> {
    return await Location.query().select();
  }

  /**
   * Get a location by its UUID
   *
   * @param uuid
   * @returns
   */
  public async getOne(uuid: string): Promise<ILocation> {
    const location = await Location.query().where('uuid', uuid).first();
    if (isEmpty(location)) {
      throw new HttpException(404, 'Could not find location');
    }

    return location;
  }

  /**
   * Get many locations by UUID
   *
   * @param uuids
   * @returns
   */
  public async getMany(uuids: string[]): Promise<ILocation[]> {
    const locations = await Location.query().whereIn('uuid', uuids);
    return locations;
  }

  /**
   * Create a location
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createOne(userId: number, data: CreateLocationDto): Promise<ILocation> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    const location: ILocation = await Location.query().insertAndFetch({
      ...data,
      createdBy: userId,
    });

    return location;
  }

  /**
   * Create lots of locations
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createMany(userId: number, data: CreateLocationsDto): Promise<ILocation[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Update a location
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateOne(userId: number, data: UpdateLocationDto): Promise<ILocation> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    const location: Location = await Location.query().where('uuid', data.uuid).first();
    if (isEmpty(location)) {
      throw new HttpException(404, 'Could not find location');
    }

    const updated: ILocation = await location.$query().updateAndFetch(data);

    return updated;
  }

  /**
   * Update many locations
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateMany(userId: number, data: UpdateLocationsDto): Promise<ILocation[]> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid data');
    }

    return [];
  }

  /**
   * Delete a location.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async deleteOne(userId: number, uuid: string): Promise<ILocation> {
    const location: ILocation = await Location.query().where('uuid', uuid).first();
    if (isEmpty(location)) {
      throw new HttpException(404, 'Could not find location to delete');
    }

    await Location.query().deleteById(location.id);

    return location;
  }

  /**
   * Delete many locations.
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async deleteMany(userId: number, uuids: string[]): Promise<ILocation[]> {
    return [];
  }

  /**
   * Soft delete a location.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async softDeleteOne(userId: number, uuid: string): Promise<ILocation> {
    const location: Location = await Location.query().where('uuid', uuid).first();
    if (isEmpty(location)) {
      throw new HttpException(404, 'Could not find location to soft delete');
    }

    const deleted: ILocation = await location.$query().updateAndFetch({
      deletedAt: new Date(),
    });

    return deleted;
  }

  public async softDeleteMany(userId: number, uuids: string[]): Promise<Array<ILocation>> {
    return [];
  }
}
