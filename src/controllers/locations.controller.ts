import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { CreateLocationsDto } from '@/dtos/location/create-locations.dto';
import { LocationDto } from '@/dtos/location/location.dto';
import { UpdateLocationDto } from '@/dtos/location/update-location.dto';
import { UpdateLocationsDto } from '@/dtos/location/update-locations.dto';
import { RequestWithUser } from '@/interfaces/auth/auth.interface';
import { ApiResponse } from '@/interfaces/responses.interface';
import { LocationService } from '@/services/location.service';
import { NextFunction, Request, Response } from 'express';

export class LocationsController {
  private locationService = new LocationService();

  /**
   * Get a location.
   *
   * @param req
   * @param res
   * @param next
   */
  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuid = String(req.params.uuid);
      const location = await this.locationService.getOne(uuid);
      const response: ApiResponse<LocationDto> = {
        data: LocationDto.fromModel(location),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all locations
   *
   * @param req
   * @param res
   * @param next
   */
  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const locations = await this.locationService.getAll();
      const response: ApiResponse<Array<LocationDto>> = {
        data: LocationDto.fromModels(locations),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get many locations
   *
   * @param req
   * @param res
   * @param next
   */
  public getMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuids = String(req.query.uuids).split(',');
      const locations = await this.locationService.getMany(uuids);
      const response: ApiResponse<Array<LocationDto>> = {
        data: LocationDto.fromModels(locations),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a location
   *
   * @param req
   * @param res
   * @param next
   */
  public createOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: CreateLocationDto = req.body;
      const location = await this.locationService.createOne(userId, body);
      const response: ApiResponse<LocationDto> = {
        data: location,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create many locations.
   *
   * @param req
   * @param res
   * @param next
   */
  public createMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: CreateLocationsDto = req.body;
      const locations = await this.locationService.createMany(userId, body);
      const response: ApiResponse<Array<LocationDto>> = {
        data: locations,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a location
   *
   * @param req
   * @param res
   * @param next
   */
  public updateOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: UpdateLocationDto = req.body;
      const location = await this.locationService.updateOne(userId, body);
      const response: ApiResponse<LocationDto> = {
        data: location,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update many locations.
   *
   * @param req
   * @param res
   * @param next
   */
  public updateMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: UpdateLocationsDto = req.body;
      const locations = await this.locationService.updateMany(userId, body);
      const response: ApiResponse<Array<LocationDto>> = {
        data: locations,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a location
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const location = await this.locationService.deleteOne(userId, uuid);
      const response: ApiResponse<LocationDto> = {
        data: location,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete many locations.
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuids = String(req.query.uuids).split(',');
      const locations = await this.locationService.deleteMany(userId, uuids);
      const response: ApiResponse<Array<LocationDto>> = {
        data: locations,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
