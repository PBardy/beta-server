import { IAlert } from '@/interfaces/alert/alert.interface';
import { IsDate, IsString } from 'class-validator';

export class AlertDto {
  @IsString()
  public title: string;

  @IsString()
  public description?: string;

  @IsDate()
  public dateRead?: Date;

  @IsDate()
  public dateSent?: Date;

  @IsDate()
  public dateQueued?: Date;

  public static fromModel<T>(model: IAlert<T>): AlertDto {
    const dto = new AlertDto();
    dto.title = model.title;
    dto.description = model.description;
    dto.dateRead = model.dateRead;
    dto.dateSent = model.dateSent;
    dto.dateQueued = model.dateQueued;

    return dto;
  }

  public static fromModels<T>(models: Array<IAlert<T>>): Array<AlertDto> {
    return models.map(model => AlertDto.fromModel<T>(model));
  }
}
