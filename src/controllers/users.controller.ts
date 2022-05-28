import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { IUser } from '@/interfaces/user/user.interface';
import UserService from '@services/users.service';
import { ApiResponse } from '@/interfaces/responses.interface';
import { UserDto } from '@/dtos/user/user.dto';
import { UpdateUserDto } from '@/dtos/user/update-user.dto';
import { RequestWithUser } from '@/interfaces/auth/auth.interface';

class UsersController {
  public userService = new UserService();

  /**
   * Get all users
   *
   * @param req
   * @param res
   * @param next
   */
  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users: Array<IUser> = await this.userService.getAll();
      const response: ApiResponse<Array<UserDto>> = {
        data: UserDto.fromModels(users),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Get a user
   *
   * @param req
   * @param res
   * @param next
   */
  public getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uuid = String(req.params.uuid);
      const user: IUser = await this.userService.getOne(uuid);
      const response: ApiResponse<UserDto> = {
        data: UserDto.fromModel(user),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create a user
   *
   * @param req
   * @param res
   * @param next
   */
  public createOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateUserDto = req.body;
      const user: IUser = await this.userService.createOne(data);
      const response: ApiResponse<UserDto> = {
        data: UserDto.fromModel(user),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Create many users
   *
   * @param req
   * @param res
   * @param next
   */
  public createMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json();
  };

  /**
   * Update a user
   *
   * @param req
   * @param res
   * @param next
   */
  public updateOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const data: UpdateUserDto = req.body;
      const user: IUser = await this.userService.updateOne(userId, data);
      const response: ApiResponse<IUser> = {
        data: user,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Update many users
   *
   * @param req
   * @param res
   * @param next
   */
  public updateMany = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.status(200).json();
  };

  /**
   * Delete a user
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteOne = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuid = String(req.params.uuid);
      const user: IUser = await this.userService.deleteOne(userId, uuid);
      const response: ApiResponse<IUser> = {
        data: user,
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  /**
   * Delete many users
   *
   * @param req
   * @param res
   * @param next
   */
  public deleteMany = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.user.id);
      const uuids = String(req.query.uuids).split(',');
      const users = await this.userService.deleteMany(userId, uuids);
      const response: ApiResponse<Array<UserDto>> = {
        data: UserDto.fromModels(users),
      };

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UsersController;
