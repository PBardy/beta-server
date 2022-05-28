import CategoriesController from '@/controllers/categories.controller';
import { CreateCategoryDto } from '@/dtos/category/create-category.dto';
import { UpdateCategoryDto } from '@/dtos/category/update-category.dto';
import { Routes } from '@/interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class CategoryRoute implements Routes {
  public path = '/category';
  public router = Router();
  public categoriesController = new CategoriesController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(':uuid'), this.categoriesController.getOne);
    this.router.put(this.url(''), validationMiddleware(CreateCategoryDto, 'body'), this.categoriesController.createOne);
    this.router.post(this.url(':uuid'), validationMiddleware(UpdateCategoryDto, 'body'), this.categoriesController.updateOne);
    this.router.delete(this.url(':uuid'), this.categoriesController.deleteOne);
  }
}

export default CategoryRoute;
