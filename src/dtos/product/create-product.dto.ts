import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  public name: string;

  @IsString()
  public thumbnail?: string;

  @IsString()
  public description?: string;
}