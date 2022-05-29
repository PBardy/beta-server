import { IsObject, IsString } from 'class-validator';
import { UserDto } from '../user/user.dto';

export class SignInDto {
  @IsObject()
  public user: UserDto;

  @IsString()
  public token: string;
}
