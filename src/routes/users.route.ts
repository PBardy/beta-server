import { Router } from 'express';
import UsersController from '@controllers/users.controller';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { CreateUsersDto } from '@/dtos/user/create-users.dto';
import { UpdateUsersDto } from '@/dtos/user/update-users.dto';

class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  public initializeRoutes() {
    this.router.get(this.url(), this.usersController.getAll);
    this.router.post(this.url(), validationMiddleware(CreateUsersDto, 'body'), this.usersController.createMany);
    this.router.put(this.url(), validationMiddleware(UpdateUsersDto, 'body', true), this.usersController.updateMany);
    this.router.delete(this.url(), this.usersController.deleteMany);
  }
}

export default UsersRoute;
