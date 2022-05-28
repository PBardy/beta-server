import { compare } from 'bcrypt';
import config from 'config';
import { sign } from 'jsonwebtoken';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, SignInData, SignUpData, TokenData } from '@/interfaces/auth/auth.interface';
import { isEmpty } from '@utils/util';
import { IUser } from '@/interfaces/user/user.interface';
import { IAuthService } from '@/interfaces/auth/auth-service.interface';
import UserService from './users.service';
import { User } from '@/models/user.model';

class AuthService implements IAuthService {
  private userService = new UserService();

  /**
   * Create a user
   *
   * @param data
   * @returns
   */
  public async signUp(data: CreateUserDto): Promise<SignUpData> {
    const user = await this.userService.createOne(data);
    const token = this.createToken(user);
    const cookie = this.createCookie(token);

    return { token: token.token, cookie, user };
  }

  /**
   * Sign in
   *
   * @param data
   * @returns
   */
  public async signIn(data: CreateUserDto): Promise<SignInData> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid sign in credentials');
    }

    const exists: User = await User.query().where('email', data.email).first();
    if (isEmpty(exists)) {
      throw new HttpException(409, 'User not found');
    }

    const matches: boolean = await compare(data.password, exists.password);
    if (!matches) {
      throw new HttpException(409, 'Passwords do not match');
    }

    const token = this.createToken(exists);
    const cookie = this.createCookie(token);

    return { token: token.token, cookie, user: exists };
  }

  /**
   * Sign out
   *
   * @param data
   * @returns
   */
  public async signOut(data: IUser): Promise<IUser> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid sign out data');
    }

    const exist: User = await User.query().where('email', data.email).andWhere('password', data.password).first();

    if (!exist) {
      throw new HttpException(404, 'Could not find user');
    }

    return exist;
  }

  /**
   * Create a token.
   *
   * @param user
   * @returns
   */
  private createToken(user: IUser): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = config.get('secretKey');
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  /**
   * Create a cookie.
   *
   * @param tokenData
   * @returns
   */
  private createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
