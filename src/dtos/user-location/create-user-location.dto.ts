import { IsString } from 'class-validator';

export class CreateUserLocationDto {
  @IsString()
  public locationId: string;
}
