import { ProductsController } from '@/controllers/products.controller';
import { CreateProductsDto } from '@/dtos/product/create-products.dto';
import { UpdateProductsDto } from '@/dtos/product/update-products.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class ProductsRoute implements Routes {
  public path = '/products';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(), this.productsController.getAll);
    this.router.put(this.url(), authMiddleware, validationMiddleware(CreateProductsDto, 'body'), this.productsController.createMany);
    this.router.post(this.url(), authMiddleware, validationMiddleware(UpdateProductsDto, 'body'), this.productsController.updateMany);
    this.router.delete(this.url(), authMiddleware, this.productsController.deleteMany);
  }
}

export default ProductsRoute;
