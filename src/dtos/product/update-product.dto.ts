import { IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateProductDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public thumbnail?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
