import { IsString, IsUUID } from 'class-validator';
import { ICategory } from '@interfaces/category/category.interface';

export class CategoryDto {
  @IsUUID()
  public uuid: string;

  @IsString()
  public name: string;

  @IsString()
  public color: string;

  @IsString()
  public description?: string;

  public static fromModel(model: ICategory): CategoryDto {
    const dto = new CategoryDto();
    dto.uuid = model.uuid;
    dto.name = model.name;
    dto.color = model.color;
    dto.description = model.description;

    return dto;
  }
}
