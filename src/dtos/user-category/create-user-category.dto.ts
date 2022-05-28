import { IsUUID } from 'class-validator';

export class CreateUserCategoryDto {
  @IsUUID()
  public categoryId: string;
}
