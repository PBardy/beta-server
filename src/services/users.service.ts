import { CreateUsersDto } from '@/dtos/user/create-users.dto';
import { UpdateUserDto } from '@/dtos/user/update-user.dto';
import { UpdateUsersDto } from '@/dtos/user/update-users.dto';
import { CreateUserDto } from '@/dtos/users.dto';
import { HttpException } from '@/exceptions/HttpException';
import { IUserService } from '@/interfaces/user/user-service.interface';
import { IUser } from '@/interfaces/user/user.interface';
import { User } from '@/models/user.model';
import { hash } from 'bcrypt';
import { isEmpty } from 'class-validator';

class UserService implements IUserService {
  /**
   * Get all users
   *
   * @returns
   */
  public async getAll(): Promise<IUser[]> {
    const users: Array<IUser> = await User.query().select().from('users');
    return users;
  }

  /**
   * Find a singular user by their UUID
   *
   * @param uuid
   * @returns
   */
  public async getOne(uuid: string): Promise<IUser> {
    const user: IUser = await User.query().where('uuid', uuid).first();
    if (isEmpty(user)) {
      throw new HttpException(404, 'User not found');
    }

    return user;
  }

  /**
   * Find many users by their UUID
   *
   * @param uuids
   * @returns
   */
  public async getMany(uuids: string[]): Promise<IUser[]> {
    const users: Array<IUser> = await User.query().whereIn('uuid', uuids);
    return users;
  }

  /**
   * Create a user
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createOne(data: CreateUserDto): Promise<IUser> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid user data');
    }

    const exists: User = await User.query().select().from('users').where('email', '=', data.email).first();
    if (exists) {
      throw new HttpException(409, 'A user with this email already exists');
    }

    const password = await hash(data.password, 10);
    const user: IUser = await User.query().insert({
      email: data.email,
      password: password,
    });

    return user;
  }

  /**
   * Create multiple users at once.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async createMany(userId: number, data: CreateUsersDto): Promise<IUser[]> {
    return [];
  }

  /**
   * Update a user.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateOne(userId: number, data: UpdateUserDto): Promise<IUser> {
    if (isEmpty(data)) {
      throw new HttpException(422, 'Invalid user data');
    }

    const exists: User = await User.query().select().from('users').where('email', '=', data.email).first();
    if (isEmpty(exists)) {
      throw new HttpException(404, 'Could not find user to update');
    }

    const password = await hash(data.password, 10);
    const user: IUser = await exists.$query().updateAndFetch({
      email: data.email,
      password: password,
    });

    return user;
  }

  /**
   * Update multiple users at once.
   *
   * @param userId
   * @param data
   * @returns
   */
  public async updateMany(userId: number, data: UpdateUsersDto): Promise<IUser[]> {
    return [];
  }

  /**
   * Permenantly delete a user (triggers a delete cascade).
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async deleteOne(userId: number, uuid: string): Promise<IUser> {
    const user: User = await User.query().where('uuid', uuid).first();
    if (isEmpty(user)) {
      throw new HttpException(404, 'User does not exist');
    }

    await user.$query().delete();

    return user as IUser;
  }

  /**
   * Delete multiple users at once.
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async deleteMany(userId: number, uuids: string[]): Promise<IUser[]> {
    return [];
  }

  /**
   * Soft delete the user. They still exist, but do not appear in search results.
   *
   * @param userId
   * @param uuid
   * @returns
   */
  public async softDeleteOne(userId: number, uuid: string): Promise<IUser> {
    const user: User = await User.query().where('uuid', uuid).first();
    if (isEmpty(user)) {
      throw new HttpException(404, 'User does not exist');
    }

    const deleted: IUser = await user.$query().updateAndFetch({
      deletedAt: new Date().toISOString(),
    });

    return deleted;
  }

  /**
   * Soft delete multiple users at once
   *
   * @param userId
   * @param uuids
   * @returns
   */
  public async softDeleteMany(userId: number, uuids: string[]): Promise<Array<IUser>> {
    return [];
  }
}

export default UserService;
