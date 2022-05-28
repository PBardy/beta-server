import { IsString } from 'class-validator';

export class UpdateUserLocationDto {
  @IsString()
  public uuid: string;

  @IsString()
  public locationId: string;
}
