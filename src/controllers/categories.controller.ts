import { CategoryDto } from '@/dtos/category/category.dto';
import { ApiResponse } from '@/interfaces/responses.interface';
import { CategoryService } from '@/services/category.service';
import { NextFunction, Request, Response } from 'express';

class CategoriesController {
  private categoryService = new CategoryService();

  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const categories = await this.categoryService.getAll();
      const response: ApiResponse<Array<CategoryDto>> = {
        data: categories,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public getMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public createMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public updateOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public updateMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public deleteOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };

  public deleteMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // delete one
    } catch (error) {
      next(error);
    }
  };
}

export default CategoriesController;
