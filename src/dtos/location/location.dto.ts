import { IsOptional, IsString, IsUUID } from 'class-validator';
import type { ILocation } from '@interfaces/location/location.interface';

export class LocationDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsString()
  public color: string;

  @IsOptional()
  @IsString()
  public description?: string;

  public static fromModel(model: ILocation): LocationDto {
    const dto = new LocationDto();
    dto.uuid = model.uuid;
    dto.name = model.name;
    dto.color = model.color;
    dto.description = model.description;

    return dto;
  }

  public static fromModels(models: Array<ILocation>): Array<LocationDto> {
    return models.map(LocationDto.fromModel);
  }
}
