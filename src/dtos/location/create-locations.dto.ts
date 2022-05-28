import { IsArray } from 'class-validator';
import { CreateLocationDto } from './create-location.dto';

export class CreateLocationsDto {
  @IsArray()
  public locations: Array<CreateLocationDto>;
}
