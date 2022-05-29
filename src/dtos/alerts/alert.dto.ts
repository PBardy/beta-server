import { IAlert } from '@/interfaces/alert/alert.interface';
import { IsDate, IsOptional, IsString } from 'class-validator';

export class AlertDto {
  @IsString()
  public title: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsOptional()
  @IsDate()
  public dateRead?: Date;

  @IsOptional()
  @IsDate()
  public dateSent?: Date;

  @IsOptional()
  @IsDate()
  public dateQueued?: Date;

  public static fromModel(model: IAlert): AlertDto {
    const dto = new AlertDto();
    dto.title = model.title;
    dto.description = model.description;
    dto.dateRead = model.dateRead;
    dto.dateSent = model.dateSent;
    dto.dateQueued = model.dateQueued;

    return dto;
  }

  public static fromModels(models: Array<IAlert>): Array<AlertDto> {
    return models.map(model => AlertDto.fromModel(model));
  }
}
