import { LocationsController } from '@/controllers/locations.controller';
import { CreateLocationDto } from '@/dtos/location/create-location.dto';
import { UpdateLocationDto } from '@/dtos/location/update-location.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class LocationRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public locationsController = new LocationsController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(':uuid'), this.locationsController.getOne);
    this.router.put(this.url(''), authMiddleware, validationMiddleware(CreateLocationDto, 'body'), this.locationsController.createOne);
    this.router.post(this.url(':uuid'), authMiddleware, validationMiddleware(UpdateLocationDto, 'body'), this.locationsController.updateOne);
    this.router.delete(this.url(':uuid'), authMiddleware, this.locationsController.deleteOne);
  }
}

export default LocationRoute;
