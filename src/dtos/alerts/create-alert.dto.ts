import { IsDate, IsString } from 'class-validator';

export class CreateAlertDto {
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
