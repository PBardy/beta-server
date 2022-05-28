import { IsEmail, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsUUID()
  public uuid: string;

  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
