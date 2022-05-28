import { IsArray } from 'class-validator';
import { CreateAlertDto } from './create-alert.dto';

export class CreateAlertsDto {
  @IsArray()
  public alerts: Array<CreateAlertDto>;
}
