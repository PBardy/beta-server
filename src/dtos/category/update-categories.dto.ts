import { IsArray } from 'class-validator';
import { UpdateCategoryDto } from './update-category.dto';

export class UpdateCategoriesDto {
  @IsArray()
  public categories: UpdateCategoryDto[];
}
