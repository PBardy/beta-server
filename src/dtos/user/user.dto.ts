import { IUser } from '@/interfaces/user/user.interface';
import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UserDto {
  @IsUUID()
  public uuid: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  public static fromModel(user: IUser): UserDto {
    const dto = new UserDto();
    dto.uuid = user.uuid;
    dto.email = user.email;
    dto.password = user.password;

    return dto;
  }

  public static fromModels(users: Array<IUser>): Array<UserDto> {
    return users.map(UserDto.fromModel);
  }
}
