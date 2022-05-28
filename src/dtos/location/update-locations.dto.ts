import { IsArray } from 'class-validator';
import { UpdateLocationDto } from './update-location.dto';

export class UpdateLocationsDto {
  @IsArray()
  public locations: Array<UpdateLocationDto>;
}
