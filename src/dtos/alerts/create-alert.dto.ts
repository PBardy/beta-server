import { IsDate, IsOptional, IsString } from 'class-validator';

export class CreateAlertDto {
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
