import { IsString, IsUUID } from 'class-validator';

export class UpdateCategoryDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsString()
  public description?: string;

  @IsString()
  public color: string;
}
