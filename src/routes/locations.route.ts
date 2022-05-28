import { LocationsController } from '@/controllers/locations.controller';
import { CreateLocationsDto } from '@/dtos/location/create-locations.dto';
import { UpdateLocationsDto } from '@/dtos/location/update-locations.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class LocationsRoute implements Routes {
  public path = '/locations';
  public router = Router();
  public locationsController = new LocationsController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(), this.locationsController.getAll);
    this.router.put(this.url(), authMiddleware, validationMiddleware(CreateLocationsDto, 'body'), this.locationsController.createMany);
    this.router.post(this.url(), authMiddleware, validationMiddleware(UpdateLocationsDto, 'body'), this.locationsController.updateMany);
    this.router.delete(this.url(), authMiddleware, this.locationsController.deleteMany);
  }
}

export default LocationsRoute;
