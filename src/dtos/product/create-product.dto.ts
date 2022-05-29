import { IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public thumbnail?: string;

  @IsOptional()
  @IsString()
  public description?: string;
}
