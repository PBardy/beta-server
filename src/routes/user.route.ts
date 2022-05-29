import UsersController from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import validationMiddleware from '@middlewares/validation.middleware';
import { UpdateUserDto } from '@/dtos/user/update-user.dto';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';
import { UserProductsController } from '@/controllers/user-products.controller';
import { UserLocationsController } from '@/controllers/user-locations.controller';
import { UserCategoriesController } from '@/controllers/user-categories.controller';
import authMiddleware from '@/middlewares/auth.middleware';
import { CreateUserProductDto } from '@/dtos/user-product/create-user-product.dto';
import { UpdateUserProductDto } from '@/dtos/user-product/update-user-product.dto';

class UserRoute implements Routes {
  public path = '/user';
  public router = Router();
  private usersController = new UsersController();
  private userProductsController = new UserProductsController();
  private userLocationsController = new UserLocationsController();
  private userCategoriesController = new UserCategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  protected initializeRoutes() {
    // User product routes
    this.router.get(this.url('products'), authMiddleware, this.userProductsController.getAll);
    this.router.post(this.url('products'), authMiddleware, validationMiddleware(CreateUserProductDto, 'body'), this.userProductsController.createOne);
    this.router.put(
      this.url('products/:uuid'),
      authMiddleware,
      validationMiddleware(UpdateUserProductDto, 'body'),
      this.userProductsController.updateOne,
    );
    this.router.delete(this.url('products/:uuid'), authMiddleware, this.userProductsController.deleteOne);

    // User locations routes
    this.router.get(this.url('locations'), authMiddleware);

    // User categories routes
    this.router.get(this.url('categories'), authMiddleware);

    // User routes
    this.router.get(this.url(':uuid'), this.usersController.getOne);
    this.router.post(this.url(), validationMiddleware(CreateUserDto, 'body'), this.usersController.createOne);
    this.router.put(this.url(':uuid'), validationMiddleware(UpdateUserDto, 'body', true), this.usersController.updateOne);
    this.router.delete(this.url(':uuid'), this.usersController.deleteOne);
  }
}

export default UserRoute;
