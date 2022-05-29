import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateAlertDto {
  @IsUUID()
  public uuid: string;

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
}
