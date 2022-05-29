import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public description?: string;

  @IsString()
  public color: string;
}
