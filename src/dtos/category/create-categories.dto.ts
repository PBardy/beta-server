import { IsArray } from 'class-validator';
import { CreateCategoryDto } from './create-category.dto';

export class CreateCategoriesDto {
  @IsArray()
  public categories: CreateCategoryDto[];
}
