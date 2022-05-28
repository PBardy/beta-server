import { NextFunction, Request, Response } from 'express';
import { CreateUserDto } from '@dtos/users.dto';
import { RequestWithUser } from '@/interfaces/auth/auth.interface';
import type { IUser } from '@/interfaces/user/user.interface';
import AuthService from '@services/auth.service';
import { ApiResponse } from '@/interfaces/responses.interface';
import { UserDto } from '@/dtos/user/user.dto';
import { SignInDto } from '@/dtos/auth/sign-in.dto';
import { SignUpDto } from '@/dtos/auth/sign-up.dto';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateUserDto = req.body;
      const signUp = await this.authService.signUp(data);
      const response: ApiResponse<SignUpDto> = {
        data: {
          user: UserDto.fromModel(signUp.user),
          token: signUp.token,
        },
      };

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  };

  public signIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: CreateUserDto = req.body;
      const signIn = await this.authService.signIn(data);
      const response: ApiResponse<SignInDto> = {
        data: {
          user: UserDto.fromModel(signIn.user),
          token: signIn.token,
        },
      };

      res.setHeader('Set-Cookie', [signIn.cookie]);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };

  public signOut = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: IUser = req.user;
      const signOut: IUser = await this.authService.signOut(data);
      const response: ApiResponse<UserDto> = {
        data: UserDto.fromModel(signOut),
      };

      res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
