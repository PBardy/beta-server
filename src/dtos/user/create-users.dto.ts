import { IsArray } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateUsersDto {
  @IsArray()
  public users: Array<CreateUserDto>;
}
