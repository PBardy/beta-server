import { IsArray } from 'class-validator';
import { UpdateAlertDto } from './update-alert.dto';

export class UpdateAlertsDto {
  @IsArray()
  public alerts: Array<UpdateAlertDto>;
}
