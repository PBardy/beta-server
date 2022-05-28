import { IsArray } from 'class-validator';
import { UpdateUserDto } from './update-user.dto';

export class UpdateUsersDto {
  @IsArray()
  public users: Array<UpdateUserDto>;
}
