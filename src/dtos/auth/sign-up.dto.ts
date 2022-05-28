import { IsObject, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class SignUpDto {
  @IsObject()
  public user: UserDto;

  @IsString()
  public token: string;
}
