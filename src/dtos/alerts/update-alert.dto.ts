import { IsDate, IsString, IsUUID } from 'class-validator';

export class UpdateAlertDto {
  @IsUUID()
  public uuid: string;

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
}
