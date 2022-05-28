import { UserProductDto } from '@/dtos/user-product/user-product.dto';
import { RequestWithUser } from '@/interfaces/auth/auth.interface';
import { ApiResponse } from '@/interfaces/responses.interface';
import UserProductService from '@/services/user-product.service';
import { NextFunction, Request, Response } from 'express';

export class UserProductsController {
  private userProductService = new UserProductService();

  public getOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
    } catch (error) {
      next(error);
    }
  };

  public getAll = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const userProducts = await this.userProductService.getAll(userId);
      const response: ApiResponse<Array<UserProductDto>> = {
        data: UserProductDto.fromModels(userProducts),
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
