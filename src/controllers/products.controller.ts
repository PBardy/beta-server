import { CreateProductDto } from '@/dtos/product/create-product.dto';
import { CreateProductsDto } from '@/dtos/product/create-products.dto';
import { ProductDto } from '@/dtos/product/product.dto';
import { UpdateProductDto } from '@/dtos/product/update-product.dto';
import { UpdateProductsDto } from '@/dtos/product/update-products.dto';
import { RequestWithUser } from '@/interfaces/auth/auth.interface';
import { ApiResponse } from '@/interfaces/responses.interface';
import { ProductService } from '@/services/product.service';
import { NextFunction, Request, Response } from 'express';

export class ProductsController {
  private productService = new ProductService();

  /**
   * Get a product.
   *
   * @param req
   * @param res
   * @param next
   */
  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuid = String(req.params.uuid);
      const product = await this.productService.getOne(uuid);
      const response: ApiResponse<ProductDto> = {
        data: product,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get all products
   *
   * @param req
   * @param res
   * @param next
   */
  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const products = await this.productService.getAll();
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(products),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get many products
   *
   * @param req
   * @param res
   * @param next
   */
  public getMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuids = String(req.params.uuids).split(',');
      const products = await this.productService.getMany(uuids);
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(products),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a product
   *
   * @param req
   * @param res
   * @param next
   */
  public createOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: CreateProductDto = req.body;
      const product = await this.productService.createOne(userId, body);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(product),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create many products
   *
   * @param req
   * @param res
   * @param next
   */
  public createMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: CreateProductsDto = req.body;
      const products = await this.productService.createMany(userId, body);
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(products),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update a product
   *
   * @param req
   * @param res
   * @param next
   */
  public updateOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: UpdateProductDto = req.body;
      const product = await this.productService.updateOne(userId, body);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(product),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update many products
   *
   * @param req
   * @param res
   * @param next
   */
  public updateMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const body: UpdateProductsDto = req.body;
      const products = await this.productService.updateMany(userId, body);
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(products),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete a product.
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuid = String(req.params.uuid);
      const userId = Number(req.user.id);
      const product = await this.productService.deleteOne(userId, uuid);
      const response: ApiResponse<ProductDto> = {
        data: ProductDto.fromModel(product),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete many products
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuids = String(req.query.uuids).split(',');
      const products = await this.productService.deleteMany(userId, uuids);
      const response: ApiResponse<Array<ProductDto>> = {
        data: ProductDto.fromModels(products),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}
