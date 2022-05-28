import { Routes } from '@/interfaces/routes.interface';
import AuthController from '@controllers/auth.controller';
import { CreateUserDto } from '@dtos/users.dto';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.post(this.url('sign-in'), validationMiddleware(CreateUserDto, 'body'), this.authController.signIn);
    this.router.post(this.url('sign-up'), validationMiddleware(CreateUserDto, 'body'), this.authController.signUp);
    this.router.post(this.url('sign-out'), authMiddleware, this.authController.signOut);
  }
}

export default AuthRoute;
