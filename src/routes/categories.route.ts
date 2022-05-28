import CategoriesController from '@/controllers/categories.controller';
import { CreateCategoriesDto } from '@/dtos/category/create-categories.dto';
import { UpdateCategoriesDto } from '@/dtos/category/update-categories.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class CategoriesRoute implements Routes {
  public path = '/categories';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(), this.categoriesController.getAll);
    this.router.put(this.url(), validationMiddleware(CreateCategoriesDto, 'body'), this.categoriesController.createMany);
    this.router.post(this.url(), validationMiddleware(UpdateCategoriesDto, 'body'), this.categoriesController.updateMany);
    this.router.delete(this.url(), this.categoriesController.deleteMany);
  }
}

export default CategoriesRoute;
