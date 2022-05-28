import { ProductsController } from '@/controllers/products.controller';
import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { Routes } from '@/interfaces/routes.interface';
import authMiddleware from '@/middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';
import { Router } from 'express';

class ProductRoute implements Routes {
  public path = '/product';
  public router = Router();
  public productsController = new ProductsController();

  constructor() {
    this.initializeRoutes();
  }

  private url(path = ''): string {
    return `${this.path}/${path}`;
  }

  private initializeRoutes() {
    this.router.get(this.url(':uuid'), this.productsController.getOne);
    this.router.post(this.url(''), authMiddleware, validationMiddleware(CreateProductDto, 'body'), this.productsController.createOne);
    this.router.put(this.url(':uuid'), authMiddleware, validationMiddleware(UpdateProductDto, 'body'), this.productsController.updateOne);
    this.router.delete(this.url(':uuid'), authMiddleware, this.productsController.deleteOne);
  }
}

export default ProductRoute;
